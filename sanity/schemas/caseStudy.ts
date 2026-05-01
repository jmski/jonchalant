import { defineType, defineField } from 'sanity'
import type { StringRule, SlugRule } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Case Study Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
    }),
    defineField({
      name: 'results',
      title: 'Results Achieved',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Quote',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Home Page?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      clientName: 'clientName',
      title: 'title',
      challenge: 'challenge',
      industry: 'industry',
      media: 'image',
    },
    prepare({
      clientName,
      title,
      challenge,
      industry,
      media,
    }: {
      clientName?: string
      title?: string
      challenge?: string
      industry?: string
      media?: unknown
    }) {
      const summary = (challenge ?? industry ?? '').trim()
      const subtitle = summary
        ? summary.length > 60
          ? `${summary.slice(0, 60)}…`
          : summary
        : 'No summary'
      return {
        title: clientName || title || 'Untitled',
        subtitle,
        media,
      }
    },
  },
})
