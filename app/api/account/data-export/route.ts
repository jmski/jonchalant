import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * GET /api/account/data-export
 *
 * Returns a JSON file containing all of the signed-in user's data from the
 * tables they own under RLS:
 *   - profile
 *   - enrollments (active + revoked)
 *   - lesson_progress
 *   - movement_plans
 *   - inquiries (rows they submitted while logged in)
 *
 * Sensitive columns from auth.users (passwords, MFA secrets) are NOT
 * included — Supabase doesn't expose them to the user role anyway.
 */
export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [profile, enrollments, lessonProgress, movementPlans, inquiries] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
    supabase.from('enrollments').select('*').eq('user_id', user.id),
    supabase.from('lesson_progress').select('*').eq('user_id', user.id),
    supabase.from('movement_plans').select('*').eq('user_id', user.id),
    supabase.from('inquiries').select('*').eq('created_by', user.id),
  ])

  const payload = {
    exported_at: new Date().toISOString(),
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
    },
    profile: profile.data ?? null,
    enrollments: enrollments.data ?? [],
    lesson_progress: lessonProgress.data ?? [],
    movement_plans: movementPlans.data ?? [],
    inquiries: inquiries.data ?? [],
  }

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="jonchalant-export-${user.id}.json"`,
    },
  })
}
