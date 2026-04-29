'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SignOutButton from './SignOutButton'
import SidebarOverlay from '@/components/layout/SidebarOverlay'
import PresenceCoachWidget from './PresenceCoachWidget'

export interface SidebarLesson {
  slug: string
  title: string
}

export interface SidebarModule {
  _id: string
  title: string
  order: number
  lessons: SidebarLesson[]
}

export interface SidebarCourse {
  title: string
  slug: string
  progressPct: number
  completedSlugs: string[]
  modules: SidebarModule[]
}

interface PortalShellProps {
  courses: SidebarCourse[] | null
  children: React.ReactNode
  userId?: string | null
  firstName?: string
}

// ── Sub-components ───────────────────────────────────────────────────────────

function NavItem({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`portal-sidebar-nav-item${active ? ' portal-sidebar-nav-item--active' : ''}`}
    >
      {label}
    </Link>
  )
}

function CourseTree({
  course,
  activeCourseSlug,
  activeLessonSlug,
}: {
  course: SidebarCourse
  activeCourseSlug: string | null
  activeLessonSlug: string | null
}) {
  const isActiveCourse = course.slug === activeCourseSlug
  const [expanded, setExpanded] = useState(isActiveCourse)

  // Auto-expand when navigating into this course
  useEffect(() => {
    if (isActiveCourse) setExpanded(true)
  }, [isActiveCourse])

  return (
    <div className="portal-sidebar-course">
      <button
        className={`portal-sidebar-course-btn${isActiveCourse ? ' portal-sidebar-course-btn--active' : ''}`}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <span className="portal-sidebar-course-name">{course.title}</span>
        <span className="portal-sidebar-course-meta">
          <span className="portal-sidebar-course-pct">{course.progressPct}%</span>
          <span className="portal-sidebar-course-chevron" aria-hidden="true">
            {expanded ? '▾' : '▸'}
          </span>
        </span>
      </button>

      {expanded && (
        <div className="portal-sidebar-modules">
          {course.modules.map((mod) => (
            <div key={mod._id} className="portal-sidebar-module">
              <p className="portal-sidebar-module-label">{mod.title}</p>
              <ul className="portal-sidebar-lessons">
                {mod.lessons.map((lesson) => {
                  const isCurrentLesson =
                    isActiveCourse && lesson.slug === activeLessonSlug
                  const isDone = course.completedSlugs.includes(lesson.slug)

                  let lessonClass = 'portal-sidebar-lesson'
                  if (isCurrentLesson) lessonClass += ' portal-sidebar-lesson--active'
                  else if (isDone) lessonClass += ' portal-sidebar-lesson--done'

                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/portal/${course.slug}/${lesson.slug}`}
                        className={lessonClass}
                      >
                        <span className="portal-sidebar-lesson-dot" aria-hidden="true">
                          {isCurrentLesson ? '●' : isDone ? '✓' : '○'}
                        </span>
                        <span className="portal-sidebar-lesson-title">{lesson.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main shell ────────────────────────────────────────────────────────────────

export default function PortalShell({ courses, children, userId, firstName }: PortalShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change (mobile UX)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Derive active course + lesson from pathname: /portal/[courseSlug]/[lessonSlug]
  const pathParts = pathname.split('/').filter(Boolean)
  const activeCourseSlug = pathParts.length >= 2 ? pathParts[1] : null
  const activeLessonSlug = pathParts.length >= 3 ? pathParts[2] : null

  return (
    <div className="portal-page">
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header className="portal-topbar">
        <button
          className="portal-topbar-menu"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
          aria-expanded={sidebarOpen}
        >
          <span className="portal-topbar-menu-bar" aria-hidden="true" />
          <span className="portal-topbar-menu-bar" aria-hidden="true" />
          <span className="portal-topbar-menu-bar" aria-hidden="true" />
        </button>

        <Link href="/" className="portal-topbar-brand">
          JONCHALANT
        </Link>

        <div className="portal-topbar-actions">
          <SignOutButton />
        </div>
      </header>

      {/* ── Body: sidebar + content ─────────────────────────────────────────── */}
      <div className="portal-shell-body">
        {/* Mobile overlay */}
        <SidebarOverlay
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <nav
          className={`portal-sidebar${sidebarOpen ? ' portal-sidebar--open' : ''}`}
          aria-label="Portal navigation"
        >
          <div className="portal-sidebar-inner">
            {/* ── LEARN ── */}
            <div className="portal-sidebar-section">
              <p className="portal-sidebar-section-title">Learn</p>
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  <CourseTree
                    key={course.slug}
                    course={course}
                    activeCourseSlug={activeCourseSlug}
                    activeLessonSlug={activeLessonSlug}
                  />
                ))
              ) : (
                <p className="portal-sidebar-empty">No courses yet.</p>
              )}
            </div>

            {/* ── TOOLS ── */}
            <div className="portal-sidebar-section">
              <p className="portal-sidebar-section-title">Tools</p>
              <NavItem
                href="/portal/presence-score"
                label="Presence Score"
                active={pathname === '/portal/presence-score'}
              />
              <NavItem
                href="/portal/tonality"
                label="Tonality Analysis"
                active={pathname === '/portal/tonality'}
              />
              <NavItem
                href="/portal/movement-plan"
                label="Movement Plan"
                active={pathname === '/portal/movement-plan'}
              />
            </div>

            {/* ── COACHING ── */}
            <div className="portal-sidebar-section">
              <p className="portal-sidebar-section-title">Coaching</p>
              <NavItem href="/ikigai" label="Discover Ikigai" active={false} />
              <NavItem href="/contact" label="Book a Session" active={false} />
            </div>

            {/* ── ACCOUNT ── */}
            <div className="portal-sidebar-section">
              <p className="portal-sidebar-section-title">Account</p>
              <NavItem
                href="/portal/settings"
                label="Settings"
                active={pathname === '/portal/settings'}
              />
            </div>

            {/* ── SIGN OUT ── */}
            <div className="portal-sidebar-section portal-sidebar-section--footer">
              <SignOutButton className="portal-sidebar-signout" />
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="portal-content" id="main-content">
          {children}
        </main>
      </div>

      {/* Floating AI Coach widget — available on all portal pages */}
      {userId && firstName && (
        <PresenceCoachWidget userId={userId} firstName={firstName} />
      )}
    </div>
  )
}
