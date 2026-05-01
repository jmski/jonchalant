import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pillarSet',
  title: 'Pillar definitions',
  type: 'document',
  fields: [
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      description:
        'The four canonical pillars, in order: Grounding, Energy, Flow, Command.',
      of: [{ type: 'pillarCard' }],
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(4)
          .error('Exactly four pillars are required.'),
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Pillar definitions (Grounding/Energy/Flow/Command)',
    }),
  },
})
