import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'mediaKitData',
  title: 'Media Kit',
  type: 'document',
  fields: [
    // ── Internal label ───────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Internal Label',
      type: 'string',
      initialValue: 'Media Kit',
      readOnly: true,
      description: 'Studio identifier — not displayed on site.',
    }),

    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroBadge',
      title: 'Hero Eyebrow / Badge',
      type: 'string',
      description: 'Short label above the headline, e.g. "Media & Partnerships".',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Sub-headline',
      type: 'text',
      rows: 3,
    }),

    // ── Press Bios ───────────────────────────────────────────────────────────
    defineField({
      name: 'shortBio',
      title: 'Short Bio (press use)',
      type: 'text',
      rows: 3,
      description: '2-sentence bio for journalists and partner pages.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longBio',
      title: 'Long Bio (press use)',
      type: 'text',
      rows: 6,
      description: 'Full paragraph bio for press kits and features.',
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero Stats ────────────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Hero Stats',
      type: 'array',
      description: 'Coaching / achievement stats shown in the hero right column.',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. "100+"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Clients Coached"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),

    // ── Expertise Areas ───────────────────────────────────────────────────────
    defineField({
      name: 'expertiseAreas',
      title: 'Expertise Areas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'expertiseArea',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g. "Speaking"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    }),

    // ── Press Assets ──────────────────────────────────────────────────────────
    defineField({
      name: 'pressAssetsPdfUrl',
      title: 'Press Kit PDF URL',
      type: 'url',
      description: 'Direct link to downloadable PDF press kit.',
    }),
    defineField({
      name: 'pressAssetsLabel',
      title: 'Press Kit Button Label',
      type: 'string',
      description: 'e.g. "Download Press Kit"',
    }),

    // ── CTA / Contact ─────────────────────────────────────────────────────────
    defineField({
      name: 'contactHeadline',
      title: 'CTA Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'contactSubheadline',
      title: 'CTA Section Sub-copy',
      type: 'text',
      rows: 3,
    }),

    // ── Social / Analytics (existing fields) ─────────────────────────────────
    defineField({
      name: 'keyMetrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            defineField({
              name: 'label',
              title: 'Metric Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Metric Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'change',
              title: 'Year-over-Year Change',
              type: 'string',
              description: 'e.g., "+15% YoY"',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ]
        }
      ],
    }),
    defineField({
      name: 'platforms',
      title: 'Platform Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'platform',
          fields: [
            defineField({
              name: 'name',
              title: 'Platform Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'handle',
              title: 'Handle',
              type: 'string',
            }),
            defineField({
              name: 'followers',
              title: 'Followers',
              type: 'string',
            }),
            defineField({
              name: 'avgViews',
              title: 'Avg Views per Post',
              type: 'string',
            }),
            defineField({
              name: 'category',
              title: 'Content Category',
              type: 'string',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contentCategories',
      title: 'Content Category Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentCategory',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'percentage',
              title: 'Percentage',
              type: 'number',
              validation: (Rule) => Rule.required().min(0).max(100),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'audience',
      title: 'Audience Demographics',
      type: 'object',
      fields: [
        defineField({
          name: 'age',
          title: 'Age Distribution',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'ageGroup',
              fields: [
                defineField({
                  name: 'range',
                  title: 'Age Range',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'percentage',
                  title: 'Percentage',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0).max(100),
                }),
              ]
            }
          ],
        }),
        defineField({
          name: 'gender',
          title: 'Gender Distribution',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'genderGroup',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Gender Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'percentage',
                  title: 'Percentage',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0).max(100),
                }),
              ]
            }
          ],
        }),
        defineField({
          name: 'locations',
          title: 'Geographic Distribution',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'location',
              fields: [
                defineField({
                  name: 'country',
                  title: 'Country',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'percentage',
                  title: 'Percentage',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0).max(100),
                }),
              ]
            }
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroHeadline',
      subtitle: 'title',
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || 'Media Kit', subtitle: subtitle || '' };
    },
  },
});
