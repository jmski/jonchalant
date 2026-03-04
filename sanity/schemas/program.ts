export default {
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'investment',
      title: 'Investment/Price',
      type: 'string',
      description: 'e.g., "$1,500" or "Custom Quote"',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of program features and deliverables',
    },
    {
      name: 'image',
      title: 'Program Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
}
