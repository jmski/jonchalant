import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

const GRACE_PERIOD_DAYS = 30

/**
 * POST /api/account/delete
 *
 * Soft-deletes the signed-in user's account. Sets:
 *   - profile.deletion_requested_at = now()
 *   - profile.deletion_scheduled_for = now() + 30 days
 *
 * The hard delete is performed by `purge_scheduled_account_deletions()`
 * (run on a schedule or manually). Until then, the user can sign in and
 * cancel via DELETE /api/account/delete (cancel-delete).
 *
 * After scheduling, we sign the user out so the UI bounces them to /login.
 */
export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const scheduledFor = new Date(now.getTime() + GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000)

  const { error } = await supabase
    .from('profiles')
    .update({
      deletion_requested_at: now.toISOString(),
      deletion_scheduled_for: scheduledFor.toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    console.error('[account-delete] update failed:', error.message)
    return NextResponse.json({ error: 'Failed to schedule deletion' }, { status: 500 })
  }

  await supabase.auth.signOut()

  return NextResponse.json({
    scheduled_for: scheduledFor.toISOString(),
    grace_period_days: GRACE_PERIOD_DAYS,
  })
}

/**
 * DELETE /api/account/delete
 *
 * Cancels a pending deletion (clears deletion_requested_at and
 * deletion_scheduled_for). Used by the "cancel deletion" banner in the
 * settings UI.
 */
export async function DELETE() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('profiles')
    .update({ deletion_requested_at: null, deletion_scheduled_for: null })
    .eq('id', user.id)

  if (error) {
    console.error('[account-delete] cancel failed:', error.message)
    return NextResponse.json({ error: 'Failed to cancel deletion' }, { status: 500 })
  }

  return NextResponse.json({ cancelled: true })
}
