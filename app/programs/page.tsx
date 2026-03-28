import { PageHero } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { ScrollFade } from "@/components/animations";
import { ProgramTrackCard } from "@/components/utilities/cards";
import { getProgramsPageContent } from "@/lib/sanity";
import type { ProgramsPageContent } from "@/lib/types";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Coaching Programs | Executive Presence & Quiet Command",
  description: "Three ways to build executive presence with Jon. Self-paced course, guided program, or 1-on-1 coaching — all rooted in physical presence and body-aware leadership.",
  openGraph: {
    title: "Coaching Programs | Jonchalant",
    description: "Three ways to build executive presence. Find the format that fits.",
    type: "website",
    url: "https://jonchalant.com/programs",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-programs-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Coaching Programs",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaching Programs | Jonchalant",
    description: "Three ways to build executive presence. Find the format that fits.",
    images: ["https://jonchalant.com/social/og-programs-1200x630.png"],
    creator: "@jonchalant",
  },
};

export default async function Programs() {
  const page = await getProgramsPageContent() as ProgramsPageContent | null;

  return (
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
                    <a href={page.ctaButtonHref} className="cta-section-button">
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
  );
}
