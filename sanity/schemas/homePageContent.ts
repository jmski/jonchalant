// TODO: After running scripts/migrate-hero-fields.ts against prod,
// remove the heroCtaText, heroCtaLink, heroSecondaryCtaText fields.
// They are currently hidden and deprecated but still in the schema
// to preserve data until migration runs.

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePageContent',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'heroEyebrow', title: 'Hero — Eyebrow', type: 'string' }),
    defineField({ name: 'heroHeadline', title: 'Hero — Headline', type: 'string' }),
    defineField({
      name: 'heroCyclingOutcomes',
      title: 'Hero — Cycling Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Each string cycles as the accented outcome line. E.g. "ace that job interview."',
    }),
    defineField({ name: 'heroDescription', title: 'Hero — Description', type: 'text' }),
    defineField({ name: 'heroSubtext', title: 'Hero — Subtext (under description)', type: 'string' }),
    // ── New hero fields (aligned with shared GenericHero props) ──────────────
    defineField({
      name: 'heroSubhead',
      title: 'Hero subhead',
      type: 'text',
      rows: 3,
      description: 'One to two sentences. Shown below the headline.',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Hero primary CTA — label',
      type: 'string',
      description: 'Button text. Name what happens next — e.g. "Discover Your Ikigai", not "Learn more".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroPrimaryCtaHref',
      title: 'Hero primary CTA — link',
      type: 'string',
      description: 'Path or URL. Top-of-funnel CTAs go to /ikigai.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Hero secondary CTA — label',
      type: 'string',
      description: 'Optional. Leave blank to hide the secondary button.',
    }),
    defineField({
      name: 'heroSecondaryCtaHref',
      title: 'Hero secondary CTA — link',
      type: 'string',
      description: 'Required if secondary label is set.',
    }),
    // ── Legacy fields (deprecated — hidden from Studio, data preserved) ────────
    defineField({
      name: 'heroCtaText',
      title: '⚠️ DEPRECATED — use heroPrimaryCtaLabel',
      type: 'string',
      hidden: true,
      deprecated: {
        reason: 'Renamed to heroPrimaryCtaLabel. Will be removed after migration.',
      },
    }),
    defineField({
      name: 'heroCtaLink',
      title: '⚠️ DEPRECATED — use heroPrimaryCtaHref',
      type: 'string',
      hidden: true,
      deprecated: {
        reason: 'Renamed to heroPrimaryCtaHref. Will be removed after migration.',
      },
    }),
    defineField({
      name: 'heroMicrocopy',
      title: '⚠️ DEPRECATED — Hero CTA Microcopy',
      type: 'string',
      hidden: true,
      deprecated: {
        reason: 'No longer used in the new hero design.',
      },
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: '⚠️ DEPRECATED — use heroSecondaryCtaLabel',
      type: 'string',
      hidden: true,
      deprecated: {
        reason: 'Renamed to heroSecondaryCtaLabel. Will be removed after migration.',
      },
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero — Stats Strip',
      type: 'array',
      of: [{
        type: 'object',
        name: 'heroStat',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        ]
      }]
    }),
    defineField({
      name: 'servicesHeadline',
      title: 'Services Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Services Section Description',
      type: 'text',
    }),
    defineField({
      name: 'whyItWorksLabel',
      title: 'Why It Works — Eyebrow Label',
      type: 'string',
    }),
    defineField({
      name: 'whyItWorksHighlight',
      title: 'Why It Works — Highlight Sentence',
      type: 'string',
    }),
    defineField({
      name: 'whyItWorksParagraph1',
      title: 'Why It Works — Paragraph 1',
      type: 'text',
    }),
    defineField({
      name: 'whyItWorksParagraph2',
      title: 'Why It Works — Paragraph 2',
      type: 'text',
    }),
    defineField({
      name: 'whyItWorksParagraph3',
      title: 'Why It Works — Paragraph 3',
      type: 'text',
    }),
    defineField({ name: 'testimonialsEyebrow', title: 'Testimonials — Eyebrow', type: 'string' }),
    defineField({ name: 'testimonialsHeading', title: 'Testimonials — Heading', type: 'string' }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA — Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA — Description',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA — Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'CTA — Button Href',
      type: 'string',
    }),
    defineField({
      name: 'meetJonImage',
      title: 'Meet Jon — Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),

    // ── Why It Works Bento (Phase 5) ─────────────────────────────────────────
    defineField({
      name: 'whyItWorksBentoHeadline',
      title: 'Why It Works — Bento Headline',
      type: 'string',
      description: 'Section heading. E.g. "Why it works"',
    }),
    defineField({
      name: 'whyItWorksCells',
      title: 'Why It Works — Bento Cells (4 items)',
      type: 'array',
      description: 'Four insight cells for the bento layout. Recommended order: lg, sm, sm (text-only), tall.',
      of: [
        {
          type: 'object',
          name: 'whyItWorksCell',
          title: 'Cell',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'insight', title: 'Insight (one sentence)', type: 'text', rows: 2 }),
            defineField({
              name: 'image',
              title: 'Image (optional)',
              type: 'image',
              options: { hotspot: true },
              description: 'Leave empty for text-only cells.',
            }),
            defineField({
              name: 'size',
              title: 'Bento Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small (1×1)', value: 'sm' },
                  { title: 'Medium (2×1)', value: 'md' },
                  { title: 'Large (2×2)', value: 'lg' },
                  { title: 'Tall (1×2)', value: 'tall' },
                  { title: 'Wide (3×1)', value: 'wide' },
                ],
                layout: 'radio',
              },
              initialValue: 'sm',
            }),
          ],
          preview: {
            select: { title: 'title', size: 'size', media: 'image' },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare: (value: Record<string, any>) => ({
              title: String(value.title ?? 'Cell'),
              subtitle: String(value.size ?? 'sm'),
              media: value.media,
            }),
          },
        },
      ],
    }),

    // ── Hero Cycle (Phase 2) ──────────────────────────────────────────────────
    defineField({
      name: 'heroHeadlineStatic',
      title: 'Hero — Headline (static part)',
      type: 'string',
      description: 'The part of the headline that never moves during the cycle. E.g. "Body-led leadership for the quietly"',
    }),
    defineField({
      name: 'heroHeadlineAnchorWord',
      title: 'Hero — Anchor Word',
      type: 'string',
      description: 'The single italic mocha word at the end of the headline. E.g. "ambitious"',
    }),
    defineField({
      name: 'heroCycle',
      title: 'Hero — Cycling Visual Slides',
      type: 'array',
      description: 'Each slide cycles in the right column. Add a Three.js slide first, then your photo fragments.',
      of: [
        {
          type: 'object',
          name: 'heroCycleSlide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'kind',
              title: 'Slide Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Three.js Figure (no image needed)', value: 'three-js-figure' },
                  { title: 'Photo', value: 'photo' },
                  { title: 'Typographic Word', value: 'typography' },
                  { title: 'Video Loop', value: 'video-loop' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload hero-fragment-01, 02, or 03 here.',
              hidden: ({ parent }) => parent?.kind !== 'photo',
            }),
            defineField({
              name: 'typographicWord',
              title: 'Typographic Word',
              type: 'string',
              description: 'Single word displayed at massive scale. E.g. "presence"',
              hidden: ({ parent }) => parent?.kind !== 'typography',
            }),
            defineField({
              name: 'caption',
              title: 'Caption / Screen-reader Label',
              type: 'string',
              description: 'Used as aria-label on the visual. Required for photo and video slides.',
            }),
            defineField({
              name: 'durationMs',
              title: 'Duration (ms)',
              type: 'number',
              description: 'How long this slide shows before cross-fading. Default: 8000',
              initialValue: 8000,
            }),
          ],
          preview: {
            select: { kind: 'kind', caption: 'caption' },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare: (value: Record<string, any>) => ({
              title: String(value.kind ?? 'Slide'),
              subtitle: String(value.caption ?? ''),
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
});
