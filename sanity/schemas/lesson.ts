// Unified lesson schema — covers both free preview and enrolled (gated) content.
// access: 'free' → publicly visible on /program/preview
// access: 'enrolled' → only accessible inside /portal after payment
import { defineType, defineField } from 'sanity'
import type { StringRule, NumberRule, SlugRule } from 'sanity'

async function isUnique(slug: string, context: any) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  const id = document._id.replace(/^drafts\./, '')
  const query = `!defined(*[_type == "lesson" && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`
  return client.fetch(query, {
    slug,
    draft: `drafts.${id}`,
    published: id,
  })
}

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique,
      },
      validation: (Rule: SlugRule) => Rule.required(),
    }),
    defineField({
      name: 'access',
      title: 'Access Level',
      type: 'string',
      options: {
        list: [
          { title: 'Free — publicly visible as preview', value: 'free' },
          { title: 'Enrolled — requires purchase', value: 'enrolled' },
        ],
        layout: 'radio',
      },
      initialValue: 'enrolled',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'lessonNumber',
      title: 'Lesson Number',
      type: 'string',
      description: 'Formatted lesson number (e.g., "1.1", "2.3", "4.12")',
      validation: (Rule: StringRule) =>
        Rule.regex(/^\d+\.\d+$/).warning('Should be in format "X.Y" (e.g., "1.1", "3.14")'),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Brief summary shown on course overview and lesson cards.',
      validation: (Rule: StringRule) => Rule.required().min(20),
    }),
    defineField({
      name: 'format',
      title: 'Lesson Format',
      type: 'string',
      options: {
        list: [
          { title: 'Concept + Animation', value: 'concept_animation' },
          { title: 'Concept + Case Studies', value: 'concept_case_studies' },
          { title: 'Concept + Practice', value: 'concept_practice' },
          { title: 'Concept + Scenarios', value: 'concept_scenarios' },
          { title: 'Concept + Role-Play', value: 'concept_role_play' },
          { title: 'Concept + Exercises', value: 'concept_exercises' },
          { title: 'Concept + Deep Dive', value: 'concept_deep_dive' },
          { title: 'Concept + Recording', value: 'concept_recording' },
          { title: 'Concept + Examples', value: 'concept_examples' },
          { title: 'Concept + Dance Video', value: 'concept_dance_video' },
          { title: 'Concept + Reflection', value: 'concept_reflection' },
          { title: 'Dance Video + Concept', value: 'dance_concept' },
          { title: 'Dance Video + Practice', value: 'dance_practice' },
          { title: 'Dance Video + Exercises', value: 'dance_exercises' },
          { title: 'Dance Video + Examples', value: 'dance_examples' },
          { title: 'Dance Video + Listening', value: 'dance_listening' },
          { title: 'Dance Video + Analysis', value: 'dance_analysis' },
          { title: 'Dance Video + Scenarios', value: 'dance_scenarios' },
          { title: 'Dance Video + Role-Play', value: 'dance_role_play' },
          { title: 'Dance Video + Speaking Drills', value: 'dance_speaking_drills' },
          { title: 'Dance Video + Breathwork', value: 'dance_breathwork' },
          { title: 'Dance Video + Journaling', value: 'dance_journaling' },
          { title: 'Dance Video + Storytelling', value: 'dance_storytelling' },
          { title: 'Dance Video + Group Concepts', value: 'dance_group_concepts' },
          { title: 'Dance Video + Group Theory', value: 'dance_group_theory' },
          { title: 'Dance Video + Exploration', value: 'dance_exploration' },
          { title: 'Dance Video + Planning', value: 'dance_planning' },
          { title: 'Dance Video + Vocal Practice', value: 'dance_vocal_practice' },
          { title: 'Dance Video + Team Concept', value: 'dance_team_concept' },
          { title: 'Animation + Research', value: 'animation_research' },
          { title: 'Animation + Trajectory Modeling', value: 'animation_trajectory' },
          { title: 'Research + Animation', value: 'research_animation' },
          { title: 'Research + Examples', value: 'research_examples' },
          { title: 'Framework + Examples', value: 'framework_examples' },
          { title: 'Framework + Practice', value: 'framework_practice' },
          { title: 'Assessment + Dance Video', value: 'assessment_dance_video' },
          { title: 'Assessment + Review', value: 'assessment_review' },
          { title: 'Assessment + Recording', value: 'assessment_recording' },
          { title: 'Assessment + Partner Exercise', value: 'assessment_partner' },
          { title: 'Assessment + Reflection', value: 'assessment_reflection' },
          { title: 'Practice + Recording', value: 'practice_recording' },
          { title: 'Practice + Examples', value: 'practice_examples' },
          { title: 'Practice + Feedback', value: 'practice_feedback' },
          { title: 'Full Practice Session', value: 'full_practice' },
          { title: 'Full Practice + Recording', value: 'full_practice_recording' },
          { title: 'Reflection + Journaling', value: 'reflection_journaling' },
          { title: 'Review + Comparison', value: 'review_comparison' },
          { title: 'Scenarios + Practice', value: 'scenarios_practice' },
          { title: 'Scenarios + Role-Play', value: 'scenarios_role_play' },
          { title: 'Case Studies + Examples', value: 'case_studies_examples' },
          { title: 'Writing + Recording', value: 'writing_recording' },
          { title: 'Planning + Accountability', value: 'planning_accountability' },
          { title: 'Full Recording Session', value: 'full_recording' },
          { title: 'Ethical Framework', value: 'ethical_framework' },
        ],
      },
      description: 'The primary format/delivery method for this lesson',
    }),
    defineField({
      name: 'emphasis',
      title: 'Emphasis Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Body Control', value: 'body_control' },
          { title: 'Active Listening', value: 'active_listening' },
          { title: 'Improvisation', value: 'improvisation' },
          { title: 'Reciprocation', value: 'reciprocation' },
          { title: 'Tonality & Presence', value: 'tonality_presence' },
          { title: 'All Pillars', value: 'all_pillars' },
        ],
      },
      description: 'The primary content emphasis pillar for this lesson',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      validation: (Rule: StringRule) =>
        Rule.regex(/^[a-zA-Z0-9_-]{11}$/).warning(
          'Should be an 11-character YouTube ID (e.g. "dQw4w9WgXcQ")'
        ),
      description: 'Just the ID — e.g. "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ',
    }),
    defineField({
      name: 'body',
      title: 'Lesson Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
      description: 'Main lesson body — the technical explanation and how to apply it.',
    }),
    defineField({
      name: 'socialLogic',
      title: 'Social Logic',
      type: 'text',
      description: 'How this movement/dance concept maps to executive presence and leadership.',
    }),
    defineField({
      name: 'technicalNotes',
      title: 'Technical Notes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'e.g. "Breathing Pattern", "Hand Position"',
          },
          {
            name: 'content',
            title: 'Content',
            type: 'text',
            description: 'Detailed explanation.',
          },
        ],
      }],
      description: 'Structured key points displayed below the video.',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      description: 'Video length in minutes.',
      validation: (Rule: NumberRule) => Rule.min(1).max(180),
    }),
    defineField({
      name: 'order',
      title: 'Lesson Order',
      type: 'number',
      description: 'Lower numbers appear first within a module.',
      validation: (Rule: NumberRule) => Rule.required().min(0),
    }),
    defineField({
      name: 'module',
      title: 'Parent Module',
      type: 'reference',
      to: [{ type: 'module' }],
      validation: (Rule: any) => Rule.required(),
      description: 'The module this lesson belongs to.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      access: 'access',
      duration: 'duration',
    },
    prepare(selection) {
      const { title, access, duration } = selection
      return {
        title,
        subtitle: `${access === 'free' ? 'Free preview' : 'Enrolled'} • ${duration ?? '?'} min`,
      }
    },
  },
})
