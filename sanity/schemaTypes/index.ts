import { type SchemaTypeDefinition } from 'sanity'

// Import all schema types from the schemas directory
import aboutPage from '../schemas/aboutPage'
import blogPost from '../schemas/blogPost'
import caseStudy from '../schemas/caseStudy'
import collaboration from '../schemas/collaboration'
import contactInfo from '../schemas/contactInfo'
import danceCategoryFilter from '../schemas/danceCategoryFilter'
import homePageContent from '../schemas/homePageContent'
import lesson from '../schemas/lesson'
import course from '../schemas/course'
import mediaKitData from '../schemas/mediaKitData'
import pageMetadata from '../schemas/pageMetadata'
import portfolio from '../schemas/portfolio'
import program from '../schemas/program'
import programFocus from '../schemas/programFocus'
import service from '../schemas/service'
import testimonial from '../schemas/testimonial'
import danceCategory from '../schemas/danceCategory'
import instagramReel from '../schemas/instagramReel'

// Export types array without explicit type annotation to avoid module resolution issues
export const types = [
  aboutPage,
  blogPost,
  caseStudy,
  collaboration,
  contactInfo,
  danceCategoryFilter,
  homePageContent,
  lesson,
  course,
  mediaKitData,
  pageMetadata,
  portfolio,
  program,
  programFocus,
  service,
  testimonial,
  danceCategory,
  instagramReel,
] as const

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types as unknown as SchemaTypeDefinition[],
}
