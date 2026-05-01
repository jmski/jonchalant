'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { FormMessage } from '@/components/ui/FormMessage'
import { useFormSubmission } from '@/lib/hooks'
import type { PageContact, InquiryCard } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type InquiryType = 'oneOnOne' | 'general' | null

interface FormState {
  name: string
  email: string
  message: string
}

interface ContactClientProps {
  content: PageContact | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallbacks
// ─────────────────────────────────────────────────────────────────────────────

const FALLBACK_INQUIRY_CARDS: InquiryCard[] = [
  {
    eyebrow: '1-on-1 Coaching',
    body: 'I want to work with Jon directly.',
    inquiryType: 'oneOnOne',
  },
  {
    eyebrow: 'General Question',
    body: 'I have something else on my mind.',
    inquiryType: 'general',
  },
]

const FALLBACK_NEXT_STEPS = [
  { title: 'Submit your inquiry', body: 'Takes 2 minutes. No prep needed.' },
  { title: 'We schedule a 15-min call', body: "I'll reach out within 2–3 business days to find a time." },
  { title: 'We build your custom plan', body: 'Together we map out the right path forward for you.' },
]

const FALLBACK_THINGS_WORTH_KNOWING = [
  { title: "I don't do pressure.", body: "If you reach out, I'm not going to chase you down. Take your time." },
  { title: 'I work with individuals, not committees.', body: "If you're the one who wants to change, this is for you — not your boss who thinks you need coaching." },
  { title: 'Spots are limited.', body: "I keep my 1-on-1 client load intentionally small. If you're on the fence, sooner is better." },
]

// ─────────────────────────────────────────────────────────────────────────────
// Contact form (shared between inquiry types)
// ─────────────────────────────────────────────────────────────────────────────

interface ContactFormProps {
  idPrefix: string
  form: FormState
  onField: (field: keyof FormState, value: string) => void
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
  isSubmitting: boolean
  error: string | null
  messagePlaceholder: string
  submitLabel: string
}

function ContactForm({
  idPrefix,
  form,
  onField,
  onSubmit,
  isSubmitting,
  error,
  messagePlaceholder,
  submitLabel,
}: ContactFormProps) {
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <FormField label="Your name" id={`contact-name-${idPrefix}`} required>
        <input
          id={`contact-name-${idPrefix}`}
          type="text"
          className="contact-input"
          value={form.name}
          onChange={(e) => onField('name', e.target.value)}
          placeholder="First name is fine"
          required
        />
      </FormField>
      <FormField label="Email address" id={`contact-email-${idPrefix}`} required>
        <input
          id={`contact-email-${idPrefix}`}
          type="email"
          className="contact-input"
          value={form.email}
          onChange={(e) => onField('email', e.target.value)}
          placeholder="you@example.com"
          required
        />
      </FormField>
      <FormField label="What's on your mind?" id={`contact-message-${idPrefix}`} required>
        <textarea
          id={`contact-message-${idPrefix}`}
          className="contact-textarea"
          rows={5}
          value={form.message}
          onChange={(e) => onField('message', e.target.value)}
          placeholder={messagePlaceholder}
          required
        />
      </FormField>
      {error && <FormMessage variant="error">{error}</FormMessage>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : submitLabel}
      </Button>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactClient({ content }: ContactClientProps) {
  const [inquiryType, setInquiryType] = useState<InquiryType>(null)
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })

  const { state, submit } = useFormSubmission({
    endpoint: '/api/inquiries',
    transform: (data: FormState) => ({
      ...data,
      type: inquiryType === 'oneOnOne' ? '1-on-1-coaching' : 'general',
    }),
  })

  const inquiryCards = content?.inquiryCards?.length ? content.inquiryCards : FALLBACK_INQUIRY_CARDS
  const nextSteps = content?.whatHappensNextSteps?.length ? content.whatHappensNextSteps : FALLBACK_NEXT_STEPS
  const thingsItems = content?.thingsWorthKnowingItems?.length
    ? content.thingsWorthKnowingItems
    : FALLBACK_THINGS_WORTH_KNOWING

  function handleField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    submit(form)
  }

  // ── Success state ───────────────────────────────────────────────────────────
  if (state.submitted) {
    const fallbackLine = content?.emailFallback?.bodyLine
    return (
      <div className="contact-success">
        <div className="contact-success-icon">✓</div>
        <h2 className="contact-success-title">Got it.</h2>
        <p className="contact-success-body">
          {fallbackLine ?? (
            <>
              I&apos;ll read this and get back to you within 2–3 business days. If it&apos;s urgent, email me directly at{' '}
              <a href="mailto:hello@jonchalant.com" className="contact-inline-link">
                hello@jonchalant.com
              </a>
              .
            </>
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="contact-client">

      {/* ── Audit-first hero card ─────────────────────────────────────────── */}
      {content?.hero && (
        <section className="contact-audit-prompt">
          <div className="contact-audit-prompt-inner">
            <div className="contact-audit-prompt-text">
              {content.hero.eyebrow && <span className="contact-audit-badge">{content.hero.eyebrow}</span>}
              <h1 className="contact-audit-title">{content.hero.headline}</h1>
              {content.hero.subhead && <p className="contact-audit-body">{content.hero.subhead}</p>}
              {content.hero.primaryCta?.href && content.hero.primaryCta?.label && (
                <div className="contact-audit-btn">
                  <Button as="link" href={content.hero.primaryCta.href}>
                    {content.hero.primaryCta.label}
                  </Button>
                </div>
              )}
              {content.hero.microcopy && (
                <p className="contact-audit-note">{content.hero.microcopy}</p>
              )}
            </div>
            {content.heroStats && content.heroStats.length > 0 && (
              <ul className="contact-audit-prompt-aside">
                {content.heroStats.map((stat, i) => (
                  <li key={i} className="contact-audit-stat">
                    <span className="contact-audit-stat-number">{stat.value}</span>
                    <span className="contact-audit-stat-label">{stat.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ── Direct contact split ──────────────────────────────────────────── */}
      <div className="contact-divider">
        <span className="contact-divider-text">or reach out directly</span>
      </div>

      {/* ── Inquiry type selector ─────────────────────────────────────────── */}
      <div className="contact-form-section">
        <h2 className="contact-form-heading">What&apos;s on your mind?</h2>

        <div className="contact-type-selector">
          {inquiryCards.map((card) => (
            <button
              key={card.inquiryType}
              className={`contact-type-btn${inquiryType === card.inquiryType ? ' selected' : ''}`}
              onClick={() => setInquiryType(card.inquiryType)}
            >
              <span className="contact-type-btn-title">{card.eyebrow}</span>
              <span className="contact-type-btn-sub">{card.body}</span>
            </button>
          ))}
        </div>

        {inquiryType && (
          <ContactForm
            idPrefix={inquiryType === 'oneOnOne' ? 'c' : 'q'}
            form={form}
            onField={handleField}
            onSubmit={handleSubmit}
            isSubmitting={state.isSubmitting}
            error={state.error}
            messagePlaceholder={
              inquiryType === 'oneOnOne'
                ? "What's the situation? Where are you stuck? What made you reach out today?"
                : 'Ask away.'
            }
            submitLabel={inquiryType === 'oneOnOne' ? 'Send Message' : 'Send It'}
          />
        )}
      </div>

      {/* ── What happens next ─────────────────────────────────────────────── */}
      <div className="contact-next-steps">
        <h3 className="contact-next-steps-heading">
          {content?.whatHappensNextHeader ?? 'What happens next'}
        </h3>
        <ol className="contact-next-steps-list">
          {nextSteps.map((step, i) => (
            <li key={i} className="contact-next-step">
              <span className="contact-next-step-number">{i + 1}</span>
              <div className="contact-next-step-body">
                <strong className="contact-next-step-title">{step.title}</strong>
                <span className="contact-next-step-desc">{step.body}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Things worth knowing ──────────────────────────────────────────── */}
      <div className="contact-sidebar-notes">
        <h3 className="contact-sidebar-heading">
          {content?.thingsWorthKnowingHeader ?? 'A few things worth knowing'}
        </h3>
        <ul className="contact-sidebar-list">
          {thingsItems.map((item, i) => (
            <li key={i} className="contact-sidebar-item">
              <span className="contact-sidebar-item-title">{item.title}</span>
              {' '}{item.body}
            </li>
          ))}
        </ul>
        {content?.emailFallback?.bodyLine && (
          <p className="contact-sidebar-email">{content.emailFallback.bodyLine}</p>
        )}
      </div>

    </div>
  )
}
