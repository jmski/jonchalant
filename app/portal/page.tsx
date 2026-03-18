import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getCourses } from '@/lib/sanity'
import { getCourseProgressPercent } from '@/lib/portal-progress'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import PortalCourseCard from './PortalCourseCard'
import { PresenceCoach } from '@/components/portal/PresenceCoach'

export default async function PortalDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/portal')
  }

  // Derive first name from Google full_name or email prefix
  const fullName = user.user_metadata?.full_name as string | undefined
  // [COPY] Greeting name — falls back to email prefix if no display name
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
      return getCourseProgressPercent(user.id, course.slug.current, totalLessons)
    }),
  )

  return (
    <div className="portal-page">
      {/* ── Top bar ── */}
      <header className="portal-topbar">
        <Link href="/" className="portal-topbar-brand">
          {/* [COPY] Wordmark */}
          JONCHALANT
        </Link>
        <div className="portal-topbar-actions">
          <SignOutButton />
        </div>
      </header>

      <main className="portal-main">
        {/* ── Welcome ── */}
        <section className="portal-welcome">
          {/* [COPY] Greeting headline */}
          <h1 className="portal-welcome-greeting">Welcome back, {firstName}.</h1>
          {/* [COPY] Subtitle */}
          <p className="portal-welcome-subtitle">Here&rsquo;s where you left off.</p>
        </section>

        {/* ── My Courses ── */}
        <section className="portal-section">
          {/* [COPY] Section label */}
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
            // [COPY] Empty state
            <p className="portal-empty">No courses available yet. Check back soon.</p>
          )}
        </section>

        {/* ── AI Presence Coach ── */}
        <section className="portal-section portal-section--coach">
          {/* [COPY] Section label */}
          <h2 className="portal-section-label">Your AI Presence Coach</h2>
          <div className="portal-coach-panel">
            <PresenceCoach userId={user.id} firstName={firstName} />
          </div>
        </section>

        {/* ── Quick Links ── */}
        <section className="portal-section">
          {/* [COPY] Section label */}
          <h2 className="portal-section-label">Quick Links</h2>
          <div className="portal-quicklinks-grid">
            <Link href="/lessons" className="portal-quicklink-card">
              {/* [COPY] */}
              <span className="portal-quicklink-title">Browse All Courses</span>
              <span className="portal-quicklink-arrow">→</span>
            </Link>
            <Link href="/ikigai" className="portal-quicklink-card">
              {/* [COPY] */}
              <span className="portal-quicklink-title">Discover Your Ikigai</span>
              <span className="portal-quicklink-arrow">→</span>
            </Link>
            <Link href="/contact" className="portal-quicklink-card">
              {/* [COPY] */}
              <span className="portal-quicklink-title">Book a Session</span>
              <span className="portal-quicklink-arrow">→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}


