import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION, HEADLINE_DESCRIPTION } from '../../lib/fieldDescriptions'
import { headlineValidation } from '../../lib/headlineValidation'

const SHARED_REF_DESC = (name: string) =>
  `References the singleton ${name}. Edit content there, not here.`

const bandFields = [
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
    validation: (R) => R.required(),
  }),
  defineField({
    name: 'primaryCta',
    title: 'Primary CTA',
    type: 'cta',
    validation: (R) => R.required(),
  }),
  defineField({
    name: 'secondaryCta',
    title: 'Secondary CTA',
    type: 'cta',
  }),
]

export default defineType({
  name: 'pageAudit',
  title: 'Audit page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'midQuizEncouragement', title: 'Mid-quiz encouragement', options: { collapsible: true, collapsed: false } },
    { name: 'resultBands', title: 'Result bands', options: { collapsible: true, collapsed: false } },
    { name: 'starterGuide', title: 'Foundation Starter Guide', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'hero', fieldset: 'hero' }),
    defineField({
      name: 'heroMicrocopy',
      title: 'Hero microcopy',
      type: 'string',
      fieldset: 'hero',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'midQuizEncouragement',
      title: 'Mid-quiz encouragement',
      type: 'object',
      fieldset: 'midQuizEncouragement',
      fields: [
        defineField({
          name: 'line',
          title: 'Line',
          type: 'string',
          validation: (R) => R.required(),
        }),
      ],
    }),

    defineField({
      name: 'resultBands',
      title: 'Result bands',
      type: 'object',
      fieldset: 'resultBands',
      fields: [
        defineField({ name: 'low', title: 'Low band', type: 'object', fields: bandFields }),
        defineField({ name: 'mid', title: 'Mid band', type: 'object', fields: bandFields }),
        defineField({ name: 'high', title: 'High band', type: 'object', fields: bandFields }),
      ],
    }),

    defineField({
      name: 'starterGuide',
      title: 'Foundation Starter Guide capture',
      type: 'reference',
      fieldset: 'starterGuide',
      to: [{ type: 'starterGuideCapture' }],
      description: SHARED_REF_DESC('starterGuideCapture'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Audit page' }) },
})
