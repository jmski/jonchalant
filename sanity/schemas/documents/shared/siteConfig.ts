import { defineType, defineField, defineArrayMember } from 'sanity'
import { BODY_DESCRIPTION, HEADLINE_DESCRIPTION } from '../../lib/fieldDescriptions'
import { headlineValidation } from '../../lib/headlineValidation'

export default defineType({
  name: 'siteConfig',
  title: 'Site configuration',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fieldsets: [
    { name: 'nav', title: 'Navigation', options: { collapsible: true, collapsed: true } },
    { name: 'footer', title: 'Footer', options: { collapsible: true, collapsed: true } },
    {
      name: 'formMicrocopy',
      title: 'Form microcopy',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'notFoundPage',
      title: '404 page',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'authPages',
      title: 'Auth pages',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ----- nav -----
    defineField({
      name: 'wordmark',
      title: 'Wordmark',
      type: 'string',
      fieldset: 'nav',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desktopLinks',
      title: 'Desktop links',
      type: 'array',
      fieldset: 'nav',
      of: [{ type: 'link' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'rightSideLinks',
      title: 'Right-side links',
      type: 'array',
      fieldset: 'nav',
      of: [{ type: 'link' }],
    }),
    defineField({
      name: 'mobileLinks',
      title: 'Mobile links',
      type: 'array',
      fieldset: 'nav',
      of: [{ type: 'link' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'mobilePersistentCta',
      title: 'Mobile persistent CTA',
      type: 'cta',
      fieldset: 'nav',
      description: 'The persistent mobile CTA — typically "Discover Your Ikigai".',
      validation: (Rule) => Rule.required(),
    }),

    // ----- footer -----
    defineField({
      name: 'brandLine',
      title: 'Brand line',
      type: 'string',
      fieldset: 'footer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      fieldset: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          title: 'Footer column',
          fields: [
            defineField({
              name: 'header',
              title: 'Header',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{ type: 'link' }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: { select: { title: 'header' } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: 'accountSection',
      title: 'Account section',
      type: 'object',
      fieldset: 'footer',
      fields: [
        defineField({ name: 'header', title: 'Header', type: 'string' }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [{ type: 'link' }],
        }),
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      fieldset: 'footer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'privacyLink',
      title: 'Privacy link',
      type: 'cta',
      fieldset: 'footer',
      validation: (Rule) => Rule.required(),
    }),

    // ----- formMicrocopy -----
    defineField({
      name: 'successStates',
      title: 'Success states',
      type: 'array',
      fieldset: 'formMicrocopy',
      description:
        'Canonical success messages keyed by form: general, newsletter, starterGuide, contact.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'successState',
          title: 'Success state',
          fields: [
            defineField({
              name: 'key',
              title: 'Key',
              type: 'string',
              options: {
                list: [
                  { title: 'General', value: 'general' },
                  { title: 'Newsletter', value: 'newsletter' },
                  { title: 'Starter Guide', value: 'starterGuide' },
                  { title: 'Contact', value: 'contact' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'message',
              title: 'Message',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'key', subtitle: 'message' } },
        }),
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
    defineField({
      name: 'submitError',
      title: 'Submit error',
      type: 'string',
      fieldset: 'formMicrocopy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'validation',
      title: 'Validation messages',
      type: 'object',
      fieldset: 'formMicrocopy',
      fields: [
        defineField({
          name: 'required',
          title: 'Required',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'invalidEmail',
          title: 'Invalid email',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'tooShort',
          title: 'Too short',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'tooLong',
          title: 'Too long',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loadingLabel',
      title: 'Loading label',
      type: 'string',
      fieldset: 'formMicrocopy',
      validation: (Rule) => Rule.required(),
    }),

    // ----- notFoundPage -----
    defineField({
      name: 'notFoundHeadline',
      title: 'Headline',
      type: 'string',
      fieldset: 'notFoundPage',
      description: HEADLINE_DESCRIPTION,
      validation: headlineValidation,
    }),
    defineField({
      name: 'notFoundBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      fieldset: 'notFoundPage',
      description: BODY_DESCRIPTION,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notFoundLinks',
      title: 'Links',
      type: 'array',
      fieldset: 'notFoundPage',
      of: [{ type: 'link' }],
      validation: (Rule) =>
        Rule.required().length(3).error('Exactly three links are required.'),
    }),
    defineField({
      name: 'notFoundMicrocopy',
      title: 'Microcopy',
      type: 'string',
      fieldset: 'notFoundPage',
      validation: (Rule) => Rule.required(),
    }),

    // ----- authPages -----
    defineField({
      name: 'signIn',
      title: 'Sign in',
      type: 'object',
      fieldset: 'authPages',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subhead',
          title: 'Subhead',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'primaryLabel',
          title: 'Primary button label',
          type: 'string',
          description: 'E.g. "Sign in".',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'magicLinkLabel',
          title: 'Magic link label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'forgotPasswordLabel',
          title: 'Forgot password label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'signUp',
      title: 'Sign up',
      type: 'object',
      fieldset: 'authPages',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subhead',
          title: 'Subhead',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'submitLabel',
          title: 'Submit button label',
          type: 'string',
          description: 'E.g. "Create account".',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site configuration (nav, footer, microcopy)' }),
  },
})
