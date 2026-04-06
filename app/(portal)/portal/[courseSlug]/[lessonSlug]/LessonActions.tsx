'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  markLessonComplete,
  markLessonIncomplete,
} from '@/lib/portal-progress'

interface Props {
  userId: string
  lessonSlug: string
  courseSlug: string
  initialCompleted?: boolean
}

export default function LessonActions({
  userId,
  lessonSlug,
  courseSlug,
  initialCompleted = false,
}: Props) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [isMarking, setIsMarking] = useState(false)

  const handleToggle = useCallback(async () => {
    if (isMarking) return
    setIsMarking(true)
    try {
      if (completed) {
        await markLessonIncomplete(userId, lessonSlug, courseSlug)
        setCompleted(false)
      } else {
        await markLessonComplete(userId, lessonSlug, courseSlug)
        setCompleted(true)
      }
    } catch (err: any) {
      console.error('Error toggling lesson completion:', err.message)
    } finally {
      setIsMarking(false)
    }
  }, [completed, isMarking, userId, lessonSlug, courseSlug])

  // Keyboard shortcut: 'c' to toggle complete
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'c' || e.ctrlKey || e.metaKey || e.altKey) return
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) return
      handleToggle()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleToggle])

  return (
    <button
      onClick={handleToggle}
      disabled={isMarking}
      title={completed ? 'Click to mark as incomplete' : undefined}
      className={`portal-lesson-complete-button${completed ? ' portal-lesson-complete-button--done' : ''}`}
    >
      {isMarking ? 'Saving…' : completed ? '✓ Completed' : 'Mark Complete'}
    </button>
  )
}
