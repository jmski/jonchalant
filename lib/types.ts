// ─────────────────────────────────────────────────────────────────────────────
// lib/types.ts — Central type definitions for the jonchalant codebase
//
// Single source of truth for all shared interfaces across pages, components,
// and utility functions. Matches the Sanity schema shapes defined in sanity/schemas/.
// ─────────────────────────────────────────────────────────────────────────────

// ── Sanity primitives ─────────────────────────────────────────────────────────

export interface SanitySlug { current: string }

export interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    dimensions?: {
      width: number
      height: number
    }
    lqip?: string
  }
}

export interface SanityImage {
  asset: SanityImageAsset
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

// ── Ikigai / Four Circles ─────────────────────────────────────────────────────

export type Quadrant = 'passion' | 'mission' | 'vocation' | 'profession'

export type IkigaiPattern =
  | 'delight-no-wealth'
  | 'delight-uncertain'
  | 'comfortable-empty'
  | 'useful-unexcited'

export type DifficultyTier = 'basic' | 'challenging' | 'hardest'

export type CourseType = 'free-gated' | 'paid'

export interface IkigaiScores {
  passion: number
  mission: number
  vocation: number
  profession: number
}

export interface IkigaiResult extends IkigaiScores {
  id: string
  userId: string
  strongestQuadrant: Quadrant
  pattern: IkigaiPattern | null
  createdAt: string
}

export interface CourseLesson {
  _id: string
  title: string
  slug: SanitySlug
  lessonNumber: number
  difficultyTier: DifficultyTier
  ikigaiQuadrants?: Quadrant[]
  subtitle?: string
  summary: string
  content?: any[]
  reflectionPrompt?: string
  tryThisWeek?: string
  estimatedMinutes?: number
}

export interface IkigaiQuizQuestion {
  _key?: string
  questionText: string
  quadrant: Quadrant
  order: number
}

export interface IkigaiAnswerOption {
  _key?: string
  label: string
  value: number
}

export interface IkigaiResultInterpretation {
  _key?: string
  type: 'quadrant-dominant' | 'three-circle-pattern'
  quadrant?: Quadrant
  pattern?: IkigaiPattern
  headline: string
  body: string
  recommendedLessonNumber?: number
}

export interface IkigaiQuiz {
  _id: string
  title: string
  introText?: string
  questions: IkigaiQuizQuestion[]
  answerScale: IkigaiAnswerOption[]
  resultInterpretations?: IkigaiResultInterpretation[]
}

// ── Learning portal / curriculum ──────────────────────────────────────────────

export interface ContentPillar {
  _key?: string
  name: string
  description: string
}

export interface LessonStructureStep {
  _key?: string
  step: number
  name: string
  durationRange: string
  description: string
}

export interface Course {
  _id: string
  title: string
  slug: SanitySlug
  description: string
  philosophy?: string
  targetAudience?: string
  totalEstimatedHours?: number
  contentPillars?: ContentPillar[]
  lessonStructure?: LessonStructureStep[]
  thumbnail?: SanityImage
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedDuration: string
  isFeatured: boolean
  modules: Module[]
  order: number
  // Four Circles / new-course fields (optional — absent on Foundation)
  courseType?: CourseType
  subtitle?: string
  heroImage?: SanityImage
  ctaText?: string
  whoThisIsFor?: string[]
  whatThisIsNot?: string[]
  pricing?: {
    amount: number
    currency: string
    description?: string
  }
  lessons?: CourseLesson[]
}

export interface Module {
  _id: string
  title: string
  slug: SanitySlug
  moduleNumber?: number
  description?: string
  theme?: string
  danceIntegration?: string
  estimatedHours?: string
  lessons: Lesson[]
  order: number
}

export interface TechnicalNote {
  _key?: string
  label: string
  content: string
}

export type LessonEmphasis = 'body_control' | 'active_listening' | 'improvisation' | 'reciprocation' | 'tonality_presence' | 'all_pillars'

export interface Lesson {
  _id: string
  title: string
  slug: SanitySlug
  lessonNumber?: string
  access: 'free' | 'enrolled'
  description?: string
  format?: string
  emphasis?: LessonEmphasis
  videoId?: string
  body?: any[]
  socialLogic?: string
  technicalNotes?: TechnicalNote[]
  duration?: number
  order: number
  module?: { _id: string; title: string; slug: SanitySlug }
  publishedAt?: string
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogPost {
  _id: string
  title: string
  slug: SanitySlug
  publishedAt: string
  pillar?: string
  category?: string
  readTime?: number
  excerpt?: string
  coverImage?: SanityImage
}

// ── Programs & services ───────────────────────────────────────────────────────

export interface ProgramsPageContent {
  heroEyebrow?: string
  heroHeadline?: string
  heroSubheading?: string
  offersEyebrow?: string
  offersHeading?: string
  offersSubtext?: string
  offerCards?: ProgramTrackItem[]
  whoForHeading?: string
  whoForBody?: string[]
  ctaHeading?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonHref?: string
  ctaMicrocopy?: string
}

export interface ProgramTrackItem {
  _id: string
  title: string
  eyebrow?: string
  trackType: 'course' | 'program' | 'coaching'
  description: string
  price: string
  includes: string[]
  ctaText: string
  ctaHref: string
  isFeatured: boolean
  order: number
}

export interface Testimonial {
  _id: string
  quote: string
  clientName: string
  role?: string
  company?: string
  result?: string
  image?: unknown
}

// ── Dance page ────────────────────────────────────────────────────────────────

export interface DancePageContent {
  featuredVideoUrl?: string
  featuredVideoTitle?: string
  featuredVideoCaption?: string
  heroEyebrow?: string
  heroHeadline?: string
  heroSubheadline?: string
  instagramHeadline?: string
  ctaHeadline?: string
  ctaBody?: string
  ctaButtonLabel?: string
  ctaButtonHref?: string
  bridgeEyebrow?: string
  bridgeHeadline?: string
  bridgeClose?: string
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

// ── Audit page ────────────────────────────────────────────────────────────────

export interface AuditResultBand {
  band: 'foundation' | 'developing' | 'refining'
  headline: string
  body: string
}

export interface AuditPageContent {
  pageHeaderBadge?: string
  pageHeaderHeadline?: string
  pageHeaderBody?: string
  pageFooterNote?: string
  captureBadge?: string
  captureHeadline?: string
  captureBody?: string
  capturePrivacyNote?: string
  resultBands?: AuditResultBand[]
  resultNextHeading?: string
  resultNextBody?: string
  resultCtaText?: string
  resultCtaButtonLabel?: string
  resultCtaHref?: string
}

// ── Contact page ──────────────────────────────────────────────────────────────

export interface ContactAuditStat {
  number: string
  label: string
}

export interface ContactSidebarItem {
  title: string
  body: string
}

export interface ContactPageContent {
  auditPromptBadge?: string
  auditPromptHeadline?: string
  auditPromptBody?: string
  auditPromptButtonText?: string
  auditPromptNote?: string
  auditStats?: ContactAuditStat[]
  coachingPathHeading?: string
  coachingPathBody?: string
  coachingCalendlyHref?: string
  coachingCalendlyLabel?: string
  sidebarHeading?: string
  sidebarItems?: ContactSidebarItem[]
  sidebarEmailText?: string
}

// ── Email opt-in ──────────────────────────────────────────────────────────────

export interface EmailOptInContent {
  eyebrow?: string
  heading?: string
  description?: string
  submitButtonText?: string
  disclaimer?: string
  successTitle?: string
  successBody?: string
}

// ── About page ────────────────────────────────────────────────────────────────

export interface OriginPhase {
  _key: string
  order: number
  title: string
  description?: string
  pullQuote?: string
  image: SanityImage
  imageAlt: string
}

export interface HeroCycleSlide {
  _key: string
  kind: 'three-js-figure' | 'photo' | 'typography' | 'video-loop'
  image?: SanityImage
  typographicWord?: string
  caption?: string
  durationMs?: number
}

// ── About page bento tiles ────────────────────────────────────────────────────

export type PortraitTile = {
  _type: 'portraitTile'
  image: SanityImage & { asset: SanityImageAsset & { metadata?: { dimensions?: { width: number; height: number }; lqip?: string } } }
  alt: string
}

export type QuoteTile = {
  _type: 'quoteTile'
  quote: string
  attribution?: string
}

export type StatTile = {
  _type: 'statTile'
  number: string
  label: string
}

export type BioTile = {
  _type: 'bioTile'
  text: string
}

export type BentoTile = PortraitTile | QuoteTile | StatTile | BioTile

// ── About page ───────────────────────────────────────────────────────────────

export interface AboutPage {
  heroHeadline?: string
  heroDescription?: string
  heroImage?: SanityImage
  originImage?: SanityImage
  philosophyImage?: SanityImage
  introvertImage?: SanityImage
  originSectionLabel?: string
  originSectionHeadline?: string
  originSectionDescription?: string
  originSectionHighlight?: string
  originSectionAnchorWord?: string
  originPhases?: OriginPhase[]
  turningPointHeadline?: string
  turningPointBody?: string
  turningPointHighlight?: string
  methodologyHeadline?: string
  methodologyBody?: string
  methodologyHighlight?: string
  whyExistsHeadline?: string
  whyExistsBody?: string
  whyExistsHighlight?: string
  whoForHeadline?: string
  whoForBody?: string
  whoForHighlight?: string
  closingHeadline?: string
  closingBody?: string
  ctaButtonText?: string
  bentoTiles?: BentoTile[]
}

// ── Blog config ───────────────────────────────────────────────────────────────

export interface BlogConfig {
  seriesBannerEnabled?: boolean
  seriesName?: string
  seriesSlug?: string
  seriesStatus?: string
  seriesDescription?: string
  seriesCurrentPhase?: string
  seriesCTALabel?: string
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

// ── Home page ─────────────────────────────────────────────────────────────────

export interface WhyItWorksCell {
  _key: string
  title: string
  insight?: string
  image?: SanityImage
  size?: 'sm' | 'md' | 'lg' | 'tall' | 'wide'
}

export interface HomePageContent {
  heroEyebrow?: string
  heroHeadline?: string
  heroCyclingOutcomes?: string[]
  heroDescription?: string
  heroSubtext?: string
  heroCtaText?: string
  heroCtaLink?: string
  heroMicrocopy?: string
  heroSecondaryCtaText?: string
  heroStats?: Array<{ value: string; label: string }>
  servicesHeadline?: string
  servicesDescription?: string
  whyItWorksLabel?: string
  whyItWorksHighlight?: string
  whyItWorksParagraph1?: string
  whyItWorksParagraph2?: string
  whyItWorksParagraph3?: string
  whyItWorksBentoHeadline?: string
  whyItWorksCells?: WhyItWorksCell[]
  testimonialsEyebrow?: string
  testimonialsHeading?: string
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonHref?: string
  meetJonImage?: SanityImage
  heroHeadlineStatic?: string
  heroHeadlineAnchorWord?: string
  heroSubhead?: string
  heroCycle?: HeroCycleSlide[]
}

export interface CurriculumWeek {
  _id: string
  weekNumber: number
  title: string
  oneLineDescription?: string
  illustrationSlug?: string
  bentoSize?: 'sm' | 'md' | 'lg' | 'tall' | 'wide'
  order: number
}

