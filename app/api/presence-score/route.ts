import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AnswerItem {
  question: string
  answer: string
  dimension: string
}

interface RequestBody {
  answers: AnswerItem[]
  userId: string
}

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
// In-memory rate limiter — max 3 assessments per userId per UTC day.
// NOTE: Resets on server restart and is not shared across serverless instances.
// For production scale, replace with a Redis-backed counter.
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number
  /** Midnight UTC (ms) that this window expires */
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const MAX_PER_DAY = 3

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

const SYSTEM_PROMPT = `You are Jon's Executive Presence Assessment Tool. Your role is to analyse responses to a structured presence audit and produce a precise, actionable score report.

Jon's methodology is grounded in five dimensions of executive presence:
- Vocal Authority: clarity, pace, resonance, and conviction in speech
- Physical Presence: posture, grounding, breath, and spatial ownership
- Strategic Visibility: intentional positioning, networking, and being seen for the right reasons
- Authentic Confidence: inner alignment between values, identity, and outward expression
- Room Command: the ability to hold attention, shift energy, and lead without dominance

Scoring principles:
- Scores range from 0–100. Be honest and calibrated — do not inflate scores.
- A score of 50 is average. 70+ is strong. Below 40 indicates a significant area to address.
- The overallScore is a weighted average across all five dimensions.
- Each summary should be warm but direct — name what is working and what is limiting the person.
- topRecommendation must be a specific, embodied drill or practice (not generic advice).
- nextStep must reference Jon's methodology (Body-Led Leadership, Quiet Command, Ikigai, or The Three Phases).

You must return ONLY a valid JSON object with no preamble, explanation, or markdown code fences. The JSON must exactly match the required schema.`

function buildUserPrompt(answers: AnswerItem[]): string {
  const formatted = answers
    .map(
      (a, i) =>
        `Q${i + 1} [${a.dimension}]\nQuestion: ${a.question}\nAnswer: ${a.answer}`,
    )
    .join('\n\n')

  return `Here are the assessment responses. Analyse them and return the JSON report.\n\n${formatted}\n\nReturn a JSON object with this exact shape:\n{\n  "overallScore": <0-100>,\n  "dimensions": [\n    { "name": "Vocal Authority", "score": <0-100>, "summary": "<2-3 sentences>", "topRecommendation": "<specific drill>" },\n    { "name": "Physical Presence", "score": <0-100>, "summary": "<2-3 sentences>", "topRecommendation": "<specific drill>" },\n    { "name": "Strategic Visibility", "score": <0-100>, "summary": "<2-3 sentences>", "topRecommendation": "<specific drill>" },\n    { "name": "Authentic Confidence", "score": <0-100>, "summary": "<2-3 sentences>", "topRecommendation": "<specific drill>" },\n    { "name": "Room Command", "score": <0-100>, "summary": "<2-3 sentences>", "topRecommendation": "<specific drill>" }\n  ],\n  "strengthSummary": "<2-3 sentences on strongest area>",\n  "priorityFocus": "<single most impactful area>",\n  "nextStep": "<one specific next action tied to Jon\'s methodology>"\n}`
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const REQUIRED_DIMENSIONS = [
  'Vocal Authority',
  'Physical Presence',
  'Strategic Visibility',
  'Authentic Confidence',
  'Room Command',
] as const

function isValidScore(v: unknown): v is number {
  return typeof v === 'number' && v >= 0 && v <= 100 && Number.isFinite(v)
}

function validateReport(raw: unknown): PresenceReport {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Response is not an object')
  }

  const r = raw as Record<string, unknown>

  if (!isValidScore(r.overallScore)) {
    throw new Error('overallScore missing or out of range')
  }

  if (!Array.isArray(r.dimensions) || r.dimensions.length !== 5) {
    throw new Error('dimensions must be an array of exactly 5 items')
  }

  const dimensionNames = (r.dimensions as unknown[]).map((d) => {
    if (!d || typeof d !== 'object') throw new Error('Each dimension must be an object')
    const dim = d as Record<string, unknown>

    if (typeof dim.name !== 'string' || !REQUIRED_DIMENSIONS.includes(dim.name as typeof REQUIRED_DIMENSIONS[number])) {
      throw new Error(`Invalid dimension name: ${String(dim.name)}`)
    }
    if (!isValidScore(dim.score)) {
      throw new Error(`Dimension "${dim.name}" has invalid score`)
    }
    if (typeof dim.summary !== 'string' || dim.summary.trim() === '') {
      throw new Error(`Dimension "${dim.name}" missing summary`)
    }
    if (typeof dim.topRecommendation !== 'string' || dim.topRecommendation.trim() === '') {
      throw new Error(`Dimension "${dim.name}" missing topRecommendation`)
    }
    return dim.name
  })

  // Ensure all five canonical dimensions are present
  for (const name of REQUIRED_DIMENSIONS) {
    if (!dimensionNames.includes(name)) {
      throw new Error(`Missing dimension: ${name}`)
    }
  }

  if (typeof r.strengthSummary !== 'string' || r.strengthSummary.trim() === '') {
    throw new Error('strengthSummary missing')
  }
  if (typeof r.priorityFocus !== 'string' || r.priorityFocus.trim() === '') {
    throw new Error('priorityFocus missing')
  }
  if (typeof r.nextStep !== 'string' || r.nextStep.trim() === '') {
    throw new Error('nextStep missing')
  }

  return raw as PresenceReport
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // --- Parse body ---
  let body: RequestBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { answers, userId } = body

  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json(
      { error: 'answers must be a non-empty array' },
      { status: 400 },
    )
  }

  // Validate each answer item
  for (const item of answers) {
    if (
      !item ||
      typeof item.question !== 'string' ||
      item.question.trim() === '' ||
      typeof item.answer !== 'string' ||
      item.answer.trim() === '' ||
      typeof item.dimension !== 'string' ||
      item.dimension.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'Each answer must have non-empty question, answer, and dimension fields' },
        { status: 400 },
      )
    }
  }

  // --- Rate limit ---
  const safeUserId = userId.trim().slice(0, 128)
  const { allowed, remaining } = checkRateLimit(safeUserId)

  if (!allowed) {
    return NextResponse.json(
      { error: 'You have reached your daily assessment limit (3 per day). Come back tomorrow.' },
      {
        status: 429,
        headers: { 'X-RateLimit-Remaining': '0' },
      },
    )
  }

  // --- API key ---
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('presence-score: ANTHROPIC_API_KEY env var is not set')
    return NextResponse.json(
      { error: 'Assessment service is temporarily unavailable. Please try again later.' },
      { status: 503 },
    )
  }

  // --- Call Anthropic (non-streaming) ---
  let anthropicRes: Response
  try {
    anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: buildUserPrompt(answers) },
        ],
      }),
    })
  } catch (err) {
    console.error('presence-score: network error calling Anthropic', err)
    return NextResponse.json(
      { error: 'Unable to reach the assessment service. Please check your connection and try again.' },
      { status: 502 },
    )
  }

  if (!anthropicRes.ok) {
    const errorBody = await anthropicRes.text().catch(() => '')
    console.error('presence-score: Anthropic API error', anthropicRes.status, errorBody)

    if (anthropicRes.status === 429) {
      return NextResponse.json(
        { error: 'Assessment service is currently busy. Please wait a moment and try again.' },
        { status: 429 },
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong generating your report. Please try again.' },
      { status: 500 },
    )
  }

  // --- Parse Anthropic response ---
  let responseText: string
  try {
    const responseJson = await anthropicRes.json() as {
      content?: Array<{ type: string; text: string }>
    }
    const block = responseJson.content?.find((b) => b.type === 'text')
    if (!block?.text) throw new Error('No text content in response')
    responseText = block.text.trim()
  } catch (err) {
    console.error('presence-score: failed to parse Anthropic response structure', err)
    return NextResponse.json(
      { error: 'Failed to read the assessment response. Please try again.' },
      { status: 500 },
    )
  }

  // Strip markdown fences in case the model disobeys instructions
  const jsonText = responseText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  // --- Parse and validate JSON ---
  let report: PresenceReport
  try {
    const parsed: unknown = JSON.parse(jsonText)
    report = validateReport(parsed)
  } catch (err) {
    console.error('presence-score: invalid report JSON from Claude', err, jsonText)
    return NextResponse.json(
      { error: 'The assessment could not be scored correctly. Please try again.' },
      { status: 500 },
    )
  }

  return NextResponse.json(
    { report },
    {
      status: 200,
      headers: { 'X-RateLimit-Remaining': String(remaining) },
    },
  )
}
