import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'emailOptIn',
  title: 'Email Opt-In Widget',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Email Opt-In',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the heading. e.g. "Free for introverts"',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "Get The Presence Guide"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences describing what they get.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      description: 'e.g. "Send Me the Guide"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'string',
      description: 'e.g. "No spam. Unsubscribe any time."',
    }),
    defineField({
      name: 'successTitle',
      title: 'Success State — Title',
      type: 'string',
      description: 'Shown after a successful submission. e.g. "You\'re in. ✓"',
    }),
    defineField({
      name: 'successBody',
      title: 'Success State — Body',
      type: 'string',
      description: 'e.g. "Check your inbox — The Presence Guide is on its way."',
    }),
  ],
  preview: {
    select: { title: 'title', heading: 'heading' },
    prepare({ title, heading }) {
      return { title, subtitle: heading };
    },
  },
});
