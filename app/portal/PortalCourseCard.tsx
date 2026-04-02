import Link from 'next/link'

interface PortalCourseCardProps {
  title: string
  slug: string
  progress: number     // 0–100 integer from getCourseProgress()
  totalLessons: number
  difficulty?: string
}

export default function PortalCourseCard({
  title,
  slug,
  progress,
  totalLessons,
  difficulty,
}: PortalCourseCardProps) {
  const hasStarted = progress > 0

  return (
    <Link href={`/portal/${slug}`} className="portal-course-card">
      <div className="portal-course-card-body">
        {/* [COPY] Course title comes from Sanity */}
        <h3 className="portal-course-card-title">{title}</h3>
        <p className="portal-course-card-meta">
          {totalLessons} lesson{totalLessons !== 1 ? 's' : ''}
          {difficulty ? ` · ${difficulty}` : ''}
        </p>
      </div>

      <div className="portal-course-card-footer">
        <div className="portal-course-card-progress-track">
          <div
            className="portal-course-card-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="portal-course-card-progress-row">
          {/* [COPY] Progress label */}
          <span className="portal-course-card-progress-label">{progress}% complete</span>
          {/* [COPY] CTA — "Continue" vs "Start" */}
          <span className="portal-course-card-cta">
            {hasStarted ? 'Continue →' : 'Start →'}
          </span>
        </div>
      </div>
    </Link>
  )
}
