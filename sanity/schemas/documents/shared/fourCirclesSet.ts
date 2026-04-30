import { defineType, defineField, defineArrayMember } from 'sanity'
import { BODY_DESCRIPTION } from '../../lib/fieldDescriptions'

export default defineType({
  name: 'fourCirclesSet',
  title: 'Four Circles definitions',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'circles',
      title: 'Circles',
      type: 'array',
      description:
        'The four canonical ikigai circles, in order: Passion, Mission, Vocation, Profession.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'circleDefinition',
          title: 'Circle definition',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'definition',
              title: 'Definition',
              type: 'text',
              rows: 3,
              description: BODY_DESCRIPTION,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'missingLine',
              title: 'Missing line',
              type: 'text',
              rows: 2,
              description: `Italicized "missing" line shown when this circle is absent. ${BODY_DESCRIPTION}`,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'definition' },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(4)
          .error('Exactly four circles are required.'),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Four Circles definitions' }),
  },
})
