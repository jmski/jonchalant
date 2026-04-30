import { defineType, defineField, defineArrayMember } from 'sanity'
import { BODY_DESCRIPTION } from '../../lib/fieldDescriptions'

const SHARED_REF_DESC = (name: string) =>
  `References the singleton ${name}. Edit content there, not here.`

export default defineType({
  name: 'pageHome',
  title: 'Home page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'method', title: 'Method — Three steps', options: { collapsible: true, collapsed: true } },
    { name: 'pillars', title: 'Pillars — Four fundamentals', options: { collapsible: true, collapsed: true } },
    { name: 'meetJon', title: 'Meet Jon', options: { collapsible: true, collapsed: true } },
    {
      name: 'testimonials',
      title: 'Testimonials',
      description:
        'Testimonial cards come from the testimonial document type query, not from fields here.',
      options: { collapsible: true, collapsed: true },
    },
    { name: 'blogPreview', title: 'Blog preview', options: { collapsible: true, collapsed: true } },
    { name: 'newsletter', title: 'Newsletter', options: { collapsible: true, collapsed: true } },
    { name: 'auditCta', title: 'Audit CTA', options: { collapsible: true, collapsed: true } },
    { name: 'starterGuide', title: 'Foundation Starter Guide', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // hero
    defineField({ name: 'hero', title: 'Hero', type: 'hero', fieldset: 'hero' }),

    // method
    defineField({
      name: 'methodHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'method',
    }),
    defineField({
      name: 'methodSteps',
      title: 'Steps',
      type: 'array',
      fieldset: 'method',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'methodStep',
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
      validation: (R) => R.required().length(3).error('Exactly 3 steps required.'),
    }),

    // pillars
    defineField({
      name: 'pillarsHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'pillars',
    }),
    defineField({
      name: 'pillarSet',
      title: 'Pillar set',
      type: 'reference',
      fieldset: 'pillars',
      to: [{ type: 'pillarSet' }],
      description: SHARED_REF_DESC('pillarSet'),
    }),

    // meetJon
    defineField({
      name: 'meetJonHeader',
      title: 'Section header (eyebrow + headline only)',
      type: 'sectionHeader',
      fieldset: 'meetJon',
    }),
    defineField({
      name: 'meetJonBodyParagraphs',
      title: 'Body paragraphs',
      type: 'array',
      fieldset: 'meetJon',
      of: [{ type: 'text' }],
      description: BODY_DESCRIPTION,
      validation: (R) => R.required().min(2),
    }),
    defineField({
      name: 'meetJonPrimaryLink',
      title: 'Primary link',
      type: 'cta',
      fieldset: 'meetJon',
    }),
    defineField({
      name: 'meetJonSecondaryLink',
      title: 'Secondary link',
      type: 'cta',
      fieldset: 'meetJon',
    }),

    // testimonials
    defineField({
      name: 'testimonialsHeader',
      title: 'Section header (eyebrow only — headline/subhead optional)',
      type: 'sectionHeader',
      fieldset: 'testimonials',
    }),

    // blogPreview
    defineField({
      name: 'blogPreviewHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'blogPreview',
    }),
    defineField({
      name: 'blogPreviewPerCardCtaLabel',
      title: 'Per-card CTA label',
      type: 'string',
      fieldset: 'blogPreview',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'blogPreviewSectionCta',
      title: 'Section CTA',
      type: 'cta',
      fieldset: 'blogPreview',
    }),

    // newsletter
    defineField({
      name: 'newsletter',
      title: 'Newsletter capture',
      type: 'reference',
      fieldset: 'newsletter',
      to: [{ type: 'newsletterCapture' }],
      description: SHARED_REF_DESC('newsletterCapture'),
    }),

    // auditCta
    defineField({
      name: 'auditCta',
      title: 'Audit CTA',
      type: 'reference',
      fieldset: 'auditCta',
      to: [{ type: 'auditCta' }],
      description: SHARED_REF_DESC('auditCta'),
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
  preview: { prepare: () => ({ title: 'Home page' }) },
})
