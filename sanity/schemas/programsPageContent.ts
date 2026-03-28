import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'programsPageContent',
  title: 'Programs Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Programs Page',
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroEyebrow',
      title: 'Hero — Eyebrow',
      type: 'string',
      description: 'Small label above the headline. e.g. "The Work"',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero — Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero — Subheading',
      type: 'text',
      rows: 3,
    }),

    // ── Offers section header ─────────────────────────────────────────────────
    defineField({
      name: 'offersEyebrow',
      title: 'Offers Section — Eyebrow',
      type: 'string',
      description: 'e.g. "Three ways to work together"',
    }),
    defineField({
      name: 'offersHeading',
      title: 'Offers Section — Heading',
      type: 'string',
    }),
    defineField({
      name: 'offersSubtext',
      title: 'Offers Section — Subtext',
      type: 'text',
      rows: 3,
    }),

    // ── Offer cards ───────────────────────────────────────────────────────────
    defineField({
      name: 'offerCards',
      title: 'Offer Cards',
      type: 'array',
      description: 'The individual offer cards shown in the grid. Order them here.',
      of: [
        {
          type: 'object',
          name: 'offerCard',
          title: 'Offer Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow Label',
              type: 'string',
              description: 'Small label above the title. e.g. "Digital Course"',
            }),
            defineField({
              name: 'trackType',
              title: 'Track Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Digital Course', value: 'course' },
                  { title: 'Program (course + check-ins)', value: 'program' },
                  { title: '1-on-1 Coaching', value: 'coaching' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g. "$197" or "Let\'s talk"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isFeatured',
              title: 'Featured (Most Popular)',
              type: 'boolean',
              description: 'Shows a "Most Popular" badge on this card.',
              initialValue: false,
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'includes',
              title: "What's Included",
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Checklist of deliverables. One item per line.',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ctaHref',
              title: 'CTA Button Link',
              type: 'string',
              description: 'e.g. "/contact"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', eyebrow: 'eyebrow', price: 'price' },
            prepare({ title, eyebrow, price }) {
              return { title, subtitle: `${eyebrow ?? ''} — ${price ?? ''}` };
            },
          },
        },
      ],
    }),

    // ── Who it's for ─────────────────────────────────────────────────────────
    defineField({
      name: 'whoForHeading',
      title: "Who It's For — Heading",
      type: 'string',
    }),
    defineField({
      name: 'whoForBody',
      title: "Who It's For — Body Paragraphs",
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is a separate paragraph.',
    }),

    // ── CTA section ───────────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeading',
      title: 'CTA — Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA — Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA — Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'CTA — Button Link',
      type: 'string',
      description: 'e.g. "/contact"',
    }),
    defineField({
      name: 'ctaMicrocopy',
      title: 'CTA — Microcopy',
      type: 'string',
      description: 'Small text below the button. e.g. "No pressure, no pitch."',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
