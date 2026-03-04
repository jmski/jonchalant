import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageMetadata',
  title: 'Page Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Dance Portfolio', value: 'dance' },
          { title: 'Lessons', value: 'lessons' },
          { title: 'Programs', value: 'programs' },
          { title: 'Collaborations', value: 'collaborations' },
          { title: 'Contact', value: 'contact' },
          { title: 'Media Kit', value: 'mediaKit' },
          { title: 'Home', value: 'home' },
        ]
      }
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'Call-to-action section title (optional)',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      description: 'Call-to-action section description (optional)',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Call-to-action button label (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'page',
      subtitle: 'headline'
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle
      }
    }
  }
});
