import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'programFocus',
  title: 'Program Focus / Pillar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the pillar (e.g., "Physical Grounding")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What is this pillar about? (1-2 sentences)',
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'icon',
      title: 'Icon / Emoji',
      type: 'string',
      description: 'Emoji or icon representation (e.g., "🧭")',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare(selection: any) {
      const { title, icon } = selection;
      return {
        title: title,
        subtitle: `${icon || '•'} Pillar/Focus`,
      };
    },
  },
});
