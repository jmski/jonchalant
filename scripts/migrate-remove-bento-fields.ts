/**
 * Phase 2 migration: remove orphaned bento fields from homePageContent.
 *
 * Fields removed:
 *   whyItWorksBentoHeadline
 *   whyItWorksCells
 *
 * These were deprecated in Phase 1 when the bento variant of WhyItWorks was
 * replaced by the FourPillars component. The fields remain hidden in the
 * Sanity schema (so Studio won't show them) but the underlying data is still
 * present in documents. This script unsets it.
 *
 * Idempotent: if both fields are already absent, logs "already clean" and exits.
 *
 * Run:
 *   npm run migrate:remove-bento-fields
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
  const docs = await client.fetch<
    Array<{ _id: string; whyItWorksBentoHeadline?: unknown; whyItWorksCells?: unknown[] }>
  >(`*[_type == "homePageContent"]{ _id, whyItWorksBentoHeadline, whyItWorksCells }`)

  if (docs.length === 0) {
    console.log('No homePageContent documents found. Nothing to migrate.')
    return
  }

  console.log(`Found ${docs.length} document(s).\n`)

  let migratedCount = 0

  for (const doc of docs) {
    const hasBentoHeadline = doc.whyItWorksBentoHeadline != null
    const hasBentoCells =
      Array.isArray(doc.whyItWorksCells) && doc.whyItWorksCells.length > 0

    if (!hasBentoHeadline && !hasBentoCells) {
      console.log(`  ${doc._id}: already clean — skipping.`)
      continue
    }

    // Log current values before removal
    if (hasBentoHeadline) {
      console.log(`  ${doc._id}: whyItWorksBentoHeadline = ${JSON.stringify(doc.whyItWorksBentoHeadline)}`)
    }
    if (hasBentoCells) {
      console.log(
        `  ${doc._id}: whyItWorksCells = ${(doc.whyItWorksCells as unknown[]).length} cell(s) — ${JSON.stringify(
          (doc.whyItWorksCells as Array<{ title?: string }>).map((c) => c.title ?? '(untitled)')
        )}`
      )
    }

    const unsetFields: string[] = []
    if (hasBentoHeadline) unsetFields.push('whyItWorksBentoHeadline')
    if (hasBentoCells) unsetFields.push('whyItWorksCells')

    await client.patch(doc._id).unset(unsetFields).commit()
    console.log(`  ${doc._id}: removed [${unsetFields.join(', ')}]`)
    migratedCount++
  }

  console.log(`\nDone. ${migratedCount} document(s) updated.`)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
