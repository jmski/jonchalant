import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import aboutPage from './schemas/aboutPage'
import blogPost from './schemas/blogPost'
import caseStudy from './schemas/caseStudy'
import contactInfo from './schemas/contactInfo'
import homePageContent from './schemas/homePageContent'
import lesson from './schemas/lesson'
import course from './schemas/course'
import programsPageContent from './schemas/programsPageContent'
import service from './schemas/service'
import testimonial from './schemas/testimonial'
import module from './schemas/module'
import danceCategory from './schemas/danceCategory'
import instagramReel from './schemas/instagramReel'
import emailOptIn from './schemas/emailOptIn'
import pressMention from './schemas/pressMention'
import auditPage from './schemas/auditPage'
import contactPage from './schemas/contactPage'
import dancePageContent from './schemas/dancePageContent'
import foundationPage from './schemas/foundationPage'

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
      contactInfo,
      homePageContent,
      lesson,
      course,
      programsPageContent,
      service,
      testimonial,
      module,
      danceCategory,
      instagramReel,
      emailOptIn,
      pressMention,
      auditPage,
      contactPage,
      dancePageContent,
      foundationPage,
    ] as any,
  } as any,
} as any)
