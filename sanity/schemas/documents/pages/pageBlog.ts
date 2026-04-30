import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION } from '../../lib/fieldDescriptions'

const SHARED_REF_DESC = (name: string) =>
  `References the singleton ${name}. Edit content there, not here.`

const FILTER_PILLS_NOTE =
  'Filter pill labels are derived from post tags. To change a pill label, rename the corresponding tag on posts.'

const POSTS_LIST_NOTE =
  'Blog posts come from the post document type. To add or edit posts, use the Posts section in the sidebar.'

export default defineType({
  name: 'pageBlog',
  title: 'Blog page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    {
      name: 'filterPillsNote',
      title: 'Filter pills (managed via tags)',
      description: FILTER_PILLS_NOTE,
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'postsListNote',
      title: 'Posts list (managed via Posts)',
      description: POSTS_LIST_NOTE,
      options: { collapsible: true, collapsed: false },
    },
    { name: 'newsletter', title: 'Newsletter', options: { collapsible: true, collapsed: false } },
    { name: 'auditCta', title: 'Audit CTA', options: { collapsible: true, collapsed: false } },
    { name: 'emptyState', title: 'Empty state', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'hero', fieldset: 'hero' }),

    defineField({
      name: 'filterPillsNote',
      title: 'Filter pills (read-only note)',
      type: 'text',
      fieldset: 'filterPillsNote',
      readOnly: true,
      initialValue: FILTER_PILLS_NOTE,
      description: FILTER_PILLS_NOTE,
    }),

    defineField({
      name: 'postsListNote',
      title: 'Posts list (read-only note)',
      type: 'text',
      fieldset: 'postsListNote',
      readOnly: true,
      initialValue: POSTS_LIST_NOTE,
      description: POSTS_LIST_NOTE,
    }),

    defineField({
      name: 'newsletter',
      title: 'Newsletter capture',
      type: 'reference',
      fieldset: 'newsletter',
      to: [{ type: 'newsletterCapture' }],
      description: SHARED_REF_DESC('newsletterCapture'),
    }),

    defineField({
      name: 'auditCta',
      title: 'Audit CTA',
      type: 'reference',
      fieldset: 'auditCta',
      to: [{ type: 'auditCta' }],
      description: SHARED_REF_DESC('auditCta'),
    }),

    defineField({
      name: 'emptyState',
      title: 'Empty state (no filter results)',
      type: 'object',
      fieldset: 'emptyState',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 3,
          description: BODY_DESCRIPTION,
          validation: (R) => R.required(),
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Blog page' }) },
})
