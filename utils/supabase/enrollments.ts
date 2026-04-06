import { createClient } from '@/utils/supabase/server'
import { createServiceClient } from '@/utils/supabase/service'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface Enrollment {
  id: string
  user_id: string
  course_slug: string
  stripe_session_id: string
  enrolled_at: string
  tier: 'self_paced' | 'with_checkins'
}

/**
 * Check whether a user is enrolled in a given course.
 * Reads from the `enrollments` table (RLS: users can only see their own rows).
 */
export async function isEnrolled(userId: string, courseSlug: string): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .maybeSingle()

  if (error) {
    console.error('[enrollments] isEnrolled error:', error.message)
    return false
  }

  return data !== null
}

/**
 * Write an enrollment record after a successful Stripe checkout.
 * Called from the webhook handler using the service-role client.
 */
export async function enroll({
  userId,
  courseSlug,
  stripeSessionId,
  tier,
}: {
  userId: string
  courseSlug: string
  stripeSessionId: string
  tier: 'self_paced' | 'with_checkins'
}): Promise<void> {
  const supabase = createServiceClient()
  const { error } = await supabase.from('enrollments').insert({
    user_id: userId,
    course_slug: courseSlug,
    stripe_session_id: stripeSessionId,
    tier,
    enrolled_at: new Date().toISOString(),
  })

  if (error) {
    console.error('[enrollments] enroll error:', error.message)
    throw new Error(`Failed to write enrollment: ${error.message}`)
  }
}

/**
 * Returns the enrolled_at timestamp for a user + course, or null if not found.
 * Used to calculate "This week's focus" on the portal dashboard.
 */
export async function getEnrollmentDate(
  client: SupabaseClient,
  userId: string,
  courseSlug: string
): Promise<string | null> {
  const { data, error } = await client
    .from('enrollments')
    .select('enrolled_at')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .maybeSingle()

  if (error || !data) return null
  return data.enrolled_at as string
}
