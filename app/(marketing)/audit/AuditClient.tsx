'use client'

import type { CSSProperties, KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { KineticHeading } from '@/components/typography/KineticHeading'
import { StarterGuideForm } from '@/components/forms/StarterGuideForm'
import { useMultiStep } from '@/lib/hooks'
import { QUESTIONS, getBand, MAX_SCORE } from '@/lib/auditData'
import type { AuditBand as LegacyBand } from '@/lib/auditData'
import type { PageAudit, AuditBand } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type BandKey = 'low' | 'mid' | 'high'

interface AuditClientProps {
  content: PageAudit | null
  starterGuideSuccess?: string
}

const BAND_FALLBACKS: Record<BandKey, AuditBand> = {
  low: {
    headline: 'Building Your Foundation',
    body: "You're in the early stages of developing your presence — and that's actually a good place to start from. The gap between how you see yourself and how others experience you is real, but it's closeable.",
    primaryCta: { label: 'Start the Foundation', href: '/foundation' },
  },
  mid: {
    headline: 'Developing Your Presence',
    body: "You've got something — people can feel it — but it's inconsistent. The fundamentals are there. What's missing is the framework to make it reliable under pressure, not just on good days.",
    primaryCta: { label: 'Start the Foundation', href: '/foundation' },
  },
  high: {
    headline: 'Refining Your Edge',
    body: "You've already done a lot of the internal work. People notice you, trust you, remember you. What we'd be doing together is the fine-tuning — closing the last gap between solid and genuinely commanding.",
    primaryCta: { label: 'Book a Discovery Call', href: '/contact' },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Map a legacy AuditBand (from lib/auditData) onto the new resultBands keys.
 * Score thresholds remain in lib/auditData.ts; only the lookup key is renamed.
 */
function scoreToKey(score: number): BandKey {
  const band: LegacyBand = getBand(score)
  if (band === 'foundation') return 'low'
  if (band === 'developing') return 'mid'
  return 'high'
}

function pickBand(content: PageAudit | null, key: BandKey): AuditBand {
  return content?.resultBands?.[key] ?? BAND_FALLBACKS[key]
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function AuditClient({ content, starterGuideSuccess }: AuditClientProps) {
  const { currentStep, goTo } = useMultiStep({ steps: ['hero', 'quiz', 'result'] })
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const questionFocusRef = useRef<HTMLDivElement>(null)

  const question = QUESTIONS[currentQ]
  const answeredCount = QUESTIONS.filter((item) => answers[item.id] !== undefined).length
  const progress = (answeredCount / QUESTIONS.length) * 100
  const currentAnswer = answers[question.id]
  const isLastQuestion = currentQ === QUESTIONS.length - 1
  const midpoint = Math.floor(QUESTIONS.length / 2)
  const showMidEncouragement = currentStep === 'quiz' && currentQ === midpoint && content?.midQuizEncouragement?.line

  useEffect(() => {
    if (currentStep !== 'quiz') return
    const timeoutId = window.setTimeout(() => {
      questionFocusRef.current?.focus()
    }, 32)
    return () => window.clearTimeout(timeoutId)
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

  function finishQuiz() {
    const total = Object.values(answers).reduce((a, b) => a + b, 0)
    setScore(total)
    goTo('result')
  }

  function handleNextQuestion() {
    if (currentAnswer === undefined) return
    if (isLastQuestion) {
      transitionQuestion(finishQuiz)
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

  // ── Hero / pre-quiz intro ──────────────────────────────────────────
  if (currentStep === 'hero') {
    return (
      <div className="audit-hero">
        {content?.hero?.eyebrow && (
          <p className="audit-hero-eyebrow">{content.hero.eyebrow}</p>
        )}
        <KineticHeading as="h1" className="audit-hero-headline">
          {content?.hero?.headline ?? 'Seven questions. Three minutes. One honest read.'}
        </KineticHeading>
        {content?.hero?.subhead && (
          <p className="audit-hero-subhead">{content.hero.subhead}</p>
        )}
        <div className="audit-hero-actions">
          <Button variant="primary" onClick={() => goTo('quiz')}>
            {content?.hero?.primaryCta?.label ?? 'Start the Audit'}
          </Button>
        </div>
        {content?.heroMicrocopy && (
          <p className="audit-hero-microcopy">{content.heroMicrocopy}</p>
        )}
      </div>
    )
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

            {showMidEncouragement && (
              <p className="audit-mid-encouragement">{content?.midQuizEncouragement?.line}</p>
            )}

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
              {isLastQuestion ? 'See My Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Result stage ────────────────────────────────────────────────────────────
  if (currentStep === 'result' && score !== null) {
    const key = scoreToKey(score)
    const band = pickBand(content, key)
    const pct = Math.round((score / MAX_SCORE) * 100)

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
              <span className="audit-score-number">{score}</span>
              <span className="audit-score-denom">/{MAX_SCORE}</span>
            </div>
          </div>
        </div>

        <KineticHeading as="h2" className={`audit-result-band audit-band-${key}`}>
          {band.headline}
        </KineticHeading>

        <p className="audit-result-summary">You scored {score}/{MAX_SCORE} ({pct}%).</p>

        <p className="audit-result-body">{band.body}</p>

        <div className="audit-result-cta">
          {band.primaryCta && (
            <Button as="a" href={band.primaryCta.href}>
              {band.primaryCta.label}
            </Button>
          )}
          {band.secondaryCta && (
            <Button as="a" href={band.secondaryCta.href} variant="secondary">
              {band.secondaryCta.label}
            </Button>
          )}
        </div>

        {/* ── Foundation Starter Guide handoff ───────────────────────────── */}
        <div className="audit-result-starter-guide">
          <StarterGuideForm guide={content?.starterGuide ?? null} successMessage={starterGuideSuccess} />
        </div>
      </div>
    )
  }

  return null
}
