import { defineType, defineField } from 'sanity'

const SHARED_REF_DESC = (name: string) =>
  `References the singleton ${name}. Edit content there, not here.`

const QUIZ_NOTE =
  'Quiz questions and scoring logic live in lib/auditData.ts. They are not editable from Sanity. To change quiz content, edit the codebase.'

export default defineType({
  name: 'pageIkigai',
  title: 'Ikigai page',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'fourCircles', title: 'Four Circles', options: { collapsible: true, collapsed: false } },
    { name: 'quizBridge', title: 'Quiz bridge line', options: { collapsible: true, collapsed: false } },
    {
      name: 'quiz',
      title: 'Quiz (managed in code)',
      description: QUIZ_NOTE,
      options: { collapsible: true, collapsed: true },
    },
    { name: 'starterGuide', title: 'Foundation Starter Guide', options: { collapsible: true, collapsed: false } },
    { name: 'cta', title: 'Closing CTA', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'hero', fieldset: 'hero' }),

    defineField({
      name: 'fourCirclesHeader',
      title: 'Section header',
      type: 'sectionHeader',
      fieldset: 'fourCircles',
    }),
    defineField({
      name: 'fourCirclesSet',
      title: 'Four Circles set',
      type: 'reference',
      fieldset: 'fourCircles',
      to: [{ type: 'fourCirclesSet' }],
      description: SHARED_REF_DESC('fourCirclesSet'),
    }),

    defineField({
      name: 'quizBridge',
      title: 'Quiz bridge',
      type: 'object',
      fieldset: 'quizBridge',
      fields: [
        defineField({
          name: 'line',
          title: 'Bridge line',
          type: 'string',
          validation: (R) => R.required(),
        }),
      ],
    }),

    defineField({
      name: 'quizNote',
      title: 'Quiz (read-only note)',
      type: 'text',
      fieldset: 'quiz',
      readOnly: true,
      initialValue: QUIZ_NOTE,
      description: QUIZ_NOTE,
    }),

    defineField({
      name: 'starterGuide',
      title: 'Foundation Starter Guide capture',
      type: 'reference',
      fieldset: 'starterGuide',
      to: [{ type: 'starterGuideCapture' }],
      description: SHARED_REF_DESC('starterGuideCapture'),
    }),

    defineField({
      name: 'cta',
      title: 'Closing CTA',
      type: 'ctaBlock',
      fieldset: 'cta',
    }),
  ],
  preview: { prepare: () => ({ title: 'Ikigai page' }) },
})
