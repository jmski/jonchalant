export default {
  name: 'collaboration',
  title: 'Collaboration / Service Offering',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Collaboration Title',
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
          { title: 'Leadership Coaching', value: 'leadership-coaching' },
          { title: 'Organization/Employee Development', value: 'organizations' },
          { title: 'Speaking / Media', value: 'speaking' },
          { title: 'Brand Content & Choreography', value: 'brand-content' },
          { title: 'Custom Partnerships', value: 'custom' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price / Pricing Model',
      type: 'string',
      description: 'e.g., "Custom Quote", "$2,000-$5,000 per session"',
    },
    {
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'timelineWeeks',
      title: 'Typical Timeline (weeks)',
      type: 'number',
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
      category: 'category',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.category,
      }
    },
  },
}
