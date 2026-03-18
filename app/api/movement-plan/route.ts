import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RequestBody {
  goals: string
  limitations: string
  fitnessLevel: string
  hoursPerWeek: number
  userId: string
}

interface Exercise {
  name: string
  duration: string
  instruction: string
  leadershipConnection: string
}

interface Session {
  day: string
  duration: string
  category: string
  exercises: Exercise[]
}

interface Week {
  weekNumber: number
  theme: string
  focus: string
  sessions: Session[]
}

interface MovementPlanData {
  title: string
  summary: string
  weeks: Week[]
  progressionNote: string
  adaptations: string
}

// ---------------------------------------------------------------------------
// In-memory rate limiter — max 5 plan generations per userId per UTC day.
// NOTE: Resets on server restart and is not shared across serverless instances.
// For production scale, replace with a Redis-backed counter.
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number
  /** Midnight UTC (ms) that this window expires */
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const MAX_PER_DAY = 5

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

const SYSTEM_PROMPT = `You are Jon's movement curriculum designer. Jon is an executive presence coach whose methodology — Body-Led Leadership — recognises that physical embodiment is the foundation of confident, commanding leadership.

Your role is to create personalised 4-week movement plans for busy professionals and introverts who want to develop their physical presence and executive impact.

Jon's methodology integrates:
- Grounding & Stillness: rooting the body, reducing nervous energy, establishing physical calm
- Vocal resonance work: breath, posture, and the body's role in vocal authority
- Spatial ownership: how leaders take up space intentionally without aggression
- Stage presence: presence before speaking, transitions, recovery under pressure
- Kinesthetic leadership: using movement to shift internal states

Plan design principles:
- Each weekly theme builds progressively on the previous week
- Sessions must be practical for office workers and can be done at home with no equipment
- Exercise instructions must be specific and embodied — not generic fitness advice
- leadershipConnection must directly link the physical practice to an executive presence outcome
- STRICTLY respect stated limitations — never suggest anything that conflicts with them
- Total weekly session time must not exceed stated hoursPerWeek
- Fitness level determines exercise complexity and intensity

Output format:
- title: personalised, evocative (not generic), max 8 words
- summary: warm, direct, speaks to the person's stated goals — 2-3 sentences
- 4 weeks, each with 3-5 sessions
- Each session has 3-5 exercises
- progressionNote: how the 4 weeks build toward transformation
- adaptations: specific modifications based on the stated limitations (if none stated, provide general modification principles)

You must return ONLY a valid JSON object with no preamble, explanation, or markdown code fences.`

function buildUserPrompt(
  goals: string,
  limitations: string,
  fitnessLevel: string,
  hoursPerWeek: number,
): string {
  return `Create a personalised 4-week movement plan for this professional.

GOALS: ${goals}
PHYSICAL LIMITATIONS: ${limitations || 'None stated'}
FITNESS LEVEL: ${fitnessLevel}
AVAILABLE TIME: ${hoursPerWeek} hour${hoursPerWeek === 1 ? '' : 's'} per week across all sessions combined

STRICT REQUIREMENT: Do not suggest any exercise that conflicts with the stated limitations. If limitations are severe, modify or replace exercises accordingly and note this in the adaptations field.

Return a JSON object with this exact shape:
{
  "title": "Your personalised plan title (max 8 words)",
  "summary": "2-3 sentence personalised intro addressing their goals",
  "weeks": [
    {
      "weekNumber": 1,
      "theme": "Theme name",
      "focus": "One sentence describing the week's focus",
      "sessions": [
        {
          "day": "Monday",
          "duration": "20 minutes",
          "category": "Category name",
          "exercises": [
            {
              "name": "Exercise name",
              "duration": "3 minutes",
              "instruction": "Clear, specific, embodied instruction",
              "leadershipConnection": "How this directly builds executive presence"
            }
          ]
        }
      ]
    }
  ],
  "progressionNote": "How the 4-week arc builds toward transformation",
  "adaptations": "Specific modifications based on stated limitations"
}`
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function validateExercise(e: unknown): e is Exercise {
  if (!e || typeof e !== 'object') return false
  const obj = e as Record<string, unknown>
  return (
    isNonEmptyString(obj.name) &&
    isNonEmptyString(obj.duration) &&
    isNonEmptyString(obj.instruction) &&
    isNonEmptyString(obj.leadershipConnection)
  )
}

function validateSession(s: unknown): s is Session {
  if (!s || typeof s !== 'object') return false
  const obj = s as Record<string, unknown>
  return (
    isNonEmptyString(obj.day) &&
    isNonEmptyString(obj.duration) &&
    isNonEmptyString(obj.category) &&
    Array.isArray(obj.exercises) &&
    obj.exercises.length > 0 &&
    (obj.exercises as unknown[]).every(validateExercise)
  )
}

function validateWeek(w: unknown): w is Week {
  if (!w || typeof w !== 'object') return false
  const obj = w as Record<string, unknown>
  return (
    typeof obj.weekNumber === 'number' &&
    isNonEmptyString(obj.theme) &&
    isNonEmptyString(obj.focus) &&
    Array.isArray(obj.sessions) &&
    obj.sessions.length > 0 &&
    (obj.sessions as unknown[]).every(validateSession)
  )
}

function validatePlan(raw: unknown): MovementPlanData {
  if (!raw || typeof raw !== 'object') throw new Error('Response is not an object')
  const r = raw as Record<string, unknown>

  if (!isNonEmptyString(r.title)) throw new Error('title missing')
  if (!isNonEmptyString(r.summary)) throw new Error('summary missing')
  if (!Array.isArray(r.weeks) || r.weeks.length !== 4) throw new Error('weeks must be an array of exactly 4 items')

  for (const w of r.weeks as unknown[]) {
    if (!validateWeek(w)) {
      const week = w as Record<string, unknown>
      throw new Error(`Invalid week structure for week ${String(week?.weekNumber ?? '?')}`)
    }
  }

  if (!isNonEmptyString(r.progressionNote)) throw new Error('progressionNote missing')
  if (!isNonEmptyString(r.adaptations)) throw new Error('adaptations missing')

  return raw as MovementPlanData
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

  const { goals, limitations, fitnessLevel, hoursPerWeek, userId } = body

  if (!isNonEmptyString(userId)) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }
  if (!isNonEmptyString(goals)) {
    return NextResponse.json({ error: 'goals is required' }, { status: 400 })
  }
  if (!isNonEmptyString(fitnessLevel)) {
    return NextResponse.json({ error: 'fitnessLevel is required' }, { status: 400 })
  }
  if (typeof hoursPerWeek !== 'number' || hoursPerWeek < 1 || hoursPerWeek > 7) {
    return NextResponse.json({ error: 'hoursPerWeek must be a number between 1 and 7' }, { status: 400 })
  }

  // Rate limit
  const safeUserId = userId.trim().slice(0, 128)
  const { allowed, remaining } = checkRateLimit(safeUserId)

  if (!allowed) {
    return NextResponse.json(
      { error: 'You have reached your daily limit of 5 plan generations. Resets at midnight UTC.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    )
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 })
  }

  let rawPlan: unknown
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 3000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: buildUserPrompt(goals, limitations ?? '', fitnessLevel, hoursPerWeek),
          },
        ],
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

    rawPlan = JSON.parse(cleaned)
  } catch (err) {
    console.error('movement-plan generation error:', err)
    return NextResponse.json(
      { error: 'Failed to generate plan. Please try again.' },
      { status: 500 },
    )
  }

  let plan: MovementPlanData
  try {
    plan = validatePlan(rawPlan)
  } catch (err) {
    console.error('movement-plan validation error:', err)
    return NextResponse.json(
      { error: 'Plan generation returned an unexpected format. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json(
    { plan },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } },
  )
}
