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
      name: 'meetJonHeading',
      title: 'Meet Jon — Headline',
      type: 'string',
      description: 'A claim, not a label. E.g. "I learned to lead because the lesson plan required it."',
    }),
    defineField({
      name: 'meetJonBody',
      title: 'Meet Jon — Body',
      type: 'text',
      rows: 3,
      description: 'Two to three sentences. Resolves the headline claim.',
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

    // ── Why It Works Bento — ORPHANED (Phase 1 cleanup) ─────────────────────
    // These fields are no longer fetched by getHomePageContent() or rendered
    // by WhyItWorks. The bento variant was superseded by the FourPillars
    // component. Retain for data preservation; remove in a separate migration.
    //
    // DEPRECATED: bento variant replaced by FourPillars component (Phase 1).
    // Do NOT un-hide these fields without first removing the 'pillars' field —
    // re-enabling bento data while pillars renders will produce a duplicate
    // four-pillars section on the home page. Remove in a migration after
    // confirming Sanity data is no longer needed.
    defineField({
      name: 'whyItWorksBentoHeadline',
      title: '⚠️ ORPHANED — Why It Works Bento Headline',
      type: 'string',
      hidden: true,
      deprecated: {
        reason: 'Bento variant removed. FourPillars renders the four pillars instead.',
      },
    }),
    defineField({
      name: 'whyItWorksCells',
      title: '⚠️ ORPHANED — Why It Works Bento Cells',
      type: 'array',
      hidden: true,
      deprecated: {
        reason: 'Bento variant removed. FourPillars renders the four pillars instead.',
      },
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

    // ── Four Pillars (Phase 1) ────────────────────────────────────────────────
    defineField({
      name: 'pillarsHeadline',
      title: 'Four Pillars — Section Headline',
      type: 'string',
      description: 'E.g. "The fundamentals are the same. The medium is yours to choose."',
    }),
    defineField({
      name: 'pillars',
      title: 'Four Pillars',
      type: 'array',
      description: 'Exactly 4 items. Each pillar must have 3 mini-applications across different mediums.',
      of: [
        {
          type: 'object',
          name: 'pillar',
          title: 'Pillar',
          fields: [
            defineField({
              name: 'number',
              title: 'Pillar Number',
              type: 'string',
              description: 'E.g. "Pillar 01"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'E.g. "Grounding"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'definition',
              title: 'One-sentence definition',
              type: 'string',
              description: 'Italic. E.g. "The capacity to find your centre before you move."',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'applications',
              title: 'Mini-applications (3 items)',
              type: 'array',
              description: 'One per medium — dancer / leader / writer / performer etc. Each one line.',
              of: [
                {
                  type: 'object',
                  name: 'pillarApp',
                  fields: [
                    defineField({ name: 'who', title: 'Who (role label)', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'body', title: 'Application (one line)', type: 'string', validation: (Rule) => Rule.required() }),
                  ],
                  preview: {
                    select: { title: 'who', subtitle: 'body' },
                  },
                },
              ],
              validation: (Rule) => Rule.length(3),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'definition' },
          },
        },
      ],
      validation: (Rule) => Rule.length(4),
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
