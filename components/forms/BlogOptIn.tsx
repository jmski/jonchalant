'use client'

import { useState, useEffect } from 'react'
import type { EmailOptInContent } from '@/lib/types'

const STORAGE_KEY = 'jonchalant_subscribed'

interface OptInState {
  isSubmitting: boolean
  submitted: boolean
  error: string | null
}

interface BlogOptInProps {
  optIn?: EmailOptInContent | null
}

export function BlogOptIn({ optIn }: BlogOptInProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)
  const [state, setState] = useState<OptInState>({
    isSubmitting: false,
    submitted: false,
    error: null,
  })

  // Check localStorage on mount — hide form if already subscribed
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true') {
      setAlreadySubscribed(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState({ isSubmitting: true, submitted: false, error: null })

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe')
      }

      localStorage.setItem(STORAGE_KEY, 'true')
      setState({ isSubmitting: false, submitted: true, error: null })
    } catch (err) {
      setState({
        isSubmitting: false,
        submitted: false,
        error: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    }
  }

  if (alreadySubscribed) {
    return null
  }

  if (state.submitted) {
    return (
      <div className="blog-optin blog-optin--success">
        {optIn?.successTitle && (
          <p className="blog-optin-success-title">{optIn.successTitle}</p>
        )}
        {optIn?.successBody && (
          <p className="blog-optin-success-body">{optIn.successBody}</p>
        )}
      </div>
    )
  }

  return (
    <div className="blog-optin">
      <div className="blog-optin-inner">
        <div className="blog-optin-copy">
          {optIn?.eyebrow && (
            <p className="blog-optin-eyebrow">{optIn.eyebrow}</p>
          )}
          {optIn?.heading && (
            <h3 className="blog-optin-title">{optIn.heading}</h3>
          )}
          {optIn?.description && (
            <p className="blog-optin-description">{optIn.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="blog-optin-form">
          <div className="blog-optin-fields">
            <div className="blog-optin-field">
              <label htmlFor="optin-firstname" className="blog-optin-label">
                First name
              </label>
              <input
                id="optin-firstname"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                required
                autoComplete="given-name"
                className="form-input"
              />
            </div>
            <div className="blog-optin-field">
              <label htmlFor="optin-email" className="blog-optin-label">
                Email
              </label>
              <input
                id="optin-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
                className="form-input"
              />
            </div>
          </div>

          {state.error && (
            <p className="blog-optin-error" role="alert">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={state.isSubmitting}
            className="form-submit blog-optin-submit"
          >
            {state.isSubmitting ? 'Sending…' : (optIn?.submitButtonText ?? 'Subscribe')}
          </button>

          {optIn?.disclaimer && (
            <p className="blog-optin-disclaimer">{optIn.disclaimer}</p>
          )}
        </form>
      </div>
    </div>
  )
}
