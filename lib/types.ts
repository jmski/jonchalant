// ─────────────────────────────────────────────────────────────────────────────
// lib/types.ts — Central type definitions for the jonchalant codebase
//
// Single source of truth for all shared interfaces across pages, components,
// and utility functions. Matches the Sanity schema shapes defined in sanity/schemas/.
// ─────────────────────────────────────────────────────────────────────────────

// ── Sanity primitives ─────────────────────────────────────────────────────────

export interface SanitySlug { current: string }
export interface SanityImage { asset: { _ref: string }; alt?: string; hotspot?: boolean }

// ── Learning portal / curriculum ──────────────────────────────────────────────

export interface Course {
  _id: string
  title: string
  slug: SanitySlug
  description: string
  thumbnail?: SanityImage
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedDuration: string
  isFeatured: boolean
  modules: Module[]
  order: number
}

export interface Module {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  lessons: Lesson[]
  order: number
}

export interface Lesson {
  _id: string
  title: string
  slug: SanitySlug
  description: string
  videoUrl?: string
  body?: any[]
  estimatedDuration?: number
  isFreePreview: boolean
  order: number
}

export interface PortalLesson {
  _id: string
  title: string
  slug: SanitySlug
  videoId?: string
  duration?: number
  order: number
  module?: { slug: SanitySlug }
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogPost {
  _id: string
  title: string
  slug: SanitySlug
  publishedAt: string
  category?: string
  readTime?: number
  excerpt?: string
  coverImage?: SanityImage
}

// ── Programs & services ───────────────────────────────────────────────────────

export interface Program {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  category?: string
  order: number
}

export interface Testimonial {
  _id: string
  quote: string
  name: string
  role?: string
  company?: string
  keyResult?: string
}

// ── Dance curriculum ──────────────────────────────────────────────────────────

export interface DanceCategory {
  _id: string
  title: string
  slug: SanitySlug
  leadershipPrinciple: string
  description: string
  icon?: string
  order: number
  videos: DanceVideo[]
}

export interface DanceVideo {
  title: string
  videoUrl: string
  duration?: number
  caption?: string
}

export interface InstagramReel {
  _id: string
  reelUrl: string
  order: number
}

// ── Media kit ─────────────────────────────────────────────────────────────────

export interface MediaKit {
  title: string
  heroBadge?: string
  heroHeadline: string
  heroSubheadline?: string
  shortBio: string
  longBio: string
  stats: MediaKitStat[]
  expertiseAreas: MediaKitExpertise[]
  pressAssetsPdfUrl?: string
  pressAssetsLabel?: string
  contactHeadline?: string
  contactSubheadline?: string
}

export interface MediaKitStat {
  value: string
  label: string
  order: number
}

export interface MediaKitExpertise {
  title: string
  description: string
  order: number
}

// ── Database ──────────────────────────────────────────────────────────────────

export interface LessonProgress {
  id: string
  user_id: string
  lesson_slug: string
  course_slug: string
  completed: boolean
  completed_at: string | null
  created_at: string
}

export interface PlanExercise {
  name: string
  duration: string
  instruction: string
  leadershipConnection: string
}

export interface PlanSession {
  day: string
  duration: string
  category: string
  exercises: PlanExercise[]
}

export interface PlanWeek {
  weekNumber: number
  theme: string
  focus: string
  sessions: PlanSession[]
}

export interface GeneratedPlan {
  title: string
  summary: string
  weeks: PlanWeek[]
  progressionNote: string
  adaptations: string
}

export interface MovementPlan {
  id: string
  user_id: string
  title: string
  goals?: string
  limitations?: string
  plan_data: GeneratedPlan
  created_at: string
}
