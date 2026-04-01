import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { isEnrolled } from '@/utils/supabase/enrollments'
import { client } from '@/lib/sanity'
import LessonActions from './LessonActions'

interface TechnicalNote {
  label: string
  content: string
  _key?: string
}

interface PortalLesson {
  _id: string
  title: string
  slug: string
  description: string
  videoId: string
  socialLogic?: string
  technicalNotes?: TechnicalNote[]
  duration?: number
  module?: {
    _id: string
    title: string
    slug: string
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

async function getPortalLesson(slug: string): Promise<PortalLesson | null> {
  return client.fetch(
    `*[_type == "lesson" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      videoId,
      socialLogic,
      technicalNotes[] {
        label,
        content,
        _key
      },
      duration,
      module-> {
        _id,
        title,
        "slug": slug.current
      }
    }`,
    { slug }
  )
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?redirect=/portal/${slug}`)
  }

  const enrolled = await isEnrolled(user.id, 'the-foundation')
  if (!enrolled) {
    redirect('/foundation')
  }

  const lesson = await getPortalLesson(slug)

  if (!lesson) {
    notFound()
  }

  const technicalNotes = lesson.technicalNotes || []

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
              {lesson.duration && (
                <span className="portal-lesson-duration">
                  {lesson.duration} min
                </span>
              )}
            </div>
          </div>
          <LessonActions
            userId={user.id}
            lessonSlug={slug}
            courseSlug={lesson.module?.slug ?? ''}
          />
        </header>

        {/* Description */}
        {lesson.description && (
          <section className="portal-lesson-description">
            <div className="portal-lesson-description-text">
              {lesson.description}
            </div>
          </section>
        )}

        {/* Social Logic */}
        {lesson.socialLogic && (
          <section className="portal-lesson-social-logic">
            <h2 className="portal-lesson-section-title">
              Social Logic: Dance-to-Leadership Parallel
            </h2>
            <div className="portal-lesson-social-logic-text">
              {lesson.socialLogic}
            </div>
          </section>
        )}

        {/* Technical Notes */}
        {technicalNotes.length > 0 && (
          <section className="portal-lesson-notes">
            <h2 className="portal-lesson-section-title">Technical Notes</h2>
            <div className="portal-lesson-notes-grid">
              {technicalNotes.map((note: TechnicalNote, idx: number) => (
                <div key={note._key || idx} className="portal-lesson-note-card">
                  <h3 className="portal-lesson-note-label">{note.label}</h3>
                  <p className="portal-lesson-note-content">{note.content}</p>
                </div>
              ))}
            </div>
          </section>
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