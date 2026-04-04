import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dancePageContent',
  title: 'Dance Page Content',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroEyebrow',
      title: 'Hero — Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero — Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero — Subheadline',
      type: 'text',
      rows: 3,
    }),

    // ── Instagram section ─────────────────────────────────────────────────────
    defineField({
      name: 'instagramHeadline',
      title: 'Instagram Section — Headline',
      type: 'string',
    }),

    // ── CTA ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeadline',
      title: 'CTA — Headline',
      type: 'string',
    }),
    defineField({
      name: 'ctaBody',
      title: 'CTA — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA — Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'CTA — Button URL',
      type: 'string',
      description: 'Internal path (e.g. "/programs") or external URL',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dance Page Content' }
    },
  },
})
