'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { QUESTIONS, getBand, MAX_SCORE } from '@/lib/auditData'
import type { AuditBand } from '@/lib/auditData'
import type { AuditPageContent, AuditResultBand } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface AuditResult {
  score: number
  band: AuditBand
  headline: string
  body: string
}

interface AuditClientProps {
  content: AuditPageContent | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback band copy (used when Sanity doc hasn't been created yet)
// ─────────────────────────────────────────────────────────────────────────────

const BAND_CTA: Record<AuditBand, { intro: string; label: string; href: string }> = {
  foundation: {
    intro: 'The Foundation course was built for exactly where you are.',
    label: 'Enroll — starting at $197',
    href: '/foundation',
  },
  developing: {
    intro: 'A guided program will accelerate what you\'ve already built.',
    label: 'Explore Programs',
    href: '/programs',
  },
  refining: {
    intro: "You're ready for 1-on-1 work.",
    label: 'Book a Discovery Call',
    href: '/contact',
  },
}

const BAND_FALLBACKS: Record<AuditBand, { headline: string; body: string }> = {
  foundation: {
    headline: 'Building Your Foundation',
    body: "You're in the early stages of developing your presence — and that's actually a good place to start from. You know something's off, which means you're already ahead of most people who don't notice it at all. The gap between how you see yourself and how others experience you is real, but it's closeable. This is exactly what the work is for.",
  },
  developing: {
    headline: 'Developing Your Presence',
    body: "You've got something — people can feel it — but it's inconsistent. Some rooms you own, others you disappear in. That inconsistency isn't a character flaw, it's a skill gap. The fundamentals are there. What's missing is the framework to make it reliable under pressure, not just on good days.",
  },
  refining: {
    headline: 'Refining Your Edge',
    body: "You've already done a lot of the internal work. People notice you, trust you, remember you. What we'd be doing together is the fine-tuning — closing the last gap between solid and genuinely commanding. At this level, the details are everything.",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getBandContent(
  band: AuditBand,
  resultBands: AuditResultBand[] | undefined,
): { headline: string; body: string } {
  const sanityBand = resultBands?.find((b) => b.band === band)
  if (sanityBand?.headline && sanityBand?.body) {
    return { headline: sanityBand.headline, body: sanityBand.body }
  }
  return BAND_FALLBACKS[band]
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

type Stage = 'quiz' | 'capture' | 'result'

export default function AuditClient({ content }: AuditClientProps) {
  const [stage, setStage] = useState<Stage>('quiz')
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [result, setResult] = useState<AuditResult | null>(null)

  const question = QUESTIONS[currentQ]
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / QUESTIONS.length) * 100

  function selectAnswer(value: number) {
    const updated = { ...answers, [question.id]: value }
    setAnswers(updated)

    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 280)
    } else {
      setTimeout(() => setStage('capture'), 280)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setSubmitting(true)
    setSubmitError('')

    const score = Object.values(answers).reduce((a, b) => a + b, 0)
    const band = getBand(score)
    const { headline, body } = getBandContent(band, content?.resultBands)
    const auditResult: AuditResult = { score, band, headline, body }

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          type: 'presence-audit',
          message: `Presence Audit submission. Score: ${score}/${MAX_SCORE} — ${headline}`,
          auditScore: score,
          auditBand: band,
        }),
      })

      setResult(auditResult)
      setStage('result')
    } catch {
      setSubmitError('Something went wrong. Try again or email hello@jonchalant.com.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Quiz stage ──────────────────────────────────────────────────────────────
  if (stage === 'quiz') {
    return (
      <div className="audit-quiz">
        <div className="audit-progress-track">
          <div className="audit-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="audit-progress-label">
          {answeredCount} of {QUESTIONS.length}
        </p>

        <div className="audit-question-block" key={question.id}>
          <span className="audit-question-number">0{question.id}</span>
          <h2 className="audit-question-text">{question.text}</h2>

          <div className="audit-options">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                className={`audit-option${answers[question.id] === opt.value ? ' selected' : ''}`}
                onClick={() => selectAnswer(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {currentQ > 0 && (
          <button className="audit-back" onClick={() => setCurrentQ((q) => q - 1)}>
            ← Back
          </button>
        )}
      </div>
    )
  }

  // ── Capture stage ───────────────────────────────────────────────────────────
  if (stage === 'capture') {
    return (
      <div className="audit-capture">
        <div className="audit-capture-header">
          <span className="audit-capture-badge">
            {content?.captureBadge ?? 'Almost there'}
          </span>
          <h2 className="audit-capture-title">
            {content?.captureHeadline ?? 'Where should I send your results?'}
          </h2>
          <p className="audit-capture-body">
            {content?.captureBody ?? "I'll review your answers and follow up personally. No automated sequence, no sales funnel — just me reading what you shared and responding like a human."}
          </p>
        </div>

        <form className="audit-capture-form" onSubmit={handleSubmit}>
          <div className="audit-field">
            <label htmlFor="audit-name" className="audit-label">Your name</label>
            <input
              id="audit-name"
              type="text"
              className="audit-input"
              placeholder="First name is fine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="audit-field">
            <label htmlFor="audit-email" className="audit-label">Email address</label>
            <input
              id="audit-email"
              type="email"
              className="audit-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {submitError && <p className="audit-error">{submitError}</p>}

          <Button type="submit" className="audit-submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'See My Results'}
          </Button>

          <p className="audit-capture-note">
            {content?.capturePrivacyNote ?? 'No spam. Unsubscribe anytime. I take inbox trust seriously.'}
          </p>
        </form>
      </div>
    )
  }

  // ── Result stage ────────────────────────────────────────────────────────────
  if (stage === 'result' && result) {
    const pct = Math.round((result.score / MAX_SCORE) * 100)

    return (
      <div className="audit-result">
        <div className="audit-result-score-block">
          <div className="audit-score-ring">
            <svg viewBox="0 0 120 120" className="audit-score-svg">
              <circle cx="60" cy="60" r="52" className="audit-score-track" />
              <circle
                cx="60"
                cy="60"
                r="52"
                className="audit-score-arc"
                strokeDasharray={`${(pct / 100) * 326.7} 326.7`}
                strokeDashoffset="0"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="audit-score-label">
              <span className="audit-score-number">{result.score}</span>
              <span className="audit-score-denom">/{MAX_SCORE}</span>
            </div>
          </div>
        </div>

        <div className={`audit-result-band audit-band-${result.band}`}>
          {result.headline}
        </div>

        <p className="audit-result-body">{result.body}</p>

        <div className="audit-result-next">
          <h3 className="audit-result-next-heading">
            {content?.resultNextHeading ?? 'What happens next'}
          </h3>
          <p className="audit-result-next-body">
            {content?.resultNextBody ?? "I'll follow up within a couple of days — usually with a short voice note or a few specific observations based on what you shared. If it seems like a good fit to work together, I'll let you know. If not, I'll point you toward something useful anyway."}
          </p>
        </div>

        <div className="audit-result-cta">
          <p className="audit-result-cta-text">
            {BAND_CTA[result.band].intro}
          </p>
          <Button as="a" href={BAND_CTA[result.band].href}>
            {BAND_CTA[result.band].label}
          </Button>
        </div>
      </div>
    )
  }

  return null
}
