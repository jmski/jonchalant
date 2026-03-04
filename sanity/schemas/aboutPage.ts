import { defineType, defineField } from 'sanity';

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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
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
      name: 'phases',
      title: 'Three Phases',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'phase',
          fields: [
            defineField({
              name: '_key',
              type: 'string',
              hidden: true,
            }),
            defineField({
              name: 'title',
              title: 'Phase Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Phase Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ]
        }
      ],
      validation: (Rule) => Rule.length(3),
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
              name: '_key',
              type: 'string',
              hidden: true,
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
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
              name: '_key',
              type: 'string',
              hidden: true,
            }),
            defineField({
              name: 'title',
              title: 'Philosophy Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Philosophy Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
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
