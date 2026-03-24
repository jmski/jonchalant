import { defineField, defineType } from 'sanity';
import type { StringRule, ArrayRule } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'originSectionHeadline',
      title: 'Origin Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'originSectionDescription',
      title: 'Origin Section Description',
      type: 'text',
    }),
    defineField({
      name: 'turningPointHeadline',
      title: 'Turning Point — Section Label',
      description: 'Short label/eyebrow for the school performance story section',
      type: 'string',
    }),
    defineField({
      name: 'turningPointBody',
      title: 'Turning Point — Body Copy',
      description: 'Full narrative body for the turning point section (3 paragraphs)',
      type: 'text',
    }),
    defineField({
      name: 'methodologyHeadline',
      title: 'Methodology — Section Label',
      description: 'Short label/eyebrow for the freestyle/choreography section',
      type: 'string',
    }),
    defineField({
      name: 'methodologyBody',
      title: 'Methodology — Body Copy',
      description: 'Full narrative body for the methodology section',
      type: 'text',
    }),
    defineField({
      name: 'whyExistsHeadline',
      title: 'Why This Exists — Section Label',
      type: 'string',
    }),
    defineField({
      name: 'whyExistsBody',
      title: 'Why This Exists — Body Copy',
      type: 'text',
    }),
    defineField({
      name: 'whoForHeadline',
      title: 'Who This Is For — Section Label',
      type: 'string',
    }),
    defineField({
      name: 'whoForBody',
      title: 'Who This Is For — Body Copy',
      type: 'text',
    }),
    defineField({
      name: 'closingHeadline',
      title: 'Closing — Section Label / CTA Headline',
      type: 'string',
    }),
    defineField({
      name: 'closingBody',
      title: 'Closing — Body Copy',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'phases',
      title: 'Three Phases',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'phase',
          fields: [
            defineField({
              name: 'title',
              title: 'Phase Title',
              type: 'string',
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Phase Description',
              type: 'text',
              validation: (Rule: StringRule) => Rule.required(),
            }),
          ]
        }
      ],
      validation: (Rule: ArrayRule<unknown>) => Rule.length(3),
    }),
    defineField({
      name: 'stats',
      title: 'Key Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule: StringRule) => Rule.required(),
            }),
          ]
        }
      ],
    }),
    defineField({
      name: 'philosophies',
      title: 'My Philosophy (How I Work)',
      description: 'Three core principles guiding the coaching approach',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'philosophy',
          fields: [
            defineField({
              name: 'title',
              title: 'Philosophy Title',
              type: 'string',
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Philosophy Description',
              type: 'text',
              validation: (Rule: StringRule) => Rule.required(),
            }),
          ]
        }
      ],
    }),
    defineField({
      name: 'introvertTraits',
      title: 'Introvert Traits / Superpowers',
      description: 'List of trait names representing introvert strengths',
      type: 'array',
      of: [
        {
          type: 'string',
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroHeadline'
    }
  }
});
