'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { ContactPageContent } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type InquiryType = 'coaching' | 'question' | null

interface FormState {
  name: string
  email: string
  message: string
}

interface ContactClientProps {
  content: ContactPageContent | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallbacks
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_AUDIT_STATS = [
  { number: '7', label: 'questions' },
  { number: '3', label: 'minutes' },
  { number: '1', label: 'honest reply from Jon' },
]

const DEFAULT_SIDEBAR_ITEMS = [
  {
    title: "I don't do pressure.",
    body: "If you reach out, I'm not going to chase you down. Take your time.",
  },
  {
    title: 'I work with individuals, not committees.',
    body: "If you're the one who wants to change, this is for you — not your boss who thinks you need coaching.",
  },
  {
    title: 'Spots are limited.',
    body: "I keep my 1-on-1 client load intentionally small. If you're on the fence, sooner is better.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactClient({ content }: ContactClientProps) {
  const [inquiryType, setInquiryType] = useState<InquiryType>(null)
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const auditStats = content?.auditStats?.length ? content.auditStats : DEFAULT_AUDIT_STATS
  const sidebarItems = content?.sidebarItems?.length ? content.sidebarItems : DEFAULT_SIDEBAR_ITEMS

  function handleField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          type: inquiryType === 'coaching' ? '1-on-1-coaching' : 'general',
        }),
      })

      if (!res.ok) throw new Error('Submit failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Try again or email hello@jonchalant.com directly.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="contact-success">
        <div className="contact-success-icon">✓</div>
        <h2 className="contact-success-title">Got it.</h2>
        <p className="contact-success-body">
          I&apos;ll read this and get back to you within 2–3 business days. If it&apos;s urgent, email me directly at{' '}
          <a href="mailto:hello@jonchalant.com" className="contact-inline-link">
            hello@jonchalant.com
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="contact-client">

      {/* ── Primary CTA: Audit ─────────────────────────────────────────────── */}
      <div className="contact-audit-prompt">
        <div className="contact-audit-prompt-inner">
          <div className="contact-audit-prompt-text">
            <span className="contact-audit-badge">
              {content?.auditPromptBadge ?? 'Start here'}
            </span>
            <h2 className="contact-audit-title">
              {content?.auditPromptHeadline ?? 'Not sure where to start?'}
            </h2>
            <p className="contact-audit-body">
              {content?.auditPromptBody ?? "Take the Presence Audit first. Seven questions, three minutes. I'll review your answers and follow up personally with something actually useful — not a generic drip sequence."}
            </p>
            <Button as="link" href="/audit" className="contact-audit-btn">
              {content?.auditPromptButtonText ?? 'Take the Presence Audit'}
            </Button>
            <p className="contact-audit-note">
              {content?.auditPromptNote ?? 'No account needed. Free.'}
            </p>
          </div>
          <div className="contact-audit-prompt-aside">
            {auditStats.map((stat, i) => (
              <div key={i} className="contact-audit-stat">
                <span className="contact-audit-stat-number">{stat.number}</span>
                <span className="contact-audit-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div className="contact-divider">
        <span className="contact-divider-text">or reach out directly</span>
      </div>

      {/* ── Inquiry type selector ──────────────────────────────────────────── */}
      <div className="contact-form-section">
        <h2 className="contact-form-heading">What&apos;s on your mind?</h2>

        <div className="contact-type-selector">
          <button
            className={`contact-type-btn${inquiryType === 'coaching' ? ' selected' : ''}`}
            onClick={() => setInquiryType('coaching')}
          >
            <span className="contact-type-btn-title">1-on-1 Coaching</span>
            <span className="contact-type-btn-sub">I want to work with Jon directly</span>
          </button>
          <button
            className={`contact-type-btn${inquiryType === 'question' ? ' selected' : ''}`}
            onClick={() => setInquiryType('question')}
          >
            <span className="contact-type-btn-title">General Question</span>
            <span className="contact-type-btn-sub">I have something else on my mind</span>
          </button>
        </div>

        {/* ── Coaching path ──────────────────────────────────────────────────── */}
        {inquiryType === 'coaching' && (
          <div className="contact-coaching-path">
            <div className="contact-coaching-prompt">
              <h3 className="contact-coaching-prompt-title">
                {content?.coachingPathHeading ?? 'Book a Discovery Call'}
              </h3>
              <p className="contact-coaching-prompt-body">
                {content?.coachingPathBody ?? "The first step is a 20-minute call. No prep needed — just show up and tell me what's going on. We'll figure out together if this is a good fit."}
              </p>
              {content?.coachingCalendlyHref ? (
                <>
                  <Button
                    as="a"
                    href={content.coachingCalendlyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.coachingCalendlyLabel ?? 'Schedule a Call'}
                  </Button>
                  <p className="contact-coaching-note">
                    Not ready to book yet? Use the form below instead.
                  </p>
                </>
              ) : (
                <p className="contact-coaching-note">
                  Online booking coming soon — use the form below to get in touch.
                </p>
              )}
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact-input"
                  value={form.name}
                  onChange={(e) => handleField('name', e.target.value)}
                  placeholder="First name is fine"
                  required
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-label">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-input"
                  value={form.email}
                  onChange={(e) => handleField('email', e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message" className="contact-label">What&apos;s going on?</label>
                <textarea
                  id="contact-message"
                  className="contact-textarea"
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleField('message', e.target.value)}
                  placeholder="What's the situation? Where are you stuck? What made you reach out today?"
                  required
                />
              </div>
              {error && <p className="contact-error">{error}</p>}
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </div>
        )}

        {/* ── General question path ──────────────────────────────────────────── */}
        {inquiryType === 'question' && (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="contact-name-q" className="contact-label">Your name</label>
              <input
                id="contact-name-q"
                type="text"
                className="contact-input"
                value={form.name}
                onChange={(e) => handleField('name', e.target.value)}
                placeholder="First name is fine"
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email-q" className="contact-label">Email address</label>
              <input
                id="contact-email-q"
                type="email"
                className="contact-input"
                value={form.email}
                onChange={(e) => handleField('email', e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message-q" className="contact-label">What&apos;s on your mind?</label>
              <textarea
                id="contact-message-q"
                className="contact-textarea"
                rows={5}
                value={form.message}
                onChange={(e) => handleField('message', e.target.value)}
                placeholder="Ask away."
                required
              />
            </div>
            {error && <p className="contact-error">{error}</p>}
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send It'}
            </Button>
            <p className="contact-form-note">
              I read every message. You&apos;ll hear back within 2–3 business days.
            </p>
          </form>
        )}
      </div>

      {/* ── What happens next ─────────────────────────────────────────────── */}
      <div className="contact-next-steps">
        <h3 className="contact-next-steps-heading">What happens next</h3>
        <ol className="contact-next-steps-list">
          <li className="contact-next-step">
            <span className="contact-next-step-number">1</span>
            <div className="contact-next-step-body">
              <strong className="contact-next-step-title">Submit your inquiry</strong>
              <span className="contact-next-step-desc">Takes 2 minutes. No prep needed.</span>
            </div>
          </li>
          <li className="contact-next-step">
            <span className="contact-next-step-number">2</span>
            <div className="contact-next-step-body">
              <strong className="contact-next-step-title">We schedule a 15-min call</strong>
              <span className="contact-next-step-desc">I'll reach out within 2–3 business days to find a time.</span>
            </div>
          </li>
          <li className="contact-next-step">
            <span className="contact-next-step-number">3</span>
            <div className="contact-next-step-body">
              <strong className="contact-next-step-title">We build your custom plan</strong>
              <span className="contact-next-step-desc">Together we map out the right path forward for you.</span>
            </div>
          </li>
        </ol>
      </div>

      {/* ── Sidebar notes ──────────────────────────────────────────────────── */}
      <div className="contact-sidebar-notes">
        <h3 className="contact-sidebar-heading">
          {content?.sidebarHeading ?? 'A few things worth knowing'}
        </h3>
        <ul className="contact-sidebar-list">
          {sidebarItems.map((item, i) => (
            <li key={i} className="contact-sidebar-item">
              <span className="contact-sidebar-item-title">{item.title}</span>
              {' '}{item.body}
            </li>
          ))}
        </ul>
        <p className="contact-sidebar-email">
          {content?.sidebarEmailText ?? (
            <>
              Prefer email?{' '}
              <a href="mailto:hello@jonchalant.com" className="contact-inline-link">
                hello@jonchalant.com
              </a>
              {' '}— I check it daily, minus weekends when I&apos;m wrangling three kids and pretending to relax.
            </>
          )}
        </p>
      </div>

    </div>
  )
}
