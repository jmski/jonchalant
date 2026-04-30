// Document model:
//   - Page singletons (page*): one per route, listed in "Pages" group
//   - Reusable singletons: referenced from multiple pages, listed in "Shared content"
//   - Listed types: collections (posts, courses, case studies, testimonials)

import type { StructureResolver, StructureBuilder } from 'sanity/structure'

// ─────────────────────────────────────────────────────────────────────────────
// Singleton helper: locks document ID to the schema name. Belt-and-suspenders
// alongside __experimental_actions on each singleton schema — desk lock prevents
// navigation to a duplicate; __experimental_actions blocks create/delete.
// ─────────────────────────────────────────────────────────────────────────────
const singleton = (
  S: StructureBuilder,
  schemaType: string,
  title: string,
) =>
  S.listItem()
    .id(schemaType)
    .title(title)
    .schemaType(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ── Pages (IA order, not alphabetical) ─────────────────────────────────
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'pageHome', 'Home'),
              singleton(S, 'pageAbout', 'About'),
              singleton(S, 'pageIkigai', 'Ikigai'),
              singleton(S, 'pageFoundation', 'Foundation'),
              singleton(S, 'pagePrograms', 'Programs'),
              singleton(S, 'pageLessons', 'Lessons'),
              singleton(S, 'pageBlog', 'Blog'),
              singleton(S, 'pageContact', 'Contact'),
              singleton(S, 'pageAudit', 'Audit'),
            ]),
        ),

      // ── Shared content ─────────────────────────────────────────────────────
      S.listItem()
        .title('Shared content')
        .child(
          S.list()
            .title('Shared content')
            .items([
              singleton(S, 'starterGuideCapture', 'Foundation Starter Guide capture'),
              singleton(S, 'newsletterCapture', 'Newsletter capture (Tuesdays)'),
              singleton(S, 'auditCta', 'Audit CTA'),
              singleton(S, 'pillarSet', 'Pillar definitions'),
              singleton(S, 'fourCirclesSet', 'Four Circles definitions'),
              singleton(S, 'siteConfig', 'Site configuration (nav, footer, microcopy)'),
            ]),
        ),

      S.divider(),

      // ── Listed types ───────────────────────────────────────────────────────
      S.documentTypeListItem('blogPost')
        .title('Posts')
        .child(
          S.documentTypeList('blogPost')
            .title('Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),
      S.documentTypeListItem('course').title('Courses'),
      S.documentTypeListItem('caseStudy').title('Case studies'),
      S.documentTypeListItem('testimonial').title('Testimonials'),

      S.divider(),

      // ── Other content (utility/listed types not yet categorized) ───────────
      S.listItem()
        .title('Other content')
        .child(
          S.list()
            .title('Other content')
            .items([
              S.documentTypeListItem('service').title('Services'),
              S.documentTypeListItem('module').title('Modules'),
              S.documentTypeListItem('lesson').title('Lessons (legacy listing)'),
              S.documentTypeListItem('courseLesson').title('Course lessons'),
              S.documentTypeListItem('ikigaiQuiz').title('Ikigai quiz (data)'),
              S.documentTypeListItem('pressMention').title('Press mentions'),
              S.documentTypeListItem('emailOptIn').title('Email opt-in widget'),
              S.documentTypeListItem('contactInfo').title('Contact info'),
              singleton(S, 'blogConfig', 'Blog config'),
            ]),
        ),

      S.divider(),

      // ── Legacy (to be removed in Prompt E) ─────────────────────────────────
      S.listItem()
        .title('Legacy (to be removed)')
        .child(
          S.list()
            .title('Legacy (to be removed)')
            .items([
              S.documentTypeListItem('homePageContent').title('Home Page (legacy)'),
              S.documentTypeListItem('aboutPage').title('About Page (legacy)'),
              S.documentTypeListItem('contactPage').title('Contact Page (legacy)'),
              S.documentTypeListItem('auditPage').title('Audit Page (legacy)'),
              S.documentTypeListItem('foundationPage').title('Foundation Page (legacy)'),
              S.documentTypeListItem('programsPageContent').title('Programs Page (legacy)'),
            ]),
        ),
    ])
