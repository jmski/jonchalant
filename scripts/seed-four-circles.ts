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
 *
 * Canonical content (course description, subtitle, lesson summaries) is read
 * from design/canonical-content.json. To update positioning copy, edit that
 * file — do NOT hardcode strings here.
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

// ── Canonical summaries indexed by lesson number ─────────────────────────────
const lessonSummaries: Record<number, string> = Object.fromEntries(
  canonicalContent.fourCirclesCourse.lessons.map((l) => [l.number, l.summary])
)

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
    summary: lessonSummaries[1],
  },
  {
    number: 2,
    title: 'Passion Alone',
    slug: 'passion-alone',
    difficultyTier: 'basic',
    ikigaiQuadrants: ['passion'],
    summary: lessonSummaries[2],
  },
  {
    number: 3,
    title: 'Mission Alone',
    slug: 'mission-alone',
    difficultyTier: 'basic',
    ikigaiQuadrants: ['mission'],
    summary: lessonSummaries[3],
  },
  {
    number: 4,
    title: 'Vocation Alone',
    slug: 'vocation-alone',
    difficultyTier: 'basic',
    ikigaiQuadrants: ['vocation'],
    summary: lessonSummaries[4],
  },
  // Challenging (5–8)
  {
    number: 5,
    title: 'Profession Alone',
    slug: 'profession-alone',
    difficultyTier: 'challenging',
    ikigaiQuadrants: ['profession'],
    summary: lessonSummaries[5],
  },
  {
    number: 6,
    title: 'The Six Pairings',
    slug: 'the-six-pairings',
    difficultyTier: 'challenging',
    ikigaiQuadrants: ['passion', 'mission', 'vocation', 'profession'],
    summary: lessonSummaries[6],
  },
  {
    number: 7,
    title: 'Delight but No Wealth',
    slug: 'delight-but-no-wealth',
    difficultyTier: 'challenging',
    ikigaiQuadrants: ['passion', 'mission', 'vocation'],
    summary: lessonSummaries[7],
  },
  {
    number: 8,
    title: 'Delight but Uncertain',
    slug: 'delight-but-uncertain',
    difficultyTier: 'challenging',
    ikigaiQuadrants: ['passion', 'mission', 'profession'],
    summary: lessonSummaries[8],
  },
  // Hardest (9–12)
  {
    number: 9,
    title: 'Comfortable but Empty',
    slug: 'comfortable-but-empty',
    difficultyTier: 'hardest',
    ikigaiQuadrants: ['passion', 'vocation', 'profession'],
    summary: lessonSummaries[9],
  },
  {
    number: 10,
    title: 'Useful but Unexcited',
    slug: 'useful-but-unexcited',
    difficultyTier: 'hardest',
    ikigaiQuadrants: ['mission', 'vocation', 'profession'],
    summary: lessonSummaries[10],
  },
  {
    number: 11,
    title: 'Ikigai, When It Happens',
    slug: 'ikigai-when-it-happens',
    difficultyTier: 'hardest',
    ikigaiQuadrants: ['passion', 'mission', 'vocation', 'profession'],
    summary: lessonSummaries[11],
  },
  {
    number: 12,
    title: "Why Knowing Isn't Enough",
    slug: 'why-knowing-isnt-enough',
    difficultyTier: 'hardest',
    ikigaiQuadrants: ['passion', 'mission', 'vocation', 'profession'],
    summary: lessonSummaries[12],
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
    subtitle: canonicalContent.fourCirclesCourse.subtitle,
    courseType: 'free-gated',
    estimatedDuration: '12 weeks',
    isFeatured: false,
    // difficulty required by existing schema — use Beginner as neutral placeholder
    difficulty: 'Beginner',
    description: canonicalContent.fourCirclesCourse.description,
    order: 10,
    lessons: lessonRefs,
  }
}

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding Four Circles course into Sanity…')

  // ── Pre-run diff: course-level canonical fields ───────────────────────────
  const courseFields = ['description', 'subtitle']
  const courseIntended = {
    description: canonicalContent.fourCirclesCourse.description,
    subtitle: canonicalContent.fourCirclesCourse.subtitle,
  }
  console.log(`\nChecking course-level fields on ${COURSE_ID}:`)
  const confirmed = await diffAndConfirm(client, COURSE_ID, courseFields, courseIntended)
  if (!confirmed) {
    console.log('Aborted.')
    return
  }
  console.log()

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
