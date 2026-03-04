import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'serviceCategory',
  title: 'Service Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Service Categories',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Service Categories',
      description: 'List of collaboration/partnership categories with service items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'category',
          fields: [
            defineField({
              name: '_key',
              type: 'string',
              hidden: true,
            }),
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Service Items',
              description: 'List of services within this category',
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
