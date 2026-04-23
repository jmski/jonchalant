import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { getFourCirclesCourse, getFourCirclesLesson } from '@/lib/sanity'
import { getCourseProgress } from '@/lib/portal-progress'
import type { CourseLesson } from '@/lib/types'
import FourCirclesLessonActions from './FourCirclesLessonActions'
import LessonKeyboard from '@/app/(portal)/portal/[courseSlug]/[lessonSlug]/LessonKeyboard'

type DifficultyTier = 'basic' | 'challenging' | 'hardest'

const TIER_LABELS: Record<DifficultyTier, string> = {
  basic: 'Foundation',
  challenging: 'Intersection',
  hardest: 'Integration',
}

const QUADRANT_LABELS: Record<string, string> = {
  passion: 'Passion',
  mission: 'Mission',
  vocation: 'Vocation',
  profession: 'Profession',
}

interface Props {
  params: Promise<{ lessonSlug: string }>
}

// ── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const course = await getFourCirclesCourse().catch(() => null)
  if (!course) return []
  return ((course.lessons ?? []) as CourseLesson[]).map((l) => ({
    lessonSlug: l.slug?.current ?? '',
  }))
}

// ── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonSlug } = await params
  const lesson = await getFourCirclesLesson(lessonSlug).catch(() => null)
  if (!lesson) return {}
  return {
    title: `${lesson.title} | The Four Circles`,
    robots: { index: false, follow: false },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function FourCirclesLessonPage({ params }: Props) {
  const { lessonSlug } = await params

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/portal/four-circles/${lessonSlug}`)
  }

  const [lesson, course, { completedSlugs }] = await Promise.all([
    getFourCirclesLesson(lessonSlug),
    getFourCirclesCourse(),
    getCourseProgress(supabase, user.id, 'four-circles'),
  ])

  if (!lesson || !course) notFound()

  const allLessons = ((course.lessons ?? []) as CourseLesson[]).sort(
    (a, b) => (a.lessonNumber ?? 0) - (b.lessonNumber ?? 0)
  )

  const currentIdx = allLessons.findIndex((l) => l.slug?.current === lessonSlug)
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null

  const prevHref = prevLesson ? `/portal/four-circles/${prevLesson.slug?.current}` : null
  const nextHref = nextLesson ? `/portal/four-circles/${nextLesson.slug?.current}` : null

  const isComplete = completedSlugs.includes(lessonSlug)
  const tier = (lesson.difficultyTier ?? 'basic') as DifficultyTier
  const quadrants = lesson.ikigaiQuadrants ?? []

  const tiers: DifficultyTier[] = ['basic', 'challenging', 'hardest']

  return (
    <div className="portal-lesson-page">
      {/* ── Sticky breadcrumb ── */}
      <nav className="portal-lesson-nav">
        <div className="portal-breadcrumb">
          <Link href="/portal" className="portal-breadcrumb-link">
            Dashboard
          </Link>
          <span className="portal-breadcrumb-sep">›</span>
          <Link href="/portal/four-circles" className="portal-breadcrumb-link">
            {course.title}
          </Link>
          <span className="portal-breadcrumb-sep">›</span>
          <span className="portal-breadcrumb-current">{lesson.title}</span>
        </div>
      </nav>

      {/* ── Two-column layout ── */}
      <div className="portal-lesson-layout">
        {/* ── Main content ── */}
        <div className="portal-lesson-main">
          {/* Lesson header */}
          <header className="portal-lesson-header">
            <div className="portal-lesson-header-content">
              <div className="portal-fc-lesson-meta-row">
                <span className={`portal-fc-tier-badge portal-fc-tier-badge--${tier}`}>
                  {TIER_LABELS[tier]}
                </span>
                {lesson.estimatedMinutes && (
                  <span className="portal-lesson-duration">
                    {lesson.estimatedMinutes} min
                  </span>
                )}
              </div>
              <h1 className="portal-lesson-title">
                <span className="portal-fc-lesson-number">{lesson.lessonNumber}.</span>{' '}
                {lesson.title}
              </h1>
              {quadrants.length > 0 && (
                <div className="portal-fc-quadrant-tags">
                  {quadrants.map((q) => (
                    <span
                      key={q}
                      className={`portal-fc-quadrant-tag portal-fc-quadrant-tag--${q}`}
                    >
                      {QUADRANT_LABELS[q] ?? q}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <FourCirclesLessonActions
              userId={user.id}
              lessonSlug={lessonSlug}
              initialCompleted={isComplete}
            />
          </header>

          {/* Summary */}
          {lesson.summary && (
            <section className="portal-lesson-description">
              <h2 className="portal-lesson-section-title">Overview</h2>
              <p className="portal-fc-lesson-summary">{lesson.summary}</p>
            </section>
          )}

          {/* Reflection prompt */}
          {lesson.reflectionPrompt && (
            <section className="portal-fc-lesson-block portal-fc-lesson-block--reflection">
              <span className="portal-fc-lesson-block-label">Reflection</span>
              <p className="portal-fc-lesson-block-text">{lesson.reflectionPrompt}</p>
            </section>
          )}

          {/* Try this week */}
          {lesson.tryThisWeek && (
            <section className="portal-fc-lesson-block portal-fc-lesson-block--try-this">
              <span className="portal-fc-lesson-block-label">Try This Week</span>
              <p className="portal-fc-lesson-block-text">{lesson.tryThisWeek}</p>
            </section>
          )}

          {/* Prev / Next pagination */}
          <nav className="portal-lesson-pagination">
            {prevLesson ? (
              <Link href={prevHref!} className="portal-lesson-pagination-prev">
                <span className="portal-lesson-pagination-label">← Previous</span>
                <span className="portal-lesson-pagination-title">{prevLesson.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link href={nextHref!} className="portal-lesson-pagination-next">
                <span className="portal-lesson-pagination-label">Next →</span>
                <span className="portal-lesson-pagination-title">{nextLesson.title}</span>
              </Link>
            ) : (
              <Link href="/portal/four-circles" className="portal-lesson-pagination-next">
                <span className="portal-lesson-pagination-label">Course complete →</span>
                <span className="portal-lesson-pagination-title">Back to overview</span>
              </Link>
            )}
          </nav>
        </div>

        {/* ── Sidebar: course outline ── */}
        <aside className="portal-lesson-outline">
          <span className="portal-lesson-outline-label">Course Outline</span>
          {tiers.map((t) => {
            const tierLessons = allLessons.filter((l) => l.difficultyTier === t)
            return (
              <div key={t} className="portal-lesson-outline-module">
                <p className="portal-lesson-outline-module-title">{TIER_LABELS[t]}</p>
                <ul className="portal-lesson-outline-list">
                  {tierLessons.map((l) => {
                    const slug = l.slug?.current ?? ''
                    const isCurrent = slug === lessonSlug
                    const isDone = completedSlugs.includes(slug)
                    let cls = 'portal-lesson-outline-item'
                    if (isCurrent) cls += ' portal-lesson-outline-item--current'
                    else if (isDone) cls += ' portal-lesson-outline-item--done'
                    return (
                      <li key={slug}>
                        <Link href={`/portal/four-circles/${slug}`} className={cls}>
                          {l.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </aside>
      </div>

      <LessonKeyboard prevHref={prevHref} nextHref={nextHref} />
    </div>
  )
}
