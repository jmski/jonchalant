import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'auditPage',
  title: 'Audit Page Content',
  type: 'document',
  fields: [
    // ── Page header ────────────────────────────────────────────────────────────
    defineField({
      name: 'pageHeaderBadge',
      title: 'Page Header — Badge Text',
      type: 'string',
      description: 'Short label shown in the pill above the headline (e.g. "3 minutes")',
    }),
    defineField({
      name: 'pageHeaderHeadline',
      title: 'Page Header — Headline',
      type: 'string',
    }),
    defineField({
      name: 'pageHeaderBody',
      title: 'Page Header — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pageFooterNote',
      title: 'Page Footer — Note',
      type: 'text',
      rows: 2,
      description: 'Text shown below the quiz container (e.g. "Already know what you need? Skip this and book a call directly.")',
    }),

    // ── Capture stage ──────────────────────────────────────────────────────────
    defineField({
      name: 'captureBadge',
      title: 'Capture Stage — Badge Text',
      type: 'string',
      description: 'Label shown above the "Where should I send your results?" heading (e.g. "Almost there")',
    }),
    defineField({
      name: 'captureHeadline',
      title: 'Capture Stage — Headline',
      type: 'string',
    }),
    defineField({
      name: 'captureBody',
      title: 'Capture Stage — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'capturePrivacyNote',
      title: 'Capture Stage — Privacy Note',
      type: 'string',
      description: 'Small text below the submit button (e.g. "No spam. Unsubscribe anytime.")',
    }),

    // ── Result bands ───────────────────────────────────────────────────────────
    defineField({
      name: 'resultBands',
      title: 'Result Bands',
      type: 'array',
      description: 'One entry per scoring band: foundation (≤14), developing (≤21), refining (>21)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'band',
              title: 'Band Key',
              type: 'string',
              options: {
                list: [
                  { title: 'Foundation (score ≤14)', value: 'foundation' },
                  { title: 'Developing (score ≤21)', value: 'developing' },
                  { title: 'Refining (score >21)', value: 'refining' },
                ],
              },
            }),
            defineField({ name: 'headline', title: 'Band Headline', type: 'string' }),
            defineField({ name: 'body', title: 'Band Body', type: 'text', rows: 5 }),
          ],
          preview: {
            select: { title: 'band', subtitle: 'headline' },
          },
        },
      ],
    }),

    // ── What happens next ──────────────────────────────────────────────────────
    defineField({
      name: 'resultNextHeading',
      title: 'Result — "What Happens Next" Heading',
      type: 'string',
    }),
    defineField({
      name: 'resultNextBody',
      title: 'Result — "What Happens Next" Body',
      type: 'text',
      rows: 4,
    }),

    // ── Result CTA ─────────────────────────────────────────────────────────────
    defineField({
      name: 'resultCtaText',
      title: 'Result CTA — Lead Text',
      type: 'string',
      description: 'Small sentence above the button (e.g. "Want to move faster?")',
    }),
    defineField({
      name: 'resultCtaButtonLabel',
      title: 'Result CTA — Button Label',
      type: 'string',
    }),
    defineField({
      name: 'resultCtaHref',
      title: 'Result CTA — Button URL',
      type: 'string',
      description: 'Internal path or external URL for the CTA button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Audit Page Content' }
    },
  },
})
