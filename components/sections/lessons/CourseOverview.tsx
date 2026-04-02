import Link from 'next/link'

// ── Types ────────────────────────────────────────────────────────────────────

interface OverviewLesson {
  slug: { current: string }
  title: string
  access: 'free' | 'enrolled'
  estimatedDuration?: number
}

interface OverviewModule {
  _id: string
  title: string
  lessons: OverviewLesson[]
}

interface OverviewCourse {
  title: string
  description?: string
  difficulty?: string
  modules: OverviewModule[]
}

export interface CourseOverviewProps {
  course: OverviewCourse
  courseSlug: string
  firstFreeLesson: { slug: { current: string }; title: string } | null
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function totalMinutes(modules: OverviewModule[]): number {
  return modules
    .flatMap((m) => m.lessons ?? [])
    .reduce((sum, l) => sum + (l.estimatedDuration ?? 0), 0)
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}

// ── Component ────────────────────────────────────────────────────────────────

export function CourseOverview({ course, courseSlug, firstFreeLesson }: CourseOverviewProps) {
  const modules = course.modules ?? []
  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length ?? 0), 0)
  const duration = totalMinutes(modules)

  return (
    <article className="course-overview">
      {/* COPYWRITER: eyebrow label */}
      <p className="course-overview-eyebrow">Course Overview</p>

      <h1 className="course-overview-title">{course.title}</h1>

      {/* COPYWRITER: fallback displayed when description Sanity field is empty */}
      {course.description && (
        <p className="course-overview-description">{course.description}</p>
      )}

      {/* Meta badges */}
      <ul className="course-overview-badges" aria-label="Course details">
        {course.difficulty && (
          <li className="course-overview-badge">{course.difficulty}</li>
        )}
        {duration > 0 && (
          <li className="course-overview-badge">{formatDuration(duration)} total</li>
        )}
        <li className="course-overview-badge">
          {modules.length} module{modules.length !== 1 ? 's' : ''}
        </li>
        <li className="course-overview-badge">
          {totalLessons} lesson{totalLessons !== 1 ? 's' : ''}
        </li>
      </ul>

      {/* Module breakdown */}
      <section className="course-overview-modules" aria-label="Module list">
        {/* COPYWRITER: section subheading */}
        <h2 className="course-overview-modules-heading">What you&apos;ll learn</h2>
        <ol className="course-overview-module-list">
          {modules.map((mod, idx) => (
            <li key={mod._id} className="course-overview-module-row">
              <span className="course-overview-module-index">{idx + 1}</span>
              <span className="course-overview-module-name">{mod.title}</span>
              <span className="course-overview-module-count">
                {mod.lessons?.length ?? 0} lesson{(mod.lessons?.length ?? 0) !== 1 ? 's' : ''}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Primary CTA */}
      {firstFreeLesson ? (
        <Link
          href={`/lessons/${courseSlug}/${firstFreeLesson.slug.current}`}
          className="course-overview-cta"
        >
          {/* COPYWRITER: primary button text */}
          Start First Lesson →
        </Link>
      ) : (
        <p className="course-overview-locked-note">
          {/* COPYWRITER: message shown when no free-preview lesson exists */}
          Log in to access this course.
        </p>
      )}
    </article>
  )
}
