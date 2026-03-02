export default {
  name: 'portfolioItem',
  title: 'Portfolio Item',
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
          { title: 'Choreography', value: 'choreography' },
          { title: 'Freestyle', value: 'freestyle' },
          { title: 'Performance', value: 'performance' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'videoUrl',
      title: 'YouTube/Vimeo Embed URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
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
}
