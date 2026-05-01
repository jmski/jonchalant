import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION } from '../lib/fieldDescriptions'

export default defineType({
  name: 'pillarCard',
  title: 'Pillar Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description: BODY_DESCRIPTION,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'body' },
  },
})
