import { defineType, defineField } from 'sanity'
import type { StringRule, SlugRule } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      validation: (Rule: SlugRule) => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar/Keyword',
      type: 'string',
      description: 'Primary keyword/pillar this post targets',
      options: {
        list: [
          { title: 'Executive Presence', value: 'executive-presence' },
          { title: 'Quiet Command', value: 'quiet-command' },
          { title: 'Leadership Coaching for Introverts', value: 'leadership-coaching-introverts' },
          { title: 'Confidence Coaching', value: 'confidence-coaching' },
          { title: 'Professional Presence', value: 'professional-presence' },
          { title: 'Body Language Leadership', value: 'body-language-leadership' },
        ],
      },
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      description: 'SEO meta description (150-160 chars)',
      validation: (Rule: StringRule) => Rule.max(160),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary for listing pages',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers and SEO',
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show on homepage/featured section',
      initialValue: false,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'CTA URL',
          type: 'string',
        }),
      ],
    }),
  ],
})
