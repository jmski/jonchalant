import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'curriculumWeek',
  title: 'Curriculum Week',
  type: 'document',
  fields: [
    defineField({
      name: 'weekNumber',
      title: 'Week Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
    defineField({
      name: 'title',
      title: 'Week Title',
      type: 'string',
      description: 'E.g. "Body Audit", "Posture & Grounding"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'oneLineDescription',
      title: 'One-Line Description',
      type: 'text',
      rows: 2,
      description: 'A single concise sentence for the bento tile.',
    }),
    defineField({
      name: 'illustrationSlug',
      title: 'Illustration Slug',
      type: 'string',
      description: 'Maps to /public/illustrations/{slug}.svg. E.g. "week-01"',
    }),
    defineField({
      name: 'bentoSize',
      title: 'Bento Cell Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small (1×1)', value: 'sm' },
          { title: 'Medium (2×1)', value: 'md' },
          { title: 'Large (2×2)', value: 'lg' },
          { title: 'Tall (1×2)', value: 'tall' },
          { title: 'Wide (3×1)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'sm',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Week Number',
      name: 'weekNumberAsc',
      by: [{ field: 'weekNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: { weekNumber: 'weekNumber', title: 'title' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: (value: Record<string, any>) => ({
      title: `Week ${value.weekNumber ?? '?'}: ${value.title ?? 'Untitled'}`,
    }),
  },
});
