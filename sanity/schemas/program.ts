import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Premium 1-on-1 Coaching', value: 'Premium 1-on-1 Coaching' },
          { title: 'Group Training', value: 'Group Training (6 weeks)' },
          { title: 'Self-Paced Digital Course', value: 'Self-Paced Digital Course' },
          { title: 'High-Stakes Preparation', value: 'High-Stakes Preparation' },
          { title: 'Organization Custom', value: 'Organization Custom' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'investment',
      title: 'Investment/Price',
      type: 'string',
      description: 'e.g., "$1,500" or "Custom Quote"',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of program features and deliverables',
    }),
    defineField({
      name: 'image',
      title: 'Program Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
})
