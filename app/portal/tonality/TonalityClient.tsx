'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ---------------------------------------------------------------------------
// Web Speech API — type declarations (not present in every TS DOM lib version)
// ---------------------------------------------------------------------------

interface SpeechRecognitionAlternative {
  readonly transcript: string
  readonly confidence: number
}

interface SpeechRecognitionResult {
  readonly length: number
  readonly isFinal: boolean
  item(index: number): SpeechRecognitionAlternative
  readonly [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  readonly [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultList
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((ev: SpeechRecognitionEvent) => void) | null
  onerror: ((ev: Event) => void) | null
  onend: ((ev: Event) => void) | null
  start(): void
  stop(): void
  abort(): void
}

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type InputTab = 'text' | 'record'

interface Suggestion {
  original: string
  rewrite: string
}

interface ScoreMap {
  authoritySignals: number
  hedgingLanguage: number
  clarityScore: number
  presenceMarkers: number
}

interface TonalityReport {
  overallTone: 'Tentative' | 'Developing' | 'Confident' | 'Commanding'
  scores: ScoreMap
  fillerWords: string[]
  hedgingPhrases: string[]
  strengthPhrases: string[]
  suggestions: Suggestion[]
  summary: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/** Returns the SpeechRecognition constructor from either the standard or
 *  webkit-prefixed property, or null if the browser doesn't support it. */
function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

const TONE_COLOUR: Record<TonalityReport['overallTone'], string> = {
  Tentative: 'var(--color-error)',
  Developing: 'var(--color-warning)',
  Confident: 'var(--accent-primary)',
  Commanding: 'var(--color-burnt-indigo)',
}

const SCORE_LABELS: Record<keyof ScoreMap, string> = {
  authoritySignals: 'Authority Signals',
  hedgingLanguage: 'Low Hedging',
  clarityScore: 'Clarity',
  presenceMarkers: 'Presence Markers',
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
    score >= 70
      ? 'var(--accent-primary)'
      : score >= 50
        ? 'var(--color-warning)'
        : 'var(--color-error)'

  return (
    <div className="ta-bar-track">
      <div className="ta-bar-fill" style={{ width: `${width}%`, background: colour }} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------

interface TonalityClientProps {
  userId: string
}

export function TonalityClient({ userId }: TonalityClientProps) {
  const [tab, setTab] = useState<InputTab>('text')
  const [textValue, setTextValue] = useState('')
  const [transcript, setTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [speechSupported, setSpeechSupported] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState<TonalityReport | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  useEffect(() => {
    setSpeechSupported(getSpeechRecognitionCtor() !== null)
  }, [])

  const activeText = tab === 'text' ? textValue : transcript
  const wc = wordCount(activeText)
  const canAnalyse = wc >= 50 && !isLoading

  // ---- Recording control ----

  const startRecording = useCallback(() => {
    const SR = getSpeechRecognitionCtor()
    if (!SR) return

    const rec = new SR()
    rec.continuous = true
    rec.interimResults = true
    rec.lang = 'en-US'

    setTranscript('')
    setIsRecording(true)

    rec.onresult = (event) => {
      let full = ''
      for (let i = 0; i < event.results.length; i++) {
        full += event.results[i][0].transcript
      }
      setTranscript(full)
    }

    rec.onerror = () => {
      setIsRecording(false)
    }

    rec.onend = () => {
      setIsRecording(false)
    }

    rec.start()
    recognitionRef.current = rec
  }, [])

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }, [])

  // ---- Analyse ----

  async function handleAnalyse() {
    if (!canAnalyse) return

    setIsLoading(true)
    setErrorMsg('')
    setReport(null)

    try {
      const res = await fetch('/api/tonality-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: activeText,
          userId,
          mode: tab === 'record' ? 'audio' : 'text',
        }),
      })

      const data = await res.json() as { report?: TonalityReport; error?: string }

      if (!res.ok || !data.report) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }

      setReport(data.report)
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="ta-layout">

      {/* ── Left panel — Input ── */}
      <div className="ta-panel ta-panel--input">
        <div className="ta-panel-header">
          {/* [COPY] Heading */}
          <h1 className="ta-panel-title">Tonality Analysis</h1>
          {/* [COPY] Subtitle */}
          <p className="ta-panel-subtitle">
            Discover how your words land — and how to make them hit harder.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="ta-tabs" role="tablist">
          <button
            className={`ta-tab${tab === 'text' ? ' ta-tab--active' : ''}`}
            role="tab"
            aria-selected={tab === 'text'}
            onClick={() => setTab('text')}
          >
            {/* [COPY] */}
            Paste Text
          </button>
          <button
            className={`ta-tab${tab === 'record' ? ' ta-tab--active' : ''}`}
            role="tab"
            aria-selected={tab === 'record'}
            onClick={() => setTab('record')}
          >
            {/* [COPY] */}
            Record Speech
          </button>
        </div>

        {/* ── Text tab ── */}
        {tab === 'text' && (
          <div className="ta-input-pane">
            <textarea
              className="ta-textarea"
              value={textValue}
              onChange={e => setTextValue(e.target.value)}
              placeholder="Paste a speech, presentation intro, meeting talking points, or any professional communication..."
              rows={12}
              maxLength={16000}
            />
          </div>
        )}

        {/* ── Record tab ── */}
        {tab === 'record' && (
          <div className="ta-input-pane">
            {speechSupported === false ? (
              <div className="ta-speech-unsupported">
                {/* [COPY] Fallback message */}
                <p>
                  Your browser doesn&rsquo;t support the Web Speech API. Try Chrome or Edge,
                  or use the &ldquo;Paste Text&rdquo; tab instead.
                </p>
              </div>
            ) : (
              <>
                <div className="ta-record-controls">
                  {!isRecording ? (
                    <button
                      className="ta-record-btn"
                      onClick={startRecording}
                      aria-label="Start recording"
                    >
                      <span className="ta-record-icon" />
                      {/* [COPY] */}
                      Start Recording
                    </button>
                  ) : (
                    <button
                      className="ta-record-btn ta-record-btn--active"
                      onClick={stopRecording}
                      aria-label="Stop recording"
                    >
                      <span className="ta-record-icon ta-record-icon--pulse" />
                      {/* [COPY] */}
                      Stop Recording
                    </button>
                  )}
                  {isRecording && (
                    <span className="ta-recording-label">
                      {/* [COPY] */}
                      Listening&hellip;
                    </span>
                  )}
                </div>

                <div className={`ta-transcript${isRecording ? ' ta-transcript--live' : ''}`}>
                  {transcript ? (
                    <p className="ta-transcript-text">{transcript}</p>
                  ) : (
                    <p className="ta-transcript-placeholder">
                      {/* [COPY] */}
                      Your speech will appear here as you speak&hellip;
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Word count + action */}
        <div className="ta-input-footer">
          <span className={`ta-word-count${wc > 0 && wc < 50 ? ' ta-word-count--low' : ''}`}>
            {wc} {wc === 1 ? 'word' : 'words'}
            {wc < 50 ? ' (50 minimum)' : ''}
          </span>
          <button
            className="ta-analyse-btn"
            disabled={!canAnalyse}
            onClick={() => void handleAnalyse()}
          >
            {/* [COPY] */}
            {isLoading ? 'Analysing\u2026' : 'Analyse My Presence \u2192'}
          </button>
        </div>

        {errorMsg && <p className="ta-error-msg">{errorMsg}</p>}

        <Link href="/portal" className="ta-back-link">
          ← Back to Portal
        </Link>
      </div>

      {/* ── Right panel — Results ── */}
      <div className="ta-panel ta-panel--results">
        {!report ? (
          <div className="ta-results-empty">
            <p className="ta-results-empty-text">
              {/* [COPY] Placeholder */}
              Your analysis results will appear here.
            </p>
          </div>
        ) : (
          <div className="ta-results">

            {/* Overall tone badge */}
            <div className="ta-results-header">
              <span
                className="ta-tone-badge"
                style={{ background: TONE_COLOUR[report.overallTone] }}
              >
                {report.overallTone}
              </span>
              {/* [COPY] Label */}
              <span className="ta-tone-label">Overall Tone</span>
            </div>

            {/* 4 score bars */}
            <div className="ta-scores">
              {(Object.entries(SCORE_LABELS) as [keyof ScoreMap, string][]).map(
                ([key, label], i) => (
                  <div key={key} className="ta-score-row">
                    <div className="ta-score-header">
                      <span className="ta-score-name">{label}</span>
                      <span className="ta-score-val">{report.scores[key]}</span>
                    </div>
                    <ScoreBar score={report.scores[key]} delay={i * 100} />
                  </div>
                ),
              )}
            </div>

            {/* Filler words */}
            {report.fillerWords.length > 0 && (
              <div className="ta-section">
                {/* [COPY] Section heading */}
                <p className="ta-section-heading">Filler Words</p>
                <div className="ta-tag-list">
                  {report.fillerWords.map(w => (
                    <span key={w} className="ta-tag ta-tag--filler">{w}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Hedging phrases */}
            {report.hedgingPhrases.length > 0 && (
              <div className="ta-section">
                {/* [COPY] Section heading */}
                <p className="ta-section-heading">Hedging Phrases</p>
                <div className="ta-tag-list">
                  {report.hedgingPhrases.map(p => (
                    <span key={p} className="ta-tag ta-tag--hedge">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Strong phrases */}
            {report.strengthPhrases.length > 0 && (
              <div className="ta-section">
                {/* [COPY] Section heading */}
                <p className="ta-section-heading">Strong Moments</p>
                <div className="ta-tag-list">
                  {report.strengthPhrases.map(p => (
                    <span key={p} className="ta-tag ta-tag--strength">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {report.suggestions.length > 0 && (
              <div className="ta-section">
                {/* [COPY] Section heading */}
                <p className="ta-section-heading">Suggested Rewrites</p>
                <div className="ta-suggestions">
                  {report.suggestions.map((s, i) => (
                    <div key={i} className="ta-suggestion-row">
                      <div className="ta-suggestion-col ta-suggestion-col--original">
                        {/* [COPY] Label */}
                        <span className="ta-suggestion-label">Original</span>
                        <p className="ta-suggestion-text">&ldquo;{s.original}&rdquo;</p>
                      </div>
                      <div className="ta-suggestion-arrow">→</div>
                      <div className="ta-suggestion-col ta-suggestion-col--rewrite">
                        {/* [COPY] Label */}
                        <span className="ta-suggestion-label">Stronger</span>
                        <p className="ta-suggestion-text">&ldquo;{s.rewrite}&rdquo;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="ta-summary">
              {/* [COPY] Label */}
              <p className="ta-summary-label">Coach&rsquo;s Assessment</p>
              <p className="ta-summary-body">{report.summary}</p>
            </div>

            {/* Actions */}
            <div className="ta-results-actions">
              <button className="ta-btn ta-btn--ghost" onClick={() => setReport(null)}>
                {/* [COPY] */}
                Analyse Again
              </button>
              <Link href="/portal" className="ta-btn ta-btn--ghost">
                {/* [COPY] */}
                ← Back to Portal
              </Link>
            </div>

          </div>
        )}
      </div>

    </div>
  )
}
