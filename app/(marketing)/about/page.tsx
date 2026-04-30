import { AboutStoryScroll } from "@/components/sections";
import { WhoFor } from "@/components/sections/about";
import CTA from "@/components/shared/cta/CTA";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { ScrollFade } from "@/components/animations";
import type { Metadata } from 'next';
import { getPageAbout } from "@/lib/sanity";
import type { PageAbout } from "@/lib/types";

export const metadata: Metadata = {
  title: "About Jon | Leadership Coach & Choreographer",
  description: "Jon spent a decade as a professional choreographer before realising the same skills that make a dancer command a stage transfer to every high-stakes professional moment.",
  keywords: "leadership coach introverts, choreographer, body-aware leadership, executive presence coach, introvert strengths, movement-based coaching",
  alternates: {
    canonical: 'https://jonchalant.com/about',
  },
  openGraph: {
    title: "About Jon | Leadership Coach & Choreographer | Jonchalant",
    description: "Dance-trained leadership coach specializing in executive presence for introverts and shy professionals.",
    type: "website",
    url: "https://jonchalant.com/about",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-about-1200x630.png",
      width: 1200,
      height: 630,
      alt: "About Jon - Leadership Coach & Choreographer",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jon | Leadership Coach & Choreographer",
    description: "Dance-trained leadership coach specializing in executive presence for introverts.",
    images: ["https://jonchalant.com/social/og-about-1200x630.png"],
    creator: "@jonchalant",
  },
};

export default async function About() {
  let pageAbout: PageAbout | null = null;

  try {
    pageAbout = await getPageAbout();
  } catch (error) {
    console.warn('Failed to fetch about content from Sanity, using fallback data:', error);
  }

  return (
    <div className="about-main">
      <PageTransition animation="fade">

        {/* 1 — STORY SCROLL */}
        <SectionWrapper variant="tertiary">
          <AboutStoryScroll beats={pageAbout?.storyBeats} />
        </SectionWrapper>

        {/* 2 — WHO THIS IS FOR */}
        {pageAbout?.whoFor?.headline && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <ScrollFade>
                <WhoFor
                  image={pageAbout.whoFor.image}
                  headline={pageAbout.whoFor.headline}
                  body={pageAbout.whoFor.body ?? ''}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 3 — CTA */}
        {pageAbout?.cta?.headline && (
          <SectionWrapper variant="tertiary">
            <SectionContent>
              <CTA
                title={pageAbout.cta.headline}
                description={pageAbout.cta.body ?? ''}
                sub={pageAbout.cta.microcopy}
                buttonText={pageAbout.cta.primaryCta?.label ?? 'Discover Your Ikigai'}
                buttonLink={pageAbout.cta.primaryCta?.href ?? '/ikigai'}
              />
            </SectionContent>
          </SectionWrapper>
        )}

      </PageTransition>
    </div>
  );
}
