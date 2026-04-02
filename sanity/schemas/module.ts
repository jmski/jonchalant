import { defineType, defineField } from 'sanity'

async function isUnique(slug: string, context: any) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  const id = document._id.replace(/^\/drafts\./, '')
  const query = `!defined(*[_type == "module" && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`
  return client.fetch(query, {
    slug,
    draft: `drafts.${id}`,
    published: id,
  })
}

export default defineType({
  name: 'module',
  title: 'Module (Learning Portal)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Module Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(100),
      description: 'e.g., "Foundation: Physical Grounding"',
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
      title: 'Module Description',
      type: 'text',
      description: 'Brief overview of what this module covers',
    }),
    defineField({
      name: 'order',
      title: 'Module Order',
      type: 'number',
      description: 'Lower numbers appear first in the portal',
      validation: (Rule: any) => Rule.required().min(0),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
      description: 'Emoji to represent this module (e.g., 🎯)',
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons in This Module',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'lesson' }],
      }],
      description: 'Add lesson references to build out the module curriculum',
    }),
    defineField({
      name: 'course',
      title: 'Parent Course',
      type: 'reference',
      to: [{ type: 'course' }],
      validation: (Rule: any) => Rule.required(),
      description: 'The course this module belongs to',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare(selection) {
      const { title, order } = selection
      return {
        title: title,
        subtitle: `Module ${order || '?'}`,
      }
    },
  },
})
