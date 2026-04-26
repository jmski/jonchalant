// Canonical content lives in design/canonical-content.json.
// Edit content there, then run this script to push to Sanity.
// Do NOT hardcode canonical strings in this file.

/**
 * Phase 3 P1 migration: set canonical Foundation page pricing + methodology copy.
 *
 * Fields written (foundationPage document):
 *   pricingNote, pricingTiers, howCards
 *
 * Safe to re-run — only overwrites if the value differs from the canonical.
 * Does not touch hero, qualifier, modules, or any other fields.
 *
 * Run:
 *   npm run migrate:phase3-foundation-p1
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import canonicalContent from '../design/canonical-content.json' with { type: 'json' }

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

/** Deep-sort object keys so JSON.stringify produces stable output for comparison. */
function stable(value: unknown): string {
  return JSON.stringify(value, (_key, val) => {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      return Object.fromEntries(Object.entries(val).sort(([a], [b]) => a.localeCompare(b)))
    }
    return val
  })
}

const { pricing, methodology } = canonicalContent.foundationPage

const CANONICAL_PRICING_TIERS = pricing.tiers.map((t) => ({
  tier: t.tier,
  tierKey: t.tierKey,
  price: t.price,
  description: t.description,
  features: t.features,
  cta: t.cta,
  primary: t.primary,
}))

const CANONICAL_HOW_CARDS = methodology.cards.map((c) => ({
  label: c.label,
  body: c.body,
}))

async function migrate() {
  const docs = await client.fetch(
    `*[_type == "foundationPage"]{
      _id, _rev,
      pricingNote,
      pricingTiers[] { tier, tierKey, price, description, features, cta, primary },
      howCards[] { label, body }
    }`
  )

  if (docs.length === 0) {
    console.error('No foundationPage document found. Run migrate:phase3-foundation-hero first.')
    process.exit(1)
  }

  console.log(`Found ${docs.length} document(s).`)

  for (const doc of docs) {
    const patches: Record<string, unknown> = {}

    if (doc.pricingNote !== pricing.note) {
      console.log(`  pricingNote: "${doc.pricingNote}" → "${pricing.note}"`)
      patches.pricingNote = pricing.note
    }

    if (stable(doc.pricingTiers) !== stable(CANONICAL_PRICING_TIERS)) {
      console.log(`  pricingTiers: updating ${CANONICAL_PRICING_TIERS.length} tiers`)
      patches.pricingTiers = CANONICAL_PRICING_TIERS
    }

    if (stable(doc.howCards) !== stable(CANONICAL_HOW_CARDS)) {
      console.log(`  howCards: updating ${CANONICAL_HOW_CARDS.length} cards`)
      patches.howCards = CANONICAL_HOW_CARDS
    }

    if (Object.keys(patches).length === 0) {
      console.log(`  ${doc._id}: already canonical, skipping.`)
      continue
    }

    await client.patch(doc._id).set(patches).commit()
    console.log(`  ${doc._id}: patched (${Object.keys(patches).join(', ')}).`)
  }

  console.log('Foundation P1 migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
