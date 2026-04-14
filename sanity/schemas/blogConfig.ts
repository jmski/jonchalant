import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogConfig',
  title: 'Blog Config',
  type: 'document',
  // Singleton: hide create/delete actions in Sanity Studio
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore — __experimental_actions is a valid Sanity Studio field not yet typed
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'seriesBannerEnabled',
      title: 'Show Series Banner on Blog',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seriesName',
      title: 'Series Name',
      type: 'string',
      description: 'e.g. Going First',
    }),
    defineField({
      name: 'seriesSlug',
      title: 'Series Slug',
      type: 'string',
      description: 'e.g. going-first — must match the series field value on blog posts',
    }),
    defineField({
      name: 'seriesStatus',
      title: 'Status Label',
      type: 'string',
      description: 'e.g. SERIES · ONGOING',
    }),
    defineField({
      name: 'seriesDescription',
      title: 'Series Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seriesCurrentPhase',
      title: 'Current Phase',
      type: 'string',
      description: 'e.g. Phase 2 — Posture & Grounding',
    }),
    defineField({
      name: 'seriesCTALabel',
      title: 'CTA Link Label',
      type: 'string',
      description: 'e.g. Follow the Series →',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Blog Config' }
    }
  }
});
