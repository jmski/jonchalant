// Canonical content lives in design/canonical-content.json.
// Edit module titles and descriptions there — do NOT hardcode them here.

/**
 * Seed The Foundation curriculum into Sanity — 1 course, 8 modules, ~135 lessons.
 *
 * Run:
 *   npx tsx scripts/seed-foundation-curriculum.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 *
 * This script is idempotent: it uses deterministic _id values so re-running
 * will upsert (createOrReplace) rather than duplicate.
 *
 * Canonical content is read from design/canonical-content.json:
 *   - foundationCourse.description / philosophy / targetAudience → course document
 *   - foundationPage.curriculum.modules[].title + description → module documents
 * To update any of these, edit canonical-content.json and re-run this script.
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

// Canonical module copy (title + description) keyed by moduleNumber.
// Source of truth: design/canonical-content.json foundationPage.curriculum.modules
const canonicalModuleMap = Object.fromEntries(
  canonicalContent.foundationPage.curriculum.modules.map((m) => [m.moduleNumber, m])
) as Record<number, { title: string; description: string }>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function lessonId(moduleNum: number, lessonNum: number): string {
  return `foundation-lesson-${moduleNum}-${lessonNum}`
}

function moduleId(moduleNum: number): string {
  return `foundation-module-${moduleNum}`
}

const COURSE_ID = 'foundation-course'

// ---------------------------------------------------------------------------
// Course
// ---------------------------------------------------------------------------

const course = {
  _id: COURSE_ID,
  _type: 'course' as const,
  title: 'The Foundation',
  slug: { _type: 'slug', current: 'the-foundation' },
  description: canonicalContent.foundationCourse.description,
  philosophy: canonicalContent.foundationCourse.philosophy,
  targetAudience: canonicalContent.foundationCourse.targetAudience,
  totalEstimatedHours: 213,
  difficulty: 'Beginner',
  estimatedDuration: '200+ hours',
  isFeatured: true,
  order: 1,
  contentPillars: [
    {
      _key: 'pillar-body-control',
      name: 'Body Control',
      description:
        'How you hold yourself determines how others perceive you before you speak.',
    },
    {
      _key: 'pillar-active-listening',
      name: 'Active Listening',
      description:
        "Hearing what's said, what's not said, and what the room is feeling.",
    },
    {
      _key: 'pillar-improvisation',
      name: 'Improvisation',
      description:
        'Thinking on your feet without freezing, scripting, or over-preparing.',
    },
    {
      _key: 'pillar-reciprocation',
      name: 'Reciprocation',
      description:
        'The give-and-take rhythm that builds trust and authentic influence.',
    },
    {
      _key: 'pillar-tonality',
      name: 'Tonality & Presence',
      description:
        'Your voice, your timing, your energy — the invisible signals that command attention.',
    },
  ],
  lessonStructure: [
    {
      _key: 'step-1',
      step: 1,
      name: 'Concept Introduction',
      durationRange: '10–15 min',
      description:
        '2D animations explaining the principle. AI-generated graphics/diagrams for visual clarity. Research citations where applicable.',
    },
    {
      _key: 'step-2',
      step: 2,
      name: 'Dance Connection',
      durationRange: '5–10 min',
      description:
        'Dance lesson video demonstrating the concept physically. Jon demonstrates the movement or principle in motion.',
    },
    {
      _key: 'step-3',
      step: 3,
      name: 'Deep Dive',
      durationRange: '15–20 min',
      description:
        'Detailed breakdown with real-world examples, case studies from coaching clients, before/after scenarios, framework or mental model introduced.',
    },
    {
      _key: 'step-4',
      step: 4,
      name: 'Practice Exercise',
      durationRange: '10–15 min',
      description:
        "Specific, actionable exercise the learner does on their own. Can be movement-based, conversational, or reflective. Clear success criteria: 'You'll know this worked when...'",
    },
    {
      _key: 'step-5',
      step: 5,
      name: 'Reflection Prompt',
      durationRange: '5 min',
      description:
        'Journal questions, self-assessment check-in, connection to previous and upcoming lessons.',
    },
  ],
  modules: [] as { _type: 'reference'; _ref: string; _key: string }[],
}

// ---------------------------------------------------------------------------
// Module & Lesson definitions
// ---------------------------------------------------------------------------

interface LessonDef {
  num: number
  title: string
  duration: number
  format: string
  emphasis: string
  description: string
}

interface ModuleDef {
  moduleNumber: number
  title: string
  description: string
  theme: string
  danceIntegration: string
  estimatedHours: string
  lessons: LessonDef[]
}

const modules: ModuleDef[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 1: Why Practice Outlasts Performance
  // ═══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 1,
    title: canonicalModuleMap[1].title,
    description: canonicalModuleMap[1].description,
    theme: canonicalModuleMap[1].description,
    danceIntegration: 'Introduction to dance as metaphor — communication without words.',
    estimatedHours: '15–20 hours',
    lessons: [
      { num: 1, title: 'The Soft Skills Myth', duration: 75, format: 'concept_animation', emphasis: 'all_pillars', description: "Why 'soft' is a misnomer — these are survival skills." },
      { num: 2, title: "The Introvert's Advantage", duration: 75, format: 'concept_case_studies', emphasis: 'all_pillars', description: 'Why quiet leaders are uniquely positioned.' },
      { num: 3, title: "What Dance Teaches That Business School Doesn't", duration: 90, format: 'dance_concept', emphasis: 'all_pillars', description: 'Intro to dance as metaphor — communication without words.' },
      { num: 4, title: 'The Cost of Invisibility', duration: 60, format: 'animation_research', emphasis: 'all_pillars', description: 'Career impact data: promotions, influence, compensation.' },
      { num: 5, title: 'Reading the Room (Before You Enter It)', duration: 75, format: 'dance_concept', emphasis: 'active_listening', description: 'How dancers read music, space, and energy before moving.' },
      { num: 6, title: 'The Language Your Body Already Speaks', duration: 90, format: 'dance_exercises', emphasis: 'body_control', description: 'Posture audit — what your default stance communicates.' },
      { num: 7, title: 'Why Traditional Coaching Fails Introverts', duration: 60, format: 'concept_animation', emphasis: 'all_pillars', description: 'The extrovert bias in leadership models.' },
      { num: 8, title: 'The Presence Spectrum', duration: 75, format: 'framework_examples', emphasis: 'tonality_presence', description: 'From invisible to magnetic — where are you now?' },
      { num: 9, title: 'Your First Movement Exploration', duration: 90, format: 'dance_practice', emphasis: 'body_control', description: 'Simple movement drills to connect body awareness to emotional state.' },
      { num: 10, title: 'Setting Your Intention', duration: 60, format: 'reflection_journaling', emphasis: 'all_pillars', description: 'Defining your personal presence goals.' },
      { num: 11, title: 'The Science of First Impressions', duration: 75, format: 'research_animation', emphasis: 'body_control', description: 'What happens in the first 7 seconds — and how to own them.' },
      { num: 12, title: 'Building Your Baseline', duration: 90, format: 'assessment_dance_video', emphasis: 'all_pillars', description: "Self-assessment + recording your 'before' baseline." },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 2: The Body as Instrument
  // ═══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 2,
    title: canonicalModuleMap[2].title,
    description: canonicalModuleMap[2].description,
    theme: canonicalModuleMap[2].description,
    danceIntegration:
      'Fundamentals — isolation, alignment, weight shifts, grounding.',
    estimatedHours: '25–30 hours',
    lessons: [
      { num: 1, title: 'Your Body Is Your First Slide Deck', duration: 75, format: 'concept_animation', emphasis: 'body_control', description: 'How your physical presence communicates before you open your mouth.' },
      { num: 2, title: 'Grounding: Finding Your Center', duration: 90, format: 'dance_practice', emphasis: 'body_control', description: 'Weight, balance, stillness as power.' },
      { num: 3, title: 'Isolation: Moving One Thing at a Time', duration: 90, format: 'dance_practice', emphasis: 'body_control', description: 'Body control through isolation drills.' },
      { num: 4, title: 'The Power of Stillness', duration: 75, format: 'concept_dance_video', emphasis: 'tonality_presence', description: 'Why the best leaders know when NOT to move.' },
      { num: 5, title: 'Gestural Vocabulary', duration: 90, format: 'dance_examples', emphasis: 'body_control', description: 'Hands, arms, head — what your gestures actually say.' },
      { num: 6, title: 'Spatial Awareness in a Meeting Room', duration: 75, format: 'concept_role_play', emphasis: 'body_control', description: 'Where you sit/stand changes your influence.' },
      { num: 7, title: 'Breath and Rhythm', duration: 90, format: 'dance_breathwork', emphasis: 'tonality_presence', description: 'Your breath controls your pace, your pace controls the room.' },
      { num: 8, title: 'Walking with Intention', duration: 75, format: 'dance_practice', emphasis: 'body_control', description: 'How you enter a room is half the impression.' },
      { num: 9, title: "The Handshake Isn't Dead", duration: 60, format: 'concept_practice', emphasis: 'reciprocation', description: 'Physical greetings and micro-touches in professional settings.' },
      { num: 10, title: 'Posture Under Pressure', duration: 90, format: 'dance_scenarios', emphasis: 'body_control', description: 'Body control when stressed — managing physical anxiety tells.' },
      { num: 11, title: 'The Seated Body', duration: 75, format: 'concept_practice', emphasis: 'body_control', description: 'Presence while sitting — meetings, panels, interviews.' },
      { num: 12, title: 'Energy Transfer', duration: 90, format: 'dance_analysis', emphasis: 'tonality_presence', description: 'How your physical energy affects others in the room.' },
      { num: 13, title: 'Weight Shifts and Transitions', duration: 90, format: 'dance_practice', emphasis: 'body_control', description: 'Smooth transitions between standing, sitting, presenting.' },
      { num: 14, title: 'Mirror Neurons and Movement', duration: 75, format: 'research_animation', emphasis: 'reciprocation', description: 'The neuroscience of physical mimicry and rapport.' },
      { num: 15, title: 'Practice Lab: The 3-Minute Check-In', duration: 90, format: 'full_practice', emphasis: 'body_control', description: 'Daily body awareness routine.' },
      { num: 16, title: 'Building Physical Vocabulary', duration: 75, format: 'dance_journaling', emphasis: 'body_control', description: 'Expanding your range of physical expression.' },
      { num: 17, title: 'Integration: Body Control Assessment', duration: 90, format: 'assessment_review', emphasis: 'body_control', description: 'Module checkpoint — record a 2-min self-assessment.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 3: Active Listening & Attunement
  // ═══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 3,
    title: canonicalModuleMap[3].title,
    description: canonicalModuleMap[3].description,
    theme: canonicalModuleMap[3].description,
    danceIntegration:
      'Partner dance — following, connection, musicality, lead/follow dynamics.',
    estimatedHours: '25–30 hours',
    lessons: [
      { num: 1, title: 'Listening Is a Full-Body Sport', duration: 75, format: 'concept_animation', emphasis: 'active_listening', description: 'Why listening starts with the body, not the ears.' },
      { num: 2, title: 'The Follow in Dance and Business', duration: 90, format: 'dance_concept', emphasis: 'active_listening', description: 'What following teaches about receiving information.' },
      { num: 3, title: 'Reading Energy Before Words', duration: 75, format: 'concept_practice', emphasis: 'active_listening', description: 'Attunement — sensing mood, tension, openness.' },
      { num: 4, title: 'Mirroring Without Mimicking', duration: 90, format: 'dance_examples', emphasis: 'active_listening', description: 'The subtle art of physical attunement.' },
      { num: 5, title: 'The Space Between the Words', duration: 75, format: 'concept_role_play', emphasis: 'active_listening', description: 'Pauses, silences, and what they communicate.' },
      { num: 6, title: 'Connection Points in Partner Dance', duration: 90, format: 'dance_practice', emphasis: 'active_listening', description: 'Physical connection as metaphor for conversational connection.' },
      { num: 7, title: 'Deep vs. Surface Listening', duration: 75, format: 'concept_animation', emphasis: 'active_listening', description: 'Three levels of listening: content, emotion, intention.' },
      { num: 8, title: 'The Listening Stance', duration: 90, format: 'dance_practice', emphasis: 'active_listening', description: 'Body posture that signals genuine engagement.' },
      { num: 9, title: 'Reading a Room of 5 vs. 50', duration: 75, format: 'concept_scenarios', emphasis: 'active_listening', description: 'Scaling attention from 1-on-1 to group settings.' },
      { num: 10, title: 'Musical Listening in Dance', duration: 90, format: 'dance_practice', emphasis: 'active_listening', description: 'How dancers listen to music — layers, patterns, anticipation.' },
      { num: 11, title: 'The Art of the Follow-Up Question', duration: 75, format: 'concept_practice', emphasis: 'active_listening', description: 'Showing you heard, not just waited for your turn.' },
      { num: 12, title: 'Empathic Accuracy', duration: 75, format: 'research_animation', emphasis: 'active_listening', description: 'The science of reading people accurately.' },
      { num: 13, title: 'When to Lead, When to Follow', duration: 90, format: 'dance_scenarios', emphasis: 'active_listening', description: 'Dynamic role-switching in conversations.' },
      { num: 14, title: 'Listening Under Conflict', duration: 75, format: 'concept_role_play', emphasis: 'active_listening', description: 'Active listening when emotions run hot.' },
      { num: 15, title: 'The Ensemble Effect', duration: 90, format: 'dance_group_concepts', emphasis: 'active_listening', description: 'How dancers create group flow — and how teams do too.' },
      { num: 16, title: 'Digital Listening', duration: 75, format: 'concept_practice', emphasis: 'active_listening', description: 'Active listening on Zoom, Slack, email.' },
      { num: 17, title: 'Practice Lab: The Listening Intensive', duration: 90, format: 'full_practice', emphasis: 'active_listening', description: '48-hour listening challenge.' },
      { num: 18, title: 'Integration: Listening Assessment', duration: 90, format: 'assessment_partner', emphasis: 'active_listening', description: 'Module checkpoint.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 4: Improvisation & Adaptability
  // ═══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 4,
    title: canonicalModuleMap[4].title,
    description: canonicalModuleMap[4].description,
    theme: canonicalModuleMap[4].description,
    danceIntegration:
      'Freestyle — improv exercises, movement prompts, finding structure in freedom.',
    estimatedHours: '25–30 hours',
    lessons: [
      { num: 1, title: 'The Myth of the Perfect Script', duration: 75, format: 'concept_animation', emphasis: 'improvisation', description: 'Why over-preparation backfires.' },
      { num: 2, title: 'Freestyle 101: Moving Without a Plan', duration: 90, format: 'dance_practice', emphasis: 'improvisation', description: 'Your first freestyle — embrace the discomfort.' },
      { num: 3, title: 'Yes, And — From Improv to Influence', duration: 75, format: 'concept_exercises', emphasis: 'improvisation', description: 'The improv principle that transforms meetings.' },
      { num: 4, title: 'Finding Structure in Freedom', duration: 90, format: 'dance_concept', emphasis: 'improvisation', description: 'How freestyle dancers create order from chaos.' },
      { num: 5, title: 'The Recovery', duration: 75, format: 'concept_scenarios', emphasis: 'improvisation', description: 'What to do when things go wrong — stumbles, blanks, curveballs.' },
      { num: 6, title: 'Movement Prompts and Constraints', duration: 90, format: 'dance_practice', emphasis: 'improvisation', description: 'Using limitations as creative fuel.' },
      { num: 7, title: 'Spontaneous Speaking Drills', duration: 75, format: 'practice_recording', emphasis: 'improvisation', description: 'On-the-spot speaking exercises with dance warm-ups.' },
      { num: 8, title: 'Reading and Responding in Real Time', duration: 90, format: 'dance_role_play', emphasis: 'improvisation', description: 'Adapting mid-conversation based on feedback signals.' },
      { num: 9, title: 'The Comfort Zone Map', duration: 75, format: 'concept_exercises', emphasis: 'improvisation', description: 'Expanding your range, one small stretch at a time.' },
      { num: 10, title: 'Battle Culture: Competitive Improvisation', duration: 90, format: 'dance_analysis', emphasis: 'improvisation', description: 'What dance battles teach about performing under pressure.' },
      { num: 11, title: 'Cognitive Flexibility', duration: 75, format: 'research_animation', emphasis: 'improvisation', description: 'The neuroscience of adapting quickly.' },
      { num: 12, title: 'Improvisational Leadership', duration: 90, format: 'case_studies_examples', emphasis: 'improvisation', description: 'Leaders who thrive in uncertainty.' },
      { num: 13, title: 'The Jam Session', duration: 90, format: 'dance_practice', emphasis: 'improvisation', description: "Collaborative improvisation — building on others' ideas." },
      { num: 14, title: 'Managing the Freeze Response', duration: 75, format: 'concept_dance_video', emphasis: 'improvisation', description: 'What happens when your mind goes blank — body-first recovery.' },
      { num: 15, title: 'Pattern Recognition in Real Time', duration: 90, format: 'dance_analysis', emphasis: 'improvisation', description: "Seeing structure in chaos — a dancer's superpower." },
      { num: 16, title: 'Improv in High-Stakes Moments', duration: 75, format: 'scenarios_practice', emphasis: 'improvisation', description: 'Q&A sessions, executive briefings, crisis response.' },
      { num: 17, title: 'Practice Lab: 7-Day Improv Challenge', duration: 90, format: 'full_practice', emphasis: 'improvisation', description: 'Daily improv exercises for one week.' },
      { num: 18, title: 'Integration: Improv Assessment', duration: 90, format: 'assessment_recording', emphasis: 'improvisation', description: 'Module checkpoint — freestyle recording + self-review.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 5: Reading the Exchange
  // ═══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 5,
    title: canonicalModuleMap[5].title,
    description: canonicalModuleMap[5].description,
    theme: canonicalModuleMap[5].description,
    danceIntegration:
      'Social dance — conversation through movement, call-and-response patterns.',
    estimatedHours: '25–30 hours',
    lessons: [
      { num: 1, title: 'The Rhythm of Give and Take', duration: 75, format: 'concept_animation', emphasis: 'reciprocation', description: 'The fundamental pattern of all influence.' },
      { num: 2, title: 'Call and Response in Dance', duration: 90, format: 'dance_practice', emphasis: 'reciprocation', description: 'The foundational pattern of all social dance.' },
      { num: 3, title: 'Influence Without Manipulation', duration: 75, format: 'ethical_framework', emphasis: 'reciprocation', description: 'The difference between persuasion and coercion.' },
      { num: 4, title: 'The Social Contract of Movement', duration: 90, format: 'dance_concept', emphasis: 'reciprocation', description: 'How dancers negotiate space, energy, and attention.' },
      { num: 5, title: 'Building Rapport Through Rhythm', duration: 90, format: 'dance_practice', emphasis: 'reciprocation', description: 'Finding shared rhythm in conversation.' },
      { num: 6, title: 'The Currency of Attention', duration: 75, format: 'concept_exercises', emphasis: 'reciprocation', description: 'What you pay attention to determines your influence.' },
      { num: 7, title: 'Reading Social Dynamics', duration: 75, format: 'concept_case_studies', emphasis: 'reciprocation', description: 'Power dynamics, alliances, unspoken hierarchies.' },
      { num: 8, title: 'Vulnerability as Strength', duration: 90, format: 'dance_concept', emphasis: 'reciprocation', description: 'What partner dance teaches about trust.' },
      { num: 9, title: 'The Art of the Bridge', duration: 75, format: 'concept_practice', emphasis: 'reciprocation', description: 'Connecting ideas, people, and moments.' },
      { num: 10, title: 'Reciprocal Feedback', duration: 90, format: 'dance_scenarios', emphasis: 'reciprocation', description: 'Giving and receiving feedback without ego.' },
      { num: 11, title: 'Micro-Reciprocation', duration: 75, format: 'concept_animation', emphasis: 'reciprocation', description: 'Small gestures that build massive trust over time.' },
      { num: 12, title: 'Negotiation Through Movement', duration: 90, format: 'dance_role_play', emphasis: 'reciprocation', description: 'How dancers negotiate in real time — applied to business.' },
      { num: 13, title: 'The Generosity Loop', duration: 75, format: 'concept_practice', emphasis: 'reciprocation', description: 'Leading with generosity creates compounding influence.' },
      { num: 14, title: 'Cultural Intelligence in Social Dance', duration: 90, format: 'dance_analysis', emphasis: 'reciprocation', description: 'Adapting your style to different cultural contexts.' },
      { num: 15, title: 'Boundaries and Reciprocation', duration: 75, format: 'concept_scenarios', emphasis: 'reciprocation', description: 'When to give less, not more.' },
      { num: 16, title: 'Group Dynamics in Cipher', duration: 90, format: 'dance_group_theory', emphasis: 'reciprocation', description: 'The cipher (dance circle) as a model for team dynamics.' },
      { num: 17, title: 'Practice Lab: The Reciprocation Experiment', duration: 90, format: 'full_practice', emphasis: 'reciprocation', description: '5-day experiment in intentional reciprocation.' },
      { num: 18, title: 'Integration: Influence Assessment', duration: 90, format: 'assessment_reflection', emphasis: 'reciprocation', description: 'Module checkpoint.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 6: Tonality & Vocal Presence
  // ═══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 6,
    title: canonicalModuleMap[6].title,
    description: canonicalModuleMap[6].description,
    theme: canonicalModuleMap[6].description,
    danceIntegration:
      'Musicality — rhythm, dynamics, accents, musical interpretation.',
    estimatedHours: '25–30 hours',
    lessons: [
      { num: 1, title: 'Your Voice Is an Instrument', duration: 75, format: 'concept_animation', emphasis: 'tonality_presence', description: 'Why your voice is the most underused leadership tool.' },
      { num: 2, title: 'Musicality: Hearing What Others Miss', duration: 90, format: 'dance_listening', emphasis: 'tonality_presence', description: 'How dancers dissect music — layers, texture, nuance.' },
      { num: 3, title: 'The Weight of a Pause', duration: 75, format: 'concept_practice', emphasis: 'tonality_presence', description: 'Strategic silence as a power move.' },
      { num: 4, title: 'Rhythm in Speech', duration: 90, format: 'dance_speaking_drills', emphasis: 'tonality_presence', description: 'Your cadence determines your impact.' },
      { num: 5, title: 'Dynamic Range', duration: 75, format: 'concept_practice', emphasis: 'tonality_presence', description: 'Loud vs. soft, fast vs. slow — expanding your vocal palette.' },
      { num: 6, title: 'Accents and Emphasis in Dance', duration: 90, format: 'dance_analysis', emphasis: 'tonality_presence', description: 'How dancers hit accents — and how speakers do too.' },
      { num: 7, title: 'Emotional Color in Your Voice', duration: 75, format: 'concept_recording', emphasis: 'tonality_presence', description: 'Conveying warmth, authority, curiosity, urgency.' },
      { num: 8, title: 'The Opening Line', duration: 90, format: 'practice_examples', emphasis: 'tonality_presence', description: 'How to begin any talk, meeting, or conversation.' },
      { num: 9, title: 'Breath Support for Speaking', duration: 75, format: 'dance_vocal_practice', emphasis: 'tonality_presence', description: 'Diaphragmatic breathing for sustained vocal power.' },
      { num: 10, title: 'Pacing: The Metronome of Influence', duration: 90, format: 'dance_speaking_drills', emphasis: 'tonality_presence', description: 'How tempo shapes perception.' },
      { num: 11, title: 'Vocal Fry, Uptalk, and Fillers', duration: 75, format: 'concept_practice', emphasis: 'tonality_presence', description: 'Identifying and addressing vocal habits.' },
      { num: 12, title: "The Storyteller's Rhythm", duration: 90, format: 'dance_storytelling', emphasis: 'tonality_presence', description: 'Narrative pacing — tension, release, surprise.' },
      { num: 13, title: 'Commanding Attention at Scale', duration: 75, format: 'concept_scenarios', emphasis: 'tonality_presence', description: 'Speaking to 10 vs. 100 vs. 1000.' },
      { num: 14, title: 'Music and Emotion', duration: 90, format: 'dance_analysis', emphasis: 'tonality_presence', description: 'How music creates emotional landscapes — applied to speech.' },
      { num: 15, title: 'Vocal Recovery', duration: 75, format: 'concept_practice', emphasis: 'tonality_presence', description: 'Regaining composure when your voice shakes or breaks.' },
      { num: 16, title: 'The Closing Line', duration: 90, format: 'practice_examples', emphasis: 'tonality_presence', description: 'How to end with impact — the last impression.' },
      { num: 17, title: 'Digital Voice Presence', duration: 75, format: 'concept_practice', emphasis: 'tonality_presence', description: 'Tonality on Zoom, podcasts, voice messages.' },
      { num: 18, title: 'Practice Lab: Voice Journal', duration: 90, format: 'full_practice', emphasis: 'tonality_presence', description: '7-day voice recording and analysis.' },
      { num: 19, title: 'Integration: Tonality Assessment', duration: 90, format: 'assessment_recording', emphasis: 'tonality_presence', description: 'Module checkpoint — 3-min recorded speech.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 7: Presence in Practice
  // ═══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 7,
    title: canonicalModuleMap[7].title,
    description: canonicalModuleMap[7].description,
    theme: canonicalModuleMap[7].description,
    danceIntegration:
      'Performance — choreography, stage presence, audience engagement, battle prep.',
    estimatedHours: '25–30 hours',
    lessons: [
      { num: 1, title: 'What Is Presence, Really?', duration: 75, format: 'concept_animation', emphasis: 'all_pillars', description: 'Defining presence through the lens of everything learned so far.' },
      { num: 2, title: "The Performer's Mindset", duration: 90, format: 'dance_concept', emphasis: 'all_pillars', description: 'Stage presence — what separates good from unforgettable.' },
      { num: 3, title: 'Pre-Performance Rituals', duration: 75, format: 'concept_dance_video', emphasis: 'body_control', description: 'How dancers prepare — warm-up, visualization, centering.' },
      { num: 4, title: 'Choreography as Strategy', duration: 90, format: 'dance_concept', emphasis: 'improvisation', description: 'Planning your performance while staying adaptable.' },
      { num: 5, title: 'The Presentation as Performance', duration: 90, format: 'full_practice_recording', emphasis: 'all_pillars', description: 'Applying all modules to a real presentation.' },
      { num: 6, title: 'Audience Connection', duration: 75, format: 'dance_scenarios', emphasis: 'reciprocation', description: "Making 1000 people feel like you're talking to each one." },
      { num: 7, title: 'Managing Stage Fright', duration: 90, format: 'concept_practice', emphasis: 'body_control', description: 'The neuroscience of performance anxiety — and physical solutions.' },
      { num: 8, title: 'High-Stakes Conversations', duration: 75, format: 'scenarios_role_play', emphasis: 'all_pillars', description: 'Job interviews, salary negotiations, board presentations.' },
      { num: 9, title: 'The Executive Briefing', duration: 90, format: 'practice_feedback', emphasis: 'all_pillars', description: '60-second executive summary — body, voice, content.' },
      { num: 10, title: 'Group Choreography', duration: 90, format: 'dance_team_concept', emphasis: 'reciprocation', description: 'Coordinating with others — panels, joint presentations.' },
      { num: 11, title: 'Recovery in Real Time', duration: 75, format: 'scenarios_practice', emphasis: 'improvisation', description: 'When the projector dies, the client objects, the meeting derails.' },
      { num: 12, title: 'Networking as Social Dance', duration: 90, format: 'concept_dance_video', emphasis: 'reciprocation', description: 'Working a room with the rhythm of a social dancer.' },
      { num: 13, title: 'The Difficult Conversation', duration: 75, format: 'scenarios_practice', emphasis: 'active_listening', description: 'Presence when delivering bad news or feedback.' },
      { num: 14, title: 'Media Training', duration: 90, format: 'practice_recording', emphasis: 'tonality_presence', description: 'Interviews, podcasts, video — presence on camera.' },
      { num: 15, title: 'The Power of Silence on Stage', duration: 75, format: 'dance_practice', emphasis: 'tonality_presence', description: 'Strategic pauses in performance.' },
      { num: 16, title: 'Building to a Crescendo', duration: 90, format: 'dance_speaking_drills', emphasis: 'tonality_presence', description: 'How to build energy and release it at the right moment.' },
      { num: 17, title: 'Practice Lab: The Full Run-Through', duration: 90, format: 'full_practice', emphasis: 'all_pillars', description: 'Complete presentation with body, voice, improv, recovery.' },
      { num: 18, title: 'Integration: Presence Assessment', duration: 90, format: 'assessment_recording', emphasis: 'all_pillars', description: 'Module checkpoint — full recorded presentation.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 8: The Work, Embodied
  // ═══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 8,
    title: canonicalModuleMap[8].title,
    description: canonicalModuleMap[8].description,
    theme: canonicalModuleMap[8].description,
    danceIntegration:
      'Capstone — creating your own movement practice, personal style, reflection.',
    estimatedHours: '20–25 hours',
    lessons: [
      { num: 1, title: 'Your Presence Signature', duration: 75, format: 'concept_reflection', emphasis: 'all_pillars', description: 'Identifying the unique presence you bring to every room.' },
      { num: 2, title: 'Finding Your Style', duration: 90, format: 'dance_exploration', emphasis: 'all_pillars', description: "Every great dancer has a signature — what's yours?" },
      { num: 3, title: 'The Daily Practice', duration: 75, format: 'framework_practice', emphasis: 'all_pillars', description: 'Building a 10-min daily presence routine.' },
      { num: 4, title: 'Presence and Authenticity', duration: 90, format: 'concept_deep_dive', emphasis: 'all_pillars', description: 'The line between performance and pretending.' },
      { num: 5, title: 'Building Your Movement Practice', duration: 90, format: 'dance_planning', emphasis: 'body_control', description: 'Creating a personal movement ritual.' },
      { num: 6, title: 'Leading from the Back', duration: 75, format: 'concept_case_studies', emphasis: 'all_pillars', description: 'Introverted leadership models that work.' },
      { num: 7, title: 'The Compound Effect of Presence', duration: 75, format: 'animation_trajectory', emphasis: 'all_pillars', description: 'Small daily improvements lead to transformation.' },
      { num: 8, title: 'Mentoring and Modeling', duration: 90, format: 'concept_practice', emphasis: 'reciprocation', description: "Teaching others what you've learned — the ultimate integration." },
      { num: 9, title: 'Presence in Personal Relationships', duration: 75, format: 'concept_reflection', emphasis: 'active_listening', description: 'Beyond the boardroom — showing up at home.' },
      { num: 10, title: 'Creating Your Presence Manifesto', duration: 90, format: 'writing_recording', emphasis: 'all_pillars', description: 'Your personal presence philosophy — written and recorded.' },
      { num: 11, title: 'The Before and After', duration: 75, format: 'review_comparison', emphasis: 'all_pillars', description: 'Comparing your Module 1 baseline to now.' },
      { num: 12, title: 'Rest and Recovery', duration: 75, format: 'concept_dance_video', emphasis: 'body_control', description: "Why rest is part of the practice — the dancer's off-season." },
      { num: 13, title: 'Your Next 90 Days', duration: 90, format: 'planning_accountability', emphasis: 'all_pillars', description: 'Concrete action plan for continued growth.' },
      { num: 14, title: 'Capstone: Your Presence Performance', duration: 90, format: 'full_recording', emphasis: 'all_pillars', description: 'Final presentation integrating all 8 modules.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Seed execution
// ---------------------------------------------------------------------------

async function seed() {
  console.log('🌱 Seeding The Foundation curriculum...\n')

  // ── Pre-run diff: course-level canonical fields ───────────────────────────
  const courseFields = ['description', 'philosophy', 'targetAudience']
  const courseIntended = {
    description: canonicalContent.foundationCourse.description,
    philosophy: canonicalContent.foundationCourse.philosophy,
    targetAudience: canonicalContent.foundationCourse.targetAudience,
  }
  console.log(`Checking course-level fields on ${COURSE_ID}:`)
  const confirmed = await diffAndConfirm(client, COURSE_ID, courseFields, courseIntended)
  if (!confirmed) {
    console.log('Aborted.')
    return
  }
  console.log()

  // ── Step 1: Create all documents WITHOUT cross-references ──────────────
  // Sanity validates references on write, so every referenced doc must exist
  // before we can link to it. We create shells first, then patch in refs.

  // Course (no modules array yet)
  const { modules: _courseModules, ...courseWithoutRefs } = course
  await client.createOrReplace({ ...courseWithoutRefs, modules: [] })
  console.log(`  ✅ Course: ${course.title}\n`)

  // Modules (no lessons array or course ref yet)
  for (const mod of modules) {
    await client.createOrReplace({
      _id: moduleId(mod.moduleNumber),
      _type: 'module' as const,
      title: mod.title,
      slug: { _type: 'slug', current: slugify(mod.title) },
      moduleNumber: mod.moduleNumber,
      description: mod.description,
      theme: mod.theme,
      danceIntegration: mod.danceIntegration,
      estimatedHours: mod.estimatedHours,
      order: mod.moduleNumber,
      lessons: [],
      createdAt: new Date().toISOString(),
    })
    console.log(`  ✅ Module ${mod.moduleNumber}: ${mod.title}`)
  }

  console.log()

  // Lessons (no module ref yet)
  let totalLessons = 0
  for (const mod of modules) {
    console.log(`  Module ${mod.moduleNumber}: ${mod.title} (${mod.lessons.length} lessons)`)

    for (const lesson of mod.lessons) {
      await client.createOrReplace({
        _id: lessonId(mod.moduleNumber, lesson.num),
        _type: 'lesson' as const,
        title: lesson.title,
        slug: { _type: 'slug', current: slugify(lesson.title) },
        lessonNumber: `${mod.moduleNumber}.${lesson.num}`,
        access: 'enrolled' as const,
        description: lesson.description,
        format: lesson.format,
        emphasis: lesson.emphasis,
        duration: lesson.duration,
        order: lesson.num,
        publishedAt: new Date().toISOString(),
      })
      totalLessons++
    }
  }

  console.log(`\n  ✅ ${totalLessons} lessons created`)

  // ── Step 2: Patch in all cross-references now that everything exists ───
  console.log('\n  Linking references...')

  // Patch each lesson with its module ref
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      await client
        .patch(lessonId(mod.moduleNumber, lesson.num))
        .set({ module: { _type: 'reference', _ref: moduleId(mod.moduleNumber) } })
        .commit()
    }
  }
  console.log('  ✅ Lessons → Modules linked')

  // Patch each module with its lesson refs + course ref
  for (const mod of modules) {
    await client
      .patch(moduleId(mod.moduleNumber))
      .set({
        course: { _type: 'reference', _ref: COURSE_ID },
        lessons: mod.lessons.map((l) => ({
          _type: 'reference' as const,
          _ref: lessonId(mod.moduleNumber, l.num),
          _key: `lesson-${mod.moduleNumber}-${l.num}`,
        })),
      })
      .commit()
  }
  console.log('  ✅ Modules → Course + Lessons linked')

  // Patch course with module refs
  await client
    .patch(COURSE_ID)
    .set({
      modules: modules.map((m) => ({
        _type: 'reference' as const,
        _ref: moduleId(m.moduleNumber),
        _key: `module-${m.moduleNumber}`,
      })),
    })
    .commit()
  console.log('  ✅ Course → Modules linked')

  console.log('\n🎉 Done! The Foundation curriculum has been seeded.\n')
  console.log(`   Course:  1`)
  console.log(`   Modules: ${modules.length}`)
  console.log(`   Lessons: ${totalLessons}`)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
