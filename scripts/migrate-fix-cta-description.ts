// Canonical content lives in design/canonical-content.json.
// Edit content there, then run this script to push to Sanity.
// Do NOT hardcode canonical strings in this file.

/**
 * Phase 2 migration: fix the broken closing-CTA copy on homePageContent.
 *
 * Fields written:
 *   ctaTitle, ctaDescription, ctaButtonText, ctaButtonHref
 *
 * Background: the live ctaDescription contained a truncated/broken sentence
 * ("If you've been resisting strong…"). This script replaces all four CTA
 * fields with the canonical values from design/canonical-content.json.
 *
 * Uses diffAndConfirm — shows current vs intended values before writing.
 *
 * Run:
 *   npm run migrate:fix-cta-description
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

const { closingCta } = canonicalContent.homePage

const CANONICAL = {
  ctaTitle: closingCta.title,
  ctaDescription: closingCta.description,
  ctaButtonText: closingCta.buttonText,
  ctaButtonHref: closingCta.buttonHref,
}

const FIELDS = Object.keys(CANONICAL) as Array<keyof typeof CANONICAL>

async function migrate() {
  const docs = await client.fetch<
    Array<Record<string, unknown> & { _id: string }>
  >(
    `*[_type == "homePageContent"]{ _id, _rev, ctaTitle, ctaDescription, ctaButtonText, ctaButtonHref }`
  )

  if (docs.length === 0) {
    console.log('No homePageContent documents found. Nothing to migrate.')
    return
  }

  console.log(`Found ${docs.length} document(s).\n`)

  for (const doc of docs) {
    console.log(`  ${doc._id}: CTA fields —`)
    const confirmed = await diffAndConfirm(
      client,
      doc._id,
      FIELDS,
      CANONICAL,
      doc
    )

    if (!confirmed) {
      console.log(`  ${doc._id}: skipped.\n`)
      continue
    }

    await client.patch(doc._id).set(CANONICAL).commit()
    console.log(`  ${doc._id}: updated.\n`)
  }

  console.log('CTA migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
