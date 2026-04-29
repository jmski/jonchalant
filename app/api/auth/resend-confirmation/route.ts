import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * POST /api/auth/resend-confirmation
 *
 * Re-sends the email-confirmation link for an unconfirmed signup. Used by
 * the "didn't get the email?" button on the /auth/check-email interstitial.
 *
 * Body: { email: string }
 *
 * Always returns 200 with the same payload regardless of whether the email
 * matches an account, to avoid leaking which addresses are registered.
 */
export async function POST(req: NextRequest) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const supabase = await createClient()
  const origin =
    req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jonchalant.com'

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/portal`,
    },
  })

  if (error) {
    // Log internally but report success — don't leak whether the email is
    // registered or already confirmed.
    console.warn('[resend-confirmation] supabase returned:', error.message)
  }

  return NextResponse.json({ ok: true })
}
