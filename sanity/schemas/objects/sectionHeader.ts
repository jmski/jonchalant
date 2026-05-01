import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION, HEADLINE_DESCRIPTION } from '../lib/fieldDescriptions'
import { headlineValidation } from '../lib/headlineValidation'

export default defineType({
  name: 'sectionHeader',
  title: 'Section Header',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: HEADLINE_DESCRIPTION,
      validation: headlineValidation,
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'text',
      rows: 3,
      description: BODY_DESCRIPTION,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
      description: BODY_DESCRIPTION,
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow' },
  },
})
