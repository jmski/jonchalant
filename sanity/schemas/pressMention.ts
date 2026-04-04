import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pressMention',
  title: 'Press Mention',
  type: 'document',
  fields: [
    defineField({
      name: 'outlet',
      title: 'Outlet / Publication Name',
      type: 'string',
      description: 'e.g., "Forbes", "The Leadership Podcast", "Inc."',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Mention Type',
      type: 'string',
      options: {
        list: [
          { title: 'Podcast Feature', value: 'podcast' },
          { title: 'Article / Publication', value: 'article' },
          { title: 'Speaking Appearance', value: 'speaking' },
          { title: 'Quote / Citation', value: 'quote' },
        ],
      },
      initialValue: 'podcast',
    }),
    defineField({
      name: 'url',
      title: 'Link (optional)',
      type: 'url',
      description: 'Direct link to the podcast episode, article, or appearance.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo (optional)',
      type: 'image',
      description: 'Outlet logo for display in the press strip. Use a square or horizontal lockup.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'outlet',
      subtitle: 'type',
    },
  },
})
