// Canonical content lives in design/canonical-content.json.
// Edit content there, then run this script to push to Sanity.
// Do NOT hardcode canonical strings in this file.

/**
 * Phase 1 migration: seed canonical Meet Jon heading + body into homePageContent.
 *
 * Fields written:
 *   meetJonHeading, meetJonBody
 *
 * Safe to re-run — only writes if fields are absent.
 *
 * Run:
 *   npm run migrate:phase1-meet-jon
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

const { meetJon } = canonicalContent.homePage

const CANONICAL = {
  meetJonHeading: meetJon.heading,
  meetJonBody: meetJon.body,
}

async function migrate() {
  const docs = await client.fetch(
    `*[_type == "homePageContent"]{ _id, _rev, meetJonHeading, meetJonBody }`
  )

  if (docs.length === 0) {
    console.log('No homePageContent documents found. Nothing to migrate.')
    return
  }

  console.log(`Found ${docs.length} document(s).`)

  for (const doc of docs) {
    const patches: Record<string, string> = {}

    if (!doc.meetJonHeading) patches.meetJonHeading = CANONICAL.meetJonHeading
    if (!doc.meetJonBody) patches.meetJonBody = CANONICAL.meetJonBody

    if (Object.keys(patches).length === 0) {
      console.log(`  ${doc._id}: Meet Jon fields already set, skipping.`)
      continue
    }

    console.log(`  ${doc._id}: fields to update:`)
    const confirmed = await diffAndConfirm(
      client, doc._id, Object.keys(patches), patches, doc
    )
    if (!confirmed) {
      console.log(`  ${doc._id}: skipped.`)
      continue
    }
    await client.patch(doc._id).set(patches).commit()
    console.log(`  ${doc._id}: patched.`)
  }

  console.log('Meet Jon migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
