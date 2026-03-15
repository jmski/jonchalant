import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourse, getCourses, getLesson } from '@/lib/sanity'
import { createClient } from '@/utils/supabase/server'
import { getCourseProgress } from '@/lib/portal-progress'
import { CourseTOC } from '@/components/sections/lessons'
import { LessonContent } from '@/components/sections/lessons'

interface PageProps {
  params: Promise<{ courseSlug: string; lessonSlug: string }>
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Sort and flatten all lessons across all modules in display order. */
function flattenLessons(modules: any[]): any[] {
  return (modules ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .flatMap((m) =>
      (m.lessons ?? [])
        .slice()
        .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
    )
}

// ── Static generation ────────────────────────────────────────────────────────
// Only pre-render free-preview lessons. Gated lessons are server-rendered at runtime.

export async function generateStaticParams() {
  const courses: any[] = await getCourses().catch(() => [])
  return courses
    .flatMap((course: any) =>
      (course.modules ?? []).flatMap((mod: any) =>
        (mod.lessons ?? [])
          .filter((lesson: any) => lesson.isFreePreview)
          .map((lesson: any) => ({
            courseSlug: course.slug?.current ?? '',
            lessonSlug: lesson.slug?.current ?? '',
          }))
      )
    )
    .filter((p) => p.courseSlug && p.lessonSlug)
}

// ── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params
  const lesson = await getLesson(courseSlug, lessonSlug).catch(() => null)
  if (!lesson) return {}

  return {
    title: `${lesson.title} | Jonchalant`,
    description: lesson.description ?? undefined,
    robots: lesson.isFreePreview ? undefined : { index: false, follow: false },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function LessonDetailPage({ params }: PageProps) {
  const { courseSlug, lessonSlug } = await params

  // Fetch lesson data and full course (for TOC + navigation) in parallel
  const [lesson, course] = await Promise.all([
    getLesson(courseSlug, lessonSlug).catch(() => null),
    getCourse(courseSlug).catch(() => null),
  ])

  if (!lesson || !course) notFound()

  // Auth — no redirect; access control handled per-component
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Progress
  let completedSlugs: string[] = []
  if (user) {
    const progress = await getCourseProgress(supabase, user.id, courseSlug)
    completedSlugs = progress.completedSlugs
  }

  const isThisCompleted = completedSlugs.includes(lessonSlug)

  // Access control: locked if gated and not logged in
  const isLocked = !lesson.isFreePreview && !user

  // Prev / Next navigation across module boundaries
  const allLessons = flattenLessons(course.modules ?? [])
  const currentIndex = allLessons.findIndex(
    (l: any) => l.slug?.current === lessonSlug
  )
  const prevLesson =
    currentIndex > 0
      ? {
          slug: allLessons[currentIndex - 1].slug?.current ?? '',
          title: allLessons[currentIndex - 1].title ?? '',
        }
      : null
  const nextLesson =
    currentIndex !== -1 && currentIndex < allLessons.length - 1
      ? {
          slug: allLessons[currentIndex + 1].slug?.current ?? '',
          title: allLessons[currentIndex + 1].title ?? '',
        }
      : null

  return (
    <div className="lesson-detail-page">
      <div className="course-detail-layout">
        {/* Left — sticky course TOC, highlights active lesson */}
        <aside className="course-detail-toc-col">
          <CourseTOC
            course={course}
            courseSlug={courseSlug}
            completedSlugs={completedSlugs}
            isLoggedIn={!!user}
            activeLessonSlug={lessonSlug}
          />
        </aside>

        {/* Right — lesson content */}
        <main className="course-detail-main-col">
          <LessonContent
            lesson={lesson}
            courseSlug={courseSlug}
            userId={user?.id ?? null}
            isCompleted={isThisCompleted}
            isLocked={isLocked}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
          />
        </main>
      </div>
    </div>
  )
}
