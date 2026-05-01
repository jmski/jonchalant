import { type SchemaTypeDefinition } from 'sanity'

// Import all schema types from the schemas directory
import blogPost from '../schemas/blogPost'
import caseStudy from '../schemas/caseStudy'
import lesson from '../schemas/lesson'
import course from '../schemas/course'
import testimonial from '../schemas/testimonial'
import module from '../schemas/module'
import courseLesson from '../schemas/courseLesson'
import curriculumWeek from '../schemas/curriculumWeek'

// Export types array without explicit type annotation to avoid module resolution issues
export const types = [
  blogPost,
  caseStudy,
  lesson,
  course,
  testimonial,
  module,
  courseLesson,
  curriculumWeek,
] as const

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types as unknown as SchemaTypeDefinition[],
}
