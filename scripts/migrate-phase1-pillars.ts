// Canonical content lives in design/canonical-content.json.
// Edit content there, then run this script to push to Sanity.
// Do NOT hardcode canonical strings in this file.

/**
 * Phase 1 migration: seed the Four Pillars data into homePageContent.
 *
 * Fields written:
 *   pillarsHeadline  → canonical section heading
 *   pillars[]        → 4 pillar objects, each with 3 medium-agnostic applications
 *
 * Safe to re-run — only writes if pillars array is empty or absent.
 *
 * Run:
 *   npm run migrate:phase1-pillars
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import canonicalContent from '../design/canonical-content.json' with { type: 'json' }
import { diffAndConfirm } from './lib/sanity-diff.js'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!token) throw new Error('Missing SANITY_API_TOKEN')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

function key(id: string) {
  return id.replace(/[^a-zA-Z0-9]/g, '')
}

const { pillars: pillarsContent } = canonicalContent.homePage

const PILLARS_HEADLINE = pillarsContent.headline

const PILLARS = pillarsContent.items.map((pillar, i) => ({
  _key: `pillar0${i + 1}`,
  _type: 'pillar',
  number: pillar.number,
  name: pillar.name,
  definition: pillar.definition,
  applications: pillar.applications.map((app) => ({
    _key: key(`pillar0${i + 1}-${app.who}`),
    _type: 'pillarApp',
    who: app.who,
    body: app.body,
  })),
}))

async function migrate() {
  const docs = await client.fetch(
    `*[_type == "homePageContent"]{ _id, _rev, pillarsHeadline, pillars }`
  )

  if (docs.length === 0) {
    console.log('No homePageContent documents found. Nothing to migrate.')
    return
  }

  console.log(`Found ${docs.length} document(s).`)

  for (const doc of docs) {
    const intended = { pillarsHeadline: PILLARS_HEADLINE, pillars: PILLARS }
    console.log(`  ${doc._id}: fields to update:`)
    const confirmed = await diffAndConfirm(
      client, doc._id, ['pillarsHeadline', 'pillars'], intended, doc
    )
    if (!confirmed) {
      console.log(`  ${doc._id}: skipped.`)
      continue
    }

    console.log(`  ${doc._id}: seeding Four Pillars data...`)
    await client
      .patch(doc._id)
      .set({ pillarsHeadline: PILLARS_HEADLINE, pillars: PILLARS })
      .commit()
  }

  console.log('Pillars migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
