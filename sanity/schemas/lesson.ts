// Unified lesson schema — covers both free preview and enrolled (gated) content.
// access: 'free' → publicly visible on /program/preview
// access: 'enrolled' → only accessible inside /portal after payment
import { defineType, defineField } from 'sanity'
import type { StringRule, NumberRule, SlugRule } from 'sanity'

async function isUnique(slug: string, context: any) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  const id = document._id.replace(/^drafts\./, '')
  const query = `!defined(*[_type == "lesson" && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`
  return client.fetch(query, {
    slug,
    draft: `drafts.${id}`,
    published: id,
  })
}

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required().min(3).max(100),
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
      validation: (Rule: SlugRule) => Rule.required(),
    }),
    defineField({
      name: 'access',
      title: 'Access Level',
      type: 'string',
      options: {
        list: [
          { title: 'Free — publicly visible as preview', value: 'free' },
          { title: 'Enrolled — requires purchase', value: 'enrolled' },
        ],
        layout: 'radio',
      },
      initialValue: 'enrolled',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Brief summary shown on course overview and lesson cards.',
      validation: (Rule: StringRule) => Rule.required().min(20),
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      validation: (Rule: StringRule) =>
        Rule.regex(/^[a-zA-Z0-9_-]{11}$/).warning(
          'Should be an 11-character YouTube ID (e.g. "dQw4w9WgXcQ")'
        ),
      description: 'Just the ID — e.g. "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ',
    }),
    defineField({
      name: 'body',
      title: 'Lesson Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
      description: 'Main lesson body — the technical explanation and how to apply it.',
    }),
    defineField({
      name: 'socialLogic',
      title: 'Social Logic',
      type: 'text',
      description: 'How this movement/dance concept maps to executive presence and leadership.',
    }),
    defineField({
      name: 'technicalNotes',
      title: 'Technical Notes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'e.g. "Breathing Pattern", "Hand Position"',
          },
          {
            name: 'content',
            title: 'Content',
            type: 'text',
            description: 'Detailed explanation.',
          },
        ],
      }],
      description: 'Structured key points displayed below the video.',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      description: 'Video length in minutes.',
      validation: (Rule: NumberRule) => Rule.min(1).max(180),
    }),
    defineField({
      name: 'order',
      title: 'Lesson Order',
      type: 'number',
      description: 'Lower numbers appear first within a module.',
      validation: (Rule: NumberRule) => Rule.required().min(0),
    }),
    defineField({
      name: 'module',
      title: 'Parent Module',
      type: 'reference',
      to: [{ type: 'module' }],
      validation: (Rule: any) => Rule.required(),
      description: 'The module this lesson belongs to.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      access: 'access',
      duration: 'duration',
    },
    prepare(selection) {
      const { title, access, duration } = selection
      return {
        title,
        subtitle: `${access === 'free' ? 'Free preview' : 'Enrolled'} • ${duration ?? '?'} min`,
      }
    },
  },
})
