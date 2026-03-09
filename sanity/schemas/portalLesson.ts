import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'portalLesson',
  title: 'Portal Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(100),
      description: 'e.g., "The Grounding Stance: Building Kinetic Confidence"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'technicalDescription',
      title: 'Technical Description',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(50),
      description: 'Detailed explanation of the technical content (this displays at the top of the lesson page)',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      validation: (Rule: any) => Rule.required().regex(/^[a-zA-Z0-9_-]{11}$/),
      description: 'Just the video ID (e.g., "dQw4w9WgXcQ" from https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
    }),
    defineField({
      name: 'socialLogic',
      title: 'Social Logic (Dance-to-Social Parallel)',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(50),
      description: 'Explanation of how this dance/movement concept applies to social presence and leadership',
    }),
    defineField({
      name: 'technicalNotes',
      title: 'Technical Notes Grid',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'column',
            title: 'Column Number',
            type: 'number',
            description: '1, 2, or 3 for three-column grid layout',
          },
          {
            name: 'label',
            title: 'Note Label',
            type: 'string',
            description: 'e.g., "Breathing Pattern", "Hand Position"',
          },
          {
            name: 'content',
            title: 'Note Content',
            type: 'text',
            description: 'Detailed explanation for this technical aspect',
          },
        ],
      }],
      description: 'Structured technical notes displayed in a grid beneath the video',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(180),
      description: 'Video length in minutes',
    }),
    defineField({
      name: 'order',
      title: 'Lesson Order',
      type: 'number',
      description: 'Lower numbers appear first within a module',
      validation: (Rule: any) => Rule.required().min(0),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      initialValue: 'intermediate',
    }),
    defineField({
      name: 'module',
      title: 'Parent Module',
      type: 'reference',
      to: [{ type: 'module' }],
      description: 'Which module does this lesson belong to?',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      difficulty: 'difficulty',
      duration: 'duration',
    },
    prepare(selection) {
      const { title, difficulty, duration } = selection
      return {
        title: title,
        subtitle: `${difficulty} • ${duration} min`,
      }
    },
  },
})
