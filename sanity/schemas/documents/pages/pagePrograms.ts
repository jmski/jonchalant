import { defineType, defineField } from 'sanity'

const SHARED_REF_DESC = (name: string) =>
  `References the singleton ${name}. Edit content there, not here.`

export default defineType({
  name: 'pagePrograms',
  title: 'Programs page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    {
      name: 'caseStudiesHeader',
      title: 'Case studies header',
      description:
        'Case study cards come from the caseStudy document type query, not from fields here.',
      options: { collapsible: true, collapsed: true },
    },
    { name: 'programCards', title: 'Program cards', options: { collapsible: true, collapsed: true } },
    { name: 'faq', title: 'FAQ', options: { collapsible: true, collapsed: true } },
    { name: 'closingCta', title: 'Closing CTA', options: { collapsible: true, collapsed: true } },
    { name: 'starterGuide', title: 'Foundation Starter Guide', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // hero
    defineField({ name: 'hero', title: 'Hero', type: 'hero', fieldset: 'hero' }),
    defineField({
      name: 'heroWhoForColumn',
      title: 'Hero — Who this is built for column',
      type: 'object',
      fieldset: 'hero',
      fields: [
        defineField({
          name: 'header',
          title: 'Header',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'bullets',
          title: 'Bullets',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (R) => R.required().min(1),
        }),
      ],
    }),

    // caseStudiesHeader
    defineField({
      name: 'caseStudiesHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'caseStudiesHeader',
    }),

    // programCards
    defineField({
      name: 'programCards',
      title: 'Program cards',
      type: 'array',
      fieldset: 'programCards',
      of: [{ type: 'programCard' }],
      validation: (R) => R.required().length(3),
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

    // closingCta
    defineField({
      name: 'closingCta',
      title: 'Closing CTA',
      type: 'ctaBlock',
      fieldset: 'closingCta',
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
  preview: { prepare: () => ({ title: 'Programs page' }) },
})
