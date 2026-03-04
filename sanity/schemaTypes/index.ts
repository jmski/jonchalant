import { type SchemaTypeDefinition } from 'sanity'

// Import all schema types from the schemas directory
import aboutPage from '../schemas/aboutPage'
import blogPost from '../schemas/blogPost'
import caseStudy from '../schemas/caseStudy'
import collaboration from '../schemas/collaboration'
import collaborationPackage from '../schemas/collaborationPackage'
import contactInfo from '../schemas/contactInfo'
import danceCategoryFilter from '../schemas/danceCategoryFilter'
import homePageContent from '../schemas/homePageContent'
import lesson from '../schemas/lesson'
import mediaKitData from '../schemas/mediaKitData'
import pageMetadata from '../schemas/pageMetadata'
import portfolio from '../schemas/portfolio'
import program from '../schemas/program'
import programFocus from '../schemas/programFocus'
import programsPageContent from '../schemas/programsPageContent'
import service from '../schemas/service'
import serviceCategory from '../schemas/serviceCategory'
import testimonial from '../schemas/testimonial'

// Export types array without explicit type annotation to avoid module resolution issues
export const types = [
  aboutPage,
  blogPost,
  caseStudy,
  collaboration,
  collaborationPackage,
  contactInfo,
  danceCategoryFilter,
  homePageContent,
  lesson,
  mediaKitData,
  pageMetadata,
  portfolio,
  program,
  programFocus,
  programsPageContent,
  service,
  serviceCategory,
  testimonial,
] as const

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types as unknown as SchemaTypeDefinition[],
}
