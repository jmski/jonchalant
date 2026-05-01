import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION, HEADLINE_DESCRIPTION } from '../../lib/fieldDescriptions'
import { headlineValidation } from '../../lib/headlineValidation'

export default defineType({
  name: 'auditCta',
  title: 'Audit CTA block',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: HEADLINE_DESCRIPTION,
      validation: headlineValidation,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description: BODY_DESCRIPTION,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'cta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'microcopy',
      title: 'Microcopy',
      type: 'string',
      description: 'Text below the CTA.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Audit CTA block' }),
  },
})
