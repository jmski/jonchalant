import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'instagramReel',
  title: 'Instagram Reel',
  type: 'document',
  fields: [
    defineField({
      name: 'reelUrl',
      title: 'Reel URL',
      type: 'url',
      description: 'Direct Instagram reel URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      subtitle: 'reelUrl',
      order: 'order',
    },
    prepare({ subtitle, order }) {
      return {
        title: `Reel #${order ?? '?'}`,
        subtitle: subtitle ?? '',
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
