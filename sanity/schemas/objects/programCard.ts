import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION } from '../lib/fieldDescriptions'

export default defineType({
  name: 'programCard',
  title: 'Program Card',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceLine',
      title: 'Price Line',
      type: 'string',
      description: 'E.g. "$197 one-time" or "$497 / 3 months".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: BODY_DESCRIPTION,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'cta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Optional small label, e.g. "Most popular".',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'priceLine' },
  },
})
