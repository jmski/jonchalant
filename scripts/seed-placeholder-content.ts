/**
 * Seed placeholder press mentions and case studies into Sanity.
 *
 * Run:
 *   npm run seed:placeholder
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
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

// ---------------------------------------------------------------------------
// Press Mentions
// ---------------------------------------------------------------------------

const pressMentions = [
  { outlet: 'Forbes', type: 'article', order: 1 },
  { outlet: 'Harvard Business Review', type: 'article', order: 2 },
  { outlet: 'The Muse', type: 'article', order: 3 },
  { outlet: 'The Quiet Leader Podcast', type: 'podcast', order: 4 },
  { outlet: 'LinkedIn Talent Blog', type: 'article', order: 5 },
]

// ---------------------------------------------------------------------------
// Case Studies
// ---------------------------------------------------------------------------

const caseStudies = [
  {
    title: 'From Overlooked to Promoted',
    clientName: 'Marcus T.',
    industry: 'Tech / Product Management',
    challenge:
      'Led high-impact projects but was consistently passed over for promotion. Senior leadership registered his output but not his presence — he blended into the background in rooms full of louder voices.',
    solution:
      'Eight weeks of presence work: entry posture, vocal pacing, and physical grounding before high-stakes meetings. We rebuilt how he occupied space before he said a word.',
    results: [
      'Promoted to Senior PM within 10 weeks of completing the program',
      'Now facilitates quarterly leadership offsites for his division',
      'Describes the shift as "people finally hear me when I speak"',
    ],
    featured: true,
    order: 1,
  },
  {
    title: 'Speaking Up in the Room',
    clientName: 'Diana K.',
    industry: 'Finance / Director',
    challenge:
      'Technically strong and consistently high-rated on performance reviews, but physically disappeared in rooms full of louder personalities. Avoided speaking in group settings unless directly asked.',
    solution:
      'Focus on spatial ownership and deliberate stillness. Practicing expansive posture before board meetings and learning to hold eye contact without shrinking.',
    results: [
      'Now opens quarterly finance reviews for her department',
      'Invited to represent her team at two external industry panels',
      'Reports "I stopped apologising for taking up space"',
    ],
    featured: true,
    order: 2,
  },
]

// ---------------------------------------------------------------------------
// Seed functions
// ---------------------------------------------------------------------------

async function seedPressMentions() {
  console.log('Seeding press mentions...')

  // Check for existing press mention documents
  const existing = await client.fetch<string[]>(
    `*[_type == "pressMention"].outlet`
  )

  for (const mention of pressMentions) {
    if (existing.includes(mention.outlet)) {
      console.log(`  Skipping "${mention.outlet}" — already exists`)
      continue
    }

    await client.create({
      _type: 'pressMention',
      outlet: mention.outlet,
      type: mention.type,
      order: mention.order,
    })
    console.log(`  Created: ${mention.outlet}`)
  }
}

async function seedCaseStudies() {
  console.log('Seeding case studies...')

  const existing = await client.fetch<string[]>(
    `*[_type == "caseStudy"].title`
  )

  for (const cs of caseStudies) {
    if (existing.includes(cs.title)) {
      console.log(`  Skipping "${cs.title}" — already exists`)
      continue
    }

    await client.create({
      _type: 'caseStudy',
      title: cs.title,
      slug: {
        _type: 'slug',
        current: cs.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      },
      clientName: cs.clientName,
      industry: cs.industry,
      challenge: cs.challenge,
      solution: cs.solution,
      results: cs.results,
      featured: cs.featured,
      order: cs.order,
    })
    console.log(`  Created: ${cs.title}`)
  }
}

async function main() {
  try {
    await seedPressMentions()
    await seedCaseStudies()
    console.log('\nDone. Open Sanity Studio to review the new documents.')
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

main()
