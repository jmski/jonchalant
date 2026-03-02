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
    totalFollowers,
    followerChange,
    avgMonthlyViews,
    viewsChange,
    engagementRate,
    engagementChange,
    activeSubscribers,
    subscriberChange,
    platforms,
    contentCategories
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
