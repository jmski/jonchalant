import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'programsPageContent',
  title: 'Programs Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Programs',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Main Headline',
      type: 'string',
      description: 'Large headline for the page',
      example: 'Choose Your Path to Quiet Command',
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Subheading or descriptive text below the main headline',
    }),
    defineField({
      name: 'programFocusItems',
      title: 'Program Focus Areas / The Three Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'focusItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: 'icon',
              title: 'Icon / Emoji',
              type: 'string',
              example: '🧭',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
            }),
          ],
        },
      ],
      description: 'The core pillars or focus areas of the program methodology',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
