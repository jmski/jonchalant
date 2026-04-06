import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { isEnrolled } from '@/utils/supabase/enrollments'
import { getLesson, getCourse } from '@/lib/sanity'
import { getCourseProgress } from '@/lib/portal-progress'
import LessonActions from './LessonActions'
import LessonKeyboard from './LessonKeyboard'

interface Props {
  params: Promise<{ courseSlug: string; lessonSlug: string }>
}

export default async function LessonPage({ params }: Props) {
  const { courseSlug, lessonSlug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?redirect=/portal/${courseSlug}/${lessonSlug}`)
  }

  const enrolled = await isEnrolled(user.id, courseSlug)
  if (!enrolled) {
    redirect('/foundation')
  }

  const [[lesson, course], { completedSlugs }] = await Promise.all([
    Promise.all([
      getLesson(courseSlug, lessonSlug),
      getCourse(courseSlug),
    ]),
    getCourseProgress(supabase, user.id, courseSlug),
  ])

  if (!lesson || !course) {
    notFound()
  }

  const modules = (course.modules ?? []).sort(
    (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
  )

  // Build ordered flat lesson list for prev/next navigation
  const allLessons = modules.flatMap((m: any) =>
    (m.lessons ?? []).sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
  )

  const currentIdx = allLessons.findIndex(
    (l: any) => (l.slug?.current ?? l.slug) === lessonSlug
  )
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null

  const prevHref = prevLesson
    ? `/portal/${courseSlug}/${prevLesson.slug?.current ?? prevLesson.slug}`
    : null
  const nextHref = nextLesson
    ? `/portal/${courseSlug}/${nextLesson.slug?.current ?? nextLesson.slug}`
    : null

  const isComplete = completedSlugs.includes(lessonSlug)
  const technicalNotes = lesson.technicalNotes ?? []

  return (
    <div className="portal-lesson-page">
      {/* ── Sticky breadcrumb nav ── */}
      <nav className="portal-lesson-nav">
        <div className="portal-breadcrumb">
          <Link href="/portal" className="portal-breadcrumb-link">Dashboard</Link>
          <span className="portal-breadcrumb-sep">›</span>
          <Link href={`/portal/${courseSlug}`} className="portal-breadcrumb-link">
            {course.title}
          </Link>
          {lesson.module?.title && (
            <>
              <span className="portal-breadcrumb-sep">›</span>
              <span className="portal-breadcrumb-link portal-breadcrumb-module">
                {lesson.module.title}
              </span>
            </>
          )}
          <span className="portal-breadcrumb-sep">›</span>
          <span className="portal-breadcrumb-current">{lesson.title}</span>
        </div>
      </nav>

      {/* ── Two-column layout ── */}
      <div className="portal-lesson-layout">
        {/* Main content */}
        <div className="portal-lesson-main">
          {/* Video (16:9 via padding-bottom trick) */}
          {lesson.videoId && (
            <section className="portal-lesson-video-section">
              <div className="portal-lesson-video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.videoId}`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="portal-lesson-video-iframe"
                />
              </div>
            </section>
          )}

          {/* Lesson header — sticky below breadcrumb nav */}
          <header className="portal-lesson-header">
            <div className="portal-lesson-header-content">
              <h1 className="portal-lesson-title">{lesson.title}</h1>
              <div className="portal-lesson-meta">
                {lesson.module?.title && (
                  <span className="portal-lesson-module">{lesson.module.title}</span>
                )}
                {lesson.duration && (
                  <span className="portal-lesson-duration">{lesson.duration} min</span>
                )}
              </div>
            </div>
            <LessonActions
              userId={user.id}
              lessonSlug={lessonSlug}
              courseSlug={courseSlug}
              initialCompleted={isComplete}
            />
          </header>

          {/* Description */}
          {lesson.description && (
            <section className="portal-lesson-description">
              <h2 className="portal-lesson-section-title">About this lesson</h2>
              <p className="portal-lesson-description-text">{lesson.description}</p>
            </section>
          )}

          {/* Dance-to-Leadership Parallel */}
          {lesson.socialLogic && (
            <section className="portal-lesson-social-logic">
              <h2 className="portal-lesson-section-title">Dance-to-Leadership Parallel</h2>
              <p className="portal-lesson-social-logic-text">{lesson.socialLogic}</p>
            </section>
          )}

          {/* Technical Notes */}
          {technicalNotes.length > 0 && (
            <section className="portal-lesson-notes">
              <h2 className="portal-lesson-section-title">Technical Notes</h2>
              <div className="portal-lesson-notes-grid">
                {technicalNotes.map((note: any, idx: number) => (
                  <div key={note._key ?? idx} className="portal-lesson-note-card">
                    <h3 className="portal-lesson-note-label">{note.label}</h3>
                    <p className="portal-lesson-note-content">{note.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prev / Next */}
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
              <Link href={`/portal/${courseSlug}`} className="portal-lesson-pagination-next">
                <span className="portal-lesson-pagination-label">Course complete →</span>
                <span className="portal-lesson-pagination-title">Back to overview</span>
              </Link>
            )}
          </nav>
        </div>

        {/* ── Course outline sidebar (sticky on desktop) ── */}
        <aside className="portal-lesson-outline">
          <span className="portal-lesson-outline-label">Course Outline</span>
          {modules.map((mod: any) => {
            const sortedLessons = (mod.lessons ?? []).sort(
              (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
            )
            return (
              <div key={mod._id} className="portal-lesson-outline-module">
                <p className="portal-lesson-outline-module-title">{mod.title}</p>
                <ul className="portal-lesson-outline-list">
                  {sortedLessons.map((l: any) => {
                    const slug = l.slug?.current ?? l.slug
                    const isCurrent = slug === lessonSlug
                    const isDone = completedSlugs.includes(slug)
                    let cls = 'portal-lesson-outline-item'
                    if (isCurrent) cls += ' portal-lesson-outline-item--current'
                    else if (isDone) cls += ' portal-lesson-outline-item--done'
                    return (
                      <li key={slug}>
                        <Link href={`/portal/${courseSlug}/${slug}`} className={cls}>
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

      {/* Keyboard shortcuts: ← → for prev/next */}
      <LessonKeyboard prevHref={prevHref} nextHref={nextHref} />
    </div>
  )
}
