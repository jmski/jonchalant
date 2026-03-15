import { supabase } from '@/lib/supabase'

interface LessonProgressRow {
  id: string
  user_id: string
  lesson_slug: string
  course_slug: string
  completed: boolean
  completed_at: string | null
  created_at: string
}

/**
 * Returns an array of completed lesson slugs for a given user + course.
 * Result is suitable for set-membership checks in the UI.
 */
export async function getLessonProgress(
  userId: string,
  courseSlug: string,
): Promise<string[]> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('lesson_slug')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .eq('completed', true)

  if (error) {
    console.error('[getLessonProgress]', error.message)
    return []
  }

  return (data ?? []).map((row) => row.lesson_slug)
}

/**
 * Upserts a completed row for the given lesson.
 * Safe to call multiple times — the unique constraint on (user_id, lesson_slug)
 * ensures no duplicates.
 */
export async function markLessonComplete(
  userId: string,
  lessonSlug: string,
  courseSlug: string,
): Promise<void> {
  const { error } = await supabase.from('lesson_progress').upsert(
    {
      user_id: userId,
      lesson_slug: lessonSlug,
      course_slug: courseSlug,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,lesson_slug' },
  )

  if (error) {
    console.error('[markLessonComplete]', error.message)
    throw error
  }
}

/**
 * Sets the completed flag to false for a lesson without removing the row.
 * Clears completed_at so the timestamp stays accurate if re-completed later.
 */
export async function markLessonIncomplete(
  userId: string,
  lessonSlug: string,
  courseSlug: string,
): Promise<void> {
  const { error } = await supabase.from('lesson_progress').upsert(
    {
      user_id: userId,
      lesson_slug: lessonSlug,
      course_slug: courseSlug,
      completed: false,
      completed_at: null,
    },
    { onConflict: 'user_id,lesson_slug' },
  )

  if (error) {
    console.error('[markLessonIncomplete]', error.message)
    throw error
  }
}

/**
 * Returns course completion as an integer percentage (0–100).
 * Rounds down so 100% only shows when every lesson is complete.
 */
export async function getCourseProgress(
  userId: string,
  courseSlug: string,
  totalLessons: number,
): Promise<number> {
  if (totalLessons <= 0) return 0

  const { count, error } = await supabase
    .from('lesson_progress')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .eq('completed', true)

  if (error) {
    console.error('[getCourseProgress]', error.message)
    return 0
  }

  return Math.floor(((count ?? 0) / totalLessons) * 100)
}
