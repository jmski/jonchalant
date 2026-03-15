import { defineType, defineField } from 'sanity'

async function isUnique(slug: string, context: any) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  const id = document._id.replace(/^drafts\./, '')
  const query = `!defined(*[_type == "course" && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`
  return client.fetch(query, {
    slug,
    draft: `drafts.${id}`,
    published: id,
  })
}

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
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
        isUnique,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers',
        }),
      ],
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration',
      type: 'string',
      description: 'e.g. "4 hours", "6–8 hours"',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Course',
      type: 'boolean',
      initialValue: false,
      description: 'Surface this course in featured listings',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'module' }],
        },
      ],
      description: 'Ordered list of modules that make up this course',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      difficulty: 'difficulty',
      media: 'thumbnail',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.difficulty ?? 'No difficulty set',
        media: selection.media,
      }
    },
  },
})
