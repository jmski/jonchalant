import { defineType, defineField } from 'sanity'
import type { StringRule, NumberRule, SlugRule } from 'sanity'

async function isUnique(slug: string, context: any) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  const id = document._id.replace(/^drafts\./, '')
  const query = `!defined(*[_type == "courseLesson" && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`
  return client.fetch(query, {
    slug,
    draft: `drafts.${id}`,
    published: id,
  })
}

// courseLesson — used by flat courses (e.g. Four Circles) that attach lessons
// directly to a course document rather than grouping them through modules.
// Distinct from the existing `lesson` schema, which requires a module reference
// and is scoped to video-based dance/Foundation content.
export default defineType({
  name: 'courseLesson',
  title: 'Course Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required().min(3).max(120),
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
      name: 'lessonNumber',
      title: 'Lesson Number',
      type: 'number',
      description: 'Sequential position in the course (1-based)',
      validation: (Rule: NumberRule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: 'difficultyTier',
      title: 'Difficulty Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Basic', value: 'basic' },
          { title: 'Challenging', value: 'challenging' },
          { title: 'Hardest', value: 'hardest' },
        ],
        layout: 'radio',
      },
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'ikigaiQuadrants',
      title: 'Ikigai Quadrants',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Passion', value: 'passion' },
          { title: 'Mission', value: 'mission' },
          { title: 'Vocation', value: 'vocation' },
          { title: 'Profession', value: 'profession' },
        ],
      },
      description: 'Which quadrant(s) this lesson is about — used for personalisation',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. "Three circles, missing Mission"',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short description shown on the course landing page curriculum list',
      validation: (Rule: StringRule) => Rule.required().min(20),
    }),
    defineField({
      name: 'content',
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
      description: 'The main lesson body — leave empty until content is written',
    }),
    defineField({
      name: 'reflectionPrompt',
      title: 'Reflection Prompt',
      type: 'text',
      rows: 3,
      description: 'The reflection question shown at the end of the lesson',
    }),
    defineField({
      name: 'tryThisWeek',
      title: 'Try This Week',
      type: 'text',
      rows: 3,
      description: 'One specific thing to try — shown at the end of the lesson',
    }),
    defineField({
      name: 'estimatedMinutes',
      title: 'Estimated Minutes',
      type: 'number',
      initialValue: 15,
      validation: (Rule: NumberRule) => Rule.min(1).max(120),
      description: 'Approximate reading/reflection time in minutes',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lessonNumber: 'lessonNumber',
      difficultyTier: 'difficultyTier',
    },
    prepare(selection: any) {
      const { title, lessonNumber, difficultyTier } = selection
      return {
        title: `${lessonNumber ? `${lessonNumber}. ` : ''}${title}`,
        subtitle: difficultyTier ?? 'No tier set',
      }
    },
  },
})
