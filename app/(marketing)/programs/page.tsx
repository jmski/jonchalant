import { PageHero } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { ScrollFade } from "@/components/animations";
import { ProgramTrackCard } from "@/components/utilities/cards";
import { getProgramsPageContent, getCaseStudies } from "@/lib/sanity";
import type { ProgramsPageContent } from "@/lib/types";
import { CaseStudyCard } from "@/components/utilities/cards";
import Script from 'next/script';
import { CourseSchema } from "@/lib/schema";
import FAQ from "@/components/shared/faq/FAQ";
import type { FAQItem } from "@/components/shared/faq/FAQ";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Coaching Programs | Executive Presence & Quiet Command",
  description: "Three ways to build executive presence with Jon. Self-paced course, guided program, or 1-on-1 coaching — all rooted in physical presence and body-aware leadership.",
  alternates: {
    canonical: 'https://jonchalant.com/programs',
  },
  openGraph: {
    title: "Coaching Programs | Jonchalant",
    description: "Three ways to build executive presence. Find the format that fits.",
    type: "website",
    url: "https://jonchalant.com/programs",
    siteName: "Jonchalant",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaching Programs | Jonchalant",
    description: "Three ways to build executive presence. Find the format that fits.",
    creator: "@jonchalant",
  },
};

const PROGRAMS_FAQS: FAQItem[] = [
  {
    question: 'How is this different from a typical leadership course?',
    answer: 'Most leadership training focuses on strategy, communication frameworks, or mindset. This coaching starts with the physical — how you hold yourself, how you move through a room, what your body communicates before you speak. Executive presence is mostly non-verbal. We work where the signal actually lives.',
  },
  {
    question: 'Is this coaching for me if I\'m not an executive yet?',
    answer: 'Yes. The clients who benefit most are high-performers who are ready to move into senior roles, recently promoted managers navigating a visibility shift, and professionals who consistently get overlooked despite strong output. You don\'t need a title for this work to matter.',
  },
  {
    question: 'What results should I expect, and by when?',
    answer: 'Most clients notice a shift in how rooms respond to them within 4–6 weeks — more attention held, less second-guessing, more decisive energy. Measurable outcomes (promotions, performance reviews, speaking invitations) typically follow 8–12 weeks in. The speed depends on how actively you apply the frameworks between sessions.',
  },
  {
    question: 'Can I do this remotely?',
    answer: 'All programs run remotely via video call. The movement-based work adapts well to remote delivery — in some ways it\'s more effective, because you\'re working in your actual environment rather than a coaching studio.',
  },
  {
    question: 'What if I need to pause or reschedule?',
    answer: 'Life happens. Sessions can be rescheduled with 24 hours\' notice. For extended pauses (travel, family, work crunch), we\'ll agree on a pause structure that protects your momentum without losing your spot.',
  },
]

export default async function Programs() {
  const [page, caseStudies] = await Promise.all([
    getProgramsPageContent() as Promise<ProgramsPageContent | null>,
    getCaseStudies(true).catch(() => []),
  ]);

  return (
    <>
      <Script
        id="programs-course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CourseSchema({
            name: page?.heroHeadline ?? 'Quiet Command Coaching Programs',
            description: page?.heroSubheading ?? 'Executive presence coaching for introverts — self-paced course, guided program, and 1-on-1 coaching rooted in body-aware leadership.',
          })),
        }}
      />
    <PageTransition animation="fade">
      {/* HERO */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <PageHero
            eyebrow={page?.heroEyebrow ?? ''}
            headline={page?.heroHeadline ?? ''}
            subheading={page?.heroSubheading ?? ''}
            rightColumn={
              (page?.whoForHeading || page?.whoForBody?.length) ? (
                <div className="programs-hero-aside">
                  {page.whoForHeading && (
                    <h2 className="programs-hero-aside-heading">{page.whoForHeading}</h2>
                  )}
                  {page.whoForBody?.map((paragraph, i) => (
                    <p key={i} className="programs-hero-aside-body">{paragraph}</p>
                  ))}
                </div>
              ) : undefined
            }
          />
        </SectionContent>
      </SectionWrapper>

      {/* OFFER CARDS */}
      <SectionWrapper variant="secondary">
        <SectionContent>
          {(page?.offersEyebrow || page?.offersHeading || page?.offersSubtext) && (
            <ScrollFade>
              <div className="programs-offers-header">
                {page.offersEyebrow && (
                  <p className="programs-offers-eyebrow">{page.offersEyebrow}</p>
                )}
                {page.offersHeading && (
                  <h2 className="programs-offers-heading">{page.offersHeading}</h2>
                )}
                {page.offersSubtext && (
                  <p className="programs-offers-subtext">{page.offersSubtext}</p>
                )}
              </div>
            </ScrollFade>
          )}
          <div className="programs-tracks-grid">
            {page?.offerCards?.map((card, idx) => (
              <ScrollFade key={idx} delay={idx * 80}>
                <ProgramTrackCard
                  title={card.title}
                  eyebrow={card.eyebrow}
                  price={card.price}
                  description={card.description}
                  includes={card.includes ?? []}
                  ctaText={card.ctaText}
                  ctaHref={card.ctaHref}
                  isFeatured={card.isFeatured ?? false}
                />
              </ScrollFade>
            ))}
          </div>
        </SectionContent>
      </SectionWrapper>

      {/* CASE STUDIES */}
      {caseStudies.length > 0 && (
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="programs-case-studies">
              <div className="programs-case-studies-header">
                <p className="programs-faq-eyebrow">Client Results</p>
                <h2 className="programs-case-studies-title">Before &amp; after</h2>
                <p className="programs-case-studies-body">
                  These are real clients. Real situations. The names and some details have been changed, but the challenges and outcomes are accurate.
                </p>
              </div>
              <div className="programs-case-studies-grid">
                {caseStudies.map((cs: any) => (
                  <CaseStudyCard
                    key={cs._id}
                    title={cs.title}
                    clientName={cs.clientName}
                    industry={cs.industry}
                    challenge={cs.challenge}
                    solution={cs.solution}
                    results={cs.results}
                    image={cs.image}
                    slug={cs.slug}
                  />
                ))}
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>
      )}

      {/* FAQ */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <section className="programs-faq">
            <div className="programs-faq-header">
              <p className="programs-faq-eyebrow">Questions</p>
              <h2 className="programs-faq-title">Common questions</h2>
            </div>
            <FAQ items={PROGRAMS_FAQS} />
          </section>
        </SectionContent>
      </SectionWrapper>

      {/* CTA */}
      {(page?.ctaHeading || page?.ctaButtonText) && (
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <ScrollFade>
              <div className="cta-section">
                <div className="cta-section-left">
                  {page.ctaHeading && (
                    <h2 className="cta-section-title">{page.ctaHeading}</h2>
                  )}
                  {page.ctaButtonText && page.ctaButtonHref && (
                    <a href={page.ctaButtonHref} className="btn btn-primary">
                      {page.ctaButtonText}
                    </a>
                  )}
                  {page.ctaMicrocopy && (
                    <p className="programs-cta-microcopy">{page.ctaMicrocopy}</p>
                  )}
                </div>
                {page.ctaDescription && (
                  <div className="cta-section-description">{page.ctaDescription}</div>
                )}
              </div>
            </ScrollFade>
          </SectionContent>
        </SectionWrapper>
      )}
    </PageTransition>
    </>
  );
}
