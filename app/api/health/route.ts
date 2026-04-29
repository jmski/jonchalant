/**
 * Liveness + readiness probe.
 *
 * GET /api/health
 *   200 → all upstream services responding
 *   503 → at least one upstream is failing (body lists which)
 *
 * Intentionally lightweight: a single SELECT against Supabase and a HEAD
 * request to the Sanity CDN. No auth, no caching.
 */
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type CheckResult = { ok: boolean; latencyMs: number; error?: string }

async function checkSupabase(): Promise<CheckResult> {
  const start = Date.now()
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('profiles').select('id', { head: true, count: 'exact' }).limit(1)
    if (error) return { ok: false, latencyMs: Date.now() - start, error: error.message }
    return { ok: true, latencyMs: Date.now() - start }
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : 'unknown',
    }
  }
}

async function checkSanity(): Promise<CheckResult> {
  const start = Date.now()
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
  if (!projectId) {
    return { ok: false, latencyMs: 0, error: 'SANITY_PROJECT_ID missing' }
  }
  try {
    const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=*[_type=="sanity.imageAsset"][0]._id`
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) {
      return { ok: false, latencyMs: Date.now() - start, error: `HTTP ${res.status}` }
    }
    return { ok: true, latencyMs: Date.now() - start }
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : 'unknown',
    }
  }
}

export async function GET() {
  const [supabase, sanity] = await Promise.all([checkSupabase(), checkSanity()])

  const allOk = supabase.ok && sanity.ok

  return NextResponse.json(
    {
      status: allOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      checks: { supabase, sanity },
    },
    { status: allOk ? 200 : 503 },
  )
}
