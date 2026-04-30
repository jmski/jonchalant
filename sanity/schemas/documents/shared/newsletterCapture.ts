import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION, HEADLINE_DESCRIPTION } from '../../lib/fieldDescriptions'
import { headlineValidation } from '../../lib/headlineValidation'

export default defineType({
  name: 'newsletterCapture',
  title: 'Newsletter capture (Tuesdays)',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email field label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email placeholder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit button label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'microcopy',
      title: 'Microcopy',
      type: 'string',
      description: 'Text below the form (e.g. "Unsubscribe in one click. No tricks.")',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Newsletter capture (Tuesdays)' }),
  },
})
