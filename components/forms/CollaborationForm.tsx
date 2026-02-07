'use client';

import { useState, FormEvent, useMemo } from 'react';
import { useFormValidation, ValidationRules } from '@/lib/hooks/useFormValidation';
import { FormLoadingState, FormSuccessState, FormErrorState, InputField, SelectField } from './FormFeedback';

interface FormData {
  name: string;
  email: string;
  company: string;
  collaborationType: string;
  message: string;
}

const COLLABORATION_TYPES = [
  { value: 'Sponsored Content', label: 'Sponsored Content' },
  { value: 'Event Performance', label: 'Event Performance' },
  { value: 'Content Creation', label: 'Content Creation' },
  { value: 'Brand Partnership', label: 'Brand Partnership' },
  { value: 'Other', label: 'Other' },
];

export default function CollaborationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Setup validation rules
  const validationRules = useMemo(() => ({
    name: [ValidationRules.required('Name')],
    email: [
      ValidationRules.required('Email'),
      ValidationRules.email(),
    ],
    company: [],
    collaborationType: [ValidationRules.required('Collaboration type')],
    message: [
      ValidationRules.required('Message'),
      ValidationRules.minLength(10),
    ],
  }), []);

  // Setup form validation hook
  const {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    getFieldError,
    getFieldState,
    resetForm,
    isFormValid,
  } = useFormValidation<FormData>({
    initialValues: {
      name: '',
      email: '',
      company: '',
      collaborationType: '',
      message: '',
    },
    validationRules,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submit
    if (!isFormValid()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      resetForm();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loading State */}
      {status === 'loading' && <FormLoadingState />}

      {/* Success State */}
      {status === 'success' && (
        <FormSuccessState message="Your inquiry has been received. I'll get back to you within 24 hours." />
      )}

      {/* Error State */}
      {status === 'error' && (
        <FormErrorState message={errorMessage} />
      )}

      {/* Name Field */}
      <InputField
        label="Your Name"
        name="name"
        type="text"
        placeholder="John Doe"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={getFieldError('name')}
        state={getFieldState('name')}
        required
        hint="Your full name or preferred name"
      />

      {/* Email Field */}
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={getFieldError('email')}
        state={getFieldState('email')}
        required
        hint="We'll use this to contact you about your inquiry"
      />

      {/* Company Field */}
      <InputField
        label="Company / Brand"
        name="company"
        type="text"
        placeholder="Your company name (optional)"
        value={form.company}
        onChange={handleChange}
        onBlur={handleBlur}
        error={getFieldError('company')}
        state={getFieldState('company')}
        hint="Optional: Help us understand your brand better"
      />

      {/* Collaboration Type Select */}
      <SelectField
        label="Collaboration Type"
        name="collaborationType"
        options={COLLABORATION_TYPES}
        value={form.collaborationType}
        onChange={handleChange}
        onBlur={handleBlur}
        error={getFieldError('collaborationType')}
        state={getFieldState('collaborationType')}
        required
        hint="What type of partnership are you interested in?"
      />

      {/* Message Field */}
      <InputField
        label="Message"
        name="message"
        placeholder="Tell me about your collaboration idea..."
        value={form.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={getFieldError('message')}
        state={getFieldState('message')}
        required
        isTextarea
        rows={5}
        maxLength={1000}
        showCharCount
        hint="Minimum 10 characters. Tell me what you have in mind!"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full font-bold py-3 px-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 hover:scale-105"
        style={{
          backgroundColor: 'var(--accent-vibrant)',
          color: 'var(--btn-primary-text)',
          border: '1px solid var(--accent-vibrant)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          fontWeight: '600',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
