import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

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
// TYPE DEFINITIONS
// ============================================================================

export interface ContactMethod {
  label: string
  value: string
  href: string
  description?: string
  order?: number
}

export interface ContactInfo {
  title?: string
  contactMethods: ContactMethod[]
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
// FIELD PROJECTIONS (shared field selections per content type)
// ============================================================================

const PORTFOLIO_FIELDS = `
    _id,
    title,
    slug,
    category,
    description,
    videoUrl,
    thumbnail,
    duration,
    publishedAt,
    order
  `

const SERVICE_FIELDS = `
    _id,
    title,
    slug,
    description,
    fullDescription,
    icon,
    features,
    isPrimary,
    color,
    order
  `

const COLLABORATION_FIELDS = `
    _id,
    title,
    slug,
    category,
    description,
    price,
    deliverables,
    timelineWeeks,
    order
  `

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
    category,
    pillar,
    description,
    duration,
    image,
    icon,
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
        isFreePreview,
        estimatedDuration,
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
      isFreePreview,
      estimatedDuration,
      order
    }
  `

const LESSON_FIELDS_FULL = `
    _id,
    title,
    slug,
    description,
    body,
    videoUrl,
    isFreePreview,
    estimatedDuration,
    order
  `

// ============================================================================
// PORTFOLIO (Dance Videos)
// ============================================================================

export async function getPortfolioItems() {
  return fetchList('portfolioItem', PORTFOLIO_FIELDS)
}

export async function getPortfolioByCategory(category: string) {
  return fetchList('portfolioItem', PORTFOLIO_FIELDS, `category == "${category}"`)
}

export async function getPortfolioItem(slug: string) {
  return fetchOne('portfolioItem', PORTFOLIO_FIELDS, `slug.current == "${slug}"`)
}

export async function getFeaturedPortfolioItem() {
  return fetchOne('portfolioItem', PORTFOLIO_FIELDS, 'featured == true')
}

// ============================================================================
// SERVICES

// ============================================================================

export async function getServices() {
  return fetchList('service', SERVICE_FIELDS)
}

export async function getPrimaryService() {
  return fetchOne('service', SERVICE_FIELDS, 'isPrimary == true')
}

export async function getService(slug: string) {
  return fetchOne('service', SERVICE_FIELDS, `slug.current == "${slug}"`)
}

// ============================================================================
// COLLABORATIONS
// ============================================================================

export async function getCollaborations() {
  return fetchList('collaboration', COLLABORATION_FIELDS)
}

export async function getCollaborationsByCategory(category: string) {
  return fetchList('collaboration', COLLABORATION_FIELDS, `category == "${category}"`)
}

// ============================================================================
// MEDIA KIT DATA
// ============================================================================

export async function getMediaKitData() {
  const query = `*[_type == "mediaKitData"][0] {
    _id,
    title,
    heroBadge,
    heroHeadline,
    heroSubheadline,
    shortBio,
    longBio,
    stats | order(order asc) {
      value,
      label,
      order
    },
    expertiseAreas | order(order asc) {
      title,
      description,
      order
    },
    pressAssetsPdfUrl,
    pressAssetsLabel,
    contactHeadline,
    contactSubheadline,
    keyMetrics | order(order asc) {
      label,
      value,
      change,
      order
    },
    platforms | order(order asc) {
      name,
      handle,
      followers,
      avgViews,
      category,
      order
    },
    contentCategories | order(order asc) {
      name,
      percentage,
      description,
      order
    },
    audience {
      age,
      gender,
      locations
    }
  }`
  return await client.fetch(query)
}

// ============================================================================
// TESTIMONIALS
// ============================================================================

export async function getTestimonials(featured?: boolean) {
  return fetchList('testimonial', TESTIMONIAL_FIELDS, featured ? 'featured == true' : undefined)
}

// ============================================================================
// CASE STUDIES
// ============================================================================

export async function getCaseStudies(featured?: boolean) {
  return fetchList('caseStudy', CASE_STUDY_FIELDS, featured ? 'featured == true' : undefined)
}

export async function getCaseStudy(slug: string) {
  return fetchOne('caseStudy', CASE_STUDY_FIELDS, `slug.current == "${slug}"`)
}

// ============================================================================
// LESSONS
// ============================================================================

export async function getLessons() {
  return fetchList('lesson', LESSON_FIELDS)
}

export async function getLessonsByCategory(category: string) {
  return fetchList('lesson', LESSON_FIELDS, `category == "${category}"`)
}

export async function getLessonsByPillar(pillar: string) {
  return fetchList('lesson', LESSON_FIELDS, `pillar == "${pillar}"`)
}

// ============================================================================
// PROGRAM TRACKS
// ============================================================================

export type { ProgramTrackItem, ProgramsPageContent } from './types';

export async function getProgramsPageContent() {
  const query = `*[_type == "programsPageContent"][0] {
    heroEyebrow,
    heroHeadline,
    heroSubheading,
    offersEyebrow,
    offersHeading,
    offersSubtext,
    offerCards[] {
      title,
      eyebrow,
      trackType,
      price,
      isFeatured,
      description,
      includes,
      ctaText,
      ctaHref
    },
    whoForHeading,
    whoForBody,
    ctaHeading,
    ctaDescription,
    ctaButtonText,
    ctaButtonHref,
    ctaMicrocopy
  }`
  return await client.fetch(query)
}

// ============================================================================
// PAGE METADATA (Headlines, CTAs, Descriptions)
// ============================================================================

export async function getPageMetadata(page: string) {
  const query = `*[_type == "pageMetadata" && page == "${page}"][0] {
    page,
    headline,
    subheadline,
    ctaTitle,
    ctaDescription,
    ctaButtonText
  }`
  return await client.fetch(query)
}

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

export async function getContactInfo(): Promise<ContactInfo | null> {
  const query = `*[_type == "contactInfo"][0] {
    title,
    contactMethods | order(order asc) {
      label,
      value,
      href,
      description,
      order
    }
  }`
  return await client.fetch(query)
}

// ============================================================================
// ABOUT PAGE CONTENT
// ============================================================================

export async function getAboutPageContent() {
  const query = `*[_type == "aboutPage" && title == "About"][0] {
    heroHeadline,
    heroDescription,
    originSectionLabel,
    originSectionHeadline,
    originSectionDescription,
    originSectionHighlight,
    turningPointHeadline,
    turningPointBody,
    turningPointHighlight,
    methodologyHeadline,
    methodologyBody,
    methodologyHighlight,
    whyExistsHeadline,
    whyExistsBody,
    whyExistsHighlight,
    whoForHeadline,
    whoForBody,
    whoForHighlight,
    closingHeadline,
    closingBody,
    ctaButtonText
  }`
  return await client.fetch(query)
}

// ============================================================================
// HOME PAGE CONTENT
// ============================================================================

export async function getHomePageContent() {
  const query = `*[_type == "homePageContent" && title == "Home Page"][0] {
    heroHeadline,
    heroCyclingOutcomes,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    heroMicrocopy,
    heroSecondaryCtaText,
    heroStats,
    servicesHeadline,
    servicesDescription,
    whyItWorksLabel,
    whyItWorksHighlight,
    whyItWorksParagraph1,
    whyItWorksParagraph2,
    whyItWorksParagraph3,
    testimonialsEyebrow,
    testimonialsHeading,
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonHref
  }`
  return await client.fetch(query)
}

// ============================================================================
// AUDIT PAGE CONTENT
// ============================================================================

export async function getAuditPageContent() {
  const query = `*[_type == "auditPage"][0] {
    pageHeaderBadge,
    pageHeaderHeadline,
    pageHeaderBody,
    pageFooterNote,
    captureBadge,
    captureHeadline,
    captureBody,
    capturePrivacyNote,
    resultBands[] {
      band,
      headline,
      body
    },
    resultNextHeading,
    resultNextBody,
    resultCtaText,
    resultCtaButtonLabel,
    resultCtaHref
  }`
  return await client.fetch(query)
}

// ============================================================================
// CONTACT PAGE CONTENT
// ============================================================================

export async function getContactPageContent() {
  const query = `*[_type == "contactPage"][0] {
    auditPromptBadge,
    auditPromptHeadline,
    auditPromptBody,
    auditPromptButtonText,
    auditPromptNote,
    auditStats[] {
      number,
      label
    },
    coachingPathHeading,
    coachingPathBody,
    coachingCalendlyHref,
    coachingCalendlyLabel,
    sidebarHeading,
    sidebarItems[] {
      title,
      body
    },
    sidebarEmailText
  }`
  return await client.fetch(query)
}

// ============================================================================
// EMAIL OPT-IN
// ============================================================================

export type { EmailOptInContent } from './types'

export async function getEmailOptIn() {
  const query = `*[_type == "emailOptIn"][0] {
    eyebrow,
    heading,
    description,
    submitButtonText,
    disclaimer,
    successTitle,
    successBody
  }`
  return await client.fetch(query)
}

// ============================================================================
// DANCE CATEGORY FILTER
// ============================================================================

export async function getDanceCategoryFilter() {
  const query = `*[_type == "danceCategoryFilter" && title == "Dance Categories"][0] {
    categories | order(order asc) {
      name,
      order
    }
  }`
  return await client.fetch(query)
}

// ============================================================================
// COLLABORATION PACKAGES
// ============================================================================

export async function getCollaborationPackages() {
  const packages = await client.fetch(
    `*[_type == "collaboration"] | order(order asc) { "name": title, price, "features": coalesce(deliverables, []), order }`
  )
  return { packages }
}

// ============================================================================
// COURSES
// ============================================================================

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

// ============================================================================
// DANCE
// ============================================================================

const DANCE_CATEGORY_FIELDS = `
    _id,
    title,
    slug,
    leadershipPrinciple,
    description,
    icon,
    order,
    videos[] {
      title,
      videoUrl,
      duration,
      caption
    }
  `

const INSTAGRAM_REEL_FIELDS = `
    _id,
    reelUrl,
    order
  `

export async function getDanceCategories() {
  return fetchList('danceCategory', DANCE_CATEGORY_FIELDS)
}

export async function getInstagramReels() {
  return fetchList('instagramReel', INSTAGRAM_REEL_FIELDS)
}
