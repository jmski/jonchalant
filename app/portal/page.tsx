import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isEnrolled } from '@/utils/supabase/enrollments'
import { getCourses } from '@/lib/sanity'
import { getCourseProgressPercent } from '@/lib/portal-progress'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import PortalCourseCard from './PortalCourseCard'
import { PresenceCoach } from '@/components/portal/PresenceCoach'

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
    redirect('/foundation')
  }

  // Derive first name from Google full_name or email prefix
  const fullName = user.user_metadata?.full_name as string | undefined
  const firstName = fullName
    ? fullName.split(' ')[0]
    : (user.email?.split('@')[0] ?? 'there')

  const courses = (await getCourses()) ?? []

  // Fetch progress for all courses in parallel
  const progressList = await Promise.all(
    courses.map((course: any) => {
      const totalLessons = (course.modules ?? []).flatMap(
        (m: any) => m.lessons ?? [],
      ).length
      return getCourseProgressPercent(user.id, course.slug.current, totalLessons, supabase)
    }),
  )

  return (
    <div className="portal-page">
      {/* ── Top bar ── */}
      <header className="portal-topbar">
        <Link href="/" className="portal-topbar-brand">
          JONCHALANT
        </Link>
        <div className="portal-topbar-actions">
          <SignOutButton />
        </div>
      </header>

      <div className="portal-body">
        {/* ── Main content ── */}
        <main className="portal-main">
          {/* Welcome */}
          <section className="portal-welcome">
            <p className="portal-welcome-eyebrow">Learning Portal</p>
            <h1 className="portal-welcome-greeting">Welcome back, {firstName}.</h1>
            <p className="portal-welcome-subtitle">Here&rsquo;s where you left off.</p>
          </section>

          {/* New enrollment banner */}
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

          {/* My Courses */}
          <section className="portal-section">
            <h2 className="portal-section-label">My Courses</h2>
            {courses.length > 0 ? (
              <div className="portal-courses-grid">
                {courses.map((course: any, i: number) => {
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

          {/* AI Presence Coach */}
          <section className="portal-section portal-section--coach">
            <h2 className="portal-section-label">Your AI Presence Coach</h2>
            <div className="portal-coach-panel">
              <PresenceCoach userId={user.id} firstName={firstName} />
            </div>
          </section>
        </main>

        {/* ── Sidebar ── */}
        <aside className="portal-sidebar">
          <nav className="portal-sidebar-nav">
            <p className="portal-sidebar-label">Quick Links</p>

            <Link href="/portal/the-foundation" className="portal-sidebar-link">
              <span>The Foundation</span>
              <span className="portal-sidebar-link-arrow">→</span>
            </Link>
            <Link href="/portal/presence-score" className="portal-sidebar-link">
              <span>Presence Score</span>
              <span className="portal-sidebar-link-arrow">→</span>
            </Link>
            <Link href="/portal/tonality" className="portal-sidebar-link">
              <span>Tonality Analysis</span>
              <span className="portal-sidebar-link-arrow">→</span>
            </Link>
            <Link href="/portal/movement-plan" className="portal-sidebar-link">
              <span>Movement Plan</span>
              <span className="portal-sidebar-link-arrow">→</span>
            </Link>
            <Link href="/ikigai" className="portal-sidebar-link">
              <span>Discover Ikigai</span>
              <span className="portal-sidebar-link-arrow">→</span>
            </Link>
            <Link href="/contact" className="portal-sidebar-link">
              <span>Book a Session</span>
              <span className="portal-sidebar-link-arrow">→</span>
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  )
}
