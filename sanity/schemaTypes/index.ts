import { type SchemaTypeDefinition } from 'sanity'

// Import all schema types from the schemas directory
import aboutPage from '../schemas/aboutPage'
import caseStudy from '../schemas/caseStudy'
import collaboration from '../schemas/collaboration'
import contactInfo from '../schemas/contactInfo'
import danceCategoryFilter from '../schemas/danceCategoryFilter'
import homePageContent from '../schemas/homePageContent'
import lesson from '../schemas/lesson'
import mediaKitData from '../schemas/mediaKitData'
import pageMetadata from '../schemas/pageMetadata'
import portfolio from '../schemas/portfolio'
import program from '../schemas/program'
import service from '../schemas/service'
import testimonial from '../schemas/testimonial'

// Export types array without explicit type annotation to avoid module resolution issues
export const types = [
  aboutPage,
  caseStudy,
  collaboration,
  contactInfo,
  danceCategoryFilter,
  homePageContent,
  lesson,
  mediaKitData,
  pageMetadata,
  portfolio,
  program,
  service,
  testimonial,
] as const

export const schema: { types: SchemaTypeDefinition[] } = {
  types,
}
