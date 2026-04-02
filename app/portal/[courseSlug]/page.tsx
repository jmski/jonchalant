import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { isEnrolled } from '@/utils/supabase/enrollments'
import { getCourse } from '@/lib/sanity'
import { getCourseProgress } from '@/lib/portal-progress'
import SignOutButton from '../SignOutButton'

interface Props {
  params: Promise<{ courseSlug: string }>
}

export default async function CourseOverviewPage({ params }: Props) {
  const { courseSlug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?redirect=/portal/${courseSlug}`)
  }

  const enrolled = await isEnrolled(user.id, courseSlug)
  if (!enrolled) {
    redirect('/foundation')
  }

  const course = await getCourse(courseSlug)
  if (!course) {
    notFound()
  }

  const { completedSlugs } = await getCourseProgress(supabase, user.id, courseSlug)

  const modules = (course.modules ?? []).sort(
    (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
  )

  const totalLessons = modules.flatMap((m: any) => m.lessons ?? []).length
  const completedCount = completedSlugs.length
  const progressPct = totalLessons > 0 ? Math.floor((completedCount / totalLessons) * 100) : 0

  return (
    <div className="portal-page">
      <header className="portal-topbar">
        <Link href="/" className="portal-topbar-brand">JONCHALANT</Link>
        <div className="portal-topbar-actions">
          <SignOutButton />
        </div>
      </header>

      <main className="portal-main">
        {/* ── Breadcrumb ── */}
        <nav className="portal-breadcrumb">
          <Link href="/portal" className="portal-breadcrumb-link">Dashboard</Link>
          <span className="portal-breadcrumb-sep">›</span>
          <span className="portal-breadcrumb-current">{course.title}</span>
        </nav>

        {/* ── Course header ── */}
        <section className="portal-course-header">
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
              {completedCount} / {totalLessons} lessons complete — {progressPct}%
            </p>
          </div>
        </section>

        {/* ── Module list ── */}
        <section className="portal-module-list">
          {modules.map((module: any, moduleIdx: number) => {
            const lessons = (module.lessons ?? []).sort(
              (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
            )
            const moduleCompleted = lessons.filter(
              (l: any) => completedSlugs.includes(l.slug?.current ?? l.slug)
            ).length

            return (
              <div key={module._id} className="portal-module">
                <div className="portal-module-header">
                  <span className="portal-module-number">Module {moduleIdx + 1}</span>
                  <h2 className="portal-module-title">{module.title}</h2>
                  <span className="portal-module-meta">
                    {moduleCompleted}/{lessons.length} complete
                  </span>
                </div>
                {module.description && (
                  <p className="portal-module-description">{module.description}</p>
                )}
                <ol className="portal-lesson-list">
                  {lessons.map((lesson: any, lessonIdx: number) => {
                    const slug = lesson.slug?.current ?? lesson.slug
                    const done = completedSlugs.includes(slug)
                    return (
                      <li key={lesson._id ?? slug} className={`portal-lesson-row${done ? ' portal-lesson-row--done' : ''}`}>
                        <Link
                          href={`/portal/${courseSlug}/${slug}`}
                          className="portal-lesson-row-link"
                        >
                          <span className="portal-lesson-row-number">
                            {done ? '✓' : lessonIdx + 1}
                          </span>
                          <span className="portal-lesson-row-title">{lesson.title}</span>
                          {lesson.duration && (
                            <span className="portal-lesson-row-duration">{lesson.duration} min</span>
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
      </main>
    </div>
  )
}
