import { defineType, defineField } from 'sanity'
import { BODY_DESCRIPTION, HEADLINE_DESCRIPTION } from '../../lib/fieldDescriptions'

const SHARED_REF_DESC = (name: string) =>
  `References the singleton ${name}. Edit content there, not here.`

const FILTER_PILLS_NOTE =
  'Filter pill labels are derived from post tags. To change a pill label, rename the corresponding tag on posts.'

const POSTS_LIST_NOTE =
  'Blog posts come from the post document type. To add or edit posts, use the Posts section in the sidebar.'

const FEATURED_SERIES_DESC =
  'Optional featured series banner shown above the post list on the blog index. Leave fields empty to hide the banner.'

export default defineType({
  name: 'pageBlog',
  title: 'Blog page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    {
      name: 'featuredSeries',
      title: 'Featured series banner',
      description: FEATURED_SERIES_DESC,
      options: { collapsible: true, collapsed: false },
    },
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

    // Featured series banner (optional — mirrors legacy blogConfig.series* fields).
    // Consumer should check `name` (the series title) and skip rendering if empty.
    defineField({
      name: 'seriesBannerEnabled',
      title: 'Show series banner',
      type: 'boolean',
      fieldset: 'featuredSeries',
      initialValue: false,
    }),
    defineField({
      name: 'seriesName',
      title: 'Series name',
      type: 'string',
      fieldset: 'featuredSeries',
      description: HEADLINE_DESCRIPTION,
    }),
    defineField({
      name: 'seriesSlug',
      title: 'Series slug',
      type: 'string',
      fieldset: 'featuredSeries',
      description: 'e.g. going-first — must match the series field value on blog posts.',
    }),
    defineField({
      name: 'seriesStatus',
      title: 'Status label (eyebrow)',
      type: 'string',
      fieldset: 'featuredSeries',
      description: 'e.g. SERIES · ONGOING',
    }),
    defineField({
      name: 'seriesDescription',
      title: 'Series description',
      type: 'text',
      rows: 3,
      fieldset: 'featuredSeries',
      description: BODY_DESCRIPTION,
    }),
    defineField({
      name: 'seriesCurrentPhase',
      title: 'Current phase',
      type: 'string',
      fieldset: 'featuredSeries',
      description: 'e.g. Phase 2 — Posture & Grounding',
    }),
    defineField({
      name: 'seriesCtaLabel',
      title: 'CTA label',
      type: 'string',
      fieldset: 'featuredSeries',
      description: 'e.g. Follow the Series →',
    }),

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
