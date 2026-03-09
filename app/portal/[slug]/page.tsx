'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import {
  markLessonComplete,
  getUserLessonProgress,
  type LessonProgress,
} from '@/lib/portal-progress'

interface TechnicalNote {
  column?: number
  label: string
  content: string
  _key?: string
}

interface Lesson {
  _id: string
  title: string
  slug: string
  technicalDescription: string
  videoId: string
  socialLogic: string
  technicalNotes?: TechnicalNote[]
  duration: number
  difficulty: string
  module?: {
    _id: string
    title: string
    slug: string
  }
}

interface Props {
  params: {
    slug: string
  }
}

async function fetchLesson(slug: string): Promise<Lesson | null> {
  try {
    // TODO: Update this to query the learning-portal dataset
    // For now, returning null - you'll implement the Sanity query
    return null
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return null
  }
}

export default function LessonPage({ params }: Props) {
  const { user, isLoading: authLoading, session } = useAuth()
  const router = useRouter()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState<LessonProgress | null>(null)
  const [isMarking, setIsMarking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const slug = params.slug

  // Redirect to login if no session
  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login')
    }
  }, [session, authLoading, router])

  useEffect(() => {
    const loadLesson = async () => {
      setIsLoading(true)
      try {
        // TODO: Implement Sanity query to fetch lesson by slug
        // For now, using placeholder
        const lessonData = await fetchLesson(slug)
        if (!lessonData) {
          setError('Lesson not found')
          return
        }
        setLesson(lessonData)
      } catch (err: any) {
        setError(err.message || 'Error loading lesson')
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      loadLesson()
    }
  }, [slug, user])

  // Check progress when user and lesson are available
  useEffect(() => {
    const checkProgress = async () => {
      if (!user || !lesson) return

      try {
        const progressData = await getUserLessonProgress(user.id, slug)
        setProgress(progressData)

        // If lesson just started, mark it as started
        if (!progressData) {
          // You could call markLessonStarted here if you want to track views
        }
      } catch (err) {
        console.error('Error checking progress:', err)
      }
    }

    checkProgress()
  }, [user, lesson, slug])

  const handleMarkComplete = async () => {
    if (!user || !lesson) return

    setIsMarking(true)
    try {
      const progressData = await markLessonComplete(
        user.id,
        slug,
        lesson.duration * 60 // Convert to seconds
      )
      setProgress(progressData)
      // Show success feedback
      alert('Lesson marked as complete! ✓')
    } catch (err: any) {
      setError(err.message || 'Error marking lesson complete')
    } finally {
      setIsMarking(false)
    }
  }

  if (authLoading) {
    return (
      <div className="portal-lesson-page">
        <div className="portal-lesson-loading">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect via useEffect
  }

  if (isLoading) {
    return (
      <div className="portal-lesson-page">
        <div className="portal-lesson-loading">Loading lesson...</div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="portal-lesson-page">
        <div className="portal-lesson-error">
          <p>{error || 'Lesson not found'}</p>
          <Link href="/portal" className="portal-lesson-error-link">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Group technical notes by column
  const notesByColumn = (lesson.technicalNotes || []).reduce(
    (acc: Record<number, TechnicalNote[]>, note: TechnicalNote) => {
      const col = note.column || 1
      if (!acc[col]) acc[col] = []
      acc[col].push(note)
      return acc
    },
    {}
  )

  return (
    <div className="portal-lesson-page">
      {/* Navigation */}
      <nav className="portal-lesson-nav">
        <Link href="/portal" className="portal-lesson-nav-back">
          ← Back to Curriculum
        </Link>
        <span className="portal-lesson-nav-breadcrumb">
          {lesson.module?.title || 'Module'} / {lesson.title}
        </span>
      </nav>

      <div className="portal-lesson-container">
        {/* Video Section */}
        <section className="portal-lesson-video-section">
          <div className="portal-lesson-video-wrapper">
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${lesson.videoId}`}
              title={lesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="portal-lesson-video-iframe"
            />
          </div>
        </section>

        {/* Lesson Header */}
        <header className="portal-lesson-header">
          <div className="portal-lesson-header-content">
            <h1 className="portal-lesson-title">{lesson.title}</h1>
            <div className="portal-lesson-meta">
              <span className="portal-lesson-duration">
                {lesson.duration} minute video
              </span>
              <span className="portal-lesson-difficulty">
                {lesson.difficulty
                  .charAt(0)
                  .toUpperCase() + lesson.difficulty.slice(1)}
              </span>
            </div>
          </div>
          <button
            onClick={handleMarkComplete}
            disabled={isMarking || progress?.is_completed}
            className={`portal-lesson-complete-button ${
              progress?.is_completed ? 'portal-lesson-complete-button--done' : ''
            }`}
          >
            {progress?.is_completed ? '✓ Complete' : 'Mark Complete'}
          </button>
        </header>

        {/* Technical Description Section */}
        <section className="portal-lesson-description">
          <h2 className="portal-lesson-section-title">Technical Description</h2>
          <div className="portal-lesson-description-text">
            {lesson.technicalDescription}
          </div>
        </section>

        {/* Social Logic Section */}
        <section className="portal-lesson-social-logic">
          <h2 className="portal-lesson-section-title">
            Social Logic: Dance-to-Social Parallel
          </h2>
          <div className="portal-lesson-social-logic-text">
            {lesson.socialLogic}
          </div>
        </section>

        {/* Technical Notes Grid */}
        {lesson.technicalNotes && lesson.technicalNotes.length > 0 && (
          <section className="portal-lesson-notes">
            <h2 className="portal-lesson-section-title">Technical Notes</h2>
            <div className="portal-lesson-notes-grid">
              {[1, 2, 3].map((col) => (
                <div
                  key={col}
                  className="portal-lesson-notes-column"
                >
                  {notesByColumn[col]?.map((note: TechnicalNote, idx: number) => (
                    <div
                      key={note._key || idx}
                      className="portal-lesson-note-card"
                    >
                      <h3 className="portal-lesson-note-label">
                        {note.label}
                      </h3>
                      <p className="portal-lesson-note-content">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Error Display */}
        {error && (
          <div className="portal-lesson-error-banner">{error}</div>
        )}
      </div>

      {/* Footer Navigation */}
      <footer className="portal-lesson-footer">
        <Link href="/portal" className="portal-lesson-footer-link">
          ← Back to Curriculum
        </Link>
        <p className="portal-lesson-footer-text">
          Progress auto-saves when you mark lessons complete.
        </p>
      </footer>
    </div>
  )
}