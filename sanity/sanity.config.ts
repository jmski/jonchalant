import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import aboutPage from './schemas/aboutPage'
import blogPost from './schemas/blogPost'
import caseStudy from './schemas/caseStudy'
import collaboration from './schemas/collaboration'
import contactInfo from './schemas/contactInfo'
import danceCategoryFilter from './schemas/danceCategoryFilter'
import homePageContent from './schemas/homePageContent'
import lesson from './schemas/lesson'
import course from './schemas/course'
import mediaKitData from './schemas/mediaKitData'
import pageMetadata from './schemas/pageMetadata'
import portfolio from './schemas/portfolio'
import program from './schemas/program'
import programFocus from './schemas/programFocus'
import service from './schemas/service'
import testimonial from './schemas/testimonial'
import module from './schemas/module'
import portalLesson from './schemas/portalLesson'

export default defineConfig({
  name: 'default',
  title: 'jonchalant',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'f0611nfi',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [
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
      module,
      portalLesson,
    ] as any,
  } as any,
} as any)
