/**
 * Seed script — Dance Categories
 *
 * Creates 4 danceCategory documents in Sanity.
 * Safe to re-run: exits without changes if any danceCategory already exists.
 *
 * Usage:
 *   npm run seed:dance-categories
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_SEED_TOKEN  (needs write access — Editor or above)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env.local from the project root (process.cwd() is the project root when run via npm)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

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
  useCdn: false, // writes must bypass CDN
})

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

const PLACEHOLDER_VIDEO = {
  _type: 'video' as const,
  title: 'Placeholder Video',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  duration: '3:00',
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

interface CategorySeed {
  title: string
  leadershipPrinciple: string
  description: string
  icon: string
  order: number
}

const CATEGORIES: CategorySeed[] = [
  {
    title: 'Grounding & Stillness',
    leadershipPrinciple: 'How stillness communicates authority',
    description:
      'Before you speak, your body already has. This category explores how deliberate stillness and physical grounding create an immediate sense of calm authority in any room.',
    icon: '🌱',
    order: 1,
  },
  {
    title: 'Energy & Presence',
    leadershipPrinciple: 'Projecting energy without burning out',
    description:
      "Presence isn't about being the loudest in the room — it's about being the most intentional. This category teaches how to project energy strategically and sustainably.",
    icon: '⚡',
    order: 2,
  },
  {
    title: 'Flow & Adaptability',
    leadershipPrinciple: 'Reading the room and responding with grace',
    description:
      'The best leaders are fluid, not rigid. Flow training develops your ability to read shifting dynamics and respond with composure rather than react with tension.',
    icon: '🌊',
    order: 3,
  },
  {
    title: 'Command & Precision',
    leadershipPrinciple: 'Making every movement count',
    description:
      'Precision in movement builds trust. This category focuses on intentional gesture, decisive action, and the physical habits that signal confidence and competence.',
    icon: '🎯',
    order: 4,
  },
]

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n🔍  Checking for existing danceCategory documents…`)
  console.log(`    projectId: ${projectId}  dataset: ${dataset}\n`)

  const existing = await client.fetch<number>(
    `count(*[_type == "danceCategory"])`,
  )

  if (existing > 0) {
    console.warn(
      `⚠️   Found ${existing} existing danceCategory document(s). Skipping seed to avoid duplicates.`,
    )
    console.warn(
      '    Delete them in Sanity Studio first if you want to re-seed.',
    )
    process.exit(0)
  }

  console.log(`✅  No existing categories found. Creating ${CATEGORIES.length} documents…\n`)

  for (const cat of CATEGORIES) {
    const slug = toSlug(cat.title)
    const doc = {
      _type: 'danceCategory',
      title: cat.title,
      slug: { _type: 'slug', current: slug },
      leadershipPrinciple: cat.leadershipPrinciple,
      description: cat.description,
      icon: cat.icon,
      order: cat.order,
      videos: [{ ...PLACEHOLDER_VIDEO, _key: `placeholder-${slug}` }],
    }

    const created = await client.create(doc)
    console.log(`  ✔  [${cat.order}] "${cat.title}" → ${created._id}`)
  }

  console.log('\n🎉  Seed complete.\n')
}

main().catch((err) => {
  console.error('❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
