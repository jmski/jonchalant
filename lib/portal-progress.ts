import { supabase } from '@/lib/supabase'

/**
 * User progress record in Supabase
 * Tracks which lessons a user has completed
 */
export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string // portalLesson slug from Sanity
  completed_at: string | null
  started_at: string
  duration_watched: number // seconds
  is_completed: boolean
  created_at: string
  updated_at: string
}

/**
 * Fetch user's progress for all lessons in a module
 */
export async function getUserModuleProgress(
  userId: string,
  moduleLessonIds: string[]
): Promise<LessonProgress[]> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .in('lesson_id', moduleLessonIds)

  if (error) {
    console.error('Error fetching progress:', error)
    return []
  }

  return data || []
}

/**
 * Fetch user's progress for a specific lesson
 */
export async function getUserLessonProgress(
  userId: string,
  lessonId: string
): Promise<LessonProgress | null> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single()

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned (expected)
    console.error('Error fetching progress:', error)
  }

  return data || null
}

/**
 * Mark a lesson as completed
 * Creates or updates the progress record
 */
export async function markLessonComplete(
  userId: string,
  lessonId: string,
  durationWatched: number = 0
): Promise<LessonProgress | null> {
  const now = new Date().toISOString()

  // First check if record exists
  const existing = await getUserLessonProgress(userId, lessonId)

  if (existing) {
    // Update existing record
    const { data, error } = await supabase
      .from('lesson_progress')
      .update({
        is_completed: true,
        completed_at: now,
        duration_watched: durationWatched,
        updated_at: now,
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
    // Create new record
    const { data, error } = await supabase
      .from('lesson_progress')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        completed_at: now,
        is_completed: true,
        duration_watched: durationWatched,
        started_at: now,
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
 * Track that user started a lesson (for analytics)
 * Creates progress record if doesn't exist
 */
export async function markLessonStarted(
  userId: string,
  lessonId: string
): Promise<LessonProgress | null> {
  const now = new Date().toISOString()

  // Check if exists
  const existing = await getUserLessonProgress(userId, lessonId)

  if (existing) {
    return existing // Already started/tracked
  }

  // Create new record
  const { data, error } = await supabase
    .from('lesson_progress')
    .insert({
      user_id: userId,
      lesson_id: lessonId,
      started_at: now,
      is_completed: false,
      duration_watched: 0,
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
  const completed = progress.filter((p) => p.is_completed).length
  const total = moduleLessonIds.length

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}

/**
 * Get stats for dashboard
 * Usage: { modulesStarted: 2, modulesCompleted: 1, lessonsCom pleted: 7 }
 */
export async function getUserStatistics(userId: string) {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('is_completed, lesson_id')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching stats:', error)
    return { lessonsStarted: 0, lessonsCompleted: 0 }
  }

  const lessonsCompleted = data.filter((p) => p.is_completed).length
  const lessonsStarted = data.length

  return {
    lessonsStarted,
    lessonsCompleted,
  }
}
