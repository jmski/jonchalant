'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ── Types ────────────────────────────────────────────────────────────────────

interface TocLesson {
  slug: { current: string }
  title: string
  access: 'free' | 'enrolled'
  estimatedDuration?: number
  order: number
}

interface TocModule {
  _id: string
  title: string
  order: number
  lessons: TocLesson[]
}

interface TocCourse {
  title: string
  modules: TocModule[]
}

export interface CourseTOCProps {
  course: TocCourse
  courseSlug: string
  completedSlugs: string[]
  isLoggedIn: boolean
  /** Highlight the currently-viewed lesson (used by the lesson detail page) */
  activeLessonSlug?: string
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

// ── Component ────────────────────────────────────────────────────────────────

export function CourseTOC({
  course,
  courseSlug,
  completedSlugs,
  isLoggedIn,
  activeLessonSlug,
}: CourseTOCProps) {
  const router = useRouter()
  const modules = course.modules ?? []

  // All modules start expanded
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(modules.map((m) => [m._id, true]))
  )

  const allLessons = modules.flatMap((m) => m.lessons ?? [])
  const total = allLessons.length
  const completed = completedSlugs.length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleLockedClick() {
    router.push(`/login?redirect=${encodeURIComponent(`/lessons/${courseSlug}`)}`)
  }

  return (
    <nav className="course-toc" aria-label="Course contents">
      {/* Course title */}
      <div className="course-toc-header">
        <p className="course-toc-course-title">{course.title}</p>
      </div>

      {/* Module accordion */}
      <ol className="course-toc-modules">
        {modules.map((mod, modIdx) => {
          const isOpen = !!expanded[mod._id]

          return (
            <li key={mod._id} className="course-toc-module">
              <button
                className={`course-toc-module-header${isOpen ? ' course-toc-module-header--expanded' : ''}`}
                onClick={() => toggle(mod._id)}
                aria-expanded={isOpen}
              >
                <span className="course-toc-module-index">{modIdx + 1}</span>
                <span className="course-toc-module-title">{mod.title}</span>
                <span className="course-toc-module-count">
                  {mod.lessons?.length ?? 0} lessons
                </span>
                <span className="course-toc-chevron" aria-hidden="true">
                  {isOpen ? '▾' : '▸'}
                </span>
              </button>

              {isOpen && (
                <ol className="course-toc-lessons">
                  {(mod.lessons ?? []).map((lesson) => {
                    const slug = lesson.slug?.current ?? ''
                    const isLocked = lesson.access !== 'free' && !isLoggedIn
                    const isCompleted = completedSlugs.includes(slug)
                    const isActive = slug === activeLessonSlug

                    const classNames = [
                      'course-toc-lesson',
                      isActive && 'course-toc-lesson--active',
                      isLocked && 'course-toc-lesson--locked',
                      isCompleted && 'course-toc-lesson--completed',
                    ]
                      .filter(Boolean)
                      .join(' ')

                    const inner = (
                      <>
                        <span className="course-toc-lesson-icon" aria-hidden="true">
                          {isCompleted ? '✓' : isLocked ? '🔒' : '○'}
                        </span>
                        <span className="course-toc-lesson-body">
                          <span className="course-toc-lesson-title">{lesson.title}</span>
                          {lesson.estimatedDuration ? (
                            <span className="course-toc-lesson-duration">
                              {formatDuration(lesson.estimatedDuration)}
                            </span>
                          ) : null}
                        </span>
                      </>
                    )

                    if (isLocked) {
                      return (
                        <li key={slug}>
                          <button
                            className={classNames}
                            onClick={handleLockedClick}
                            title="Log in to access this lesson"
                          >
                            {inner}
                          </button>
                        </li>
                      )
                    }

                    return (
                      <li key={slug}>
                        <Link
                          href={`/lessons/${courseSlug}/${slug}`}
                          className={classNames}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {inner}
                        </Link>
                      </li>
                    )
                  })}
                </ol>
              )}
            </li>
          )
        })}
      </ol>

      {/* Progress bar */}
      <div className="course-toc-progress">
        <div className="course-toc-progress-track">
          <div className="course-toc-progress-fill" style={{ width: `${percentage}%` }} />
        </div>
        <p className="course-toc-progress-label">
          {isLoggedIn
            ? `${completed} of ${total} lessons complete`
            : `${total} lessons · Log in to track progress`}
        </p>
      </div>
    </nav>
  )
}
