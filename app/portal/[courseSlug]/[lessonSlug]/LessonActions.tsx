'use client'

import { useState, useEffect } from 'react'
import {
  markLessonComplete,
  getUserLessonProgress,
  type LessonProgress,
} from '@/lib/portal-progress'

interface Props {
  userId: string
  lessonSlug: string
  courseSlug: string
}

export default function LessonActions({ userId, lessonSlug, courseSlug }: Props) {
  const [progress, setProgress] = useState<LessonProgress | null>(null)
  const [isMarking, setIsMarking] = useState(false)

  useEffect(() => {
    getUserLessonProgress(userId, lessonSlug)
      .then(setProgress)
      .catch(console.error)
  }, [userId, lessonSlug])

  const handleMarkComplete = async () => {
    setIsMarking(true)
    try {
      const progressData = await markLessonComplete(userId, lessonSlug, courseSlug)
      setProgress(progressData)
    } catch (err: any) {
      console.error('Error marking lesson complete:', err.message)
    } finally {
      setIsMarking(false)
    }
  }

  return (
    <button
      onClick={handleMarkComplete}
      disabled={isMarking || !!progress?.completed}
      className={`portal-lesson-complete-button${progress?.completed ? ' portal-lesson-complete-button--done' : ''}`}
    >
      {progress?.completed ? '✓ Complete' : isMarking ? 'Saving…' : 'Mark Complete'}
    </button>
  )
}
