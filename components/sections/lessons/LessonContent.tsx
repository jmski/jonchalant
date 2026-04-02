'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { markLessonComplete } from '@/lib/portal-progress'
import { VideoEmbed } from '@/components/shared/VideoEmbed'

// ── Types ────────────────────────────────────────────────────────────────────

interface AdjacentLesson {
  slug: string
  title: string
}

export interface LessonContentProps {
  lesson: {
    _id: string
    title: string
    description?: string
    body?: any[]
    videoUrl?: string
    access: 'free' | 'enrolled'
    estimatedDuration?: number
    slug: { current: string }
  }
  courseSlug: string
  /** null when user is not authenticated */
  userId: string | null
  isCompleted: boolean
  isLocked: boolean
  prevLesson: AdjacentLesson | null
  nextLesson: AdjacentLesson | null
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(minutes: number): string {
  if (!minutes) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}



// ── Portable Text renderer ────────────────────────────────────────────────────

const lessonBodyComponents = {
  block: {
    normal: ({ children }: any) => <p className="lesson-body-p">{children}</p>,
    h2: ({ children }: any) => <h2 className="lesson-body-h2">{children}</h2>,
    h3: ({ children }: any) => <h3 className="lesson-body-h3">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="lesson-body-blockquote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="lesson-body-ul">{children}</ul>,
    number: ({ children }: any) => <ol className="lesson-body-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="lesson-body-li">{children}</li>,
    number: ({ children }: any) => <li className="lesson-body-li">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => <code className="lesson-body-code">{children}</code>,
    link: ({ value, children }: any) => (
      <a href={value?.href} className="lesson-body-a" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

// ── Sub-components ───────────────────────────────────────────────────────────

// ── Main component ────────────────────────────────────────────────────────────

export function LessonContent({
  lesson,
  courseSlug,
  userId,
  isCompleted: initialCompleted,
  isLocked,
  prevLesson,
  nextLesson,
}: LessonContentProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [marking, setMarking] = useState(false)

  async function handleMarkComplete() {
    if (!userId || completed || marking) return
    // Optimistic update first
    setCompleted(true)
    setMarking(true)
    try {
      await markLessonComplete(userId, lesson.slug.current, courseSlug)
    } catch {
      // Revert on failure
      setCompleted(false)
    } finally {
      setMarking(false)
    }
  }

  return (
    <article className="lesson-content">
      {/* ── Header ── */}
      <header className="lesson-content-header">
        {/* COPYWRITER: free preview badge label */}
        {lesson.access === 'free' && (
          <span className="lesson-content-preview-badge">Free Preview</span>
        )}
        <h1 className="lesson-content-title">{lesson.title}</h1>
        {lesson.estimatedDuration ? (
          <p className="lesson-content-duration">
            {/* COPYWRITER: duration label prefix */}
            {formatDuration(lesson.estimatedDuration)} lesson
          </p>
        ) : null}
      </header>

      {/* ── Video embed ── */}
      {lesson.videoUrl && <VideoEmbed url={lesson.videoUrl} />}

      {/* ── Body — locked or full ── */}
      {isLocked ? (
        <div className="lesson-locked-wrapper">
          <div className="lesson-locked-blur" aria-hidden="true">
            {/* Blurred preview of body content (decorative) */}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
          <div className="lesson-locked-overlay" role="alert">
            <div className="lesson-locked-card">
              {/* COPYWRITER: lock icon or illustration can go here */}
              <span className="lesson-locked-icon" aria-hidden="true">🔒</span>
              {/* COPYWRITER: gated lesson headline */}
              <h2 className="lesson-locked-heading">This lesson is members-only</h2>
              {/* COPYWRITER: gated lesson subtext */}
              <p className="lesson-locked-subtext">
                Log in to your account to access the full lesson content, track your progress, and
                complete the course.
              </p>
              <Link
                href={`/login?redirect=${encodeURIComponent(`/lessons/${courseSlug}/${lesson.slug.current}`)}`}
                className="lesson-locked-cta"
              >
                {/* COPYWRITER: CTA button text */}
                Log in to access this lesson
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="lesson-body">
          {lesson.body && lesson.body.length > 0 ? (
            <PortableText value={lesson.body} components={lessonBodyComponents} />
          ) : (
            // COPYWRITER: placeholder when body field is empty in Sanity
            <p className="lesson-body-empty">Lesson content coming soon.</p>
          )}
        </div>
      )}

      {/* ── Mark as Complete ── (only for logged-in, unlocked lessons) */}
      {!isLocked && userId && (
        <div className="lesson-complete-action">
          {completed ? (
            <span className="lesson-complete-badge">
              {/* COPYWRITER: completed state label */}
              ✓ Completed
            </span>
          ) : (
            <button
              className="lesson-complete-btn"
              onClick={handleMarkComplete}
              disabled={marking}
              aria-label="Mark this lesson as complete"
            >
              {/* COPYWRITER: mark-complete button text */}
              {marking ? 'Saving…' : 'Mark as Complete'}
            </button>
          )}
        </div>
      )}

      {/* ── Prev / Next navigation ── */}
      {(prevLesson || nextLesson) && (
        <nav className="lesson-nav" aria-label="Lesson navigation">
          <div className="lesson-nav-prev">
            {prevLesson && (
              <Link
                href={`/lessons/${courseSlug}/${prevLesson.slug}`}
                className="lesson-nav-link lesson-nav-link--prev"
              >
                {/* COPYWRITER: previous lesson label */}
                <span className="lesson-nav-direction">← Previous</span>
                <span className="lesson-nav-title">{prevLesson.title}</span>
              </Link>
            )}
          </div>
          <div className="lesson-nav-next">
            {nextLesson && (
              <Link
                href={`/lessons/${courseSlug}/${nextLesson.slug}`}
                className="lesson-nav-link lesson-nav-link--next"
              >
                {/* COPYWRITER: next lesson label */}
                <span className="lesson-nav-direction">Next →</span>
                <span className="lesson-nav-title">{nextLesson.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  )
}
