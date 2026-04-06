import { defineType, defineField } from 'sanity'

async function isUnique(slug: string, context: any) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  const id = document._id.replace(/^drafts\./, '')
  const query = `!defined(*[_type == "course" && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`
  return client.fetch(query, {
    slug,
    draft: `drafts.${id}`,
    published: id,
  })
}

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'philosophy',
      title: 'Course Philosophy',
      type: 'text',
      rows: 4,
      description: 'The guiding philosophy behind the course',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'text',
      rows: 2,
      description: 'Who this course is designed for',
    }),
    defineField({
      name: 'totalEstimatedHours',
      title: 'Total Estimated Hours',
      type: 'number',
      description: 'Approximate total content hours (e.g., 213)',
    }),
    defineField({
      name: 'contentPillars',
      title: 'Content Emphasis Pillars',
      type: 'array',
      description: 'Core themes woven throughout every module',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Pillar Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'name' },
          },
        },
      ],
    }),
    defineField({
      name: 'lessonStructure',
      title: 'Standard Lesson Structure',
      type: 'array',
      description: 'The repeatable 5-part lesson format',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'number' }),
            defineField({ name: 'name', title: 'Step Name', type: 'string' }),
            defineField({ name: 'durationRange', title: 'Duration Range', type: 'string', description: 'e.g. "10–15 min"' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'durationRange' },
          },
        },
      ],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers',
        }),
      ],
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration',
      type: 'string',
      description: 'e.g. "4 hours", "6–8 hours"',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Course',
      type: 'boolean',
      initialValue: false,
      description: 'Surface this course in featured listings',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'module' }],
        },
      ],
      description: 'Ordered list of modules that make up this course',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      difficulty: 'difficulty',
      media: 'thumbnail',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.difficulty ?? 'No difficulty set',
        media: selection.media,
      }
    },
  },
})
