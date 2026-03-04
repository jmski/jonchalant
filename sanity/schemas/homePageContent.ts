import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePageContent',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Key Statistics',
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
      name: 'impactSectionHeadline',
      title: 'Impact Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'featuredMainTitle',
      title: 'Featured Main Area Title',
      type: 'string',
    }),
    defineField({
      name: 'featuredMainDescription',
      title: 'Featured Main Area Description',
      type: 'text',
    }),
    defineField({
      name: 'sidebarFeatures',
      title: 'Sidebar Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sidebarFeature',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ]
        }
      ],
    }),
    defineField({
      name: 'servicesHeadline',
      title: 'Services Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Services Section Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
});
