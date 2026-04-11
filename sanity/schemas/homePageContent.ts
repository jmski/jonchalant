import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePageContent',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'heroEyebrow', title: 'Hero — Eyebrow', type: 'string' }),
    defineField({ name: 'heroHeadline', title: 'Hero — Headline', type: 'string' }),
    defineField({
      name: 'heroCyclingOutcomes',
      title: 'Hero — Cycling Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Each string cycles as the accented outcome line. E.g. "ace that job interview."',
    }),
    defineField({ name: 'heroDescription', title: 'Hero — Description', type: 'text' }),
    defineField({ name: 'heroSubtext', title: 'Hero — Subtext (under description)', type: 'string' }),
    defineField({ name: 'heroCtaText', title: 'Hero — Primary CTA Text', type: 'string' }),
    defineField({ name: 'heroCtaLink', title: 'Hero — Primary CTA Link', type: 'string' }),
    defineField({ name: 'heroMicrocopy', title: 'Hero — CTA Microcopy', type: 'string' }),
    defineField({ name: 'heroSecondaryCtaText', title: 'Hero — Secondary CTA Text', type: 'string' }),
    defineField({
      name: 'heroStats',
      title: 'Hero — Stats Strip',
      type: 'array',
      of: [{
        type: 'object',
        name: 'heroStat',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        ]
      }]
    }),
    defineField({
      name: 'servicesHeadline',
      title: 'Services Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Services Section Description',
      type: 'text',
    }),
    defineField({
      name: 'whyItWorksLabel',
      title: 'Why It Works — Eyebrow Label',
      type: 'string',
    }),
    defineField({
      name: 'whyItWorksHighlight',
      title: 'Why It Works — Highlight Sentence',
      type: 'string',
    }),
    defineField({
      name: 'whyItWorksParagraph1',
      title: 'Why It Works — Paragraph 1',
      type: 'text',
    }),
    defineField({
      name: 'whyItWorksParagraph2',
      title: 'Why It Works — Paragraph 2',
      type: 'text',
    }),
    defineField({
      name: 'whyItWorksParagraph3',
      title: 'Why It Works — Paragraph 3',
      type: 'text',
    }),
    defineField({ name: 'testimonialsEyebrow', title: 'Testimonials — Eyebrow', type: 'string' }),
    defineField({ name: 'testimonialsHeading', title: 'Testimonials — Heading', type: 'string' }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA — Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA — Description',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA — Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'CTA — Button Href',
      type: 'string',
    }),
    defineField({
      name: 'meetJonImage',
      title: 'Meet Jon — Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
});
