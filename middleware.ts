import type { NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

/**
 * Root middleware.
 *
 * Delegates session refresh to the Supabase SSR helper so auth cookies stay
 * current on every request.  All auth-gate logic lives client-side (useAuth
 * hook) or in Route Handlers — not here.
 */
export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    // Only run on routes that need Supabase auth cookies —
    // skips the session round-trip for all public page loads.
    '/portal/:path*',
    '/admin/:path*',
    '/api/:path*',
  ],
}
