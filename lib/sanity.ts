import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

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
  useCdn: true,
})

const builder = imageUrlBuilder(client)

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
// PORTFOLIO (Dance Videos)
// ============================================================================

export async function getPortfolioItems() {
  const query = `*[_type == "portfolioItem"] | order(order asc) {
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
  }`
  return await client.fetch(query)
}

export async function getPortfolioByCategory(category: string) {
  const query = `*[_type == "portfolioItem" && category == "${category}"] | order(order asc) {
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
  }`
  return await client.fetch(query)
}

export async function getPortfolioItem(slug: string) {
  const query = `*[_type == "portfolioItem" && slug.current == "${slug}"][0] {
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
  }`
  return await client.fetch(query)
}

// ============================================================================
// SERVICES
// ============================================================================

export async function getServices() {
  const query = `*[_type == "service"] | order(order asc) {
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
  }`
  return await client.fetch(query)
}

export async function getPrimaryService() {
  const query = `*[_type == "service" && isPrimary == true][0] {
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
  }`
  return await client.fetch(query)
}

export async function getService(slug: string) {
  const query = `*[_type == "service" && slug.current == "${slug}"][0] {
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
  }`
  return await client.fetch(query)
}

// ============================================================================
// COLLABORATIONS
// ============================================================================

export async function getCollaborations() {
  const query = `*[_type == "collaboration"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    price,
    deliverables,
    timelineWeeks,
    order
  }`
  return await client.fetch(query)
}

export async function getCollaborationsByCategory(category: string) {
  const query = `*[_type == "collaboration" && category == "${category}"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    price,
    deliverables,
    timelineWeeks,
    order
  }`
  return await client.fetch(query)
}

// ============================================================================
// MEDIA KIT DATA
// ============================================================================

export async function getMediaKitData() {
  const query = `*[_type == "mediaKitData"][0] {
    _id,
    title,
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
  let query = `*[_type == "testimonial"`
  if (featured) {
    query += ` && featured == true`
  }
  query += `] | order(order asc) {
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
  }`
  return await client.fetch(query)
}

// ============================================================================
// CASE STUDIES
// ============================================================================

export async function getCaseStudies(featured?: boolean) {
  let query = `*[_type == "caseStudy"`
  if (featured) {
    query += ` && featured == true`
  }
  query += `] | order(order asc) {
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
  }`
  return await client.fetch(query)
}

export async function getCaseStudy(slug: string) {
  const query = `*[_type == "caseStudy" && slug.current == "${slug}"][0] {
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
  }`
  return await client.fetch(query)
}

// ============================================================================
// LESSONS
// ============================================================================

export async function getLessons() {
  const query = `*[_type == "lesson"] | order(order asc) {
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
  }`
  return await client.fetch(query)
}

export async function getLessonsByCategory(category: string) {
  const query = `*[_type == "lesson" && category == "${category}"] | order(order asc) {
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
  }`
  return await client.fetch(query)
}

export async function getLessonsByPillar(pillar: string) {
  const query = `*[_type == "lesson" && pillar == "${pillar}"] | order(order asc) {
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
  }`
  return await client.fetch(query)
}

// ============================================================================
// PROGRAMS
// ============================================================================

export async function getPrograms() {
  const query = `*[_type == "program"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    investment,
    features,
    image,
    order
  }`
  return await client.fetch(query)
}

export async function getProgramBySlug(slug: string) {
  const query = `*[_type == "program" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    category,
    description,
    investment,
    features,
    image,
    order
  }`
  return await client.fetch(query)
}

export async function getProgramsByCategory(category: string) {
  const query = `*[_type == "program" && category == "${category}"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    investment,
    features,
    image,
    order
  }`
  return await client.fetch(query)
}

export async function getProgramsFocusItems() {
  const query = `*[_type == "programsPageContent" && title == "Programs"][0] {
    programFocusItems | order(order asc) {
      title,
      description,
      icon,
      order
    }
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
    originSectionHeadline,
    originSectionDescription,
    phases,
    stats,
    philosophies,
    introvertTraits
  }`
  return await client.fetch(query)
}

// ============================================================================
// HOME PAGE CONTENT
// ============================================================================

export async function getHomePageContent() {
  const query = `*[_type == "homePageContent" && title == "Home Page"][0] {
    stats,
    impactSectionHeadline,
    featuredMainTitle,
    featuredMainDescription,
    sidebarFeatures,
    servicesHeadline,
    servicesDescription
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
// SERVICE CATEGORIES
// ============================================================================

export async function getServiceCategories() {
  const query = `*[_type == "serviceCategory" && title == "Service Categories"][0] {
    categories | order(order asc) {
      name,
      items,
      order
    }
  }`
  return await client.fetch(query)
}

// ============================================================================
// COLLABORATION PACKAGES
// ============================================================================

export async function getCollaborationPackages() {
  const query = `*[_type == "collaborationPackage" && title == "Collaboration Packages"][0] {
    packages | order(order asc) {
      name,
      price,
      features,
      order
    }
  }`
  return await client.fetch(query)
}
