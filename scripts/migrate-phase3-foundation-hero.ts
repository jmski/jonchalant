// Canonical content lives in design/canonical-content.json.
// Edit content there, then run this script to push to Sanity.
// Do NOT hardcode canonical strings in this file.

/**
 * Phase 3 migration: set canonical Foundation page hero + qualifier copy.
 *
 * Fields written (foundationPage document):
 *   heroEyebrow, heroHeadline, heroSubheadline, heroBody,
 *   heroPrimaryCtaLabel, heroSecondaryCtaLabel,
 *   whoEyebrow, whoTitle, whoItems
 *
 * Safe to re-run — only overwrites if the value differs from the canonical.
 * Does not touch modules, pricing, how-it-works, or any other fields.
 *
 * Run:
 *   npm run migrate:phase3-foundation-hero
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

const { hero, qualifier } = canonicalContent.foundationPage

const SCALAR_CANONICAL: Record<string, string> = {
  heroEyebrow:          hero.eyebrow,
  heroHeadline:         hero.headline,
  heroSubheadline:      hero.subhead,
  heroBody:             hero.body,
  heroPrimaryCtaLabel:  hero.primaryCtaLabel,
  heroSecondaryCtaLabel: hero.secondaryCtaLabel,
  whoEyebrow:           qualifier.eyebrow,
  whoTitle:             qualifier.headline,
}

const ARRAY_CANONICAL: Record<string, string[]> = {
  whoItems: qualifier.items,
}

async function migrate() {
  const docs = await client.fetch(
    `*[_type == "foundationPage"]{
      _id, _rev,
      heroEyebrow, heroHeadline, heroSubheadline, heroBody,
      heroPrimaryCtaLabel, heroSecondaryCtaLabel,
      whoEyebrow, whoTitle, whoItems
    }`
  )

  // If no document exists, create one with the canonical fields.
  if (docs.length === 0) {
    console.log('No foundationPage document found — creating one.')
    const newDoc = {
      _type: 'foundationPage',
      ...SCALAR_CANONICAL,
      ...ARRAY_CANONICAL,
    }
    const created = await client.create(newDoc)
    console.log(`  Created: ${created._id}`)
    console.log('Foundation hero migration complete.')
    return
  }

  console.log(`Found ${docs.length} document(s).`)

  for (const doc of docs) {
    const scalarPatches: Record<string, string> = {}

    for (const [key, value] of Object.entries(SCALAR_CANONICAL)) {
      if (doc[key] !== value) {
        scalarPatches[key] = value
      }
    }

    // Check array fields — compare as JSON strings for simplicity
    const arrayPatches: Record<string, string[]> = {}
    for (const [key, value] of Object.entries(ARRAY_CANONICAL)) {
      if (JSON.stringify(doc[key]) !== JSON.stringify(value)) {
        arrayPatches[key] = value
      }
    }

    const allPatches = { ...scalarPatches, ...arrayPatches }

    if (Object.keys(allPatches).length === 0) {
      console.log(`  ${doc._id}: already canonical, skipping.`)
      continue
    }

    console.log(`  ${doc._id}: fields to update:`)
    const confirmed = await diffAndConfirm(
      client, doc._id, Object.keys(allPatches), allPatches, doc
    )
    if (!confirmed) {
      console.log(`  ${doc._id}: skipped.`)
      continue
    }
    await client.patch(doc._id).set(allPatches).commit()
    console.log(`  ${doc._id}: patched.`)
  }

  console.log('Foundation hero migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
