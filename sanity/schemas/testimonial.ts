export default {
  name: 'testimonial',
  title: 'Client Testimonial',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., "VP of Sales", "Executive Director"',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'result',
      title: 'Measurable Result',
      type: 'string',
      description: 'e.g., "87% increased confidence in 8 weeks"',
    },
    {
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      title: 'Featured on Home Page?',
      type: 'boolean',
      default: false,
    },
    {
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Leadership Coaching', value: 'coaching' },
          { title: 'Corporate Workshop', value: 'workshop' },
          { title: 'Movement Coaching', value: 'movement' },
        ],
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
      title: 'clientName',
      subtitle: 'company',
      featured: 'featured',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
      }
    },
  },
}
