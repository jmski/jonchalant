'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ---------------------------------------------------------------------------
// Data — questions and dimensions
// ---------------------------------------------------------------------------

const SCALE_LABELS = ['Not at all', 'Rarely', 'Sometimes', 'Often', 'Always'] as const

const DIMENSIONS = [
  {
    name: 'Vocal Authority',
    questions: [
      /* [COPY] */ 'When I speak in meetings, people lean in and listen',
      /* [COPY] */ 'I vary my pace and tone to emphasise key points',
      /* [COPY] */ 'I can hold silence comfortably without filling it',
    ],
  },
  {
    name: 'Physical Presence',
    questions: [
      /* [COPY] */ 'I feel grounded and settled in my body during high-stakes moments',
      /* [COPY] */ "My posture communicates confidence even when I don't feel it",
      /* [COPY] */ 'I use gesture and movement intentionally rather than nervously',
    ],
  },
  {
    name: 'Strategic Visibility',
    questions: [
      /* [COPY] */ 'I speak up with my ideas before others take the floor',
      /* [COPY] */ 'People in my organisation know what I stand for',
      /* [COPY] */ 'I position myself strategically in rooms and meetings',
    ],
  },
  {
    name: 'Authentic Confidence',
    questions: [
      /* [COPY] */ 'I can advocate for myself without feeling aggressive or pushy',
      /* [COPY] */ 'I handle challenges to my ideas with composure',
      /* [COPY] */ "My confidence doesn't depend on external validation",
    ],
  },
  {
    name: 'Room Command',
    questions: [
      /* [COPY] */ 'When I enter a room, people notice without me saying anything',
      /* [COPY] */ "I can redirect or reframe a conversation that's going off track",
      /* [COPY] */ "I recover quickly and visibly when something doesn't go to plan",
    ],
  },
] as const

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Step = 'intro' | 'questions' | 'loading' | 'results' | 'error'

interface DimensionScore {
  name: string
  score: number
  summary: string
  topRecommendation: string
}

interface PresenceReport {
  overallScore: number
  dimensions: DimensionScore[]
  strengthSummary: string
  priorityFocus: string
  nextStep: string
}

// ---------------------------------------------------------------------------
// Animated score bar
// ---------------------------------------------------------------------------

function ScoreBar({ score, delay = 0 }: { score: number; delay?: number }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), delay)
    return () => clearTimeout(t)
  }, [score, delay])

  const colour =
    score >= 70 ? 'var(--accent-primary)' :
    score >= 50 ? 'var(--color-warning)' :
    'var(--color-error)'

  return (
    <div className="ps-bar-track">
      <div
        className="ps-bar-fill"
        style={{ width: `${width}%`, background: colour }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------

interface PresenceScoreClientProps {
  userId: string
  firstName: string
}

export function PresenceScoreClient({ userId, firstName }: PresenceScoreClientProps) {
  const [step, setStep] = useState<Step>('intro')
  const [dimIndex, setDimIndex] = useState(0)    // 0–4 — which dimension screen
  const [answers, setAnswers] = useState<number[][]>(
    DIMENSIONS.map(() => [0, 0, 0]),             // 5 × 3, default 0 = unanswered
  )
  const [report, setReport] = useState<PresenceReport | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const reportRef = useRef<HTMLDivElement>(null)

  const currentDim = DIMENSIONS[dimIndex]
  const currentAnswers = answers[dimIndex]

  // Check all 3 questions in the current dimension are answered
  const dimComplete = currentAnswers.every(v => v > 0)

  function setAnswer(dimIdx: number, qIdx: number, value: number) {
    setAnswers(prev => {
      const next = prev.map(row => [...row])
      next[dimIdx][qIdx] = value
      return next
    })
  }

  async function handleFinish() {
    setStep('loading')

    // Build payload
    const payload = DIMENSIONS.flatMap((dim, dIdx) =>
      dim.questions.map((question, qIdx) => ({
        question,
        answer: SCALE_LABELS[answers[dIdx][qIdx] - 1] ?? 'Not at all',
        dimension: dim.name,
      })),
    )

    try {
      const res = await fetch('/api/presence-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload, userId }),
      })

      const data = await res.json() as { report?: PresenceReport; error?: string }

      if (!res.ok || !data.report) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }

      setReport(data.report)
      setStep('results')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStep('error')
    }
  }

  function handleRetake() {
    setAnswers(DIMENSIONS.map(() => [0, 0, 0]))
    setDimIndex(0)
    setReport(null)
    setErrorMsg('')
    setStep('intro')
  }

  function handlePrint() {
    window.print()
  }

  // Score colour label
  function scoreLabel(s: number) {
    if (s >= 70) return 'Strong'
    if (s >= 50) return 'Developing'
    return 'Needs focus'
  }

  // ---------------------------------------------------------------------------
  // Render: Intro
  // ---------------------------------------------------------------------------

  if (step === 'intro') {
    return (
      <div className="ps-page">
        <div className="ps-intro">
          {/* [COPY] Badge */}
          <span className="ps-intro-badge">Executive Presence Assessment</span>
          {/* [COPY] Headline */}
          <h1 className="ps-intro-title">How do others experience your presence?</h1>
          {/* [COPY] Body */}
          <p className="ps-intro-body">
            15 questions. Honest answers only. No right or wrong — only what&rsquo;s true for you right now.
          </p>
          <p className="ps-intro-body">
            You&rsquo;ll receive a personalised score across five dimensions of executive presence, plus a specific recommendation to work on first.
          </p>
          {/* [COPY] Time notice */}
          <p className="ps-intro-meta">Takes about 3 minutes. Limited to 3 assessments per day.</p>
          <button className="ps-btn ps-btn--primary" onClick={() => setStep('questions')}>
            {/* [COPY] CTA */}
            Start Assessment →
          </button>
          <Link href="/portal" className="ps-back-link">
            ← Back to Portal
          </Link>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render: Questions (3 per screen, one dimension at a time)
  // ---------------------------------------------------------------------------

  if (step === 'questions') {
    const isLast = dimIndex === DIMENSIONS.length - 1

    return (
      <div className="ps-page">
        {/* Progress bar */}
        <div className="ps-progress-wrap">
          <div className="ps-progress-track">
            <div
              className="ps-progress-fill"
              style={{ width: `${((dimIndex) / DIMENSIONS.length) * 100}%` }}
            />
          </div>
          {/* [COPY] Progress label */}
          <span className="ps-progress-label">
            {dimIndex + 1} of {DIMENSIONS.length}
          </span>
        </div>

        <div className="ps-questions-panel">
          {/* [COPY] Dimension name */}
          <p className="ps-dimension-label">{currentDim.name}</p>

          {currentDim.questions.map((question, qIdx) => (
            <div key={qIdx} className="ps-question-block">
              <p className="ps-question-text">
                {/* [COPY] Question {dimIndex * 3 + qIdx + 1} */}
                {question}
              </p>
              <div className="ps-scale">
                {SCALE_LABELS.map((label, val) => {
                  const numVal = val + 1  // 1-5
                  const selected = currentAnswers[qIdx] === numVal
                  return (
                    <button
                      key={val}
                      className={`ps-scale-btn${selected ? ' ps-scale-btn--selected' : ''}`}
                      onClick={() => setAnswer(dimIndex, qIdx, numVal)}
                      aria-pressed={selected}
                    >
                      <span className="ps-scale-num">{numVal}</span>
                      {/* [COPY] Scale label */}
                      <span className="ps-scale-label">{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="ps-nav-row">
            {dimIndex > 0 && (
              <button
                className="ps-btn ps-btn--ghost"
                onClick={() => setDimIndex(i => i - 1)}
              >
                {/* [COPY] */}
                ← Back
              </button>
            )}
            <button
              className="ps-btn ps-btn--primary"
              disabled={!dimComplete}
              onClick={() => {
                if (isLast) {
                  void handleFinish()
                } else {
                  setDimIndex(i => i + 1)
                }
              }}
            >
              {/* [COPY] */}
              {isLast ? 'Get My Score →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render: Loading
  // ---------------------------------------------------------------------------

  if (step === 'loading') {
    return (
      <div className="ps-page ps-page--centered">
        <div className="ps-loading">
          <div className="ps-loading-dots">
            <span /><span /><span />
          </div>
          {/* [COPY] Loading message */}
          <p className="ps-loading-text">Analysing your presence profile&hellip;</p>
          {/* [COPY] Loading sub-text */}
          <p className="ps-loading-sub">This usually takes 10–15 seconds.</p>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render: Error
  // ---------------------------------------------------------------------------

  if (step === 'error') {
    return (
      <div className="ps-page ps-page--centered">
        <div className="ps-error-panel">
          {/* [COPY] Error headline */}
          <p className="ps-error-title">Something went wrong</p>
          <p className="ps-error-body">{errorMsg}</p>
          <div className="ps-error-actions">
            <button className="ps-btn ps-btn--primary" onClick={() => void handleFinish()}>
              {/* [COPY] */}
              Try Again
            </button>
            <button className="ps-btn ps-btn--ghost" onClick={handleRetake}>
              {/* [COPY] */}
              Retake from Start
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render: Results
  // ---------------------------------------------------------------------------

  if (step === 'results' && report) {
    return (
      <div className="ps-page">
        <div className="ps-results" ref={reportRef}>

          {/* ── Print header (hidden on screen) ── */}
          <div className="ps-print-header">
            {/* [COPY] */}
            <p className="ps-print-brand">JONCHALANT — Executive Presence Report</p>
            <p className="ps-print-date">{new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* ── Overall score ── */}
          <div className="ps-overall">
            {/* [COPY] Badge */}
            <span className="ps-intro-badge">Your Results</span>
            {/* [COPY] Headline */}
            <h1 className="ps-results-title">{firstName}&rsquo;s Executive Presence Score</h1>
            <div className="ps-score-ring">
              <span className="ps-score-number">{report.overallScore}</span>
              <span className="ps-score-denom">/100</span>
            </div>
            <p className="ps-score-label">{scoreLabel(report.overallScore)}</p>
          </div>

          {/* ── Dimension bars ── */}
          <div className="ps-dimensions">
            {/* [COPY] Section heading */}
            <h2 className="ps-section-heading">Breakdown by Dimension</h2>
            {report.dimensions.map((dim, i) => (
              <div key={dim.name} className="ps-dimension-row">
                <div className="ps-dimension-header">
                  <span className="ps-dimension-name">{dim.name}</span>
                  <span className="ps-dimension-score">{dim.score}</span>
                </div>
                <ScoreBar score={dim.score} delay={i * 120} />
                <p className="ps-dimension-summary">{dim.summary}</p>
                <div className="ps-recommendation">
                  {/* [COPY] Label */}
                  <span className="ps-recommendation-label">Drill:</span>
                  <span className="ps-recommendation-text">{dim.topRecommendation}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Narrative insights ── */}
          <div className="ps-insights">
            <div className="ps-insight-card ps-insight-card--strength">
              {/* [COPY] Label */}
              <p className="ps-insight-label">Your Strength</p>
              <p className="ps-insight-body">{report.strengthSummary}</p>
            </div>
            <div className="ps-insight-card ps-insight-card--focus">
              {/* [COPY] Label */}
              <p className="ps-insight-label">Priority Focus</p>
              <p className="ps-insight-body">{report.priorityFocus}</p>
            </div>
            <div className="ps-insight-card ps-insight-card--next">
              {/* [COPY] Label */}
              <p className="ps-insight-label">Your Next Step</p>
              <p className="ps-insight-body">{report.nextStep}</p>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="ps-results-actions no-print">
            <button className="ps-btn ps-btn--primary" onClick={handlePrint}>
              {/* [COPY] */}
              Download Report
            </button>
            <button className="ps-btn ps-btn--ghost" onClick={handleRetake}>
              {/* [COPY] */}
              Retake Assessment
            </button>
            <Link href="/portal" className="ps-btn ps-btn--ghost">
              {/* [COPY] */}
              ← Back to Portal
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}
