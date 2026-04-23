/**
 * Seed The Four Circles course into Sanity — 1 course + 12 placeholder lessons.
 *
 * Run:
 *   npx tsx scripts/seed-four-circles.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 *
 * Idempotent: uses deterministic _id values so re-running will upsert
 * (createOrReplace) without creating duplicates.
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

// ── Curriculum data ───────────────────────────────────────────────────────────

type DifficultyTier = 'basic' | 'challenging' | 'hardest'
type Quadrant = 'passion' | 'mission' | 'vocation' | 'profession'

interface LessonSpec {
  number: number
  title: string
  slug: string
  difficultyTier: DifficultyTier
  ikigaiQuadrants: Quadrant[]
  summary: string
}

const LESSONS: LessonSpec[] = [
  // Basic (1–4)
  {
    number: 1,
    title: 'Why Purpose Matters',
    slug: 'why-purpose-matters',
    difficultyTier: 'basic',
    ikigaiQuadrants: ['passion', 'mission', 'vocation', 'profession'],
    summary: 'An introduction to the ikigai framework and why most people only inhabit one or two circles — and what that costs them.',
  },
  {
    number: 2,
    title: 'Passion Alone',
    slug: 'passion-alone',
    difficultyTier: 'basic',
    ikigaiQuadrants: ['passion'],
    summary: 'What happens when you love what you do but the world doesn\'t need it or pay for it — the anatomy of delight without direction.',
  },
  {
    number: 3,
    title: 'Mission Alone',
    slug: 'mission-alone',
    difficultyTier: 'basic',
    ikigaiQuadrants: ['mission'],
    summary: 'The trap of doing good work for the world while ignoring whether it energises you or sustains you financially.',
  },
  {
    number: 4,
    title: 'Vocation Alone',
    slug: 'vocation-alone',
    difficultyTier: 'basic',
    ikigaiQuadrants: ['vocation'],
    summary: 'When you\'re skilled and paid but disconnected from meaning — the quiet hollowness of competence without purpose.',
  },
  // Challenging (5–8)
  {
    number: 5,
    title: 'Profession Alone',
    slug: 'profession-alone',
    difficultyTier: 'challenging',
    ikigaiQuadrants: ['profession'],
    summary: 'How a career built purely around what the world pays for becomes a gilded cage — and how to recognise the signs early.',
  },
  {
    number: 6,
    title: 'The Six Pairings',
    slug: 'the-six-pairings',
    difficultyTier: 'challenging',
    ikigaiQuadrants: ['passion', 'mission', 'vocation', 'profession'],
    summary: 'A systematic look at every two-circle overlap and the specific tension each pairing creates in real careers.',
  },
  {
    number: 7,
    title: 'Delight but No Wealth',
    slug: 'delight-but-no-wealth',
    difficultyTier: 'challenging',
    ikigaiQuadrants: ['passion', 'mission', 'vocation'],
    summary: 'The three-circle pattern where passion, mission, and vocation converge but profession is missing — what it feels like and how to close the gap.',
  },
  {
    number: 8,
    title: 'Delight but Uncertain',
    slug: 'delight-but-uncertain',
    difficultyTier: 'challenging',
    ikigaiQuadrants: ['passion', 'mission', 'profession'],
    summary: 'When you love the work, the world needs it, and you\'re paid for it — but you\'re not sure you\'re actually good at it.',
  },
  // Hardest (9–12)
  {
    number: 9,
    title: 'Comfortable but Empty',
    slug: 'comfortable-but-empty',
    difficultyTier: 'hardest',
    ikigaiQuadrants: ['passion', 'vocation', 'profession'],
    summary: 'The pattern most difficult to leave: you\'re good, paid, and somewhat interested — but you\'ve lost the sense of contributing to something larger.',
  },
  {
    number: 10,
    title: 'Useful but Unexcited',
    slug: 'useful-but-unexcited',
    difficultyTier: 'hardest',
    ikigaiQuadrants: ['mission', 'vocation', 'profession'],
    summary: 'Doing important, well-compensated work you\'re skilled at — but with zero spark. The pattern that looks fine from the outside and feels hollow from within.',
  },
  {
    number: 11,
    title: 'Ikigai, When It Happens',
    slug: 'ikigai-when-it-happens',
    difficultyTier: 'hardest',
    ikigaiQuadrants: ['passion', 'mission', 'vocation', 'profession'],
    summary: 'What all four circles overlapping actually feels like — and why it\'s less a destination than a practice of continuous realignment.',
  },
  {
    number: 12,
    title: 'Why Knowing Isn\'t Enough',
    slug: 'why-knowing-isnt-enough',
    difficultyTier: 'hardest',
    ikigaiQuadrants: ['passion', 'mission', 'vocation', 'profession'],
    summary: 'The transition lesson: insight without embodiment changes nothing. How executive presence training turns ikigai awareness into visible leadership.',
  },
]

// ── Deterministic IDs ─────────────────────────────────────────────────────────

const COURSE_ID = 'four-circles-course'

function lessonId(num: number): string {
  return `four-circles-lesson-${num}`
}

// ── Build Sanity documents ────────────────────────────────────────────────────

function buildLessonDoc(spec: LessonSpec) {
  return {
    _id: lessonId(spec.number),
    _type: 'courseLesson',
    title: spec.title,
    slug: { _type: 'slug', current: spec.slug },
    lessonNumber: spec.number,
    difficultyTier: spec.difficultyTier,
    ikigaiQuadrants: spec.ikigaiQuadrants,
    summary: spec.summary,
    estimatedMinutes: 15,
    // content, reflectionPrompt, tryThisWeek left empty — written in a later session
  }
}

function buildCourseDoc(lessonRefs: { _key: string; _type: 'reference'; _ref: string }[]) {
  return {
    _id: COURSE_ID,
    _type: 'course',
    title: 'The Four Circles',
    slug: { _type: 'slug', current: 'four-circles' },
    subtitle: 'A free, self-paced course on the ikigai framework',
    courseType: 'free-gated',
    estimatedDuration: '12 weeks',
    isFeatured: false,
    // difficulty required by existing schema — use Beginner as neutral placeholder
    difficulty: 'Beginner',
    description:
      'Twelve lessons walking through the ikigai framework — passion, mission, vocation, and profession — and what it means for how you show up as a leader.',
    order: 10,
    lessons: lessonRefs,
  }
}

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding Four Circles course into Sanity…')

  const transaction = client.transaction()

  // Upsert all lesson documents
  for (const spec of LESSONS) {
    transaction.createOrReplace(buildLessonDoc(spec))
  }

  // Upsert the course document with lesson references
  const lessonRefs = LESSONS.map((spec) => ({
    _key: `ref-${lessonId(spec.number)}`,
    _type: 'reference' as const,
    _ref: lessonId(spec.number),
  }))

  transaction.createOrReplace(buildCourseDoc(lessonRefs))

  await transaction.commit()

  console.log(`✓ Created/updated course "${COURSE_ID}" with ${LESSONS.length} lessons.`)
  console.log('Open Sanity Studio to verify: npm run sanity:dev')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
