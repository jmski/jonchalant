import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { getFourCirclesCourse } from '@/lib/sanity'
import { getCourseProgress } from '@/lib/portal-progress'
import type { CourseLesson } from '@/lib/types'

type DifficultyTier = 'basic' | 'challenging' | 'hardest'

const TIER_META: Record<DifficultyTier, { label: string; subtitle: string }> = {
  basic: {
    label: 'Foundation',
    subtitle: 'The four quadrants, one at a time',
  },
  challenging: {
    label: 'Intersection',
    subtitle: 'Pairings, tensions, and three-circle patterns',
  },
  hardest: {
    label: 'Integration',
    subtitle: 'Ikigai in practice — and beyond awareness',
  },
}

export const metadata: Metadata = {
  title: 'The Four Circles | Portal',
  robots: { index: false, follow: false },
}

export default async function FourCirclesOverview() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/portal/four-circles')
  }

  const course = await getFourCirclesCourse()
  if (!course) notFound()

  const lessons = ((course.lessons ?? []) as CourseLesson[]).sort(
    (a, b) => (a.lessonNumber ?? 0) - (b.lessonNumber ?? 0)
  )

  const { completedSlugs } = await getCourseProgress(supabase, user.id, 'four-circles')

  const completedCount = completedSlugs.length
  const totalCount = lessons.length
  const progressPct = totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0

  const nextLesson = lessons.find((l) => !completedSlugs.includes(l.slug?.current ?? ''))
  const isFinished = totalCount > 0 && completedCount === totalCount

  const tiers: DifficultyTier[] = ['basic', 'challenging', 'hardest']

  return (
    <div className="portal-main">
      {/* ── Breadcrumb ── */}
      <nav className="portal-breadcrumb">
        <Link href="/portal" className="portal-breadcrumb-link">
          Dashboard
        </Link>
        <span className="portal-breadcrumb-sep">›</span>
        <span className="portal-breadcrumb-current">{course.title}</span>
      </nav>

      {/* ── Course header ── */}
      <section className="portal-course-header">
        {course.subtitle && (
          <p className="portal-fc-eyebrow">{course.subtitle}</p>
        )}
        <h1 className="portal-course-title">{course.title}</h1>
        {course.description && (
          <p className="portal-course-description">{course.description}</p>
        )}

        <div className="portal-course-progress">
          <div className="portal-course-progress-track">
            <div
              className="portal-course-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="portal-course-progress-label">
            {completedCount} of {totalCount} lessons complete — {progressPct}%
          </p>
        </div>

        {isFinished ? (
          <p className="portal-fc-complete-msg">
            You&rsquo;ve completed all twelve lessons. Take the quiz again anytime at{' '}
            <Link href="/ikigai" className="portal-fc-complete-link">
              jonchalant.com/ikigai
            </Link>
            .
          </p>
        ) : nextLesson ? (
          <Link
            href={`/portal/four-circles/${nextLesson.slug?.current}`}
            className="portal-fc-start-btn btn-primary"
          >
            {completedCount === 0 ? 'Begin the course' : 'Continue where you left off'}
          </Link>
        ) : null}
      </section>

      {/* ── Lesson tiers ── */}
      <section className="portal-module-list">
        {tiers.map((tier, tierIdx) => {
          const tierLessons = lessons.filter((l) => l.difficultyTier === tier)
          const { label, subtitle } = TIER_META[tier]
          const tierCompleted = tierLessons.filter((l) =>
            completedSlugs.includes(l.slug?.current ?? '')
          ).length

          return (
            <div key={tier} className="portal-module">
              <div className="portal-module-header">
                <span className="portal-module-number">Part {tierIdx + 1}</span>
                <h2 className="portal-module-title">{label}</h2>
                <span className="portal-module-meta">
                  {tierCompleted}/{tierLessons.length} complete
                </span>
              </div>
              <p className="portal-module-description">{subtitle}</p>
              <ol className="portal-lesson-list">
                {tierLessons.map((lesson) => {
                  const slug = lesson.slug?.current ?? ''
                  const done = completedSlugs.includes(slug)
                  return (
                    <li
                      key={lesson._id}
                      className={`portal-lesson-row${done ? ' portal-lesson-row--done' : ''}`}
                    >
                      <Link
                        href={`/portal/four-circles/${slug}`}
                        className="portal-lesson-row-link"
                      >
                        <span className="portal-lesson-row-number">
                          {done ? '✓' : lesson.lessonNumber}
                        </span>
                        <span className="portal-lesson-row-title">{lesson.title}</span>
                        {lesson.estimatedMinutes && (
                          <span className="portal-lesson-row-duration">
                            {lesson.estimatedMinutes} min
                          </span>
                        )}
                        <span className="portal-lesson-row-arrow">→</span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </div>
          )
        })}
      </section>
    </div>
  )
}
