import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface RequestBody {
  messages: ChatMessage[]
  userId: string
}

// ---------------------------------------------------------------------------
// In-memory rate limiter — max 20 messages per userId per UTC day.
// NOTE: This resets on server restart and is not shared across serverless
// instances. For production scale, replace with a Redis-backed counter.
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number
  /** Midnight UTC (ms) that this window expires */
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const MAX_MESSAGES_PER_DAY = 20

function getMidnightUTC(): number {
  const now = new Date()
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
}

function checkRateLimit(userId: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)

  if (!entry || now >= entry.resetAt) {
    // Fresh window
    rateLimitMap.set(userId, { count: 1, resetAt: getMidnightUTC() })
    return { allowed: true, remaining: MAX_MESSAGES_PER_DAY - 1 }
  }

  if (entry.count >= MAX_MESSAGES_PER_DAY) {
    return { allowed: false, remaining: 0 }
  }

  entry.count += 1
  return { allowed: true, remaining: MAX_MESSAGES_PER_DAY - entry.count }
}

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Jon's AI Presence Coach — a warm, direct coaching assistant trained in Jon's methodology for finding purpose-led work and embodying it.

Your coaching is grounded in these core frameworks:
- Body-Led Leadership: presence starts in the body, not the mind. Posture, breath, and physical grounding precede confident communication.
- The Four Pillars: Grounding, Energy, Flow, Command — the medium-agnostic embodiment archetypes.
- Ikigai: alignment comes from the intersection of Passion, Mission, Vocation, and Profession. The goal is finding the work you were meant for.
- The Three Phases: Dance & Discipline → Sales & Service → The Mission.

Your tone is: warm but direct, practical not theoretical, encouraging without being sycophantic. You ask one focused follow-up question per response. You never suggest the user change their personality — you amplify who they already are.

Keep responses concise — 3-5 sentences maximum unless the user asks for detail. Always ground advice in physical, embodied practice where relevant.`

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // --- Parse and validate body ---
  let body: RequestBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { messages, userId } = body

  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
    return NextResponse.json(
      { error: 'userId is required' },
      { status: 400 },
    )
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: 'messages must be a non-empty array' },
      { status: 400 },
    )
  }

  // Validate message shape and sanitise — reject anything that doesn't fit
  const sanitisedMessages: ChatMessage[] = []
  for (const msg of messages) {
    if (
      !msg ||
      (msg.role !== 'user' && msg.role !== 'assistant') ||
      typeof msg.content !== 'string' ||
      msg.content.trim().length === 0
    ) {
      return NextResponse.json(
        { error: 'Each message must have role "user" or "assistant" and non-empty content' },
        { status: 400 },
      )
    }
    sanitisedMessages.push({ role: msg.role, content: msg.content.trim() })
  }

  // --- Rate limit ---
  const safeUserId = userId.trim().slice(0, 128) // prevent oversized keys
  const { allowed, remaining } = checkRateLimit(safeUserId)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Daily message limit reached. Your limit resets at midnight UTC.' },
      {
        status: 429,
        headers: { 'X-RateLimit-Remaining': '0' },
      },
    )
  }

  // --- Anthropic API key ---
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('presence-coach: ANTHROPIC_API_KEY env var is not set')
    return NextResponse.json(
      { error: 'Coaching service is temporarily unavailable. Please try again later.' },
      { status: 503 },
    )
  }

  // --- Call Anthropic streaming API ---
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
        max_tokens: 1000,
        stream: true,
        system: SYSTEM_PROMPT,
        messages: sanitisedMessages,
      }),
    })
  } catch (err) {
    console.error('presence-coach: network error calling Anthropic', err)
    return NextResponse.json(
      { error: 'Unable to reach the coaching service. Please check your connection and try again.' },
      { status: 502 },
    )
  }

  if (!anthropicRes.ok) {
    const errorBody = await anthropicRes.text().catch(() => '')
    console.error(
      'presence-coach: Anthropic API error',
      anthropicRes.status,
      errorBody,
    )

    if (anthropicRes.status === 429) {
      return NextResponse.json(
        { error: 'The coaching service is currently busy. Please wait a moment and try again.' },
        { status: 429 },
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong with the coaching service. Please try again.' },
      { status: 500 },
    )
  }

  // --- Stream the response body back to the client ---
  // The Anthropic SSE stream is forwarded directly — the API key is never
  // included in the response and never reaches the client.
  return new NextResponse(anthropicRes.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      'X-RateLimit-Remaining': String(remaining),
    },
  })
}
