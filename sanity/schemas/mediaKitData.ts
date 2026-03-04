import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'mediaKitData',
  title: 'Media Kit Data',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Media Kit',
      readOnly: true,
    }),
    defineField({
      name: 'keyMetrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            defineField({
              name: 'label',
              title: 'Metric Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Metric Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'change',
              title: 'Year-over-Year Change',
              type: 'string',
              description: 'e.g., "+15% YoY"',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ]
        }
      ],
    }),
    defineField({
      name: 'platforms',
      title: 'Platform Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'platform',
          fields: [
            defineField({
              name: 'name',
              title: 'Platform Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'handle',
              title: 'Handle',
              type: 'string',
            }),
            defineField({
              name: 'followers',
              title: 'Followers',
              type: 'string',
            }),
            defineField({
              name: 'avgViews',
              title: 'Avg Views per Post',
              type: 'string',
            }),
            defineField({
              name: 'category',
              title: 'Content Category',
              type: 'string',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contentCategories',
      title: 'Content Category Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentCategory',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'percentage',
              title: 'Percentage',
              type: 'number',
              validation: (Rule) => Rule.required().min(0).max(100),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'audience',
      title: 'Audience Demographics',
      type: 'object',
      fields: [
        defineField({
          name: 'age',
          title: 'Age Distribution',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'ageGroup',
              fields: [
                defineField({
                  name: 'range',
                  title: 'Age Range',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'percentage',
                  title: 'Percentage',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0).max(100),
                }),
              ]
            }
          ],
        }),
        defineField({
          name: 'gender',
          title: 'Gender Distribution',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'genderGroup',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Gender Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'percentage',
                  title: 'Percentage',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0).max(100),
                }),
              ]
            }
          ],
        }),
        defineField({
          name: 'locations',
          title: 'Geographic Distribution',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'location',
              fields: [
                defineField({
                  name: 'country',
                  title: 'Country',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'percentage',
                  title: 'Percentage',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0).max(100),
                }),
              ]
            }
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
});
