import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'danceCategory',
  title: 'Dance Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leadershipPrinciple',
      title: 'Leadership Principle',
      type: 'string',
      description: 'One-line description of the leadership principle this category teaches, e.g. "How stillness communicates authority"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: '2–3 sentence description of the category',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional emoji or icon identifier',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'video',
          title: 'Video',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube or Vimeo URL',
              validation: (Rule) => Rule.required(),
            }),
            // Duration in minutes — display formatting handled in components
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'number',
              description: 'Duration in minutes',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              description: 'Optional description',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'duration',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'leadershipPrinciple',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? 'Untitled Category',
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
