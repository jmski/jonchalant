export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Case Study Title',
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
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
    },
    {
      name: 'results',
      title: 'Results Achieved',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'testimonial',
      title: 'Client Quote',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Featured Image',
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      media: 'image',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media,
      }
    },
  },
}
