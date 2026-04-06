import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { isEnrolled, getEnrollmentDate } from '@/utils/supabase/enrollments'
import { getCourses } from '@/lib/sanity'
import { getCourseProgressPercent, getLastActiveLesson } from '@/lib/portal-progress'
import PortalCourseCard from './PortalCourseCard'

// ── Tool card definitions ─────────────────────────────────────────────────────

const TOOLS = [
  {
    href: '/portal/presence-score',
    title: 'Presence Score',
    description: 'Assess your executive presence across five body-based dimensions.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 12a4.5 4.5 0 014.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/portal/tonality',
    title: 'Tonality Analysis',
    description: 'Analyze your vocal patterns and what they signal to the room.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 12h2l2-5 3 10 2-8 2 6 2-3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/portal/movement-plan',
    title: 'Movement Plan',
    description: 'Get a personalized 30-day somatic movement practice.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8v5M9 11l-2 4h10l-2-4M10 13l-1 5M14 13l1 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PortalDashboard({
  searchParams,
}: {
  searchParams: Promise<{ enrolled?: string }>
}) {
  const { enrolled: enrolledParam } = await searchParams
  const isNewEnrollment = enrolledParam === 'true'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/portal')
  }

  const enrolled = await isEnrolled(user.id, 'the-foundation')
  if (!enrolled) {
    // If the user just completed checkout, the Stripe webhook may not have
    // processed yet. Show a processing screen instead of bouncing them away.
    if (isNewEnrollment) {
      return (
        <div className="portal-main">
          <section className="portal-welcome">
            <p className="portal-welcome-eyebrow">Almost there</p>
            <h1 className="portal-welcome-greeting">Confirming your enrollment…</h1>
            <p className="portal-welcome-subtitle">
              Your payment was received. We&rsquo;re setting up your access — this usually takes a few seconds.
            </p>
            <a href="/portal?enrolled=true" className="btn btn-primary portal-welcome-refresh">
              Refresh ↻
            </a>
          </section>
        </div>
      )
    }
    redirect('/foundation')
  }

  // Derive first name from Google full_name or email prefix
  const fullName = user.user_metadata?.full_name as string | undefined
  const firstName = fullName
    ? fullName.split(' ')[0]
    : (user.email?.split('@')[0] ?? 'there')

  // Parallel fetch: courses, last active lesson, enrollment date
  const [courses, lastActive, enrolledAt] = await Promise.all([
    getCourses(),
    getLastActiveLesson(supabase, user.id),
    getEnrollmentDate(supabase, user.id, 'the-foundation'),
  ])

  const courseList = courses ?? []

  // Progress for each course
  const progressList = await Promise.all(
    courseList.map((course: any) => {
      const totalLessons = (course.modules ?? []).flatMap(
        (m: any) => m.lessons ?? [],
      ).length
      return getCourseProgressPercent(user.id, course.slug.current, totalLessons, supabase)
    }),
  )

  // ── Continue where you left off ──
  interface ContinueLesson {
    slug: string
    title: string
    courseSlug: string
    courseTitle: string
  }
  let continueLesson: ContinueLesson | null = null
  if (lastActive && courseList.length > 0) {
    const course = courseList.find(
      (c: any) => c.slug.current === lastActive.courseSlug
    )
    if (course) {
      const allLessons = (course.modules ?? []).flatMap((m: any) => m.lessons ?? [])
      const lesson = allLessons.find(
        (l: any) => (l.slug?.current ?? l.slug) === lastActive.lessonSlug
      )
      if (lesson) {
        continueLesson = {
          slug: lastActive.lessonSlug,
          title: lesson.title,
          courseSlug: lastActive.courseSlug,
          courseTitle: course.title,
        }
      }
    }
  }

  // ── This week's focus ──
  interface WeekFocus {
    weekNum: number
    title: string
    courseSlug: string
  }
  let weekFocus: WeekFocus | null = null
  if (enrolledAt && courseList.length > 0) {
    const course =
      courseList.find((c: any) => c.slug.current === 'the-foundation') ??
      courseList[0]
    const modules = (course.modules ?? []).sort(
      (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
    )
    if (modules.length > 0) {
      const daysDiff = Math.floor(
        (Date.now() - new Date(enrolledAt as string).getTime()) / 86400000
      )
      const weekNum = Math.min(Math.floor(daysDiff / 7) + 1, modules.length)
      const mod = modules[weekNum - 1]
      if (mod) {
        weekFocus = {
          weekNum,
          title: mod.title,
          courseSlug: course.slug.current,
        }
      }
    }
  }

  const showContextCards = continueLesson !== null || weekFocus !== null

  return (
    <div className="portal-main">
      {/* ── Welcome ── */}
      <section className="portal-welcome">
        <p className="portal-welcome-eyebrow">Learning Portal</p>
        <h1 className="portal-welcome-greeting">Welcome back, {firstName}.</h1>
        <p className="portal-welcome-subtitle">Here&rsquo;s where you left off.</p>
      </section>

      {/* ── New enrollment banner ── */}
      {isNewEnrollment && (
        <section className="portal-enrollment-banner">
          <div className="portal-enrollment-banner-content">
            <p className="portal-enrollment-banner-headline">
              You&rsquo;re in. Welcome to The Foundation.
            </p>
            <p className="portal-enrollment-banner-body">
              Your course is ready. Start with Week 1 — Body Audit — and work through one week at a time.
            </p>
            <Link href="/portal/the-foundation" className="btn btn-primary">
              Start the course →
            </Link>
          </div>
        </section>
      )}

      {/* ── Continue + Week Focus cards ── */}
      {showContextCards && (
        <div className="portal-dashboard-cards">
          {continueLesson && (
            <Link
              href={`/portal/${continueLesson.courseSlug}/${continueLesson.slug}`}
              className="portal-continue-card"
            >
              <p className="portal-card-eyebrow">Continue</p>
              <h2 className="portal-card-title">{continueLesson.title}</h2>
              <p className="portal-card-meta">{continueLesson.courseTitle}</p>
              <span className="portal-card-cta">Resume lesson →</span>
            </Link>
          )}
          {weekFocus && (
            <Link
              href={`/portal/${weekFocus.courseSlug}`}
              className="portal-focus-card"
            >
              <p className="portal-card-eyebrow">This week&rsquo;s focus</p>
              <h2 className="portal-card-title">{weekFocus.title}</h2>
              <p className="portal-card-meta">Week {weekFocus.weekNum} of the course</p>
              <span className="portal-card-cta">View module →</span>
            </Link>
          )}
        </div>
      )}

      {/* ── My Courses ── */}
      <section className="portal-section">
        <h2 className="portal-section-label">My Courses</h2>
        {courseList.length > 0 ? (
          <div className="portal-courses-grid">
            {courseList.map((course: any, i: number) => {
              const totalLessons = (course.modules ?? []).flatMap(
                (m: any) => m.lessons ?? [],
              ).length
              return (
                <PortalCourseCard
                  key={course._id}
                  title={course.title}
                  slug={course.slug.current}
                  progress={progressList[i]}
                  totalLessons={totalLessons}
                  difficulty={course.difficulty}
                />
              )
            })}
          </div>
        ) : (
          <p className="portal-empty">No courses available yet. Check back soon.</p>
        )}
      </section>

      {/* ── AI Tools ── */}
      <section className="portal-section">
        <h2 className="portal-section-label">AI Tools</h2>
        <div className="portal-tools-grid">
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="portal-tool-card">
              <div className="portal-tool-card-icon">{tool.icon}</div>
              <div className="portal-tool-card-body">
                <h3 className="portal-tool-card-title">{tool.title}</h3>
                <p className="portal-tool-card-desc">{tool.description}</p>
              </div>
              <span className="portal-tool-card-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
