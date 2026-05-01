import { defineType, defineField, defineArrayMember } from 'sanity'
import { BODY_DESCRIPTION } from '../../lib/fieldDescriptions'

const SHARED_REF_DESC = (name: string) =>
  `References the singleton ${name}. Edit content there, not here.`

export default defineType({
  name: 'pageFoundation',
  title: 'Foundation page',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'whoFor', title: 'Who this is for', options: { collapsible: true, collapsed: true } },
    { name: 'whyDance', title: 'Why dance', options: { collapsible: true, collapsed: true } },
    { name: 'curriculum', title: 'Curriculum', options: { collapsible: true, collapsed: true } },
    { name: 'howItWorks', title: 'How it works', options: { collapsible: true, collapsed: true } },
    { name: 'enrollment', title: 'Enrollment', options: { collapsible: true, collapsed: true } },
    { name: 'faq', title: 'FAQ', options: { collapsible: true, collapsed: true } },
    { name: 'softCta', title: 'Soft CTA (audit fallback)', options: { collapsible: true, collapsed: true } },
    { name: 'starterGuide', title: 'Foundation Starter Guide', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // hero
    defineField({ name: 'hero', title: 'Hero', type: 'hero', fieldset: 'hero' }),
    defineField({
      name: 'heroMicrocopyUnderCtas',
      title: 'Microcopy under CTAs',
      type: 'string',
      fieldset: 'hero',
    }),

    // whoFor
    defineField({
      name: 'whoForHeader',
      title: 'Header',
      type: 'string',
      fieldset: 'whoFor',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'whoForLede',
      title: 'Lede',
      type: 'string',
      fieldset: 'whoFor',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'whoForBullets',
      title: 'Bullets',
      type: 'array',
      fieldset: 'whoFor',
      of: [{ type: 'string' }],
      validation: (R) => R.required().min(1),
    }),

    // whyDance
    defineField({
      name: 'whyDanceHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'whyDance',
    }),
    defineField({
      name: 'whyDanceBodyParagraphs',
      title: 'Body paragraphs',
      type: 'array',
      fieldset: 'whyDance',
      of: [{ type: 'text' }],
      description: BODY_DESCRIPTION,
      validation: (R) => R.required().length(3).error('Exactly 3 paragraphs required.'),
    }),

    // curriculum
    defineField({
      name: 'curriculumHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'curriculum',
    }),
    defineField({
      name: 'curriculumModules',
      title: 'Modules',
      type: 'array',
      fieldset: 'curriculum',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'curriculumModule',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'number',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'blurb',
              title: 'Blurb',
              type: 'text',
              rows: 3,
              description: BODY_DESCRIPTION,
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'duration', number: 'number' },
            prepare: ({ title, subtitle, number }) => ({
              title: `${number ?? '?'}. ${title}`,
              subtitle,
            }),
          },
        }),
      ],
      validation: (R) => R.required().min(1),
    }),

    // howItWorks
    defineField({
      name: 'howItWorksHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksColumns',
      title: 'Columns',
      type: 'array',
      fieldset: 'howItWorks',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'howItWorksColumn',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
              description: BODY_DESCRIPTION,
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
      validation: (R) => R.required().length(3),
    }),

    // enrollment
    defineField({
      name: 'enrollmentHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'enrollment',
    }),
    defineField({
      name: 'enrollmentCards',
      title: 'Program cards',
      type: 'array',
      fieldset: 'enrollment',
      of: [{ type: 'programCard' }],
      validation: (R) => R.required().length(2),
    }),
    defineField({
      name: 'enrollmentFootnote',
      title: 'Footnote',
      type: 'text',
      rows: 2,
      fieldset: 'enrollment',
    }),

    // faq
    defineField({
      name: 'faqHeader',
      title: 'Header',
      type: 'string',
      fieldset: 'faq',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'faqItems',
      title: 'Items',
      type: 'array',
      fieldset: 'faq',
      of: [{ type: 'faqItem' }],
      validation: (R) => R.required().min(1),
    }),

    // softCta
    defineField({
      name: 'softCta',
      title: 'Soft CTA',
      type: 'ctaBlock',
      fieldset: 'softCta',
    }),

    // starterGuide
    defineField({
      name: 'starterGuide',
      title: 'Foundation Starter Guide capture',
      type: 'reference',
      fieldset: 'starterGuide',
      to: [{ type: 'starterGuideCapture' }],
      description: SHARED_REF_DESC('starterGuideCapture'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Foundation page' }) },
})
