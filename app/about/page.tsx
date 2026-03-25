import { CTA } from "@/components/sections";
import { Hero as AboutHero, Origin, TurningPoint, MethodologyNarrative, WhyExists, WhoFor } from "@/components/sections/about";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import type { Metadata } from 'next';
import { getAboutPageContent } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Jon | Leadership Coach & Choreographer",
  description: "Learn how Jon combines professional dance choreography with leadership development to help introverts build executive presence, quiet command, and confident communication skills.",
  keywords: "leadership coach introverts, choreographer, body-aware leadership, executive presence coach, introvert strengths, movement-based coaching",
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
  let aboutContent = null;

  try {
    aboutContent = await getAboutPageContent();
  } catch (error) {
    console.warn('Failed to fetch about content from Sanity, using fallback data:', error);
  }

  return (
    <div className="about-main">
      <PageTransition animation="fade">

        {/* 1 — PERSONAL INTRO */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <AboutHero
              headline={aboutContent?.heroHeadline}
              description={aboutContent?.heroDescription}
            />
          </SectionContent>
        </SectionWrapper>

        {/* 2 — ORIGIN STORY: why movement + leadership */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <Origin
              label={aboutContent?.originSectionLabel}
              headline={aboutContent?.originSectionHeadline}
              description={aboutContent?.originSectionDescription}
              highlight={aboutContent?.originSectionHighlight}
            />
          </SectionContent>
        </SectionWrapper>

        {/* 3 — TURNING POINT: school performance story */}
        {aboutContent?.turningPointHeadline && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <TurningPoint
                headline={aboutContent.turningPointHeadline}
                body={aboutContent.turningPointBody ?? ''}
                highlight={aboutContent.turningPointHighlight}
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 4 — METHODOLOGY: freestyle/choreography narrative (secondary bg via SectionWrapper) */}
        {aboutContent?.methodologyHeadline && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <MethodologyNarrative
                headline={aboutContent.methodologyHeadline}
                body={aboutContent.methodologyBody ?? ''}
                highlight={aboutContent.methodologyHighlight}
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 5 — WHY THIS EXISTS */}
        {aboutContent?.whyExistsHeadline && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <WhyExists
                headline={aboutContent.whyExistsHeadline}
                body={aboutContent.whyExistsBody ?? ''}
                highlight={aboutContent.whyExistsHighlight}
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 6 — WHO THIS IS FOR */}
        {aboutContent?.whoForHeadline && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <WhoFor
                headline={aboutContent.whoForHeadline}
                body={aboutContent.whoForBody ?? ''}
                highlight={aboutContent.whoForHighlight}
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* CTA — driven by Sanity closing* fields with hardcoded fallbacks */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <CTA
              title={aboutContent?.closingHeadline ?? "Your Presence Matters. Let's Amplify It."}
              description={aboutContent?.closingBody ?? "Coaching works best when you're ready. This free Presence Audit shows exactly where your executive presence stands today — and the fastest path to where you want to be."}
              buttonText={aboutContent?.ctaButtonText ?? "Get Your Free Audit Now"}
              buttonLink="/contact"
            />
          </SectionContent>
        </SectionWrapper>

      </PageTransition>
    </div>
  );
}
