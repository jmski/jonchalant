import { ReactNode, CSSProperties } from 'react';

interface FormFeedbackProps {
  type: 'loading' | 'success' | 'error';
  message: string;
}

/**
 * Loading state for form submission
 */
export function FormLoadingState() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div 
        className="animate-spin rounded-full h-5 w-5"
        style={{ 
          borderWidth: '2px',
          borderColor: 'var(--border-color)',
          borderTopColor: 'var(--accent-vibrant)'
        }}
      />
      <span className="text-secondary mono-text">
        Sending your message...
      </span>
    </div>
  );
}

/**
 * Success state after form submission
 */
export function FormSuccessState({ 
  message,
  onDismiss,
  onReturnHome 
}: { 
  message: string
  onDismiss?: () => void
  onReturnHome?: () => void
}) {
  return (
    <div 
      className="p-6 rounded-lg border-2 border-primary bg-secondary animate-in fade-in slide-in-from-left duration-500"
      style={{
        backgroundColor: 'rgba(var(--accent-vibrant-rgb), 0.05)',
      }}
    >
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-start gap-3">
          <div className="text-4xl">🎉</div>
          <div className="flex-1">
            <p className="font-black text-xl uppercase heading-display text-primary mb-2">
              Inquiry Sent Successfully!
            </p>
            <p className="text-secondary mb-3">{message}</p>
            
            {/* Timeline & Confirmation Info */}
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2">
                <span className="text-vibrant">⏱️</span>
                <span className="text-tertiary"><strong>Response Timeline:</strong> 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-vibrant">📧</span>
                <span className="text-tertiary"><strong>Confirmation:</strong> Check your email for next steps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {(onDismiss || onReturnHome) && (
          <div className="flex gap-3 w-full">
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="px-4 py-2 border-2 border-primary text-primary font-bold uppercase 
                         text-sm tracking-widest hover:bg-primary hover:text-white 
                         transition-all duration-300"
              >
                Continue Browsing
              </button>
            )}
            {onReturnHome && (
              <button
                onClick={onReturnHome}
                className="px-4 py-2 bg-vibrant text-white font-bold uppercase 
                         text-sm tracking-widest hover:shadow-lg transition-all duration-300"
              >
                Return Home
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Error state after form submission
 */
export function FormErrorState({ message }: { message: string }) {
  return (
    <div 
      className="p-4 rounded border-l-4 animate-in fade-in slide-in-from-left duration-300"
      style={{
        backgroundColor: 'var(--color-error-light)',
        borderLeftColor: 'var(--color-error)',
        color: 'var(--color-error-dark)',
      }}
    >
      <div className="flex items-start gap-3">
        <svg 
          className="w-5 h-5 mt-0.5 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="font-semibold text-sm">Error</p>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Inline validation error message
 */
export function FormValidationError({ message }: { message: string }) {
  return (
    <p 
      className="text-xs mt-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200"
      style={{ color: 'var(--color-error)' }}
    >
      <span>⚠</span>
      {message}
    </p>
  );
}

/**
 * Success indicator for valid field
 */
export function FormFieldSuccess() {
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-in fade-in duration-200">
      <svg 
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        style={{ color: 'var(--color-success)' }}
      >
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  state?: 'idle' | 'valid' | 'error';
  required?: boolean;
  hint?: string;
  maxLength?: number;
  showCharCount?: boolean;
  isTextarea?: boolean;
  rows?: number;
}

/**
 * Enhanced input field with built-in validation display
 */
export function InputField({
  label,
  name,
  error,
  state = 'idle',
  required = false,
  hint,
  maxLength,
  showCharCount = false,
  isTextarea = false,
  rows = 4,
  value = '',
  className = '',
  ...props
}: InputFieldProps) {
  const charCount = typeof value === 'string' ? value.length : 0;
  const showError = state === 'error' && error;
  const showSuccess = state === 'valid' && !error;

  const baseInputClass = [
    'w-full px-4 py-3 rounded transition-all duration-200',
    'focus:outline-none focus:ring-2',
    'font-body',
    showError && 'border-2',
    showSuccess && 'border-2',
    !showError && !showSuccess && 'border',
  ]
    .filter(Boolean)
    .join(' ');

  const inputStyle: CSSProperties = {
    backgroundColor: 'var(--form-input-bg)',
    color: 'var(--form-input-text)',
    borderColor: showError
      ? 'var(--color-error)'
      : showSuccess
      ? 'var(--color-success)'
      : 'var(--form-input-border)',
    ...props.style,
  };

  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <div className="relative">
      <label 
        htmlFor={name}
        className="block text-sm font-medium mb-2" 
        style={{ color: 'var(--text-heading)' }}
      >
        {label}
        {required && <span style={{ color: 'var(--color-error)' }}> *</span>}
      </label>

      <div className="relative">
        <InputComponent
          id={name}
          name={name}
          value={value}
          maxLength={maxLength}
          {...(isTextarea ? { rows } : {})}
          aria-invalid={state === 'error'}
          aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
          className={`${baseInputClass} ${className} ${showSuccess ? 'pr-10' : ''}`}
          style={inputStyle}
          {...props}
        />
        {showSuccess && <FormFieldSuccess />}
      </div>

      {showError && (
        <FormValidationError message={error} />
      )}

      {hint && !error && (
        <p 
          id={`${name}-hint`}
          className="text-xs mt-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          {hint}
        </p>
      )}

      {showCharCount && maxLength && (
        <p 
          className="text-xs mt-1 text-right"
          style={{ color: charCount > maxLength * 0.9 ? 'var(--color-warning)' : 'var(--text-secondary)' }}
        >
          {charCount} / {maxLength}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  state?: 'idle' | 'valid' | 'error';
  required?: boolean;
  hint?: string;
  placeholder?: string;
}

/**
 * Enhanced select field with built-in validation display
 */
export function SelectField({
  label,
  name,
  options,
  error,
  state = 'idle',
  required = false,
  hint,
  placeholder = 'Select an option...',
  value = '',
  className = '',
  ...props
}: SelectFieldProps) {
  const showError = state === 'error' && error;
  const showSuccess = state === 'valid' && !error;

  const baseSelectClass = [
    'w-full px-4 py-3 rounded transition-all duration-200',
    'focus:outline-none focus:ring-2',
    'font-body cursor-pointer',
    'bg-[var(--form-input-bg)]',
    showError && 'border-2',
    showSuccess && 'border-2',
    !showError && !showSuccess && 'border',
  ]
    .filter(Boolean)
    .join(' ');

  const selectStyle: CSSProperties = {
    backgroundColor: 'var(--form-input-bg)',
    color: 'var(--form-input-text)',
    borderColor: showError
      ? 'var(--color-error)'
      : showSuccess
      ? 'var(--color-success)'
      : 'var(--form-input-border)',
  };

  return (
    <div className="relative">
      <label 
        htmlFor={name}
        className="block text-sm font-medium mb-2" 
        style={{ color: 'var(--text-heading)' }}
      >
        {label}
        {required && <span style={{ color: 'var(--color-error)' }}> *</span>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        aria-invalid={state === 'error'}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className={`${baseSelectClass} ${className}`}
        style={selectStyle}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {showError && (
        <FormValidationError message={error} />
      )}

      {hint && !error && (
        <p 
          id={`${name}-hint`}
          className="text-xs mt-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
