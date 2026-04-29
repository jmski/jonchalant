import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SanityImage } from '@/lib/types'

export interface CourseProgress {
  completed: number
  total: number
  percentage: number
}

interface CourseCardProps {
  title: string
  slug: string
  description: string
  thumbnail?: SanityImage
  difficulty?: string | null
  moduleCount: number
  lessonCount: number
  estimatedMinutes: number
  progress: CourseProgress | null
  hasPreview?: boolean
}

function formatDuration(minutes: number): string | null {
  if (!minutes) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}

function getPlaceholderSymbol(slug: string): string {
  if (slug.includes('four-circles') || slug.includes('four_circles')) return '⊙'
  if (slug.includes('foundation')) return '◈'
  return '○'
}

export function CourseCard({
  title,
  slug,
  description,
  thumbnail,
  difficulty,
  moduleCount,
  lessonCount,
  estimatedMinutes,
  progress,
  hasPreview,
}: CourseCardProps) {
  const hasProgress = progress != null && progress.completed > 0
  const isComplete = hasProgress && progress.percentage >= 100
  const ctaLabel = isComplete ? 'Review Course' : hasProgress ? 'Continue' : 'Start Course'
  const durationLabel = formatDuration(estimatedMinutes)

  return (
    <article className="course-card">
      <div className="course-card-thumbnail">
        {thumbnail ? (
          <Image
            src={urlFor(thumbnail).width(480).height(270).url()}
            alt={title}
            width={480}
            height={270}
            className="course-card-image"
          />
        ) : (
          <div className="course-card-thumbnail-placeholder">
            <span className="course-card-thumbnail-placeholder-symbol" aria-hidden="true">
              {getPlaceholderSymbol(slug)}
            </span>
          </div>
        )}
      </div>

      <div className="course-card-body">
        {(difficulty || isComplete || hasPreview) && (
          <div className="course-card-badges">
            {difficulty && (
              <span className="course-card-badge course-card-badge--difficulty">
                {difficulty}
              </span>
            )}
            {hasPreview && !isComplete && (
              <span className="course-card-badge course-card-badge--preview">
                Free preview
              </span>
            )}
            {isComplete && (
              <span className="course-card-badge course-card-badge--complete">
                ✓ Complete
              </span>
            )}
          </div>
        )}

        <h2 className="course-card-title">{title}</h2>
        <p className="course-card-description">{description}</p>

        <ul className="course-card-meta">
          <li>{moduleCount} module{moduleCount !== 1 ? 's' : ''}</li>
          <li>{lessonCount} lesson{lessonCount !== 1 ? 's' : ''}</li>
          {durationLabel && <li>{durationLabel}</li>}
        </ul>

        {progress && (
          <div className="course-card-progress">
            <div className="course-card-progress-track">
              <div
                className="course-card-progress-fill"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <span className="course-card-progress-label">
              {progress.completed} / {progress.total} lessons complete
            </span>
          </div>
        )}

        <Link href={`/lessons/${slug}`} className="course-card-cta">
          {ctaLabel} <span className="course-card-cta-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
