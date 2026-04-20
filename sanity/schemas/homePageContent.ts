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
    defineField({ name: 'heroCtaText', title: 'Hero — Primary CTA Text', type: 'string' }),
    defineField({ name: 'heroCtaLink', title: 'Hero — Primary CTA Link', type: 'string' }),
    defineField({ name: 'heroMicrocopy', title: 'Hero — CTA Microcopy', type: 'string' }),
    defineField({ name: 'heroSecondaryCtaText', title: 'Hero — Secondary CTA Text', type: 'string' }),
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
      name: 'heroSubhead',
      title: 'Hero — Subhead',
      type: 'text',
      rows: 2,
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
