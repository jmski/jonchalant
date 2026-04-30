'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { FormMessage } from '@/components/ui/FormMessage'
import { useFormSubmission } from '@/lib/hooks'
import type { NewsletterCapture } from '@/lib/types'

const STORAGE_KEY = 'jonchalant_subscribed'

interface BlogOptInProps {
  newsletter?: NewsletterCapture | null
  successMessage?: string
  variant?: 'blog' | 'footer'
}

export function BlogOptIn({ newsletter, successMessage, variant = 'blog' }: BlogOptInProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  const { state, submit } = useFormSubmission({
    endpoint: '/api/subscribe',
    onSuccess: () => {
      localStorage.setItem(STORAGE_KEY, 'true')
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true') {
      setAlreadySubscribed(true)
    }
  }, [])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit({ firstName, email })
  }

  if (alreadySubscribed) return null

  const submitLabel = newsletter?.submitLabel ?? 'Subscribe'
  const successCopy = successMessage ?? "You're in. Watch your inbox."

  if (variant === 'footer') {
    if (state.submitted) {
      return (
        <div className="jc-footer-optin-inner">
          <div className="jc-footer-optin-success">
            <span className="jc-footer-optin-success-icon">✓</span>
            <p className="jc-footer-optin-success-body">{successCopy}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="jc-footer-optin-inner">
        <div className="jc-footer-optin-copy">
          {newsletter?.eyebrow && (
            <span className="jc-footer-optin-eyebrow">{newsletter.eyebrow}</span>
          )}
          {newsletter?.headline && (
            <h3 className="jc-footer-optin-title">{newsletter.headline}</h3>
          )}
          {newsletter?.subhead && (
            <p className="jc-footer-optin-description">{newsletter.subhead}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="jc-footer-optin-form" noValidate>
          <div className="jc-footer-optin-fields">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
              autoComplete="given-name"
              className="jc-footer-optin-input"
              disabled={state.isSubmitting}
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={newsletter?.emailPlaceholder ?? 'your@email.com'}
              required
              autoComplete="email"
              className="jc-footer-optin-input"
              disabled={state.isSubmitting}
            />
            <Button type="submit" disabled={state.isSubmitting}>
              {state.isSubmitting ? 'Sending…' : submitLabel}
            </Button>
          </div>
          {state.error && (
            <p className="jc-footer-optin-error" role="alert">{state.error}</p>
          )}
        </form>
      </div>
    )
  }

  // blog variant (default)
  if (state.submitted) {
    return (
      <div className="blog-optin blog-optin--success">
        <p className="blog-optin-success-body">{successCopy}</p>
      </div>
    )
  }

  return (
    <div className="blog-optin">
      <div className="blog-optin-inner">
        <div className="blog-optin-copy">
          {newsletter?.eyebrow && (
            <p className="blog-optin-eyebrow">{newsletter.eyebrow}</p>
          )}
          {newsletter?.headline && (
            <h3 className="blog-optin-title">{newsletter.headline}</h3>
          )}
          {newsletter?.subhead && (
            <p className="blog-optin-description">{newsletter.subhead}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="blog-optin-form">
          <div className="blog-optin-fields">
            <FormField label={newsletter?.emailLabel ?? 'First name'} id="optin-firstname">
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
            </FormField>
            <FormField label="Email" id="optin-email">
              <input
                id="optin-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletter?.emailPlaceholder ?? 'you@company.com'}
                required
                autoComplete="email"
                className="form-input"
              />
            </FormField>
          </div>

          {state.error && (
            <FormMessage variant="error">{state.error}</FormMessage>
          )}

          <Button type="submit" disabled={state.isSubmitting}>
            {state.isSubmitting ? 'Sending…' : submitLabel}
          </Button>

          {newsletter?.microcopy && (
            <p className="blog-optin-disclaimer">{newsletter.microcopy}</p>
          )}
        </form>
      </div>
    </div>
  )
}
