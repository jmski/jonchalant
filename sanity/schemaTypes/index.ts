import { type SchemaTypeDefinition } from 'sanity'

// Import all schema types from the schemas directory
import aboutPage from '../schemas/aboutPage'
import auditPage from '../schemas/auditPage'
import contactPage from '../schemas/contactPage'
import blogPost from '../schemas/blogPost'
import caseStudy from '../schemas/caseStudy'
import contactInfo from '../schemas/contactInfo'
import homePageContent from '../schemas/homePageContent'
import lesson from '../schemas/lesson'
import course from '../schemas/course'
import service from '../schemas/service'
import testimonial from '../schemas/testimonial'
import danceCategory from '../schemas/danceCategory'
import instagramReel from '../schemas/instagramReel'
import programsPageContent from '../schemas/programsPageContent'
import emailOptIn from '../schemas/emailOptIn'
import foundationPage from '../schemas/foundationPage'
import dancePageContent from '../schemas/dancePageContent'

// Export types array without explicit type annotation to avoid module resolution issues
export const types = [
  aboutPage,
  auditPage,
  contactPage,
  blogPost,
  caseStudy,
  contactInfo,
  homePageContent,
  lesson,
  course,
  programsPageContent,
  service,
  testimonial,
  danceCategory,
  instagramReel,
  emailOptIn,
  foundationPage,
  dancePageContent,
] as const

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types as unknown as SchemaTypeDefinition[],
}
