import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email } = body

    // --- Input validation ---
    if (
      !firstName ||
      typeof firstName !== 'string' ||
      firstName.trim().length === 0
    ) {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 },
      )
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 },
      )
    }

    const cleanName = firstName.trim()
    const cleanEmail = email.trim().toLowerCase()

    // --- Supabase ---
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.SUPABASE_SERVICE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Subscribe: missing Supabase env vars')
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 },
      )
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Upsert so re-subscribing with the same email is a no-op
    const { error: dbError } = await supabase.from('subscribers').upsert(
      {
        first_name: cleanName,
        email: cleanEmail,
        source: 'blog_optin',
      },
      { onConflict: 'email' },
    )

    if (dbError) {
      console.error('Subscribe: Supabase error', dbError)
      return NextResponse.json(
        { error: 'Could not save your subscription. Please try again.' },
        { status: 500 },
      )
    }

    // --- Optional: deliver lead magnet via Resend ---
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendApiKey)
        await resend.emails.send({
          from: 'Jon <jon@jonchalant.com>',
          to: cleanEmail,
          subject: "Here's your Quiet Command Starter Guide",
          text: [
            `Hi ${cleanName},`,
            '',
            "Thank you for signing up — you'll receive the Quiet Command Starter Guide shortly.",
            '',
            'Jon',
          ].join('\n'),
        })
      } catch (emailErr) {
        // Email failure is non-fatal; subscriber is already stored
        console.error('Subscribe: Resend delivery error', emailErr)
      }
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
