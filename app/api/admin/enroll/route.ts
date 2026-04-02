import { NextRequest, NextResponse } from 'next/server'
import type { User } from '@supabase/supabase-js'
import { createServiceClient } from '@/utils/supabase/service'

/**
 * POST /api/admin/enroll
 * Manually grant enrollment for testing — bypasses Stripe webhook.
 * Protected by ADMIN_SECRET env var.
 *
 * Body: { email: string, courseSlug: string, tier?: 'self_paced' | 'with_checkins' }
 *
 * Usage (local dev):
 *   curl -X POST http://localhost:3000/api/admin/enroll \
 *     -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
 *     -H "Content-Type: application/json" \
 *     -d '{"email":"you@example.com","courseSlug":"the-foundation"}'
 */
export async function POST(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    return NextResponse.json({ error: 'Admin endpoint not configured' }, { status: 503 })
  }

  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email, courseSlug, tier = 'self_paced' } = await req.json() as {
    email: string
    courseSlug: string
    tier?: string
  }

  if (!email || !courseSlug) {
    return NextResponse.json({ error: 'email and courseSlug are required' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Look up user by email
  const listResult = await supabase.auth.admin.listUsers()
  if (listResult.error) {
    return NextResponse.json({ error: 'Failed to query users' }, { status: 500 })
  }
  const users = listResult.data.users as User[]

  const user = users.find((u) => u.email === email)
  if (!user) {
    return NextResponse.json({ error: `No user found with email: ${email}` }, { status: 404 })
  }

  // Check if already enrolled
  const { data: existing } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_slug', courseSlug)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({
      message: `User ${email} is already enrolled in ${courseSlug}`,
      userId: user.id,
      alreadyEnrolled: true,
    })
  }

  // Write enrollment
  const { error: insertError } = await supabase.from('enrollments').insert({
    user_id: user.id,
    course_slug: courseSlug,
    stripe_session_id: `admin_manual_${Date.now()}`,
    tier,
    enrolled_at: new Date().toISOString(),
  })

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({
    message: `Enrolled ${email} in ${courseSlug} (${tier})`,
    userId: user.id,
  })
}
