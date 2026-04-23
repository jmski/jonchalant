/**
 * One-off migration: copy legacy hero CTA field values to new field names.
 *
 * Safe to run multiple times — only writes when new fields are empty
 * AND old fields have values. Logs every action taken.
 *
 * Run:
 *   npm run migrate:hero-fields
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET   (defaults to 'production')
 *   SANITY_API_TOKEN             (must have write permissions)
 *
 * After confirming the migration succeeded, open the Phase 7 PR to
 * remove the deprecated fields from sanity/schemas/homePageContent.ts.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

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

async function migrate() {
  const docs = await client.fetch(
    `*[_type == "homePageContent"]{
      _id,
      _rev,
      heroCtaText,
      heroCtaLink,
      heroSecondaryCtaText,
      heroPrimaryCtaLabel,
      heroPrimaryCtaHref,
      heroSecondaryCtaLabel,
    }`
  )

  if (docs.length === 0) {
    console.log('No homePageContent documents found. Nothing to migrate.')
    return
  }

  console.log(`Found ${docs.length} document(s) to check.`)

  for (const doc of docs) {
    const patches: Record<string, string> = {}

    // Only copy if old value exists and new value is not already set
    if (doc.heroCtaText && !doc.heroPrimaryCtaLabel) {
      patches.heroPrimaryCtaLabel = doc.heroCtaText
    }
    if (doc.heroCtaLink && !doc.heroPrimaryCtaHref) {
      patches.heroPrimaryCtaHref = doc.heroCtaLink
    }
    if (doc.heroSecondaryCtaText && !doc.heroSecondaryCtaLabel) {
      patches.heroSecondaryCtaLabel = doc.heroSecondaryCtaText
    }

    if (Object.keys(patches).length === 0) {
      console.log(`  ${doc._id}: already migrated, skipping.`)
      continue
    }

    console.log(`  ${doc._id}: patching`, patches)
    await client.patch(doc._id).set(patches).commit()
  }

  console.log('Migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
