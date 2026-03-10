'use client'

import { useState, FormEvent } from 'react'

interface OptInState {
  isSubmitting: boolean
  submitted: boolean
  error: string | null
}

export function BlogOptIn() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<OptInState>({
    isSubmitting: false,
    submitted: false,
    error: null,
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

      setState({ isSubmitting: false, submitted: true, error: null })
    } catch (err) {
      setState({
        isSubmitting: false,
        submitted: false,
        error: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    }
  }

  if (state.submitted) {
    return (
      <div className="blog-optin blog-optin--success">
        <p className="blog-optin-success-title">You're in. ✓</p>
        <p className="blog-optin-success-body">
          Check your inbox — the Quiet Command Starter Guide is on its way.
        </p>
      </div>
    )
  }

  return (
    <div className="blog-optin">
      <div className="blog-optin-inner">
        <div className="blog-optin-copy">
          <p className="blog-optin-eyebrow">Free for introverts</p>
          <h3 className="blog-optin-title">
            Get the Quiet Command Starter Guide
          </h3>
          <p className="blog-optin-description">
            The 5 body-aware habits that help introverts build executive presence — without performing or pretending.
          </p>
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
            {state.isSubmitting ? 'Sending…' : 'Send Me the Guide'}
          </button>

          <p className="blog-optin-disclaimer">
            No spam. Unsubscribe any time.
          </p>
        </form>
      </div>
    </div>
  )
}
