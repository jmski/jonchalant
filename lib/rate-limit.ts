/**
 * Simple in-memory rate limiter for Next.js Route Handlers.
 *
 * Uses a module-level Map so the store persists across requests within the
 * same Node.js worker process. In serverless environments this provides
 * burst protection per instance; for stricter enforcement use Redis or
 * Vercel's Edge Rate Limiting middleware.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Returns true if the IP has exceeded the allowed request count.
 * @param ip      Client IP address (used as the rate-limit key)
 * @param limit   Max requests allowed within the window
 * @param windowMs Duration of the window in milliseconds
 */
export function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}

/** Extracts the most reliable client IP from a Next.js request. */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'
  );
}
