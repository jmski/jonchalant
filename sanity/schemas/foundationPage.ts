import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'foundationPage',
  title: 'Foundation Page Content',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroEyebrow',
      title: 'Hero — Eyebrow',
      type: 'string',
      description: 'Short label above the headline (e.g. "8-Week Course")',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero — Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero — Subheadline',
      type: 'string',
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Hero — Primary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Hero — Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'heroNote',
      title: 'Hero — Footer Note',
      type: 'string',
      description: 'Small text below the CTAs (e.g. "No pressure. No pitch. Enroll when you\'re ready.")',
    }),

    // ── What\'s Inside ────────────────────────────────────────────────────────
    defineField({
      name: 'insideEyebrow',
      title: 'What\'s Inside — Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'insideTitle',
      title: 'What\'s Inside — Title',
      type: 'string',
    }),
    defineField({
      name: 'insideBody',
      title: 'What\'s Inside — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'modules',
      title: 'Course Modules',
      type: 'array',
      description: '8-week curriculum. Each item maps to one week.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'week', title: 'Week Number', type: 'number' }),
            defineField({ name: 'title', title: 'Module Title', type: 'string' }),
            defineField({ name: 'description', title: 'Module Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'week' },
            prepare({ title, subtitle }) {
              return { title: `Week ${subtitle}: ${title}` }
            },
          },
        },
      ],
    }),

    // ── Who It\'s For ─────────────────────────────────────────────────────────
    defineField({
      name: 'whoEyebrow',
      title: 'Who It\'s For — Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'whoTitle',
      title: 'Who It\'s For — Title',
      type: 'string',
    }),
    defineField({
      name: 'whoItems',
      title: 'Who It\'s For — Items',
      type: 'array',
      description: 'Each line is a persona description.',
      of: [{ type: 'string' }],
    }),

    // ── How It Works ──────────────────────────────────────────────────────────
    defineField({
      name: 'howEyebrow',
      title: 'How It Works — Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'howTitle',
      title: 'How It Works — Title',
      type: 'string',
    }),
    defineField({
      name: 'howCards',
      title: 'How It Works — Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Card Label', type: 'string' }),
            defineField({ name: 'body', title: 'Card Body', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),

    // ── Pricing ───────────────────────────────────────────────────────────────
    defineField({
      name: 'pricingEyebrow',
      title: 'Pricing — Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'pricingTitle',
      title: 'Pricing — Title',
      type: 'string',
    }),
    defineField({
      name: 'pricingNote',
      title: 'Pricing — Footer Note',
      type: 'string',
    }),
    defineField({
      name: 'pricingTiers',
      title: 'Pricing Tiers',
      type: 'array',
      description: 'Exactly two tiers: self-paced and with check-ins.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tier', title: 'Tier Name', type: 'string' }),
            defineField({
              name: 'tierKey',
              title: 'Tier Key',
              type: 'string',
              options: {
                list: [
                  { title: 'Self-Paced', value: 'self_paced' },
                  { title: 'With Check-ins', value: 'with_checkins' },
                ],
              },
            }),
            defineField({ name: 'price', title: 'Price Display', type: 'string', description: 'e.g. "$197"' }),
            defineField({ name: 'description', title: 'Tier Description', type: 'text', rows: 2 }),
            defineField({
              name: 'features',
              title: 'Feature List',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({ name: 'cta', title: 'CTA Button Label', type: 'string', description: 'e.g. "Enroll — $197"' }),
            defineField({ name: 'primary', title: 'Primary Tier?', type: 'boolean', description: 'Marks this as the featured/recommended tier' }),
          ],
          preview: {
            select: { title: 'tier', subtitle: 'price' },
          },
        },
      ],
    }),

    // ── Closing CTA ───────────────────────────────────────────────────────────
    defineField({
      name: 'ctaTitle',
      title: 'Closing CTA — Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaBody',
      title: 'Closing CTA — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'Closing CTA — Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaNote',
      title: 'Closing CTA — Note',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Foundation Page Content' }
    },
  },
})
