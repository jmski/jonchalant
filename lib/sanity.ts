// ─────────────────────────────────────────────────────────────────────────────
// lib/sanity.ts — Sanity client + all GROQ fetchers for the jonchalant site.
//
// Page singleton fetchers (getPageHome, getPageAbout, etc.) project the new
// page document types from sanity/schemas/documents/pages/. Shared singletons
// referenced by pages (newsletter, auditCta, starterGuide, pillarSet,
// fourCirclesSet) are pulled inline via reference resolution (->).
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

import type {
  AuditCta,
  Course,
  CourseLesson,
  CourseType,
  NewsletterCapture,
  PageAbout,
  PageAudit,
  PageBlog,
  PageContact,
  PageFoundation,
  PageHome,
  PageIkigai,
  PageLessons,
  PagePrograms,
  PillarSet,
  FourCirclesSet,
  SiteConfig,
  StarterGuideCapture,
} from './types'

// ============================================================================
// CLIENT
// ============================================================================

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// ============================================================================
// GENERIC QUERY HELPERS
// ============================================================================

/** Fetch an ordered array of documents, with an optional extra GROQ filter clause. */
async function fetchList(type: string, fields: string, extra?: string) {
  const filter = extra ? ` && ${extra}` : ''
  return client.fetch(`*[_type == "${type}"${filter}] | order(order asc) {${fields}}`)
}

/** Fetch a single document by an additional GROQ filter clause. */
async function fetchOne(type: string, fields: string, filter: string) {
  return client.fetch(`*[_type == "${type}" && ${filter}][0] {${fields}}`)
}

// ============================================================================
// GROQ FRAGMENTS — shared object projections
// ============================================================================

const CTA_FIELDS = `label, href, ariaLabel`

const LINK_FIELDS = `label, href`

const HERO_FIELDS = `
  eyebrow,
  headline,
  subhead,
  primaryCta { ${CTA_FIELDS} },
  secondaryCta { ${CTA_FIELDS} },
  microcopy
`

const SECTION_HEADER_FIELDS = `eyebrow, headline, subhead, body`

const CTA_BLOCK_FIELDS = `
  eyebrow,
  headline,
  body,
  primaryCta { ${CTA_FIELDS} },
  secondaryCta { ${CTA_FIELDS} },
  microcopy
`

const PROGRAM_CARD_FIELDS = `
  eyebrow,
  title,
  priceLine,
  description,
  inclusions,
  primaryCta { ${CTA_FIELDS} },
  badge
`

const FAQ_ITEM_FIELDS = `question, answer`

const IMAGE_FIELDS = `
  asset->{
    _id,
    url,
    metadata { dimensions { width, height }, lqip }
  },
  hotspot,
  crop,
  alt
`

// ── Shared singleton inline projections ──────────────────────────────────────

const NEWSLETTER_CAPTURE_FIELDS = `
  eyebrow,
  headline,
  subhead,
  emailLabel,
  emailPlaceholder,
  submitLabel,
  microcopy
`

const AUDIT_CTA_FIELDS = `
  eyebrow,
  headline,
  body,
  primaryCta { ${CTA_FIELDS} },
  microcopy
`

const STARTER_GUIDE_FIELDS = `
  eyebrow,
  headline,
  body,
  firstNamePlaceholder,
  emailPlaceholder,
  submitLabel
`

const PILLAR_SET_FIELDS = `
  pillars[] { title, body }
`

const FOUR_CIRCLES_SET_FIELDS = `
  circles[] { title, definition, missingLine }
`

// ============================================================================
// LIST CONTENT — testimonials, case studies, blog posts, courses, lessons
// ============================================================================

const TESTIMONIAL_FIELDS = `
    _id,
    clientName,
    role,
    company,
    quote,
    result,
    image,
    featured,
    serviceType,
    order
  `

const CASE_STUDY_FIELDS = `
    _id,
    title,
    slug,
    clientName,
    industry,
    challenge,
    solution,
    results,
    testimonial,
    image,
    featured,
    order
  `

const LESSON_FIELDS = `
    _id,
    title,
    slug,
    access,
    description,
    duration,
    order
  `

const COURSE_FIELDS = `
    _id,
    title,
    slug,
    description,
    thumbnail,
    difficulty,
    isFeatured,
    order,
    modules[]-> {
      _id,
      title,
      slug,
      description,
      order,
      lessons[]-> {
        slug,
        title,
        access,
        duration,
        order
      }
    }
  `

const MODULE_FIELDS = `
    _id,
    title,
    slug,
    description,
    order,
    lessons[]-> {
      _id,
      slug,
      title,
      access,
      duration,
      order
    }
  `

const LESSON_FIELDS_FULL = `
    _id,
    title,
    slug,
    access,
    description,
    videoId,
    body,
    socialLogic,
    technicalNotes[] { label, content, _key },
    duration,
    order,
    module-> { _id, title, "slug": slug.current }
  `

export async function getTestimonials(featured?: boolean) {
  return fetchList('testimonial', TESTIMONIAL_FIELDS, featured ? 'featured == true' : undefined)
}

export async function getCaseStudies(featured?: boolean) {
  return fetchList('caseStudy', CASE_STUDY_FIELDS, featured ? 'featured == true' : undefined)
}

export async function getCaseStudy(slug: string) {
  return fetchOne('caseStudy', CASE_STUDY_FIELDS, `slug.current == "${slug}"`)
}

export async function getLessons() {
  return fetchList('lesson', LESSON_FIELDS)
}

export async function getFreeLessons() {
  return fetchList('lesson', LESSON_FIELDS, `access == "free"`)
}

export async function getCourses() {
  return fetchList('course', COURSE_FIELDS)
}

export async function getCourse(slug: string) {
  return fetchOne('course', COURSE_FIELDS, `slug.current == "${slug}"`)
}

export async function getFeaturedCourses() {
  return fetchList('course', COURSE_FIELDS, 'isFeatured == true')
}

export async function getLesson(courseSlug: string, lessonSlug: string) {
  return fetchOne(
    'lesson',
    LESSON_FIELDS_FULL,
    `slug.current == "${lessonSlug}" && module->course->slug.current == "${courseSlug}"`
  )
}

export async function getModulesByCourse(courseSlug: string) {
  return fetchList('module', MODULE_FIELDS, `course->slug.current == "${courseSlug}"`)
}

export async function getRecentBlogPosts(count = 3) {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) [0...$count] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage { asset->{ url }, alt }
  }`
  return await client.fetch(query, { count })
}

export async function getCurriculumWeeks() {
  const query = `*[_type == "curriculumWeek"] | order(order asc) {
    _id,
    weekNumber,
    title,
    oneLineDescription,
    illustrationSlug,
    bentoSize,
    order
  }`
  return await client.fetch(query)
}

// ============================================================================
// FOUR CIRCLES — courseLesson + course detail
// ============================================================================

const COURSE_LESSON_FIELDS = `
    _id,
    title,
    slug,
    lessonNumber,
    difficultyTier,
    ikigaiQuadrants,
    subtitle,
    summary,
    content,
    reflectionPrompt,
    tryThisWeek,
    estimatedMinutes
  `

const FOUR_CIRCLES_COURSE_FIELDS = `
    _id,
    title,
    slug,
    subtitle,
    description,
    courseType,
    pricing,
    estimatedDuration,
    heroImage { ${IMAGE_FIELDS} },
    ctaText,
    whoThisIsFor,
    whatThisIsNot,
    order,
    lessons[]-> { ${COURSE_LESSON_FIELDS} }
  `

export async function getFourCirclesCourseBySlug(slug: string): Promise<Course | null> {
  try {
    return await fetchOne('course', FOUR_CIRCLES_COURSE_FIELDS, `slug.current == "${slug}"`)
  } catch {
    return null
  }
}

export async function getFourCirclesCourse(): Promise<Course | null> {
  return getFourCirclesCourseBySlug('four-circles')
}

export async function getCoursesFiltered(courseType?: CourseType): Promise<Course[]> {
  try {
    return await fetchList(
      'course',
      FOUR_CIRCLES_COURSE_FIELDS,
      courseType ? `courseType == "${courseType}"` : undefined
    )
  } catch {
    return []
  }
}

export async function getFourCirclesLesson(lessonSlug: string): Promise<CourseLesson | null> {
  try {
    return await fetchOne('courseLesson', COURSE_LESSON_FIELDS, `slug.current == "${lessonSlug}"`)
  } catch {
    return null
  }
}

// ============================================================================
// SHARED SINGLETONS
// ============================================================================

export async function getNewsletterCapture(): Promise<NewsletterCapture | null> {
  const query = `*[_type == "newsletterCapture"][0] { ${NEWSLETTER_CAPTURE_FIELDS} }`
  return await client.fetch(query)
}

export async function getAuditCta(): Promise<AuditCta | null> {
  const query = `*[_type == "auditCta"][0] { ${AUDIT_CTA_FIELDS} }`
  return await client.fetch(query)
}

export async function getStarterGuideCapture(): Promise<StarterGuideCapture | null> {
  const query = `*[_type == "starterGuideCapture"][0] { ${STARTER_GUIDE_FIELDS} }`
  return await client.fetch(query)
}

export async function getPillarSet(): Promise<PillarSet | null> {
  const query = `*[_type == "pillarSet"][0] { ${PILLAR_SET_FIELDS} }`
  return await client.fetch(query)
}

export async function getFourCirclesSet(): Promise<FourCirclesSet | null> {
  const query = `*[_type == "fourCirclesSet"][0] { ${FOUR_CIRCLES_SET_FIELDS} }`
  return await client.fetch(query)
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const query = `*[_type == "siteConfig"][0] {
    contactEmail,
    wordmark,
    desktopLinks[] { ${LINK_FIELDS} },
    rightSideLinks[] { ${LINK_FIELDS} },
    mobileLinks[] { ${LINK_FIELDS} },
    mobilePersistentCta { ${CTA_FIELDS} },
    brandLine,
    columns[] {
      header,
      links[] { ${LINK_FIELDS} }
    },
    accountSection {
      header,
      links[] { ${LINK_FIELDS} }
    },
    copyright,
    privacyLink { ${CTA_FIELDS} },
    socialLinks[] { platform, url, label },
    successStates[] { key, message },
    submitError,
    validation { required, invalidEmail, tooShort, tooLong },
    loadingLabel,
    notFoundHeadline,
    notFoundBody,
    notFoundLinks[] { ${LINK_FIELDS} },
    notFoundMicrocopy,
    signIn { headline, subhead, primaryLabel, magicLinkLabel, forgotPasswordLabel },
    signUp { headline, subhead, submitLabel }
  }`
  return await client.fetch(query)
}

// ============================================================================
// PAGE SINGLETONS
// ============================================================================

export async function getPageHome(): Promise<PageHome | null> {
  const query = `*[_type == "pageHome"][0] {
    hero { ${HERO_FIELDS} },
    methodHeader { ${SECTION_HEADER_FIELDS} },
    methodSteps[] { title, body },
    pillarsHeader { ${SECTION_HEADER_FIELDS} },
    pillarSet-> { ${PILLAR_SET_FIELDS} },
    meetJonHeader { ${SECTION_HEADER_FIELDS} },
    meetJonImage { ${IMAGE_FIELDS} },
    meetJonBodyParagraphs,
    meetJonPrimaryLink { ${CTA_FIELDS} },
    meetJonSecondaryLink { ${CTA_FIELDS} },
    testimonialsHeader { ${SECTION_HEADER_FIELDS} },
    blogPreviewHeader { ${SECTION_HEADER_FIELDS} },
    blogPreviewPerCardCtaLabel,
    blogPreviewSectionCta { ${CTA_FIELDS} },
    newsletter-> { ${NEWSLETTER_CAPTURE_FIELDS} },
    auditCta-> { ${AUDIT_CTA_FIELDS} },
    starterGuide-> { ${STARTER_GUIDE_FIELDS} }
  }`
  return await client.fetch(query)
}

export async function getPageAbout(): Promise<PageAbout | null> {
  const query = `*[_type == "pageAbout"][0] {
    hero { ${HERO_FIELDS} },
    storyBeats[] {
      image { ${IMAGE_FIELDS} },
      headline,
      body,
      bodyParagraph2,
      payoffLine
    },
    whoFor {
      image { ${IMAGE_FIELDS} },
      headline,
      body
    },
    cta { ${CTA_BLOCK_FIELDS} }
  }`
  return await client.fetch(query)
}

export async function getPageContact(): Promise<PageContact | null> {
  const query = `*[_type == "pageContact"][0] {
    hero { ${HERO_FIELDS} },
    heroStats[] { value, label },
    inquiryCards[] { eyebrow, body, inquiryType },
    whatHappensNextHeader,
    whatHappensNextSteps[] { title, body },
    thingsWorthKnowingHeader,
    thingsWorthKnowingItems[] { title, body },
    emailFallback { bodyLine }
  }`
  return await client.fetch(query)
}

export async function getPageAudit(): Promise<PageAudit | null> {
  const bandFields = `
    headline,
    body,
    primaryCta { ${CTA_FIELDS} },
    secondaryCta { ${CTA_FIELDS} }
  `
  const query = `*[_type == "pageAudit"][0] {
    hero { ${HERO_FIELDS} },
    heroMicrocopy,
    midQuizEncouragement { line },
    resultBands {
      low { ${bandFields} },
      mid { ${bandFields} },
      high { ${bandFields} }
    },
    starterGuide-> { ${STARTER_GUIDE_FIELDS} }
  }`
  return await client.fetch(query)
}

export async function getPageFoundation(): Promise<PageFoundation | null> {
  const query = `*[_type == "pageFoundation"][0] {
    hero { ${HERO_FIELDS} },
    heroMicrocopyUnderCtas,
    whoForHeader,
    whoForLede,
    whoForBullets,
    whyDanceHeader { ${SECTION_HEADER_FIELDS} },
    whyDanceBodyParagraphs,
    curriculumHeader { ${SECTION_HEADER_FIELDS} },
    curriculumModules[] { number, title, duration, blurb },
    howItWorksHeader { ${SECTION_HEADER_FIELDS} },
    howItWorksColumns[] { title, body },
    enrollmentHeader { ${SECTION_HEADER_FIELDS} },
    enrollmentCards[] { ${PROGRAM_CARD_FIELDS} },
    enrollmentFootnote,
    faqHeader,
    faqItems[] { ${FAQ_ITEM_FIELDS} },
    softCta { ${CTA_BLOCK_FIELDS} },
    starterGuide-> { ${STARTER_GUIDE_FIELDS} }
  }`
  return await client.fetch(query)
}

export async function getPagePrograms(): Promise<PagePrograms | null> {
  const query = `*[_type == "pagePrograms"][0] {
    hero { ${HERO_FIELDS} },
    heroWhoForColumn { header, bullets },
    caseStudiesHeader { ${SECTION_HEADER_FIELDS} },
    programCardsHeader { ${SECTION_HEADER_FIELDS} },
    programCards[] { ${PROGRAM_CARD_FIELDS} },
    faqHeader,
    faqItems[] { ${FAQ_ITEM_FIELDS} },
    closingCta { ${CTA_BLOCK_FIELDS} },
    starterGuide-> { ${STARTER_GUIDE_FIELDS} }
  }`
  return await client.fetch(query)
}

export async function getPageBlog(): Promise<PageBlog | null> {
  const query = `*[_type == "pageBlog"][0] {
    hero { ${HERO_FIELDS} },
    "featuredSeries": {
      "seriesBannerEnabled": seriesBannerEnabled,
      "seriesName": seriesName,
      "seriesSlug": seriesSlug,
      "seriesStatus": seriesStatus,
      "seriesDescription": seriesDescription,
      "seriesCurrentPhase": seriesCurrentPhase,
      "seriesCtaLabel": seriesCtaLabel
    },
    newsletter-> { ${NEWSLETTER_CAPTURE_FIELDS} },
    auditCta-> { ${AUDIT_CTA_FIELDS} },
    emptyState { headline, body }
  }`
  return await client.fetch(query)
}

export async function getPageLessons(): Promise<PageLessons | null> {
  const query = `*[_type == "pageLessons"][0] {
    hero { ${HERO_FIELDS} },
    courses[]-> {
      _id,
      title,
      slug,
      description,
      difficulty,
      estimatedDuration
    },
    closingCta { ${CTA_BLOCK_FIELDS} },
    starterGuide-> { ${STARTER_GUIDE_FIELDS} }
  }`
  return await client.fetch(query)
}

export async function getPageIkigai(): Promise<PageIkigai | null> {
  const query = `*[_type == "pageIkigai"][0] {
    hero { ${HERO_FIELDS} },
    fourCirclesHeader { ${SECTION_HEADER_FIELDS} },
    fourCirclesSet-> { ${FOUR_CIRCLES_SET_FIELDS} },
    quizBridge { line },
    starterGuide-> { ${STARTER_GUIDE_FIELDS} },
    cta { ${CTA_BLOCK_FIELDS} }
  }`
  return await client.fetch(query)
}
