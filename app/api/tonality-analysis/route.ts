import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RequestBody {
  text: string
  userId: string
  mode: 'text' | 'audio'
}

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
// In-memory rate limiter — max 10 analyses per userId per UTC day.
// NOTE: Resets on server restart and is not shared across serverless instances.
// For production scale, replace with a Redis-backed counter.
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number
  /** Midnight UTC (ms) that this window expires */
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const MAX_PER_DAY = 10

function getMidnightUTC(): number {
  const now = new Date()
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
}

function checkRateLimit(userId: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: getMidnightUTC() })
    return { allowed: true, remaining: MAX_PER_DAY - 1 }
  }

  if (entry.count >= MAX_PER_DAY) {
    return { allowed: false, remaining: 0 }
  }

  entry.count += 1
  return { allowed: true, remaining: MAX_PER_DAY - entry.count }
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Jon's Executive Presence Speech Coach. Your role is to analyse professional communications — speeches, presentations, meeting talking points, or any professional text — for executive presence markers.

Jon's methodology focuses on:
- Authority Signals: direct, declarative statements; owning the room with language
- Hedging Language: filler phrases that erode confidence ("I think maybe", "sort of", "kind of", "perhaps we could")
- Clarity: sentence structure, specificity, absence of jargon that obscures rather than illuminates
- Presence Markers: language that commands attention and demonstrates leadership identity

Scoring (0–100):
- authoritySignals: how often the speaker uses direct, assertive language
- hedgingLanguage: the ABSENCE of hedging — high score = little hedging (this is a positive metric)
- clarityScore: how clear, specific, and well-structured the communication is
- presenceMarkers: how much the speaker sounds like someone others want to follow

Overall tone tiers:
- "Tentative": mostly hedged, unclear, deferential
- "Developing": some strong moments but inconsistent
- "Confident": generally strong with minor derailers
- "Commanding": authoritative, clear, and magnetic throughout

Rules:
- fillerWords: single words or very short phrases that are filler (e.g., "actually", "just", "like", "you know")
- hedgingPhrases: multi-word phrases that hedge or soften unnecessarily
- strengthPhrases: direct quotes from the text that demonstrate strong executive presence
- suggestions: up to 5 specific rewrites — quote the exact original phrase and show a stronger version
- summary: 2-3 sentences in Jon's warm but direct coaching voice

You must return ONLY a valid JSON object with no preamble, explanation, or markdown code fences.`

function buildUserPrompt(text: string, mode: 'text' | 'audio'): string {
  const context =
    mode === 'audio'
      ? "This text was transcribed from live speech via the browser's Web Speech API."
      : 'This is written text submitted for presence analysis.'

  return `${context}\n\nAnalyse the following for executive presence markers and return a JSON report.\n\n---\n${text}\n---\n\nReturn a JSON object with this exact shape:\n{\n  "overallTone": "Tentative|Developing|Confident|Commanding",\n  "scores": {\n    "authoritySignals": <0-100>,\n    "hedgingLanguage": <0-100>,\n    "clarityScore": <0-100>,\n    "presenceMarkers": <0-100>\n  },\n  "fillerWords": ["word1", "word2"],\n  "hedgingPhrases": ["phrase1", "phrase2"],\n  "strengthPhrases": ["direct quote 1", "direct quote 2"],\n  "suggestions": [\n    { "original": "exact phrase from text", "rewrite": "stronger version" }\n  ],\n  "summary": "2-3 sentences in Jon\'s coaching voice"\n}`
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function isValidScore(v: unknown): v is number {
  return typeof v === 'number' && v >= 0 && v <= 100 && Number.isFinite(v)
}

const VALID_TONES = ['Tentative', 'Developing', 'Confident', 'Commanding'] as const
type OverallTone = (typeof VALID_TONES)[number]

function isValidTone(v: unknown): v is OverallTone {
  return typeof v === 'string' && (VALID_TONES as readonly string[]).includes(v)
}

function validateReport(raw: unknown): TonalityReport {
  if (!raw || typeof raw !== 'object') throw new Error('Response is not an object')
  const r = raw as Record<string, unknown>

  if (!isValidTone(r.overallTone)) throw new Error('Invalid overallTone value')

  const scores = r.scores as Record<string, unknown> | undefined
  if (!scores || typeof scores !== 'object') throw new Error('scores missing')
  if (!isValidScore(scores.authoritySignals)) throw new Error('scores.authoritySignals invalid')
  if (!isValidScore(scores.hedgingLanguage)) throw new Error('scores.hedgingLanguage invalid')
  if (!isValidScore(scores.clarityScore)) throw new Error('scores.clarityScore invalid')
  if (!isValidScore(scores.presenceMarkers)) throw new Error('scores.presenceMarkers invalid')

  if (!Array.isArray(r.fillerWords)) throw new Error('fillerWords must be an array')
  if (!Array.isArray(r.hedgingPhrases)) throw new Error('hedgingPhrases must be an array')
  if (!Array.isArray(r.strengthPhrases)) throw new Error('strengthPhrases must be an array')
  if (!Array.isArray(r.suggestions)) throw new Error('suggestions must be an array')
  if (typeof r.summary !== 'string' || r.summary.trim() === '') throw new Error('summary missing')

  return {
    overallTone: r.overallTone,
    scores: {
      authoritySignals: scores.authoritySignals as number,
      hedgingLanguage: scores.hedgingLanguage as number,
      clarityScore: scores.clarityScore as number,
      presenceMarkers: scores.presenceMarkers as number,
    },
    fillerWords: (r.fillerWords as unknown[]).filter((v): v is string => typeof v === 'string'),
    hedgingPhrases: (r.hedgingPhrases as unknown[]).filter((v): v is string => typeof v === 'string'),
    strengthPhrases: (r.strengthPhrases as unknown[]).filter((v): v is string => typeof v === 'string'),
    suggestions: (r.suggestions as unknown[]).filter((s): s is Suggestion => {
      if (!s || typeof s !== 'object') return false
      const obj = s as Record<string, unknown>
      return typeof obj.original === 'string' && typeof obj.rewrite === 'string'
    }),
    summary: r.summary as string,
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: RequestBody
  try {
    body = await request.json() as RequestBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { text, userId, mode } = body

  if (typeof text !== 'string' || typeof userId !== 'string') {
    return NextResponse.json({ error: 'text and userId are required strings' }, { status: 400 })
  }

  if (mode !== 'text' && mode !== 'audio') {
    return NextResponse.json({ error: 'mode must be "text" or "audio"' }, { status: 400 })
  }

  // Word count validation: 50–2000 words
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  if (wordCount < 50) {
    return NextResponse.json(
      {
        error: `Please provide at least 50 words for a meaningful analysis. Your text has ${wordCount} word${wordCount === 1 ? '' : 's'}.`,
      },
      { status: 400 },
    )
  }

  if (wordCount > 2000) {
    return NextResponse.json(
      {
        error: `Please keep your text to 2,000 words or fewer. Your text has ${wordCount} words. Try analysing a single speech or presentation section at a time.`,
      },
      { status: 400 },
    )
  }

  // Rate limit
  const { allowed, remaining } = checkRateLimit(userId)
  if (!allowed) {
    return NextResponse.json(
      { error: 'You have reached your daily limit of 10 analyses. Resets at midnight UTC.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    )
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 })
  }

  let rawReport: unknown
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(text, mode) }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Anthropic API error:', response.status, errText)
      return NextResponse.json({ error: 'AI service error. Please try again.' }, { status: 502 })
    }

    const anthropicData = await response.json() as {
      content: Array<{ type: string; text?: string }>
    }

    const textBlock = anthropicData.content.find(b => b.type === 'text')
    if (!textBlock?.text) {
      return NextResponse.json({ error: 'No response from AI service.' }, { status: 502 })
    }

    // Strip markdown code fences if present
    const cleaned = textBlock.text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim()

    rawReport = JSON.parse(cleaned)
  } catch (err) {
    console.error('Tonality analysis error:', err)
    return NextResponse.json(
      { error: 'Failed to process analysis. Please try again.' },
      { status: 500 },
    )
  }

  let report: TonalityReport
  try {
    report = validateReport(rawReport)
  } catch (err) {
    console.error('Tonality report validation error:', err)
    return NextResponse.json(
      { error: 'Analysis returned an unexpected format. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json(
    { report },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } },
  )
}
