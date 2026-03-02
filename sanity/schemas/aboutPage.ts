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
        defineField({
          type: 'object',
          fields: [
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
        })
      ],
      validation: (Rule) => Rule.length(3),
    }),
    defineField({
      name: 'stats',
      title: 'Key Stats',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
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
        })
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
