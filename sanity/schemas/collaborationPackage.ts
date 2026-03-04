import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'collaborationPackage',
  title: 'Collaboration Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Collaboration Packages',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'packages',
      title: 'Collaboration Packages',
      description: 'Available partnership and collaboration packages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'package',
          fields: [
            defineField({
              name: '_key',
              type: 'string',
              hidden: true,
            }),
            defineField({
              name: 'name',
              title: 'Package Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'features',
              title: 'Features',
              description: 'List of features included in this package',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ]
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
});
