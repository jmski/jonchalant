import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const destination = next || '/portal'
      // Route through MFA challenge — session starts at aal1
      const mfaUrl = `${origin}/mfa?redirect=${encodeURIComponent(destination)}`
      return NextResponse.redirect(mfaUrl)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
