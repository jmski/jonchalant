/**
 * Next.js 16 instrumentation hook.
 *
 * Loads Sentry server / edge config based on the active runtime. The
 * `register` function is invoked once per Node process at startup.
 *
 * onRequestError forwards request-scoped errors to Sentry so they're
 * captured with full request context.
 */
import * as Sentry from '@sentry/nextjs';


export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

export const onRequestError = Sentry.captureRequestError;