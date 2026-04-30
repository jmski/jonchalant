import { defineType, defineField, defineArrayMember } from 'sanity'
import { BODY_DESCRIPTION } from '../../lib/fieldDescriptions'

export default defineType({
  name: 'pageContact',
  title: 'Contact page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'inquiryCards', title: 'Inquiry cards', options: { collapsible: true, collapsed: false } },
    { name: 'whatHappensNext', title: 'What happens next', options: { collapsible: true, collapsed: false } },
    { name: 'thingsWorthKnowing', title: 'Things worth knowing', options: { collapsible: true, collapsed: false } },
    { name: 'emailFallback', title: 'Email fallback', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'hero', fieldset: 'hero' }),

    defineField({
      name: 'inquiryCards',
      title: 'Inquiry cards',
      type: 'array',
      fieldset: 'inquiryCards',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'inquiryCard',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
              description: BODY_DESCRIPTION,
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'inquiryType',
              title: 'Inquiry type',
              type: 'string',
              options: {
                list: [
                  { title: '1-on-1', value: 'oneOnOne' },
                  { title: 'General', value: 'general' },
                ],
                layout: 'radio',
              },
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: 'eyebrow', subtitle: 'inquiryType' } },
        }),
      ],
      validation: (R) => R.required().length(2),
    }),

    defineField({
      name: 'whatHappensNextHeader',
      title: 'Header',
      type: 'string',
      fieldset: 'whatHappensNext',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'whatHappensNextSteps',
      title: 'Steps',
      type: 'array',
      fieldset: 'whatHappensNext',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'whatHappensNextStep',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
              description: BODY_DESCRIPTION,
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
      validation: (R) => R.required().length(3),
    }),

    defineField({
      name: 'thingsWorthKnowingHeader',
      title: 'Header',
      type: 'string',
      fieldset: 'thingsWorthKnowing',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'thingsWorthKnowingItems',
      title: 'Items',
      type: 'array',
      fieldset: 'thingsWorthKnowing',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'thingsWorthKnowingItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
              description: BODY_DESCRIPTION,
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
      validation: (R) => R.required().min(1),
    }),

    defineField({
      name: 'emailFallback',
      title: 'Email fallback',
      type: 'object',
      fieldset: 'emailFallback',
      fields: [
        defineField({
          name: 'bodyLine',
          title: 'Body line',
          type: 'text',
          rows: 2,
          description: BODY_DESCRIPTION,
          validation: (R) => R.required(),
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
})
