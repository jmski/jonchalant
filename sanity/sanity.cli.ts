import 'dotenv/config'
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'f0611nfi'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const appId = 'cnnuxs4wxj2i5wcztzhsumii'

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: 'cnnuxs4wxj2i5wcztzhsumii',
  },
})
