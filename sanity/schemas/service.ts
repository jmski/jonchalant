import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service Offering',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
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
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon (SVG ID or emoji)',
      type: 'string',
      description: 'e.g., "coaching", "dance", "collab" (maps to SVG) or emoji',
    }),
    defineField({
      name: 'features',
      title: 'Features/Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isPrimary',
      title: 'Primary Service (Featured)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: ['accent', 'secondary'],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isPrimary: 'isPrimary',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.isPrimary ? '⭐ Primary Service' : 'Secondary Service',
      }
    },
  },
})
