import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourse, getCourses } from '@/lib/sanity'
import { createClient } from '@/utils/supabase/server'
import { getCourseProgress } from '@/lib/portal-progress'
import { CourseTOC, CourseOverview } from '@/components/sections/lessons'

interface PageProps {
  params: Promise<{ courseSlug: string }>
}

// ── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const courses: any[] = await getCourses().catch(() => [])
  return courses
    .map((c) => ({ courseSlug: c.slug?.current ?? '' }))
    .filter((p) => p.courseSlug)
}

// ── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug } = await params
  const course = await getCourse(courseSlug).catch(() => null)
  if (!course) return {}

  return {
    title: `${course.title} | Jonchalant`,
    description: course.description ?? undefined,
    openGraph: {
      title: `${course.title} | Jonchalant`,
      description: course.description ?? undefined,
      type: 'website',
      url: `https://jonchalant.com/lessons/${courseSlug}`,
      siteName: 'Jonchalant',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} | Jonchalant`,
      description: course.description ?? undefined,
      creator: '@jonchalant',
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseSlug } = await params

  const course = await getCourse(courseSlug).catch(() => null)
  if (!course) notFound()

  // Auth — no redirect; unauthenticated users see lock icons instead
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let completedSlugs: string[] = []
  if (user) {
    const progress = await getCourseProgress(supabase, user.id, courseSlug)
    completedSlugs = progress.completedSlugs
  }

  // First free-preview lesson for the "Start" CTA
  const firstFreeLesson: { slug: { current: string }; title: string } | null =
    (course.modules ?? [])
      .flatMap((m: any) => m.lessons ?? [])
      .find((l: any) => l.isFreePreview) ?? null

  return (
    <div className="course-detail-page">
      <div className="course-detail-layout">
        {/* Left — sticky Table of Contents */}
        <aside className="course-detail-toc-col">
          <CourseTOC
            course={course}
            courseSlug={courseSlug}
            completedSlugs={completedSlugs}
            isLoggedIn={!!user}
          />
        </aside>

        {/* Right — course overview */}
        <main className="course-detail-main-col">
          <CourseOverview
            course={course}
            courseSlug={courseSlug}
            firstFreeLesson={firstFreeLesson}
          />
        </main>
      </div>
    </div>
  )
}
