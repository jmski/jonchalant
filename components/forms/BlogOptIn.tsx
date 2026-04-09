'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { FormMessage } from '@/components/ui/FormMessage'
import { useFormSubmission } from '@/lib/hooks'
import type { EmailOptInContent } from '@/lib/types'

const STORAGE_KEY = 'jonchalant_subscribed'

interface BlogOptInProps {
  optIn?: EmailOptInContent | null
  variant?: 'blog' | 'footer'
}

export function BlogOptIn({ optIn, variant = 'blog' }: BlogOptInProps) {
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

  if (variant === 'footer') {
    if (state.submitted) {
      return (
        <div className="site-footer-optin-inner">
          <div className="site-footer-optin-success">
            <span className="site-footer-optin-success-icon">✓</span>
            {optIn?.successTitle && (
              <p className="site-footer-optin-success-title">{optIn.successTitle}</p>
            )}
            {optIn?.successBody && (
              <p className="site-footer-optin-success-body">{optIn.successBody}</p>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="site-footer-optin-inner">
        <div className="site-footer-optin-copy">
          {optIn?.eyebrow && (
            <span className="site-footer-optin-eyebrow">{optIn.eyebrow}</span>
          )}
          {optIn?.heading && (
            <h3 className="site-footer-optin-title">{optIn.heading}</h3>
          )}
          {optIn?.description && (
            <p className="site-footer-optin-description">{optIn.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="site-footer-optin-form" noValidate>
          <div className="site-footer-optin-fields">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
              autoComplete="given-name"
              className="site-footer-optin-input"
              disabled={state.isSubmitting}
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="site-footer-optin-input"
              disabled={state.isSubmitting}
            />
            <Button
              type="submit"
              disabled={state.isSubmitting}
            >
              {state.isSubmitting ? 'Sending…' : (optIn?.submitButtonText ?? 'Subscribe')}
            </Button>
          </div>
          {state.error && (
            <p className="site-footer-optin-error" role="alert">{state.error}</p>
          )}
        </form>
      </div>
    )
  }

  // blog variant (default)
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
            <FormField label="First name" id="optin-firstname">
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
                placeholder="you@company.com"
                required
                autoComplete="email"
                className="form-input"
              />
            </FormField>
          </div>

          {state.error && (
            <FormMessage variant="error">{state.error}</FormMessage>
          )}

          <Button
            type="submit"
            disabled={state.isSubmitting}
          >
            {state.isSubmitting ? 'Sending…' : (optIn?.submitButtonText ?? 'Subscribe')}
          </Button>

          {optIn?.disclaimer && (
            <p className="blog-optin-disclaimer">{optIn.disclaimer}</p>
          )}
        </form>
      </div>
    </div>
  )
}
