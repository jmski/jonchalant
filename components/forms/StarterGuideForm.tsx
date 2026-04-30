'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { StarterGuideCapture } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// StarterGuideForm
//
// Shared starter-guide capture used on audit + foundation (and migrated onto
// home + ikigai in step 4). Reuses the existing email-capture-* CSS so it
// inherits the same visual treatment as the newsletter form until starter-guide
// specific styles land in the polish phase.
// ─────────────────────────────────────────────────────────────────────────────

interface StarterGuideFormProps {
  guide: StarterGuideCapture | null | undefined
  successMessage?: string
}

const FALLBACK = {
  eyebrow: 'Starter Guide',
  headline: 'Get the Foundation Starter Guide',
  body: 'A short PDF outlining the four pillars of embodied presence — and where most people start.',
  firstNamePlaceholder: 'First name',
  emailPlaceholder: 'your@email.com',
  submitLabel: 'Send me the guide',
  success: 'Check your inbox — the guide is on its way.',
}

export function StarterGuideForm({ guide, successMessage }: StarterGuideFormProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const eyebrow = guide?.eyebrow ?? FALLBACK.eyebrow
  const headline = guide?.headline ?? FALLBACK.headline
  const body = guide?.body ?? FALLBACK.body
  const firstNamePlaceholder = guide?.firstNamePlaceholder ?? FALLBACK.firstNamePlaceholder
  const emailPlaceholder = guide?.emailPlaceholder ?? FALLBACK.emailPlaceholder
  const submitLabel = guide?.submitLabel ?? FALLBACK.submitLabel
  const success = successMessage ?? FALLBACK.success

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: Wire to a real starter-guide endpoint. No backend exists yet.
    // Matches existing useFormSubmission convention used by EmailCapture
    // (see components/sections/home/email-capture/EmailCapture.tsx) — swap the
    // placeholder for `useFormSubmission({ endpoint: '/api/starter-guide' })`
    // once the API route lands.
    console.log('[StarterGuideForm] submit', { firstName, email })
    setSubmitted(true)
  }

  return (
    <section className="email-capture-section starter-guide-form">
      <div className="email-capture-inner">
        <div className="email-capture-copy">
          {eyebrow && <span className="email-capture-eyebrow">{eyebrow}</span>}
          <h2 className="email-capture-heading">{headline}</h2>
          {body && <p className="email-capture-subheading">{body}</p>}
        </div>

        {submitted ? (
          <div className="email-capture-success">
            <p className="email-capture-success-message">{success}</p>
          </div>
        ) : (
          <form className="email-capture-form starter-guide-form-fields" onSubmit={handleSubmit} noValidate>
            <div className="email-capture-field-group starter-guide-form-row">
              <input
                type="text"
                className="email-capture-input starter-guide-input"
                placeholder={firstNamePlaceholder}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                aria-label="First name"
              />
              <input
                type="email"
                className="email-capture-input starter-guide-input"
                placeholder={emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <Button type="submit">{submitLabel}</Button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

export default StarterGuideForm
