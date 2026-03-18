import type { SupabaseClient } from '@supabase/supabase-js'

export interface MovementPlan {
  id: string
  user_id: string
  title: string
  goals: string | null
  limitations: string | null
  plan_data: Record<string, unknown>
  created_at: string
}

/**
 * Returns all movement plans for a user, ordered by most recent first.
 */
export async function getMovementPlans(
  supabase: SupabaseClient,
  userId: string,
): Promise<MovementPlan[]> {
  const { data, error } = await supabase
    .from('movement_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getMovementPlans error:', error)
    return []
  }

  return (data ?? []) as MovementPlan[]
}

/**
 * Inserts a new movement plan for a user and returns the created row.
 */
export async function saveMovementPlan(
  supabase: SupabaseClient,
  userId: string,
  title: string,
  goals: string | null,
  limitations: string | null,
  planData: Record<string, unknown>,
): Promise<MovementPlan | null> {
  const { data, error } = await supabase
    .from('movement_plans')
    .insert({
      user_id: userId,
      title,
      goals,
      limitations,
      plan_data: planData,
    })
    .select()
    .single()

  if (error) {
    console.error('saveMovementPlan error:', error)
    return null
  }

  return data as MovementPlan
}

/**
 * Deletes a movement plan by ID.
 * The user_id filter is a belt-and-suspenders guard alongside the RLS policy.
 * Returns true on success, false on error.
 */
export async function deleteMovementPlan(
  supabase: SupabaseClient,
  userId: string,
  planId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from('movement_plans')
    .delete()
    .eq('id', planId)
    .eq('user_id', userId)

  if (error) {
    console.error('deleteMovementPlan error:', error)
    return false
  }

  return true
}
