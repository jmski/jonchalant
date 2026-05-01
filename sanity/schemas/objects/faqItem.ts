import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION } from '../lib/fieldDescriptions'

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: BODY_DESCRIPTION,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'answer' },
  },
})
