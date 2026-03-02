import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'jonchalon',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'f0611nfi',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
