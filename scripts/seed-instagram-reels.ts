/**
 * Seed script — Instagram Reels
 *
 * Creates instagramReel documents in Sanity, one per URL in REEL_URLS.
 * Safe to re-run: exits without changes if any instagramReel already exists.
 *
 * Usage:
 *   1. Add your reel URLs to the REEL_URLS constant below
 *   2. npm run seed:instagram-reels
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_SEED_TOKEN  (needs write access — Editor or above)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env.local from the project root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// ---------------------------------------------------------------------------
// Add your Instagram reel URLs here before running
// ---------------------------------------------------------------------------

const REEL_URLS: string[] = [
  // Add your Instagram reel URLs here
    "https://www.instagram.com/reel/ABC123/",
  "https://www.instagram.com/reel/DEF456/",
]

// ---------------------------------------------------------------------------
// Sanity client
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiToken = process.env.SANITY_SEED_TOKEN

if (!projectId) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}
if (!apiToken) {
  console.error('❌  SANITY_SEED_TOKEN is not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token: apiToken,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (REEL_URLS.length === 0) {
    console.warn('⚠️   REEL_URLS is empty. Add your Instagram reel URLs to the constant at the top of the script.')
    process.exit(0)
  }

  console.log(`\n🔍  Checking for existing instagramReel documents…`)
  console.log(`    projectId: ${projectId}  dataset: ${dataset}\n`)

  const existing = await client.fetch<number>(`count(*[_type == "instagramReel"])`)

  if (existing > 0) {
    console.warn(`⚠️   Found ${existing} existing instagramReel document(s). Skipping seed to avoid duplicates.`)
    console.warn('    Delete them in Sanity Studio first if you want to re-seed.')
    process.exit(0)
  }

  console.log(`✅  No existing reels found. Creating ${REEL_URLS.length} documents…\n`)

  for (let i = 0; i < REEL_URLS.length; i++) {
    const url = REEL_URLS[i]
    const order = i + 1
    const doc = {
      _type: 'instagramReel',
      reelUrl: url,
      order,
    }

    const created = await client.create(doc)
    console.log(`  ✔  [${order}] ${url} → ${created._id}`)
  }

  console.log('\n🎉  Seed complete.\n')
}

main().catch((err) => {
  console.error('❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
