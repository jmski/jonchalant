import { defineType, defineField } from 'sanity'

const SHARED_REF_DESC = (name: string) =>
  `References the singleton ${name}. Edit content there, not here.`

// TODO: course listed type not yet defined; reference will resolve once schema lands

export default defineType({
  name: 'pageLessons',
  title: 'Lessons page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'courses', title: 'Courses', options: { collapsible: true, collapsed: false } },
    { name: 'closingCta', title: 'Closing CTA (optional)', options: { collapsible: true, collapsed: false } },
    { name: 'starterGuide', title: 'Foundation Starter Guide', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'hero', fieldset: 'hero' }),

    defineField({
      name: 'courses',
      title: 'Courses',
      type: 'array',
      fieldset: 'courses',
      of: [
        {
          type: 'reference',
          to: [{ type: 'course' }],
        },
      ],
      validation: (R) => R.required().length(2),
    }),

    defineField({
      name: 'closingCta',
      title: 'Closing CTA',
      type: 'ctaBlock',
      fieldset: 'closingCta',
    }),

    defineField({
      name: 'starterGuide',
      title: 'Foundation Starter Guide capture',
      type: 'reference',
      fieldset: 'starterGuide',
      to: [{ type: 'starterGuideCapture' }],
      description: SHARED_REF_DESC('starterGuideCapture'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Lessons page' }) },
})
