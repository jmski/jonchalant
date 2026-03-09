'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

/**
 * Portal Dashboard / Index Page
 *
 * Shows:
 * - All modules in curriculum
 * - Lessons within each module
 * - Progress indicators (completed lessons)
 * - Active lesson highlight
 *
 * Technical manual aesthetic with monospace typography
 */

interface Lesson {
  _id: string
  title: string
  slug: any
  duration: number
  difficulty: string
  order: number
}

interface Module {
  _id: string
  title: string
  slug: any
  order: number
  icon: string
  lessons: Lesson[]
}

interface Progress {
  lesson_id: string
  is_completed: boolean
}

export default function PortalDashboard() {
  const { user, isLoading, session } = useAuth()
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>([])
  const [progress, setProgress] = useState<Progress[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  // Redirect to login if no session
  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/login')
    }
  }, [session, isLoading, router])

  // Fetch modules and progress
  useEffect(() => {
    if (!user) return

    const loadData = async () => {
      setIsLoadingData(true)
      try {
        // TODO: Implement Sanity query for modules
        // For now, using placeholder
        const modulesData: Module[] = []

        // Fetch user progress
        const { data: progressData } = await supabase
          .from('lesson_progress')
          .select('lesson_id, is_completed')
          .eq('user_id', user.id)

        setModules(modulesData)
        setProgress(progressData || [])
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setIsLoadingData(false)
      }
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
