import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'programTrack',
  title: 'Program Track',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "8-Week Leadership Program"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'Small label above the title, e.g., "01 / Signature Offering"',
    }),
    defineField({
      name: 'trackType',
      title: 'Track Type',
      type: 'string',
      options: {
        list: [
          { title: 'Leadership Program', value: 'leadership' },
          { title: 'Movement Coaching', value: 'movement' },
          { title: 'Brand Collaboration', value: 'collaboration' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Main narrative paragraph shown on the left column.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'includes',
      title: "What's Included",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'includeItem',
          fields: [
            defineField({
              name: 'text',
              title: 'Item',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'text' },
          },
        },
      ],
      description: 'Checklist of deliverables and inclusions.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'audience',
      title: 'Who It\'s For',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'audienceItem',
          fields: [
            defineField({
              name: 'text',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'text' },
          },
        },
      ],
      description: 'Bullet points describing the ideal client for this track.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Label',
      type: 'string',
      description: 'e.g., "Book a Discovery Call"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Button Link',
      type: 'string',
      description: 'e.g., "/contact" or "/media-kit"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use 1, 2, 3.',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      order: 'order',
    },
    prepare(selection) {
      const { title, eyebrow, order } = selection;
      return {
        title: title,
        subtitle: eyebrow || `Track ${order}`,
      };
    },
  },
});
