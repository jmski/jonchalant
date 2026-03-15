import { NextRequest, NextResponse } from 'next/server'

// Basic RFC-aligned email regex — catches obvious malformed addresses
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email } = body

    // --- Input validation ---
    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 },
      )
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName =
      firstName && typeof firstName === 'string' ? firstName.trim() : undefined

    // --- Kit (ConvertKit) API v3 ---
    const apiKey = process.env.KIT_API_KEY
    const formId = process.env.KIT_FORM_ID

    if (!apiKey || !formId) {
      console.error('Subscribe: KIT_API_KEY or KIT_FORM_ID env var is missing')
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 },
      )
    }

    const kitRes = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          email: cleanEmail,
          ...(cleanName ? { first_name: cleanName } : {}),
        }),
      },
    )

    if (!kitRes.ok) {
      const kitBody = await kitRes.json().catch(() => ({}))
      console.error('Subscribe: Kit API error', kitRes.status, kitBody)
      // Kit returns 422 for invalid/blocked emails — surface a clean message
      if (kitRes.status === 422) {
        return NextResponse.json(
          { error: 'That email address could not be subscribed. Please check it and try again.' },
          { status: 422 },
        )
      }
      return NextResponse.json(
        { error: 'Could not complete your subscription. Please try again.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe route: unexpected error', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    )
  }
}
