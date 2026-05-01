import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION, HEADLINE_DESCRIPTION } from '../lib/fieldDescriptions'
import { headlineValidation } from '../lib/headlineValidation'

export default defineType({
  name: 'hero',
  title: 'Hero',
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
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'cta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'cta' }),
    defineField({ name: 'microcopy', title: 'Microcopy', type: 'string' }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow' },
  },
})
