'use client'

import type { ReactNode } from 'react'

interface FormMessageProps {
  variant: 'success' | 'error'
  title?: string
  children: ReactNode
}

export default function FormMessage({ variant, title, children }: FormMessageProps) {
  return (
    <div
      className={`form-message form-message-${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {title && <p className="form-message-title">{title}</p>}
      <p className="form-message-text">{children}</p>
    </div>
  )
}
