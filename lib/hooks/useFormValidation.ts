/**
 * useFormValidation Hook
 * 
 * Real-time form validation with touch tracking and custom rules
 * Provides form state, validation errors, and field-level feedback
 * 
 * @example
 * const { form, errors, touched, handleChange, handleBlur, validateField, resetForm } = useFormValidation({
 *   initialValues: { name: '', email: '' },
 *   validationRules: {
 *     name: [(value) => !value.trim() ? 'Name is required' : ''],
 *     email: [
 *       (value) => !value.trim() ? 'Email is required' : '',
 *       (value) => !value.includes('@') ? 'Invalid email format' : ''
 *     ]
 *   }
 * });
 */

import { useState, useCallback, useRef } from 'react';

export type ValidationRule<T = string> = (value: T) => string; // Returns error message or empty string
export type FormValues = Record<string, any>;

type FormErrors = Record<string, string>;
type FormTouched = Record<string, boolean>;

interface UseFormValidationOptions<T extends FormValues> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule[]>>;
  onValidationChange?: (isValid: boolean) => void;
  validateOnChange?: boolean; // Validate as user types (default: true)
  validateOnBlur?: boolean;   // Validate on blur (default: true)
}

/**
 * useFormValidation Hook
 * 
 * Manages form state with real-time validation
 */
export function useFormValidation<T extends FormValues>({
  initialValues,
  validationRules = {},
  onValidationChange,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFormValidationOptions<T>) {
  const [form, setForm] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const isValidRef = useRef(true);

  /**
   * Validate a single field
   */
  const validateField = useCallback(
    (fieldName: keyof T, value: any): string => {
      const rules = validationRules[fieldName] || [];
      
      for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
      }
      
      return '';
    },
    [validationRules]
  );

  /**
   * Validate all fields
   */
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(form) as Array<keyof T>).forEach((fieldName) => {
      const error = validateField(fieldName, form[fieldName]);
      if (error) {
        newErrors[String(fieldName)] = error;
        isValid = false;
      }
    });

    isValidRef.current = isValid;
    onValidationChange?.(isValid);

    return newErrors;
  }, [form, validateField, onValidationChange]);

  /**
   * Handle field change (real-time validation)
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const fieldName = name as keyof T;

      setForm((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      // Validate on change if enabled and field has been touched
      if (validateOnChange && touched[String(fieldName)]) {
        const error = validateField(fieldName, value);
        setErrors((prev) => ({
          ...prev,
          [String(fieldName)]: error,
        }));
      }
    },
    [validateOnChange, validateField, touched]
  );

  /**
   * Handle field blur (mark as touched, validate if enabled)
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      const fieldName = name as keyof T;

      // Mark field as touched
      setTouched((prev) => ({
        ...prev,
        [String(fieldName)]: true,
      }));

      // Validate on blur if enabled
      if (validateOnBlur) {
        const error = validateField(fieldName, form[fieldName]);
        setErrors((prev) => ({
          ...prev,
          [String(fieldName)]: error,
        }));
      }
    },
    [validateOnBlur, validateField, form]
  );

  /**
   * Get field error (only show if field has been touched)
   */
  const getFieldError = useCallback(
    (fieldName: keyof T): string => {
      const fieldKey = String(fieldName);
      return touched[fieldKey] ? (errors[fieldKey] || '') : '';
    },
    [errors, touched]
  );

  /**
   * Get field state
   */
  const getFieldState = useCallback(
    (fieldName: keyof T): 'idle' | 'valid' | 'error' => {
      const fieldKey = String(fieldName);
      if (!touched[fieldKey]) return 'idle';
      if (errors[fieldKey]) return 'error';
      return 'valid';
    },
    [errors, touched]
  );

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setForm(initialValues);
    setErrors({});
    setTouched({});
    isValidRef.current = true;
    onValidationChange?.(true);
  }, [initialValues, onValidationChange]);

  /**
   * Set form values programmatically
   */
  const setFormValues = useCallback((values: Partial<T>) => {
    setForm((prev) => ({
      ...prev,
      ...values,
    }));
  }, []);

  /**
   * Get form validity
   */
  const isFormValid = useCallback((): boolean => {
    const newErrors = validateForm();
    return Object.keys(newErrors).length === 0;
  }, [validateForm]);

  return {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm,
    setFormValues,
    getFieldError,
    getFieldState,
    isFormValid,
  };
}

/**
 * Common validation rules
 * Pre-built rules for common field types
 */
export const ValidationRules = {
  /**
   * Required field
   */
  required: (fieldName: string = 'This field'): ValidationRule => {
    return (value: string) => {
      if (!value || !value.trim()) {
        return `${fieldName} is required`;
      }
      return '';
    };
  },

  /**
   * Email validation
   */
  email: (): ValidationRule => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (value: string) => {
      if (value && !emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return '';
    };
  },

  /**
   * Minimum length
   */
  minLength: (length: number): ValidationRule => {
    return (value: string) => {
      if (value && value.length < length) {
        return `Must be at least ${length} characters`;
      }
      return '';
    };
  },

  /**
   * Maximum length
   */
  maxLength: (length: number): ValidationRule => {
    return (value: string) => {
      if (value && value.length > length) {
        return `Must not exceed ${length} characters`;
      }
      return '';
    };
  },

  /**
   * Pattern matching
   */
  pattern: (pattern: RegExp, message: string = 'Invalid format'): ValidationRule => {
    return (value: string) => {
      if (value && !pattern.test(value)) {
        return message;
      }
      return '';
    };
  },

  /**
   * Custom validation function
   */
  custom: (validator: (value: any) => boolean, message: string): ValidationRule => {
    return (value: any) => {
      if (value && !validator(value)) {
        return message;
      }
      return '';
    };
  },

  /**
   * URL validation
   */
  url: (): ValidationRule => {
    return (value: string) => {
      if (value) {
        try {
          new URL(value);
        } catch {
          return 'Please enter a valid URL';
        }
      }
      return '';
    };
  },

  /**
   * Phone number validation (basic)
   */
  phone: (): ValidationRule => {
    return (value: string) => {
      const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
      if (value && (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10)) {
        return 'Please enter a valid phone number';
      }
      return '';
    };
  },

  /**
   * Match field validation (e.g., password confirmation)
   */
  match: (getValueToMatch: () => string, fieldName: string = 'field'): ValidationRule => {
    return (value: string) => {
      if (value && value !== getValueToMatch()) {
        return `Must match ${fieldName}`;
      }
      return '';
    };
  },
};
