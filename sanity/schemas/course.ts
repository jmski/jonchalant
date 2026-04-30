import { defineType, defineField } from 'sanity'

async function isUnique(slug: string, context: any) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  const id = document._id.replace(/^drafts\./, '')
  const query = `!defined(*[_type == "course" && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`
  return client.fetch(query, {
    slug,
    draft: `drafts.${id}`,
    published: id,
  })
}

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'philosophy',
      title: 'Course Philosophy',
      type: 'text',
      rows: 4,
      description: 'The guiding philosophy behind the course',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'text',
      rows: 2,
      description: 'Who this course is designed for',
    }),
    defineField({
      name: 'totalEstimatedHours',
      title: 'Total Estimated Hours',
      type: 'number',
      description: 'Approximate total content hours (e.g., 213)',
    }),
    defineField({
      name: 'contentPillars',
      title: 'Content Emphasis Pillars',
      type: 'array',
      description: 'Core themes woven throughout every module',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Pillar Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'name' },
          },
        },
      ],
    }),
    defineField({
      name: 'lessonStructure',
      title: 'Standard Lesson Structure',
      type: 'array',
      description: 'The repeatable 5-part lesson format',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'number' }),
            defineField({ name: 'name', title: 'Step Name', type: 'string' }),
            defineField({ name: 'durationRange', title: 'Duration Range', type: 'string', description: 'e.g. "10–15 min"' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'durationRange' },
          },
        },
      ],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers',
        }),
      ],
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration',
      type: 'string',
      description: 'e.g. "4 hours", "6–8 hours"',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Course',
      type: 'boolean',
      initialValue: false,
      description: 'Surface this course in featured listings',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'module' }],
        },
      ],
      description: 'Ordered list of modules that make up this course',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    // ── Four Circles / new-course fields ─────────────────────────────────────
    defineField({
      name: 'courseType',
      title: 'Course Type',
      type: 'string',
      options: {
        list: [
          { title: 'Free (account-gated)', value: 'free-gated' },
          { title: 'Paid', value: 'paid' },
        ],
        layout: 'radio',
      },
      description: 'free-gated = free but requires account creation; paid = Stripe checkout required',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short tagline shown below the title on landing pages',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Override for the primary call-to-action on the landing page',
    }),
    defineField({
      name: 'whoThisIsFor',
      title: 'Who This Is For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points for the landing page — who this course is for',
    }),
    defineField({
      name: 'whatThisIsNot',
      title: 'What This Is Not',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points for managing expectations on the landing page',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      hidden: ({ document }: any) => document?.courseType !== 'paid',
      fields: [
        defineField({ name: 'amount', title: 'Amount', type: 'number' }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'USD',
        }),
        defineField({
          name: 'description',
          title: 'Pricing Description',
          type: 'string',
          description: 'e.g. "Self-paced" or "With weekly check-ins"',
        }),
      ],
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons (direct)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'courseLesson' }] }],
      description: 'Ordered lesson list for flat courses (e.g. Four Circles). Use modules[] for module-based courses.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      difficulty: 'difficulty',
      courseType: 'courseType',
      slug: 'slug.current',
      media: 'thumbnail',
    },
    prepare(selection: { title?: string; difficulty?: string; courseType?: string; slug?: string; media?: unknown }) {
      const subtitle =
        selection.difficulty ?? selection.courseType ?? 'No level set'
      return {
        title: selection.title || selection.slug || 'Untitled',
        subtitle,
        media: selection.media,
      }
    },
  },
})
