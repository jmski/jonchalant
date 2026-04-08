'use client'

import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  id: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}

export default function FormField({
  label,
  id,
  required,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="form-section">
      <label htmlFor={id} className="form-label">
        {label}{required && ' *'}
      </label>
      {children}
      {hint && <p className="form-field-hint">{hint}</p>}
      {error && <p className="form-field-error" role="alert">{error}</p>}
    </div>
  )
}
