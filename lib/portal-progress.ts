import { supabase } from '@/lib/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * User progress record in Supabase — matches lesson_progress migration schema.
 */
export interface LessonProgress {
  id: string
  user_id: string
  lesson_slug: string
  course_slug: string
  completed: boolean
  completed_at: string | null
  created_at: string
}

/**
 * Fetch user's progress for a set of lesson slugs within a course.
 */
export async function getUserModuleProgress(
  userId: string,
  lessonSlugs: string[]
): Promise<LessonProgress[]> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .in('lesson_slug', lessonSlugs)

  if (error) {
    console.error('Error fetching progress:', error)
    return []
  }

  return data || []
}

/**
 * Fetch user's progress for a specific lesson.
 */
export async function getUserLessonProgress(
  userId: string,
  lessonSlug: string
): Promise<LessonProgress | null> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_slug', lessonSlug)
    .single()

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned — expected when no progress yet
    console.error('Error fetching progress:', error)
  }

  return data || null
}

/**
 * Mark a lesson as completed. Creates the row if it doesn't exist yet.
 */
export async function markLessonComplete(
  userId: string,
  lessonSlug: string,
  courseSlug: string
): Promise<LessonProgress | null> {
  const now = new Date().toISOString()

  const existing = await getUserLessonProgress(userId, lessonSlug)

  if (existing) {
    const { data, error } = await supabase
      .from('lesson_progress')
      .update({
        completed: true,
        completed_at: now,
      })
      .eq('id', existing.id)
      .select()
      .single()

    if (error) {
      console.error('Error marking lesson complete:', error)
      return null
    }

    return data
  } else {
    const { data, error } = await supabase
      .from('lesson_progress')
      .insert({
        user_id: userId,
        lesson_slug: lessonSlug,
        course_slug: courseSlug,
        completed: true,
        completed_at: now,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating progress record:', error)
      return null
    }

    return data
  }
}

/**
 * Record that a user has started a lesson. No-ops if a row already exists.
 * created_at serves as the start timestamp.
 */
export async function markLessonStarted(
  userId: string,
  lessonSlug: string,
  courseSlug: string
): Promise<LessonProgress | null> {
  const existing = await getUserLessonProgress(userId, lessonSlug)

  if (existing) return existing

  const { data, error } = await supabase
    .from('lesson_progress')
    .insert({
      user_id: userId,
      lesson_slug: lessonSlug,
      course_slug: courseSlug,
      completed: false,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating started record:', error)
    return null
  }

  return data
}

/**
 * Get completion percentage for a module
 * Returns: { completed: 3, total: 5, percentage: 60 }
 */
export async function getModuleCompletionPercentage(
  userId: string,
  moduleLessonIds: string[]
): Promise<{
  completed: number
  total: number
  percentage: number
}> {
  const progress = await getUserModuleProgress(userId, moduleLessonIds)
  const completed = progress.filter((p) => p.completed).length
  const total = moduleLessonIds.length

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}

// ============================================================================
// COURSE PROGRESS — SSR-safe helpers (accept a pre-initialised SupabaseClient)
// ============================================================================

/**
 * Returns which lesson slugs the user has completed for a given course,
 * plus the timestamp of the most recent activity.
 */
export async function getCourseProgress(
  client: SupabaseClient,
  userId: string,
  courseSlug: string
): Promise<{ completedSlugs: string[]; lastActivityAt: string | null }> {
  const { data, error } = await client
    .from('lesson_progress')
    .select('lesson_slug, completed, completed_at, created_at')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)

  if (error || !data) return { completedSlugs: [], lastActivityAt: null }

  const completedSlugs = data
    .filter((r) => r.completed)
    .map((r: { lesson_slug: string }) => r.lesson_slug)

  const lastActivityAt = data.reduce(
    (latest: string | null, row: { completed_at: string | null; created_at: string }) => {
      const t = row.completed_at ?? row.created_at
      return t > (latest ?? '') ? t : latest
    },
    null
  )

  return { completedSlugs, lastActivityAt }
}

/**
 * Returns the most recently touched lesson across all courses for the user.
 * Used to power the "Continue where you left off" banner.
 */
export async function getLastActiveLesson(
  client: SupabaseClient,
  userId: string
): Promise<{ lessonSlug: string; courseSlug: string } | null> {
  const { data, error } = await client
    .from('lesson_progress')
    .select('lesson_slug, course_slug')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null
  return { lessonSlug: data.lesson_slug, courseSlug: data.course_slug }
}

/**
 * Get stats for dashboard
 * Usage: { modulesStarted: 2, modulesCompleted: 1, lessonsCom pleted: 7 }
 */
export async function getUserStatistics(userId: string) {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('completed, lesson_slug')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching stats:', error)
    return { lessonsStarted: 0, lessonsCompleted: 0 }
  }

  const lessonsCompleted = data.filter((p) => p.completed).length
  const lessonsStarted = data.length

  return {
    lessonsStarted,
    lessonsCompleted,
  }
}
