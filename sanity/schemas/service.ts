export default {
  name: 'service',
  title: 'Service Offering',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'icon',
      title: 'Icon (SVG ID or emoji)',
      type: 'string',
      description: 'e.g., "coaching", "dance", "collab" (maps to SVG) or emoji',
    },
    {
      name: 'features',
      title: 'Features/Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isPrimary',
      title: 'Primary Service (Featured)',
      type: 'boolean',
      default: false,
    },
    {
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: ['accent', 'secondary'],
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
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
}
