import { defineType, defineField, defineArrayMember } from 'sanity'
import { BODY_DESCRIPTION, HEADLINE_DESCRIPTION } from '../../lib/fieldDescriptions'
import { headlineValidation } from '../../lib/headlineValidation'

export default defineType({
  name: 'pageAbout',
  title: 'About page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'storyScroll', title: 'Story scroll (beats)', options: { collapsible: true, collapsed: false } },
    { name: 'whoFor', title: 'Who this is for', options: { collapsible: true, collapsed: false } },
    { name: 'cta', title: 'Closing CTA', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero (no CTA)',
      type: 'hero',
      fieldset: 'hero',
      description: 'About hero has no CTA — leave primaryCta and secondaryCta empty.',
    }),

    defineField({
      name: 'storyBeats',
      title: 'Story beats',
      type: 'array',
      fieldset: 'storyScroll',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'storyBeat',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
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
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'bodyParagraph2',
              title: 'Body paragraph 2 (optional)',
              type: 'text',
              rows: 4,
              description: `Used by beat 3 which has two paragraphs. ${BODY_DESCRIPTION}`,
            }),
            defineField({
              name: 'payoffLine',
              title: 'Payoff line (optional)',
              type: 'text',
              rows: 2,
              description: `Beat 3 only — slightly larger body text. ${BODY_DESCRIPTION}`,
            }),
          ],
          preview: { select: { title: 'headline', media: 'image' } },
        }),
      ],
      validation: (R) => R.required().min(3).max(4),
    }),

    defineField({
      name: 'whoFor',
      title: 'Who this is for',
      type: 'object',
      fieldset: 'whoFor',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
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
          rows: 5,
          description: BODY_DESCRIPTION,
          validation: (R) => R.required(),
        }),
      ],
    }),

    defineField({
      name: 'cta',
      title: 'Closing CTA',
      type: 'ctaBlock',
      fieldset: 'cta',
    }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
})
