import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Lightweight middleware for request validation
 * 
 * Modern pattern: Middleware is minimal, auth checks happen client-side
 * via useAuth hook or in route handlers.
 * 
 * This middleware:
 * - Passes through all requests
 * - Uses response headers for any needed metadata
 * - Auth protection is handled by:
 *   1. Client-side useAuth hook with redirect
 *   2. Protected route handlers (API routes)
 */

export function middleware(request: NextRequest) {
  // All requests pass through - no blocking at middleware level
  // Auth checks happen client-side via useAuth hook
  return NextResponse.next()
}

// Configure which routes this middleware runs on (minimal scope)
export const config = {
  matcher: [
    // Only match API routes that might need auth
    '/api/auth/:path*',
  ],
}
