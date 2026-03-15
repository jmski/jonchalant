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
    /*
     * Run on every request EXCEPT:
     * - Next.js internals (_next/static, _next/image)
     * - Static files (favicon, images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
