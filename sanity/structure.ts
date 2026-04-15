import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Pages
      S.listItem()
        .title('Pages')
        .child(
          S.list().title('Pages').items([
            S.documentTypeListItem('homePageContent').title('Home Page'),
            S.documentTypeListItem('aboutPage').title('About Page'),
            S.documentTypeListItem('contactPage').title('Contact Page'),
            S.documentTypeListItem('auditPage').title('Audit Page'),
            S.documentTypeListItem('foundationPage').title('Foundation Page'),
            S.documentTypeListItem('dancePageContent').title('Dance Page'),
            S.documentTypeListItem('programsPageContent').title('Programs Page'),
          ])
        ),

      S.divider(),

      // Blog
      S.listItem()
        .title('Blog')
        .child(
          S.list().title('Blog').items([
            S.documentTypeListItem('blogPost').title('Blog Posts'),
          ])
        ),

      S.divider(),

      // Portal
      S.listItem()
        .title('Portal')
        .child(
          S.list().title('Portal').items([
            S.documentTypeListItem('course').title('Courses'),
            S.documentTypeListItem('module').title('Modules'),
            S.documentTypeListItem('lesson').title('Lessons'),
          ])
        ),

      S.divider(),

      // Offerings & Social Proof
      S.listItem()
        .title('Offerings & Social Proof')
        .child(
          S.list().title('Offerings & Social Proof').items([
            S.documentTypeListItem('service').title('Service Offerings'),
            S.documentTypeListItem('caseStudy').title('Case Studies'),
            S.documentTypeListItem('testimonial').title('Client Testimonials'),
            S.documentTypeListItem('pressMention').title('Press Mentions'),
          ])
        ),

      S.divider(),

      // Dance & Media
      S.listItem()
        .title('Dance & Media')
        .child(
          S.list().title('Dance & Media').items([
            S.documentTypeListItem('danceCategory').title('Dance Categories'),
            S.documentTypeListItem('instagramReel').title('Instagram Reels'),
          ])
        ),

      S.divider(),

      // Config
      S.listItem()
        .title('Config')
        .child(
          S.list().title('Config').items([
            S.documentTypeListItem('contactInfo').title('Contact Information'),
            S.documentTypeListItem('emailOptIn').title('Email Opt-In Widget'),
            S.listItem()
              .title('Blog Config')
              .id('blogConfig')
              .child(
                S.document()
                  .schemaType('blogConfig')
                  .documentId('blogConfig')
              ),
          ])
        ),
    ])