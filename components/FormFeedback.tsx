import { ReactNode } from 'react';

interface FormFeedbackProps {
  type: 'loading' | 'success' | 'error';
  message: string;
}

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

export function FormSuccessState({ message }: { message: string }) {
  return (
    <div 
      className="p-4 rounded border-l-4 animate-in fade-in slide-in-from-left duration-300"
      style={{
        backgroundColor: 'var(--color-success-light)',
        borderLeftColor: 'var(--color-success)',
        color: 'var(--color-success-dark)',
      }}
    >
      <div className="flex items-start gap-3">
        <svg 
          className="w-5 h-5 mt-0.5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="font-semibold text-sm">Success!</p>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}

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
          className="w-5 h-5 mt-0.5 flex-shrink-0"
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

export function FormValidationError({ message }: { message: string }) {
  return (
    <p 
      className="text-xs mt-1 flex items-center gap-1"
      style={{ color: 'var(--color-error)' }}
    >
      <span>⚠</span>
      {message}
    </p>
  );
}
