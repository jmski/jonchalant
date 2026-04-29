/**
 * Centralized, zod-validated environment variable schema.
 *
 * Imported at boot from `app/layout.tsx` (server) and the edge middleware so a
 * misconfigured deployment fails fast with a readable error instead of a
 * cryptic runtime crash later.
 *
 * Required vars throw immediately. Optional vars (Sentry, GA4, KIT) are
 * allowed to be undefined — features that depend on them must check for
 * presence and degrade gracefully.
 */
import { z } from 'zod'

/** Treat empty strings as undefined — common when .env has KEY= with no value. */
const optionalString = z
  .preprocess((v) => (v === '' ? undefined : v), z.string().min(1).optional())

const optionalUrl = z
  .preprocess((v) => (v === '' ? undefined : v), z.string().url().optional())

const serverSchema = z.object({
  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'NEXT_PUBLIC_SANITY_PROJECT_ID is required'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default('production'),
  SANITY_API_TOKEN: optionalString,

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
  SUPABASE_SERVICE_ROLE_KEY: optionalString,

  // Stripe
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,

  // Email
  RESEND_API_KEY: optionalString,

  // AI
  ANTHROPIC_API_KEY: optionalString,

  // Newsletter
  KIT_API_KEY: optionalString,
  KIT_FORM_ID: optionalString,

  // Observability
  SENTRY_DSN: optionalUrl,
  NEXT_PUBLIC_SENTRY_DSN: optionalUrl,
  SENTRY_AUTH_TOKEN: optionalString,
  SENTRY_ORG: optionalString,
  SENTRY_PROJECT: optionalString,

  // Analytics
  NEXT_PUBLIC_GA_ID: optionalString,

  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

export type ServerEnv = z.infer<typeof serverSchema>

const parsed = serverSchema.safeParse(process.env)

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
    .join('\n')
  // Use console.error before throwing so the message survives Next.js serverless wrapping.
  console.error('\n❌ Invalid environment variables:\n' + issues + '\n')
  throw new Error('Invalid environment variables — see logs above.')
}

export const env: ServerEnv = parsed.data

/** True when an optional integration is configured. */
export const flags = {
  sentry: Boolean(env.SENTRY_DSN || env.NEXT_PUBLIC_SENTRY_DSN),
  ga4: Boolean(env.NEXT_PUBLIC_GA_ID),
  stripe: Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET),
  resend: Boolean(env.RESEND_API_KEY),
  anthropic: Boolean(env.ANTHROPIC_API_KEY),
  kit: Boolean(env.KIT_API_KEY && env.KIT_FORM_ID),
  supabaseAdmin: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
} as const
