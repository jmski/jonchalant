import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getCourses } from '@/lib/sanity'
import { getCourseProgress } from '@/lib/progress'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import PortalCourseCard from './PortalCourseCard'

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
      return getCourseProgress(user.id, course.slug.current, totalLessons)
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

    loadData()
  }, [user])

  if (isLoading) {
    return (
      <div className="portal-dashboard-page">
        <div className="portal-dashboard-loading">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect via useEffect
  }

  const completedLessonIds = new Set(
    progress.filter((p) => p.is_completed).map((p) => p.lesson_id)
  )

  return (
    <div className="portal-dashboard-page">
      <div className="portal-dashboard-container">
        {/* Header */}
        <div className="portal-dashboard-header">
          <h1 className="portal-dashboard-title">THE KINETIC LEADER</h1>
          <p className="portal-dashboard-subtitle">
            Technical Manual: Social Fluency Curriculum
          </p>
          <div className="portal-dashboard-user-info">
            <span className="portal-dashboard-user-label">Logged in as</span>
            <span className="portal-dashboard-user-email">{user?.email}</span>
          </div>
        </div>

        {/* Curriculum Index */}
        <div className="portal-dashboard-content">
          {isLoadingData ? (
            <div className="portal-dashboard-loading">Loading modules...</div>
          ) : modules.length === 0 ? (
            <div className="portal-dashboard-empty">
              <p>No modules available yet.</p>
            </div>
          ) : (
            <div className="portal-dashboard-modules">
              {modules.map((module: Module) => {
                const moduleCompletedCount = module.lessons.filter((lesson) =>
                  completedLessonIds.has(lesson.slug?.current || lesson.slug)
                ).length
                const moduleTotal = module.lessons.length
                const modulePercentage =
                  moduleTotal > 0
                    ? Math.round((moduleCompletedCount / moduleTotal) * 100)
                    : 0

                return (
                  <section
                    key={module._id}
                    className="portal-dashboard-module"
                  >
                    {/* Module Header */}
                    <div className="portal-dashboard-module-header">
                      <div className="portal-dashboard-module-title-group">
                        <span className="portal-dashboard-module-icon">
                          {module.icon || '□'}
                        </span>
                        <h2 className="portal-dashboard-module-title">
                          {module.title}
                        </h2>
                      </div>
                      <div className="portal-dashboard-module-progress">
                        <span className="portal-dashboard-progress-label">
                          {moduleCompletedCount} / {moduleTotal}
                        </span>
                        <div className="portal-dashboard-progress-bar">
                          <div
                            className="portal-dashboard-progress-fill"
                            style={{ width: `${modulePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Lessons List */}
                    <div className="portal-dashboard-lessons">
                      {module.lessons
                        .sort((a, b) => a.order - b.order)
                        .map((lesson) => {
                          const lessonSlug = lesson.slug?.current || lesson.slug
                          const isCompleted = completedLessonIds.has(lessonSlug)

                          return (
                            <a
                              key={lesson._id}
                              href={`/portal/${lessonSlug}`}
                              className={`portal-dashboard-lesson ${
                                isCompleted
                                  ? 'portal-dashboard-lesson--completed'
                                  : ''
                              }`}
                            >
                              <div className="portal-dashboard-lesson-checkbox">
                                {isCompleted ? (
                                  <span className="portal-dashboard-checkmark">
                                    ✓
                                  </span>
                                ) : (
                                  <span className="portal-dashboard-checkbox-empty">
                                    □
                                  </span>
                                )}
                              </div>
                              <div className="portal-dashboard-lesson-info">
                                <div className="portal-dashboard-lesson-title">
                                  {lesson.title}
                                </div>
                                <div className="portal-dashboard-lesson-meta">
                                  <span>{lesson.duration} min</span>
                                  <span className="portal-dashboard-lesson-difficulty">
                                    {lesson.difficulty}
                                  </span>
                                </div>
                              </div>
                            </a>
                          )
                        })}
                    </div>
                  </section>
                )
              })}
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="portal-dashboard-sidebar">
          <div className="portal-dashboard-sidebar-card">
            <div className="portal-dashboard-sidebar-label">
              Curriculum Version
            </div>
            <div className="portal-dashboard-sidebar-value">v1.0</div>
          </div>
          <div className="portal-dashboard-sidebar-card">
            <div className="portal-dashboard-sidebar-label">
              Last Updated
            </div>
            <div className="portal-dashboard-sidebar-value">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="portal-dashboard-footer">
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="portal-dashboard-logout">
              Sign Out
            </button>
          </form>
          <p className="portal-dashboard-footer-text">
            The Kinetic Leader © 2024
          </p>
        </div>
      </div>
    </div>
  )
}
