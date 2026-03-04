import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Choreography', value: 'choreography' },
          { title: 'Freestyle', value: 'freestyle' },
          { title: 'Performance', value: 'performance' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube/Vimeo Embed URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Dance Page Hero',
      type: 'boolean',
      description: 'Mark as featured to showcase this piece in the dance page hero section',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.category,
        media: selection.media,
      }
    },
  },
})
