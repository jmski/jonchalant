// ─────────────────────────────────────────────────────────────────────────────
// lib/types.ts — Central type definitions for the jonchalant codebase
//
// Single source of truth for all shared interfaces across pages, components,
// and utility functions. Page/singleton types match the GROQ projections in
// lib/sanity.ts.
// ─────────────────────────────────────────────────────────────────────────────

import type { PortableTextBlock } from '@portabletext/types'

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

// ── Shared object types (sanity/schemas/objects/*) ────────────────────────────

export interface Cta {
  label: string
  href: string
  ariaLabel?: string
}

export interface Link {
  label: string
  href: string
}

export interface Hero {
  eyebrow?: string
  headline: string
  subhead?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  microcopy?: string
}

export interface SectionHeader {
  eyebrow?: string
  headline: string
  subhead?: string
  body?: string
}

export interface CtaBlock {
  eyebrow?: string
  headline: string
  body?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  microcopy?: string
}

export interface PillarCard {
  title: string
  body: string
}

export interface ProgramCard {
  eyebrow?: string
  title: string
  priceLine: string
  description: string
  inclusions: string[]
  primaryCta: Cta
  badge?: string
}

export interface CourseCard {
  eyebrow?: string
  title: string
  tagline?: string
  description: string
  metadata?: string[]
  primaryCta: Cta
}

export interface FaqItem {
  question: string
  answer: string
}

// ── Shared singletons ─────────────────────────────────────────────────────────

export interface NewsletterCapture {
  eyebrow?: string
  headline: string
  subhead: string
  emailLabel: string
  emailPlaceholder: string
  submitLabel: string
  microcopy: string
}

export interface AuditCta {
  eyebrow: string
  headline: string
  body: string
  primaryCta: Cta
  microcopy: string
}

export interface StarterGuideCapture {
  eyebrow?: string
  headline: string
  body: string
  firstNamePlaceholder: string
  emailPlaceholder: string
  submitLabel: string
}

export interface PillarSet {
  pillars: PillarCard[]
}

export interface FourCirclesCircle {
  title: string
  definition: string
  missingLine: string
}

export interface FourCirclesSet {
  circles: FourCirclesCircle[]
}

export interface SocialLink {
  platform:
    | 'instagram'
    | 'linkedin'
    | 'youtube'
    | 'tiktok'
    | 'twitter'
    | 'threads'
    | 'bluesky'
    | 'substack'
    | 'medium'
    | 'other'
  url: string
  label?: string
}

export interface FooterColumn {
  header: string
  links: Link[]
}

export interface AccountSection {
  header?: string
  links?: Link[]
}

export interface SuccessState {
  key: 'general' | 'newsletter' | 'starterGuide' | 'contact'
  message: string
}

export interface ValidationMicrocopy {
  required: string
  invalidEmail: string
  tooShort: string
  tooLong: string
}

export interface SignInContent {
  headline: string
  subhead: string
  primaryLabel: string
  magicLinkLabel: string
  forgotPasswordLabel: string
}

export interface SignUpContent {
  headline: string
  subhead: string
  submitLabel: string
}

export interface SiteConfig {
  contactEmail: string
  // nav
  wordmark: string
  desktopLinks: Link[]
  rightSideLinks?: Link[]
  mobileLinks: Link[]
  mobilePersistentCta: Cta
  // footer
  brandLine: string
  columns: FooterColumn[]
  accountSection?: AccountSection
  copyright: string
  privacyLink: Cta
  // socials
  socialLinks?: SocialLink[]
  // formMicrocopy
  successStates: SuccessState[]
  submitError: string
  validation: ValidationMicrocopy
  loadingLabel: string
  // notFoundPage
  notFoundHeadline: string
  notFoundBody: string
  notFoundLinks: Link[]
  notFoundMicrocopy: string
  // authPages
  signIn: SignInContent
  signUp: SignUpContent
}

// ── Page singletons ───────────────────────────────────────────────────────────

export interface MethodStep {
  title: string
  body: string
}

export interface PageHome {
  hero: Hero
  methodHeader: SectionHeader
  methodSteps: MethodStep[]
  pillarsHeader: SectionHeader
  pillarSet: PillarSet
  meetJonHeader: SectionHeader
  meetJonImage?: SanityImage
  meetJonBodyParagraphs: string[]
  meetJonPrimaryLink?: Cta
  meetJonSecondaryLink?: Cta
  testimonialsHeader: SectionHeader
  blogPreviewHeader: SectionHeader
  blogPreviewPerCardCtaLabel: string
  blogPreviewSectionCta?: Cta
  newsletter: NewsletterCapture
  auditCta: AuditCta
  starterGuide: StarterGuideCapture
}

export interface StoryBeat {
  image?: SanityImage
  headline: string
  body: string
  bodyParagraph2?: string
  payoffLine?: string
}

export interface AboutWhoFor {
  image?: SanityImage
  headline: string
  body: string
}

export interface PageAbout {
  hero: Hero
  storyBeats: StoryBeat[]
  whoFor: AboutWhoFor
  cta: CtaBlock
}

export interface InquiryCard {
  eyebrow: string
  body: string
  inquiryType: 'oneOnOne' | 'general'
}

export interface WhatHappensNextStep {
  title: string
  body: string
}

export interface ThingsWorthKnowingItem {
  title: string
  body: string
}

export interface PageContact {
  hero: Hero
  inquiryCards: InquiryCard[]
  whatHappensNextHeader: string
  whatHappensNextSteps: WhatHappensNextStep[]
  thingsWorthKnowingHeader: string
  thingsWorthKnowingItems: ThingsWorthKnowingItem[]
  emailFallback: { bodyLine: string }
}

export interface AuditBand {
  headline: string
  body: string
  primaryCta: Cta
  secondaryCta?: Cta
}

export interface PageAudit {
  hero: Hero
  heroMicrocopy: string
  midQuizEncouragement: { line: string }
  resultBands: {
    low: AuditBand
    mid: AuditBand
    high: AuditBand
  }
  starterGuide: StarterGuideCapture
}

export interface CurriculumModule {
  number: number
  title: string
  duration: string
  blurb: string
}

export interface HowItWorksColumn {
  title: string
  body: string
}

export interface PageFoundation {
  hero: Hero
  heroMicrocopyUnderCtas?: string
  whoForHeader: string
  whoForLede: string
  whoForBullets: string[]
  whyDanceHeader: SectionHeader
  whyDanceBodyParagraphs: string[]
  curriculumHeader: SectionHeader
  curriculumModules: CurriculumModule[]
  howItWorksHeader: SectionHeader
  howItWorksColumns: HowItWorksColumn[]
  enrollmentHeader: SectionHeader
  enrollmentCards: ProgramCard[]
  enrollmentFootnote?: string
  faqHeader: string
  faqItems: FaqItem[]
  softCta: CtaBlock
  starterGuide: StarterGuideCapture
}

export interface HeroWhoForColumn {
  header: string
  bullets: string[]
}

export interface PagePrograms {
  hero: Hero
  heroWhoForColumn: HeroWhoForColumn
  caseStudiesHeader: SectionHeader
  programCardsHeader?: SectionHeader
  programCards: ProgramCard[]
  faqHeader: string
  faqItems: FaqItem[]
  closingCta: CtaBlock
  starterGuide: StarterGuideCapture
}

export interface FeaturedSeries {
  seriesBannerEnabled?: boolean
  seriesName?: string
  seriesSlug?: string
  seriesStatus?: string
  seriesDescription?: string
  seriesCurrentPhase?: string
  seriesCtaLabel?: string
}

export interface PageBlog {
  hero: Hero
  featuredSeries?: FeaturedSeries
  newsletter: NewsletterCapture
  auditCta: AuditCta
  emptyState: { headline: string; body: string }
}

export interface PageLessonsCourse {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  difficulty?: string
  estimatedDuration?: string
}

export interface PageLessons {
  hero: Hero
  courses: PageLessonsCourse[]
  closingCta?: CtaBlock
  starterGuide: StarterGuideCapture
}

export interface PageIkigai {
  hero: Hero
  fourCirclesHeader: SectionHeader
  fourCirclesSet: FourCirclesSet
  quizBridge: { line: string }
  starterGuide: StarterGuideCapture
  cta: CtaBlock
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
  reflectionPrompt?: string
  tryThisWeek?: string
  estimatedMinutes?: number
  content?: PortableTextBlock[]
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
  body?: PortableTextBlock[]
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

// ── Testimonials & case studies ───────────────────────────────────────────────

export interface Testimonial {
  _id: string
  quote: string
  clientName: string
  role?: string
  company?: string
  result?: string
  image?: unknown
}

export interface CaseStudy {
  _id: string
  title: string
  clientName: string
  industry?: string
  challenge?: string
  solution?: string
  results?: string[]
  image?: SanityImage
  slug: SanitySlug
  featured?: boolean
}

// ── Database / portal ─────────────────────────────────────────────────────────

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

// ── Curriculum bento (Phase 5) ───────────────────────────────────────────────

export interface CurriculumWeek {
  _id: string
  weekNumber: number
  title: string
  oneLineDescription?: string
  illustrationSlug?: string
  bentoSize?: 'sm' | 'md' | 'lg' | 'tall' | 'wide'
  order: number
}
