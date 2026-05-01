import { defineType, defineField } from 'sanity'
import { CTA_HREF_DESCRIPTION } from '../lib/fieldDescriptions'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: CTA_HREF_DESCRIPTION,
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'Link is required.'
          if (value.startsWith('/') || /^https?:\/\//.test(value)) return true
          return 'Link must start with / (internal) or http(s):// (external).'
        }),
    }),
    defineField({
      name: 'ariaLabel',
      title: 'Aria Label',
      type: 'string',
      description: 'Optional accessible label if the visible label is ambiguous.',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
