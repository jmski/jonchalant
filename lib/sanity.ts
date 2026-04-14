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

const SERVICE_FIELDS = `
    _id,
    title,
    slug,
    description,
    icon,
    features,
    isPrimary,
    ctaLabel,
    color,
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

export async function getFreeLessons() {
  return fetchList('lesson', LESSON_FIELDS, `access == "free"`)
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
    heroEyebrow,
    heroHeadline,
    heroCyclingOutcomes,
    heroDescription,
    heroSubtext,
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
    ctaButtonHref,
    meetJonImage { asset->{ _id, url }, alt, crop, hotspot }
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

export async function getDancePageContent() {
  const query = `*[_type == "dancePageContent"][0] {
    heroEyebrow,
    heroHeadline,
    heroSubheadline,
    instagramHeadline,
    ctaHeadline,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref
  }`
  return await client.fetch(query)
}

// ============================================================================
// FOUNDATION PAGE
// ============================================================================

export async function getFoundationPageContent() {
  const query = `*[_type == "foundationPage"][0] {
    heroEyebrow,
    heroHeadline,
    heroSubheadline,
    heroBody,
    heroPrimaryCtaLabel,
    heroSecondaryCtaLabel,
    heroNote,
    insideEyebrow,
    insideTitle,
    insideBody,
    modules[]-> {
      _id,
      moduleNumber,
      title,
      slug,
      description,
      theme,
      danceIntegration,
      estimatedHours,
      order,
      "lessonCount": count(lessons)
    },
    whoEyebrow,
    whoTitle,
    whoItems,
    howEyebrow,
    howTitle,
    howCards[] { label, body },
    pricingEyebrow,
    pricingTitle,
    pricingNote,
    pricingTiers[] { tier, tierKey, price, description, features, cta, primary },
    ctaTitle,
    ctaBody,
    ctaButtonLabel,
    ctaNote
  }`
  return await client.fetch(query)
}

// ============================================================================
// BLOG CONFIG
// ============================================================================

export async function getBlogConfig() {
  const query = `*[_type == "blogConfig"][0] {
    seriesBannerEnabled,
    seriesName,
    seriesSlug,
    seriesStatus,
    seriesDescription,
    seriesCurrentPhase,
    seriesCTALabel
  }`
  return await client.fetch(query)
}

export async function getPressMentions() {
  const query = `*[_type == "pressMention"] | order(order asc) {
    _id,
    outlet,
    type,
    url,
    logo { asset->{ url } },
    order
  }`
  return await client.fetch(query)
}

// ============================================================================
// BLOG POSTS
// ============================================================================

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
