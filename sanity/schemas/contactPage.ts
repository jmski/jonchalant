import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page Content',
  type: 'document',
  fields: [
    // ── Audit prompt block ─────────────────────────────────────────────────────
    defineField({
      name: 'auditPromptBadge',
      title: 'Audit Prompt — Badge Text',
      type: 'string',
      description: 'Short label shown in the pill (e.g. "Start here")',
    }),
    defineField({
      name: 'auditPromptHeadline',
      title: 'Audit Prompt — Headline',
      type: 'string',
    }),
    defineField({
      name: 'auditPromptBody',
      title: 'Audit Prompt — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'auditPromptButtonText',
      title: 'Audit Prompt — Button Label',
      type: 'string',
    }),
    defineField({
      name: 'auditPromptNote',
      title: 'Audit Prompt — Note Below Button',
      type: 'string',
      description: 'Small text under the CTA (e.g. "No account needed. Free.")',
    }),
    defineField({
      name: 'auditStats',
      title: 'Audit Stats',
      type: 'array',
      description: 'Three stats shown alongside the audit prompt (number + label pairs)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        },
      ],
    }),

    // ── Coaching path ──────────────────────────────────────────────────────────
    defineField({
      name: 'coachingPathHeading',
      title: 'Coaching Path — Heading',
      type: 'string',
    }),
    defineField({
      name: 'coachingPathBody',
      title: 'Coaching Path — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coachingCalendlyHref',
      title: 'Coaching Path — Calendly URL',
      type: 'string',
      description: 'Link for the "Schedule a Call" button. Use "#" until Calendly is set up.',
    }),
    defineField({
      name: 'coachingCalendlyLabel',
      title: 'Coaching Path — Button Label',
      type: 'string',
    }),

    // ── Sidebar notes ──────────────────────────────────────────────────────────
    defineField({
      name: 'sidebarHeading',
      title: 'Sidebar — Heading',
      type: 'string',
    }),
    defineField({
      name: 'sidebarItems',
      title: 'Sidebar — Bullet Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Bold Label', type: 'string' }),
            defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'sidebarEmailText',
      title: 'Sidebar — Email Paragraph',
      type: 'text',
      rows: 2,
      description: 'Text in the sidebar footer referencing the email address',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page Content' }
    },
  },
})
