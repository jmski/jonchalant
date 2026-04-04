import Link from 'next/link'
import type { Metadata } from 'next'
import { getCourses } from '@/lib/sanity'
import { createClient } from '@/utils/supabase/server'
import { getCourseProgress, getLastActiveLesson } from '@/lib/portal-progress'
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout'
import { CourseCard } from '@/components/utilities/cards'
import type { CourseProgress } from '@/components/utilities/cards'
import { CTA } from '@/components/shared/cta'
import type { Course } from '@/lib/types'

export const metadata: Metadata = {
  title: "The Quiet Command Curriculum | Jonchalant",
  description: "Evidence-based leadership courses for introverts and quiet professionals. Master executive presence, body-aware leadership, and subtle persuasion — at your own pace.",
  keywords: "leadership courses, quiet command, executive presence, introvert leadership, coaching curriculum, online leadership training",
  openGraph: {
    title: "The Quiet Command Curriculum | Jonchalant",
    description: "Evidence-based leadership courses for introverts and quiet professionals.",
    type: "website",
    url: "https://jonchalant.com/lessons",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-lessons-1200x630.png",
      width: 1200,
      height: 630,
      alt: "The Quiet Command Curriculum",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Quiet Command Curriculum | Jonchalant",
    description: "Evidence-based leadership courses for introverts and quiet professionals.",
    images: ["https://jonchalant.com/social/og-lessons-1200x630.png"],
    creator: "@jonchalant",
  },
}

export default async function LessonsPage() {
  // ── Sanity: fetch all courses (with nested modules + lessons) ──────────────
  const courses: Course[] = await getCourses().catch(() => [])

  // ── Auth: check session without redirecting unauthenticated users ──────────
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ── Progress: fetch per-course data only when logged in ────────────────────
  type ProgressMap = Record<string, CourseProgress>
  let progressMap: ProgressMap = {}
  let lastActive: { lessonSlug: string; courseSlug: string } | null = null

  if (user) {
    const [progressResults, lastLesson] = await Promise.all([
      Promise.all(
          courses.map(async (course: Course) => {
          const total: number = (course.modules ?? []).reduce(
            (sum: number, m) => sum + (m.lessons?.length ?? 0),
            0
          )
          const { completedSlugs } = await getCourseProgress(
            supabase,
            user.id,
            course.slug?.current ?? ''
          )
          return {
            slug: course.slug?.current ?? '',
            completed: completedSlugs.length,
            total,
            percentage: total > 0 ? Math.round((completedSlugs.length / total) * 100) : 0,
          }
        })
      ),
      getLastActiveLesson(supabase, user.id),
    ])

    progressResults.forEach((p) => {
      progressMap[p.slug] = { completed: p.completed, total: p.total, percentage: p.percentage }
    })
    lastActive = lastLesson
  }

  return (
    <div className="lessons-page">
      <PageTransition animation="fade">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="lessons-hero">
              <p className="lessons-hero-eyebrow">Structured Learning</p>
              <h1 className="lessons-hero-headline">The Quiet Command Curriculum</h1>
              {/* COPYWRITER: Replace this paragraph with final site copy */}
              <p className="lessons-hero-description">
                A structured path from self-aware professional to quietly commanding leader. Each
                course builds on the last — choose your starting point and go at your own pace.
              </p>

              {lastActive && (
                <div className="lessons-resume-banner">
                  <span className="lessons-resume-banner-label">Continue where you left off</span>
                  <Link
                    href={`/lessons/${lastActive.courseSlug}/${lastActive.lessonSlug}`}
                    className="lessons-resume-banner-link"
                  >
                    Resume lesson →
                  </Link>
                </div>
              )}
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* ── Course Grid ───────────────────────────────────────────────────── */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <div className="lessons-courses-grid">
              {courses.map((course) => {
                const total: number = (course.modules ?? []).reduce(
                  (sum: number, m: any) => sum + (m.lessons?.length ?? 0),
                  0
                )
                const estimatedMinutes: number = (course.modules ?? []).reduce(
                  (sum: number, m: any) =>
                    sum +
                    (m.lessons ?? []).reduce(
                      (s: number, l: any) => s + (l.estimatedDuration ?? 0),
                      0
                    ),
                  0
                )
                const progress = progressMap[course.slug?.current ?? ''] ?? null

                const hasPreview = (course.modules ?? []).some((m: any) =>
                  (m.lessons ?? []).some((l: any) => l.access === 'free')
                )

                return (
                  <CourseCard
                    key={course._id}
                    title={course.title}
                    slug={course.slug?.current ?? ''}
                    description={course.description ?? ''}
                    thumbnail={course.thumbnail ?? null}
                    difficulty={course.difficulty ?? null}
                    moduleCount={course.modules?.length ?? 0}
                    lessonCount={total}
                    estimatedMinutes={estimatedMinutes}
                    progress={progress}
                    hasPreview={hasPreview}
                  />
                )
              })}

              {courses.length === 0 && (
                <p className="lessons-courses-empty">
                  Courses are being prepared — check back soon.
                </p>
              )}
            </div>
          </SectionContent>
        </SectionWrapper>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section>
              <CTA
                title="Ready to accelerate your growth?"
                description="These courses teach the frameworks. Transformation happens through application. Pair self-paced learning with live coaching for real-time feedback and accountability."
                buttonText="Explore Coaching Programs"
                buttonLink="/programs"
              />
            </section>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  )
}
