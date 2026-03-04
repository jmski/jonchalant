import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Client Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., "VP of Sales", "Executive Director"',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'result',
      title: 'Measurable Result',
      type: 'string',
      description: 'e.g., "87% increased confidence in 8 weeks"',
    }),
    defineField({
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Home Page?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
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
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
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
})
