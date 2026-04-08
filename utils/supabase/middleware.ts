import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Refreshes the user's Supabase session on every request.
 * Must be called from the root middleware.ts so auth cookies stay current.
 *
 * Important: do not add logic between createServerClient and getUser() —
 * doing so can cause subtle logout bugs.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Write updated cookies onto both the request and the response
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the session — getUser() validates the JWT and rotates the token
  // when needed.  Do not remove this call.
  const { data: { user }, error: getUserError } = await supabase.auth.getUser()

  // If the refresh token is stale/revoked, redirect to login so the user
  // re-authenticates cleanly instead of staying in a silent limbo.
  if (getUserError && !user) {
    const pathname = request.nextUrl.pathname
    const isProtectedPage = pathname.startsWith('/portal') || pathname.startsWith('/admin')
    if (isProtectedPage) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/login'
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    // For API routes, let them proceed — they'll get RLS errors naturally
    return supabaseResponse
  }

  // Enforce MFA: if user is logged in but only aal1, redirect to /mfa
  // (skip for API routes — those will fail at the RLS level instead)
  const pathname = request.nextUrl.pathname
  const isProtectedPage = pathname.startsWith('/portal') || pathname.startsWith('/admin')

  if (user && isProtectedPage) {
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    if (aal?.currentLevel !== 'aal2') {
      const mfaUrl = request.nextUrl.clone()
      mfaUrl.pathname = '/mfa'
      mfaUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(mfaUrl)
    }
  }

  return supabaseResponse
}
