import service from './service'
import testimonial from './testimonial'
import caseStudy from './caseStudy'
import lesson from './lesson'
import course from './course'
import courseLesson from './courseLesson'
import ikigaiQuiz from './ikigaiQuiz'
import contactInfo from './contactInfo'
import aboutPage from './aboutPage'
import homePageContent from './homePageContent'
import blogPost from './blogPost'
import module from './module'
import programsPageContent from './programsPageContent'
import emailOptIn from './emailOptIn'
import pressMention from './pressMention'
import auditPage from './auditPage'
import contactPage from './contactPage'
import foundationPage from './foundationPage'
import blogConfig from './blogConfig'

import { objectTypes } from './objects'
import { sharedDocumentTypes } from './documents/shared'
import { pageDocumentTypes } from './documents/pages'

export const schemaTypes = [
  // Object types (used inline by documents)
  ...objectTypes,

  // Shared singleton documents
  ...sharedDocumentTypes,

  // New page singleton documents
  ...pageDocumentTypes,

  // Existing document types
  service,
  testimonial,
  caseStudy,
  lesson,
  course,
  courseLesson,
  ikigaiQuiz,
  contactInfo,
  aboutPage,
  homePageContent,
  blogPost,
  module,
  programsPageContent,
  emailOptIn,
  pressMention,
  auditPage,
  contactPage,
  foundationPage,
  blogConfig,
]
