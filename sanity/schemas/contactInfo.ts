import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Contact Information',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contactMethod',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Email', value: 'Email' },
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'TikTok', value: 'TikTok' },
                  { title: 'Twitter', value: 'Twitter' },
                  { title: 'LinkedIn', value: 'LinkedIn' },
                  { title: 'YouTube', value: 'YouTube' },
                  { title: 'Phone', value: 'Phone' },
                  { title: 'Other', value: 'Other' },
                ]
              }
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'Email address, handle, phone number, etc.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'Full URL or mailto/tel link (e.g., mailto:email@example.com, https://instagram.com/handle)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Brief description of what this contact method is for',
              example: 'Send me a detailed message about your project or inquiry.',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
            }),
          ]
        }
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
});
