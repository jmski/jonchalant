'use client'

import type { CSSProperties, FormEvent, KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FormMessage } from '@/components/ui/FormMessage'
import { KineticHeading } from '@/components/typography/KineticHeading'
import { useMultiStep } from '@/lib/hooks'
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

const BAND_SUMMARY: Record<AuditBand, string> = {
  foundation:
    'Your score shows strong self-awareness and a clear starting point. The fastest gains now come from body-led fundamentals you can repeat under pressure.',
  developing:
    'Your score reflects real momentum. You are already showing up with intent, and the next step is making your presence consistently reliable in high-stakes moments.',
  refining:
    'Your score places you in advanced territory. This stage is less about basics and more about precision, range, and the final details people remember.',
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

export default function AuditClient({ content }: AuditClientProps) {
  const { currentStep, goTo } = useMultiStep({ steps: ['quiz', 'capture', 'result'] })
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [result, setResult] = useState<AuditResult | null>(null)
  const questionFocusRef = useRef<HTMLDivElement>(null)

  const question = QUESTIONS[currentQ]
  const answeredCount = QUESTIONS.filter((item) => answers[item.id] !== undefined).length
  const progress = (answeredCount / QUESTIONS.length) * 100
  const currentAnswer = answers[question.id]
  const isLastQuestion = currentQ === QUESTIONS.length - 1

  useEffect(() => {
    if (currentStep !== 'quiz') return

    const timeoutId = window.setTimeout(() => {
      questionFocusRef.current?.focus()
    }, 32)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [currentQ, currentStep])

  function transitionQuestion(action: () => void) {
    if (isTransitioning) return
    setIsTransitioning(true)

    window.setTimeout(() => {
      action()
      setIsTransitioning(false)
    }, 200)
  }

  function selectAnswer(value: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function handleNextQuestion() {
    if (currentAnswer === undefined) return

    if (isLastQuestion) {
      transitionQuestion(() => goTo('capture'))
    } else {
      transitionQuestion(() => setCurrentQ((q) => q + 1))
    }
  }

  function handlePreviousQuestion() {
    if (currentQ === 0) return
    transitionQuestion(() => setCurrentQ((q) => q - 1))
  }

  function handleQuizKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleNextQuestion()
    }

    if (event.key === 'Tab' && event.shiftKey && currentQ > 0) {
      event.preventDefault()
      handlePreviousQuestion()
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !email.trim()) return

    setSubmitting(true)
    setSubmitError('')

    const score = Object.values(answers).reduce((a, b) => a + b, 0)
    const band = getBand(score)
    const { headline, body } = getBandContent(band, content?.resultBands)
    const auditResult: AuditResult = { score, band, headline, body }

    try {
      const response = await fetch('/api/inquiries', {
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

      if (!response.ok) {
        throw new Error('Failed to submit audit inquiry')
      }

      setResult(auditResult)
      goTo('result')
    } catch {
      setSubmitError('Something went wrong. Try again or email hello@jonchalant.com.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Quiz stage ──────────────────────────────────────────────────────────────
  if (currentStep === 'quiz') {
    return (
      <div className="audit-quiz" onKeyDown={handleQuizKeyDown}>
        <div
          className="audit-progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={QUESTIONS.length}
          aria-valuenow={answeredCount}
          aria-label="Audit progress"
        >
          <div className="audit-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className={`audit-question-shell${isTransitioning ? ' is-leaving' : ''}`} key={question.id}>
          <fieldset className="audit-question-fieldset">
            <legend className="sr-only">Question {currentQ + 1} of {QUESTIONS.length}</legend>

            <span className="audit-question-number">
              {String(currentQ + 1).padStart(2, '0')}
            </span>

            <div ref={questionFocusRef} tabIndex={-1} className="audit-question-focus-target">
              <KineticHeading as="h2" className="audit-question-text" key={`q-${question.id}`}>
                {question.text}
              </KineticHeading>
            </div>

            <div className="audit-options">
              {question.options.map((opt, optionIndex) => (
                <button
                  type="button"
                  key={opt.value}
                  className={`audit-option${currentAnswer === opt.value ? ' selected' : ''}`}
                  onClick={() => selectAnswer(opt.value)}
                  style={{ '--option-index': optionIndex } as CSSProperties}
                  disabled={isTransitioning}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="audit-navigation">
            <button
              type="button"
              className="audit-nav-back"
              onClick={handlePreviousQuestion}
              disabled={currentQ === 0 || isTransitioning}
            >
              Back
            </button>

            <button
              type="button"
              className="audit-nav-next"
              onClick={handleNextQuestion}
              disabled={currentAnswer === undefined || isTransitioning}
            >
              {isLastQuestion ? 'Continue' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Capture stage ───────────────────────────────────────────────────────────
  if (currentStep === 'capture') {
    return (
      <div className="audit-capture">
        <div className="audit-capture-header">
          <span className="audit-capture-badge">
            {content?.captureBadge ?? 'Almost there'}
          </span>
          <KineticHeading as="h2" className="audit-capture-title">
            {content?.captureHeadline ?? 'Where should I send your results?'}
          </KineticHeading>
          <p className="audit-capture-body">
            {content?.captureBody ?? "I'll review your answers and follow up personally. No automated sequence, no sales funnel — just me reading what you shared and responding like a human."}
          </p>
        </div>

        <form className="audit-capture-form" onSubmit={handleSubmit}>
          <div className="audit-floating-field">
            <input
              id="audit-name"
              type="text"
              className="audit-input"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="audit-name">Your name</label>
          </div>

          <div className="audit-floating-field">
            <input
              id="audit-email"
              type="email"
              className="audit-input"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="audit-email">Email address</label>
          </div>

          {submitError && (
            <FormMessage variant="error">{submitError}</FormMessage>
          )}

          <div className="audit-navigation">
            <button
              type="button"
              className="audit-nav-back"
              onClick={() => goTo('quiz')}
              disabled={submitting}
            >
              Back
            </button>
            <Button type="submit" className="audit-nav-next audit-submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'See My Results'}
            </Button>
          </div>

          <p className="audit-capture-note">
            {content?.capturePrivacyNote ?? 'No spam. Unsubscribe anytime. I take inbox trust seriously.'}
          </p>
        </form>
      </div>
    )
  }

  // ── Result stage ────────────────────────────────────────────────────────────
  if (currentStep === 'result' && result) {
    const pct = Math.round((result.score / MAX_SCORE) * 100)
    const ctaText = content?.resultCtaText ?? BAND_SUMMARY[result.band]
    const ctaLabel = content?.resultCtaButtonLabel ?? 'Book a Discovery Call'
    const ctaHref = content?.resultCtaHref ?? '/contact'

    return (
      <div className="audit-result">
        <div className="audit-result-score-block" aria-hidden="true">
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

        <KineticHeading as="h2" className={`audit-result-band audit-band-${result.band}`}>
          {result.headline}
        </KineticHeading>

        <p className="audit-result-summary">You scored {result.score}/{MAX_SCORE} ({pct}%).</p>

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
            {ctaText}
          </p>
          <Button as="a" href={ctaHref}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    )
  }

  return null
}
