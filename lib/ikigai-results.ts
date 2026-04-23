import { createClient } from '@/utils/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { IkigaiResult, IkigaiScores, IkigaiPattern, Quadrant } from '@/lib/types'

export type { IkigaiResult, IkigaiScores, IkigaiPattern, Quadrant }

// ── Pure calculation helpers ──────────────────────────────────────────────────
// No Supabase calls — safe to call from components and server functions alike.

/**
 * Returns the quadrant with the highest score. Ties are broken by quadrant
 * order: passion > mission > vocation > profession.
 */
export function calculateStrongestQuadrant(scores: IkigaiScores): Quadrant {
  const order: Quadrant[] = ['passion', 'mission', 'vocation', 'profession']
  return order.reduce((best, q) => (scores[q] > scores[best] ? q : best))
}

/**
 * Returns the three-circle pattern when exactly three quadrants are "strong"
 * (≥ mean + threshold) and one is "weak", otherwise null.
 *
 * threshold is tunable — default 1.0 means a quadrant must score at least
 * one point above the mean to be considered strong.
 */
export function calculatePattern(
  scores: IkigaiScores,
  threshold = 1.0
): IkigaiPattern | null {
  const values = Object.values(scores) as number[]
  const mean = values.reduce((s, v) => s + v, 0) / values.length

  const strong = (q: Quadrant) => scores[q] >= mean + threshold
  const weakQuadrants = (['passion', 'mission', 'vocation', 'profession'] as Quadrant[]).filter(
    (q) => !strong(q)
  )

  if (weakQuadrants.length !== 1) return null

  const patternMap: Record<Quadrant, IkigaiPattern> = {
    passion: 'useful-unexcited',
    mission: 'comfortable-empty',
    vocation: 'delight-uncertain',
    profession: 'delight-no-wealth',
  }

  return patternMap[weakQuadrants[0]]
}

// ── Supabase helpers ──────────────────────────────────────────────────────────
// Mirror the pattern in lib/portal-progress.ts: accept optional SupabaseClient,
// fall back to browser client. Call with a server client from Server Components.

function getClient(client?: SupabaseClient): SupabaseClient {
  return client ?? createClient()
}

function rowToResult(row: any): IkigaiResult {
  return {
    id: row.id,
    userId: row.user_id,
    passion: row.passion_score,
    mission: row.mission_score,
    vocation: row.vocation_score,
    profession: row.profession_score,
    strongestQuadrant: row.strongest_quadrant as Quadrant,
    pattern: (row.pattern as IkigaiPattern) ?? null,
    createdAt: row.created_at,
  }
}

/**
 * Save a new result set for the current user. Calculates strongestQuadrant
 * and pattern before inserting. Returns null if the insert fails.
 */
export async function saveIkigaiResult(
  scores: IkigaiScores,
  client?: SupabaseClient
): Promise<IkigaiResult | null> {
  const db = getClient(client)

  const strongestQuadrant = calculateStrongestQuadrant(scores)
  const pattern = calculatePattern(scores)

  const { data, error } = await db
    .from('ikigai_results')
    .insert({
      passion_score: scores.passion,
      mission_score: scores.mission,
      vocation_score: scores.vocation,
      profession_score: scores.profession,
      strongest_quadrant: strongestQuadrant,
      pattern,
    })
    .select()
    .single()

  if (error) {
    console.error('[saveIkigaiResult]', error.message)
    return null
  }

  return rowToResult(data)
}

/**
 * Fetch the most recent result for the current user.
 * Returns null if not authenticated or no results exist yet.
 */
export async function getLatestIkigaiResult(
  client?: SupabaseClient
): Promise<IkigaiResult | null> {
  const db = getClient(client)

  const { data, error } = await db
    .from('ikigai_results')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    if (error.code !== 'PGRST116') {
      // PGRST116 = no rows returned — expected when the user has no results yet
      console.error('[getLatestIkigaiResult]', error.message)
    }
    return null
  }

  return rowToResult(data)
}

/**
 * Fetch all historical results for the current user, newest first.
 */
export async function getIkigaiResultHistory(
  client?: SupabaseClient
): Promise<IkigaiResult[]> {
  const db = getClient(client)

  const { data, error } = await db
    .from('ikigai_results')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getIkigaiResultHistory]', error.message)
    return []
  }

  return (data ?? []).map(rowToResult)
}
