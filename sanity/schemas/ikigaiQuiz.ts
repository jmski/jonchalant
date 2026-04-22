import { defineType, defineField } from 'sanity'
import type { StringRule, NumberRule, ArrayRule } from 'sanity'

export default defineType({
  name: 'ikigaiQuiz',
  title: 'Ikigai Quiz',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'The Ikigai Assessment',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      description: 'Optional framing shown before the first question',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'questionText',
              title: 'Question Text',
              type: 'text',
              rows: 2,
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'quadrant',
              title: 'Quadrant',
              type: 'string',
              options: {
                list: [
                  { title: 'Passion', value: 'passion' },
                  { title: 'Mission', value: 'mission' },
                  { title: 'Vocation', value: 'vocation' },
                  { title: 'Profession', value: 'profession' },
                ],
                layout: 'radio',
              },
              validation: (Rule: StringRule) => Rule.required(),
              description: 'Which quadrant this question measures',
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule: NumberRule) => Rule.required().integer().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'questionText',
              subtitle: 'quadrant',
              order: 'order',
            },
            prepare(selection: any) {
              return {
                title: `${selection.order ?? '?'}. ${selection.title ?? 'Untitled question'}`,
                subtitle: selection.subtitle ?? '',
              }
            },
          },
        },
      ],
      validation: (Rule: ArrayRule<any>) => Rule.min(8).max(12),
      description: 'Between 8 and 12 questions, covering all four quadrants',
    }),
    defineField({
      name: 'answerScale',
      title: 'Answer Scale',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: StringRule) => Rule.required(),
              description: 'e.g. "Not at all", "Rarely true"',
            }),
            defineField({
              name: 'value',
              title: 'Numeric Value',
              type: 'number',
              validation: (Rule: NumberRule) => Rule.required().integer().min(1).max(10),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare(selection: any) {
              return { title: selection.label, subtitle: `Value: ${selection.value}` }
            },
          },
        },
      ],
      description: 'Fixed 4-option scale (1 = Not at all → 4 = Strongly agree)',
    }),
    defineField({
      name: 'resultInterpretations',
      title: 'Result Interpretations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Quadrant Dominant', value: 'quadrant-dominant' },
                  { title: 'Three-Circle Pattern', value: 'three-circle-pattern' },
                ],
                layout: 'radio',
              },
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'quadrant',
              title: 'Quadrant',
              type: 'string',
              options: {
                list: [
                  { title: 'Passion', value: 'passion' },
                  { title: 'Mission', value: 'mission' },
                  { title: 'Vocation', value: 'vocation' },
                  { title: 'Profession', value: 'profession' },
                ],
              },
              description: 'Required when type is quadrant-dominant',
              hidden: ({ parent }: any) => parent?.type !== 'quadrant-dominant',
            }),
            defineField({
              name: 'pattern',
              title: 'Pattern',
              type: 'string',
              options: {
                list: [
                  { title: 'Delight but No Wealth (missing Profession)', value: 'delight-no-wealth' },
                  { title: 'Delight but Uncertain (missing Vocation)', value: 'delight-uncertain' },
                  { title: 'Comfortable but Empty (missing Mission)', value: 'comfortable-empty' },
                  { title: 'Useful but Unexcited (missing Passion)', value: 'useful-unexcited' },
                ],
              },
              description: 'Required when type is three-circle-pattern',
              hidden: ({ parent }: any) => parent?.type !== 'three-circle-pattern',
            }),
            defineField({
              name: 'headline',
              title: 'Headline',
              type: 'string',
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 5,
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'recommendedLessonNumber',
              title: 'Recommended Lesson Number',
              type: 'number',
              description: 'Which Four Circles lesson number to surface based on this result',
              validation: (Rule: NumberRule) => Rule.integer().min(1).max(12),
            }),
          ],
          preview: {
            select: {
              type: 'type',
              quadrant: 'quadrant',
              pattern: 'pattern',
              headline: 'headline',
            },
            prepare(selection: any) {
              const key = selection.quadrant ?? selection.pattern ?? '—'
              return {
                title: selection.headline ?? 'Untitled',
                subtitle: `${selection.type} — ${key}`,
              }
            },
          },
        },
      ],
      description: 'One interpretation per quadrant + one per three-circle pattern',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
