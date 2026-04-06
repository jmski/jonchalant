'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { saveMovementPlan, deleteMovementPlan } from '@/lib/movement-plans'
import type { MovementPlan, GeneratedPlan, PlanExercise as Exercise, PlanSession as Session } from '@/lib/types'

type Step = 'intake' | 'loading' | 'plan' | 'error'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GOALS_OPTIONS = [
  'Improve posture',
  'Build physical confidence',
  'Reduce nervous energy',
  'Develop stage presence',
  'Improve breath control',
  'Build grounding habits',
] as const

const FITNESS_LEVELS = ['Beginner', 'Some experience', 'Active', 'Advanced'] as const

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`mp-exercise${open ? ' mp-exercise--open' : ''}`}>
      <button className="mp-exercise-toggle" onClick={() => setOpen(o => !o)}>
        <span className="mp-exercise-name">{exercise.name}</span>
        <span className="mp-exercise-dur">{exercise.duration}</span>
        <span className="mp-exercise-chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="mp-exercise-body">
          <p className="mp-exercise-instruction">{exercise.instruction}</p>
          <div className="mp-exercise-connection">
            {/* [COPY] Label */}
            <span className="mp-connection-label">Leadership Connection:</span>
            <span className="mp-connection-text">{exercise.leadershipConnection}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function SessionCard({ session }: { session: Session }) {
  return (
    <div className="mp-session-card">
      <div className="mp-session-header">
        <span className="mp-session-day">{session.day}</span>
        <span className="mp-session-meta">{session.duration} · {session.category}</span>
      </div>
      <div className="mp-session-exercises">
        {session.exercises.map((ex, i) => (
          <ExerciseCard key={i} exercise={ex} />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------

interface MovementPlanClientProps {
  userId: string
  initialPlans: MovementPlan[]
}

export function MovementPlanClient({ userId, initialPlans }: MovementPlanClientProps) {
  // ── Intake state ──
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [limitations, setLimitations] = useState('')
  const [fitnessLevel, setFitnessLevel] = useState<string>('')
  const [hoursPerWeek, setHoursPerWeek] = useState(3)

  // ── Flow state ──
  const [step, setStep] = useState<Step>('intake')
  const [plan, setPlan] = useState<GeneratedPlan | null>(null)
  const [activeWeek, setActiveWeek] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  // ── Save state ──
  const [isSaving, setIsSaving] = useState(false)
  const [savedOk, setSavedOk] = useState(false)
  const [saveError, setSaveError] = useState('')

  // ── Saved plans list ──
  const [savedPlans, setSavedPlans] = useState<MovementPlan[]>(initialPlans)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // ── Viewed saved plan ──
  const [viewingPlan, setViewingPlan] = useState<GeneratedPlan | null>(null)

  const canGenerate = selectedGoals.length > 0 && fitnessLevel !== ''

  function toggleGoal(goal: string) {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal],
    )
  }

  // ── Generate ──

  async function handleGenerate() {
    if (!canGenerate) return
    setStep('loading')
    setErrorMsg('')
    setPlan(null)
    setSavedOk(false)
    setSaveError('')
    setViewingPlan(null)

    try {
      const res = await fetch('/api/movement-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goals: selectedGoals.join(', '),
          limitations: limitations.trim() || '',
          fitnessLevel,
          hoursPerWeek,
          userId,
        }),
      })

      const data = await res.json() as { plan?: GeneratedPlan; error?: string }

      if (!res.ok || !data.plan) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }

      setPlan(data.plan)
      setActiveWeek(0)
      setStep('plan')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStep('error')
    }
  }

  // ── Save to Supabase ──

  async function handleSave() {
    if (!plan || isSaving) return
    setIsSaving(true)
    setSaveError('')
    setSavedOk(false)

    const supabase = createClient()
    const saved = await saveMovementPlan(
      supabase,
      userId,
      plan.title,
      selectedGoals.join(', ') || null,
      limitations.trim() || null,
      plan,
    )

    setIsSaving(false)

    if (!saved) {
      setSaveError('Failed to save. Please try again.')
      return
    }

    setSavedOk(true)
    setSavedPlans(prev => [saved, ...prev])
  }

  // ── Delete saved plan ──

  async function handleDelete(planId: string) {
    setDeletingId(planId)
    const supabase = createClient()
    const ok = await deleteMovementPlan(supabase, userId, planId)
    setDeletingId(null)

    if (ok) {
      setSavedPlans(prev => prev.filter(p => p.id !== planId))
    }
  }

  // ── Reset to intake ──

  function handleReset() {
    setStep('intake')
    setPlan(null)
    setViewingPlan(null)
    setSavedOk(false)
    setSaveError('')
    setErrorMsg('')
    setSelectedGoals([])
    setLimitations('')
    setFitnessLevel('')
    setHoursPerWeek(3)
  }

  // ---------------------------------------------------------------------------
  // Displayed plan — either fresh generated or opened from saved list
  // ---------------------------------------------------------------------------

  const displayedPlan = viewingPlan ?? plan

  // ---------------------------------------------------------------------------
  // Render: Loading
  // ---------------------------------------------------------------------------

  if (step === 'loading') {
    return (
      <div className="mp-page mp-page--loading">
        <div className="mp-loading">
          <div className="mp-loading-dots">
            <span /><span /><span />
          </div>
          {/* [COPY] Loading message */}
          <p className="mp-loading-text">Building your personalised movement curriculum&hellip;</p>
          {/* [COPY] Loading sub-text */}
          <p className="mp-loading-sub">This usually takes around 15 seconds.</p>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render: Error
  // ---------------------------------------------------------------------------

  if (step === 'error') {
    return (
      <div className="mp-page mp-page--loading">
        <div className="mp-error-panel">
          {/* [COPY] Error headline */}
          <p className="mp-error-title">Something went wrong</p>
          <p className="mp-error-body">{errorMsg}</p>
          <button className="mp-btn mp-btn--primary" onClick={handleReset}>
            {/* [COPY] */}
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render: Intake form
  // ---------------------------------------------------------------------------

  if (step === 'intake') {
    return (
      <div className="mp-page">
        <div className="mp-intake">
          <div className="mp-intake-header">
            <span className="mp-badge">
              {/* [COPY] */}
              Movement Plan Generator
            </span>
            {/* [COPY] Headline */}
            <h1 className="mp-intake-title">Build your physical presence</h1>
            {/* [COPY] Subtitle */}
            <p className="mp-intake-subtitle">
              Tell us about your goals and we&rsquo;ll build a 4-week curriculum tailored to your body, schedule, and leadership objectives.
            </p>
          </div>

          {/* Goals */}
          <div className="mp-field">
            {/* [COPY] Label */}
            <label className="mp-field-label">What do you want to work on? <span className="mp-required">*</span></label>
            <div className="mp-checkbox-grid">
              {GOALS_OPTIONS.map(goal => (
                <label key={goal} className="mp-checkbox-label">
                  <input
                    type="checkbox"
                    className="mp-checkbox"
                    checked={selectedGoals.includes(goal)}
                    onChange={() => toggleGoal(goal)}
                  />
                  {/* [COPY] {goal} */}
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Limitations */}
          <div className="mp-field">
            {/* [COPY] Label */}
            <label className="mp-field-label" htmlFor="limitations">Physical limitations</label>
            <textarea
              id="limitations"
              className="mp-textarea"
              value={limitations}
              onChange={e => setLimitations(e.target.value)}
              placeholder="Any injuries, mobility limitations, or physical considerations we should know about? Leave blank if none."
              rows={3}
            />
          </div>

          {/* Fitness level */}
          <div className="mp-field">
            {/* [COPY] Label */}
            <label className="mp-field-label">Fitness level <span className="mp-required">*</span></label>
            <div className="mp-radio-group">
              {FITNESS_LEVELS.map(level => (
                <label key={level} className="mp-radio-label">
                  <input
                    type="radio"
                    className="mp-radio"
                    name="fitnessLevel"
                    value={level}
                    checked={fitnessLevel === level}
                    onChange={() => setFitnessLevel(level)}
                  />
                  {/* [COPY] {level} */}
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hours per week */}
          <div className="mp-field">
            {/* [COPY] Label */}
            <label className="mp-field-label" htmlFor="hours">
              Hours available per week: <strong>{hoursPerWeek}</strong>
            </label>
            <input
              id="hours"
              type="range"
              className="mp-range"
              min={1}
              max={7}
              step={1}
              value={hoursPerWeek}
              onChange={e => setHoursPerWeek(Number(e.target.value))}
            />
            <div className="mp-range-labels">
              <span>1 hr</span>
              <span>7 hrs</span>
            </div>
          </div>

          <button
            className="mp-btn mp-btn--primary"
            disabled={!canGenerate}
            onClick={() => void handleGenerate()}
          >
            {/* [COPY] */}
            Generate My Plan →
          </button>
        </div>

        {/* Saved plans below intake */}
        <SavedPlansSection
          plans={savedPlans}
          deletingId={deletingId}
          onDelete={handleDelete}
          onOpen={(p) => {
            setViewingPlan(p.plan_data)
            setActiveWeek(0)
            setStep('plan')
          }}
        />
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render: Plan display (generated or opened from saved)
  // ---------------------------------------------------------------------------

  if ((step === 'plan' || viewingPlan) && displayedPlan) {
    const currentWeek = displayedPlan.weeks[activeWeek]

    return (
      <div className="mp-page">
        <div className="mp-plan">

          {/* Plan header */}
          <div className="mp-plan-header">
            <span className="mp-badge">Your Plan</span>
            <h1 className="mp-plan-title">{displayedPlan.title}</h1>
            <p className="mp-plan-summary">{displayedPlan.summary}</p>
          </div>

          {/* Week tabs */}
          <div className="mp-week-tabs" role="tablist">
            {displayedPlan.weeks.map((w, i) => (
              <button
                key={i}
                className={`mp-week-tab${i === activeWeek ? ' mp-week-tab--active' : ''}`}
                role="tab"
                aria-selected={i === activeWeek}
                onClick={() => setActiveWeek(i)}
              >
                {/* [COPY] */}
                Week {w.weekNumber}
              </button>
            ))}
          </div>

          {/* Current week */}
          <div className="mp-week-content">
            <div className="mp-week-intro">
              <span className="mp-week-theme">{currentWeek.theme}</span>
              <p className="mp-week-focus">{currentWeek.focus}</p>
            </div>
            <div className="mp-sessions">
              {currentWeek.sessions.map((session, i) => (
                <SessionCard key={i} session={session} />
              ))}
            </div>
          </div>

          {/* Progression & adaptations */}
          <div className="mp-notes">
            <div className="mp-note-card">
              {/* [COPY] Label */}
              <p className="mp-note-label">4-Week Progression</p>
              <p className="mp-note-body">{displayedPlan.progressionNote}</p>
            </div>
            <div className="mp-note-card">
              {/* [COPY] Label */}
              <p className="mp-note-label">Adaptations & Modifications</p>
              <p className="mp-note-body">{displayedPlan.adaptations}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mp-plan-actions">
            {!viewingPlan && (
              <>
                {!savedOk ? (
                  <button
                    className="mp-btn mp-btn--primary"
                    disabled={isSaving}
                    onClick={() => void handleSave()}
                  >
                    {/* [COPY] */}
                    {isSaving ? 'Saving…' : 'Save Plan'}
                  </button>
                ) : (
                  <span className="mp-save-confirm">
                    {/* [COPY] */}
                    ✓ Plan saved
                  </span>
                )}
                {saveError && <p className="mp-save-error">{saveError}</p>}
              </>
            )}
            <button className="mp-btn mp-btn--ghost" onClick={handleReset}>
              {/* [COPY] */}
              {viewingPlan ? '← Back' : 'Generate New Plan'}
            </button>
          </div>
        </div>

        {/* Saved plans below plan view */}
        <SavedPlansSection
          plans={savedPlans}
          deletingId={deletingId}
          onDelete={handleDelete}
          onOpen={(p) => {
            setViewingPlan(p.plan_data)
            setActiveWeek(0)
          }}
        />
      </div>
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// Saved plans section (shared between steps)
// ---------------------------------------------------------------------------

function SavedPlansSection({
  plans,
  deletingId,
  onDelete,
  onOpen,
}: {
  plans: MovementPlan[]
  deletingId: string | null
  onDelete: (id: string) => void
  onOpen: (plan: MovementPlan) => void
}) {
  if (plans.length === 0) return null

  return (
    <div className="mp-saved-section">
      {/* [COPY] Section heading */}
      <h2 className="mp-saved-heading">My Saved Plans</h2>
      <div className="mp-saved-grid">
        {plans.map(p => (
          <div key={p.id} className="mp-saved-card">
            <div className="mp-saved-card-body">
              <p className="mp-saved-title">{p.title}</p>
              <p className="mp-saved-date">
                {new Date(p.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              {p.goals && <p className="mp-saved-goals">{p.goals}</p>}
            </div>
            <div className="mp-saved-card-actions">
              <button className="mp-btn mp-btn--sm mp-btn--primary" onClick={() => onOpen(p)}>
                {/* [COPY] */}
                Open
              </button>
              <button
                className="mp-btn mp-btn--sm mp-btn--ghost"
                disabled={deletingId === p.id}
                onClick={() => onDelete(p.id)}
              >
                {/* [COPY] */}
                {deletingId === p.id ? '…' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
