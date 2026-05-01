import testimonial from './testimonial'
import caseStudy from './caseStudy'
import lesson from './lesson'
import course from './course'
import courseLesson from './courseLesson'
import blogPost from './blogPost'
import module from './module'

import { objectTypes } from './objects'
import { sharedDocumentTypes } from './documents/shared'
import { pageDocumentTypes } from './documents/pages'

export const schemaTypes = [
  // Object types (used inline by documents)
  ...objectTypes,

  // Shared singleton documents
  ...sharedDocumentTypes,

  // Page singleton documents
  ...pageDocumentTypes,

  // Content list document types (non-singleton)
  testimonial,
  caseStudy,
  lesson,
  course,
  courseLesson,
  blogPost,
  module,
]
