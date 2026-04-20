import { defineField, defineType } from 'sanity';
import type { StringRule } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    // — Images —
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Displayed in the hero section, right column',
      options: { hotspot: true },
    }),
    defineField({
      name: 'originImage',
      title: 'Origin / Moment It Clicked Image',
      type: 'image',
      description: 'Displayed in the origin story section, left column',
      options: { hotspot: true },
    }),
    defineField({
      name: 'philosophyImage',
      title: 'Philosophy Image',
      type: 'image',
      description: 'Displayed in the What I Actually Believe section',
      options: { hotspot: true },
    }),
    defineField({
      name: 'originSectionLabel',
      title: 'Origin Section — Eyebrow Label',
      type: 'string',
      description: 'Short uppercase label shown above the headline (e.g. "What Changed Everything").',
    }),
    defineField({
      name: 'originSectionHeadline',
      title: 'Origin Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'originSectionDescription',
      title: 'Origin Section Description',
      type: 'text',
    }),
    defineField({
      name: 'originSectionHighlight',
      title: 'Highlight — What Changed Everything',
      type: 'string',
      description: 'Bold sentence shown at the top of the "What Changed Everything" section',
    }),
    defineField({
      name: 'turningPointHeadline',
      title: 'Turning Point — Section Label',
      description: 'Short label/eyebrow for the school performance story section',
      type: 'string',
    }),
    defineField({
      name: 'turningPointBody',
      title: 'Turning Point — Body Copy',
      description: 'Full narrative body for the turning point section (3 paragraphs)',
      type: 'text',
    }),
    defineField({
      name: 'turningPointHighlight',
      title: 'Highlight — The Moment It Clicked',
      type: 'string',
      description: 'Bold sentence shown at the top of the "The Moment It Clicked" section',
    }),
    defineField({
      name: 'methodologyHeadline',
      title: 'Methodology — Section Label',
      description: 'Short label/eyebrow for the freestyle/choreography section',
      type: 'string',
    }),
    defineField({
      name: 'methodologyBody',
      title: 'Methodology — Body Copy',
      description: 'Full narrative body for the methodology section',
      type: 'text',
    }),
    defineField({
      name: 'methodologyHighlight',
      title: 'Highlight — What I Actually Believe',
      type: 'string',
      description: 'Bold sentence shown at the top of the "What I Actually Believe" section',
    }),
    defineField({
      name: 'whyExistsHeadline',
      title: 'Why This Exists — Section Label',
      type: 'string',
    }),
    defineField({
      name: 'whyExistsBody',
      title: 'Why This Exists — Body Copy',
      type: 'text',
    }),
    defineField({
      name: 'whyExistsHighlight',
      title: 'Highlight — Why This Exists',
      type: 'string',
      description: 'Bold sentence shown at the top of the "Why This Exists" section',
    }),
    defineField({
      name: 'whoForHeadline',
      title: 'Who This Is For — Section Label',
      type: 'string',
    }),
    defineField({
      name: 'whoForBody',
      title: 'Who This Is For — Body Copy',
      type: 'text',
    }),
    defineField({
      name: 'whoForHighlight',
      title: 'Highlight — Who This Is For',
      type: 'string',
      description: 'Bold sentence shown at the top of the "Who This Is For" section',
    }),
    defineField({
      name: 'closingHeadline',
      title: 'Closing — Section Label / CTA Headline',
      type: 'string',
    }),
    defineField({
      name: 'closingBody',
      title: 'Closing — Body Copy',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Label',
      type: 'string',
    }),

    // ── Origin Scrollytelling (Phase 4) ──────────────────────────────────────
    defineField({
      name: 'originSectionAnchorWord',
      title: 'Origin — Anchor Word',
      type: 'string',
      description: 'Single word styled italic mocha in the section heading. E.g. "path"',
    }),
    defineField({
      name: 'originPhases',
      title: 'Origin — 5 Scenes',
      type: 'array',
      description: 'Each scene has its own full-bleed image that pins while you scroll. Add all 5 in order.',
      of: [
        {
          type: 'object',
          name: 'originPhase',
          title: 'Scene',
          fields: [
            defineField({
              name: 'order',
              title: 'Scene Number',
              type: 'number',
              description: '1–5',
              validation: (Rule) => Rule.required().min(1).max(5),
            }),
            defineField({
              name: 'title',
              title: 'Scene Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Scene Body (1–3 sentences)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'pullQuote',
              title: 'Pull Quote (optional)',
              type: 'string',
              description: 'Single line shown in large typographic treatment alongside the body.',
            }),
            defineField({
              name: 'image',
              title: 'Scene Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload origin-01 through origin-05 here in order.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'imageAlt',
              title: 'Image Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { order: 'order', title: 'title', media: 'image' },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare: (value: Record<string, any>) => ({
              title: `Scene ${value.order ?? '?'}: ${value.title ?? 'Untitled'}`,
              media: value.media,
            }),
          },
        },
      ],
    }),

    // ── Introvert Section (Phase 6) ───────────────────────────────────────────
    defineField({
      name: 'introvertImage',
      title: 'Introvert Section — Photo',
      type: 'image',
      description: 'Upload introvert-solitude here. You alone, quiet room, not posed.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroHeadline'
    }
  }
});
