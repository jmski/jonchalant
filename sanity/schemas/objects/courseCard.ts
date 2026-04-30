import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION } from '../lib/fieldDescriptions'

export default defineType({
  name: 'courseCard',
  title: 'Course Card',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: BODY_DESCRIPTION,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short pieces of meta — e.g. "12 lessons", "Free", "~2 hours".',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'cta',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'tagline' },
  },
})
