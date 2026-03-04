export default {
  name: 'lesson',
  title: 'Lesson',
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
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
      },
    },
    {
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Physical Grounding', value: 'Physical Grounding' },
          { title: 'Social Scripting', value: 'Social Scripting' },
          { title: 'Energy Mastery', value: 'Energy Mastery' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "8 min read" or "12 min read"',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
      description: 'Emoji icon for the lesson',
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
