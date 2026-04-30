import { defineType, defineField } from 'sanity'
import { CTA_HREF_DESCRIPTION } from '../lib/fieldDescriptions'

export default defineType({
  name: 'link',
  title: 'Link',
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
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
