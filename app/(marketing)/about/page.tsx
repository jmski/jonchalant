import { CTA, AboutBento } from "@/components/sections";
import { Origin, TurningPoint, MethodologyNarrative, WhyExists, WhoFor } from "@/components/sections/about";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { ScrollFade } from "@/components/animations";
import type { Metadata } from 'next';
import { getAboutPageContent } from "@/lib/sanity";

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
            <AboutBento tiles={aboutContent?.bentoTiles} />
          </SectionContent>
        </SectionWrapper>

        {/* 2 — ORIGIN STORY: cinematic scrollytelling (full-bleed, no SectionContent) */}
        <SectionWrapper variant="tertiary">
          <Origin
            label={aboutContent?.originSectionLabel}
            headline={aboutContent?.originSectionHeadline}
            description={aboutContent?.originSectionDescription}
            highlight={aboutContent?.originSectionHighlight}
            phases={aboutContent?.originPhases}
            anchorWord={aboutContent?.originSectionAnchorWord}
          />
        </SectionWrapper>

        {/* 3 — TURNING POINT: school performance story */}
        {aboutContent?.turningPointHeadline && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <ScrollFade>
              <TurningPoint
                headline={aboutContent.turningPointHeadline}
                body={aboutContent.turningPointBody ?? ''}
                highlight={aboutContent.turningPointHighlight}
              />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 4 — METHODOLOGY: freestyle/choreography narrative (tertiary bg = intellectual core) */}
        {aboutContent?.methodologyHeadline && (
          <SectionWrapper variant="tertiary">
            <SectionContent>
              <ScrollFade>
              <MethodologyNarrative
                headline={aboutContent.methodologyHeadline}
                body={aboutContent.methodologyBody ?? ''}
                highlight={aboutContent.methodologyHighlight}
                philosophyImage={aboutContent.philosophyImage}
              />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 5 — WHY THIS EXISTS */}
        {aboutContent?.whyExistsHeadline && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <ScrollFade>
              <WhyExists
                headline={aboutContent.whyExistsHeadline}
                body={aboutContent.whyExistsBody ?? ''}
                highlight={aboutContent.whyExistsHighlight}
                kidsImage={aboutContent.originImage}
              />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 6 — WHO THIS IS FOR */}
        {aboutContent?.whoForHeadline && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <ScrollFade>
              <WhoFor
                headline={aboutContent.whoForHeadline}
                body={aboutContent.whoForBody ?? ''}
                highlight={aboutContent.whoForHighlight}
              />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* CTA — driven by Sanity closing* fields with hardcoded fallbacks */}
        {/* TODO: Trim closingBody in Sanity Studio — keep only up to "That's your foundation." Remove "We start with the body..." onwards */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <CTA
              title={aboutContent?.closingHeadline ?? "Find the work you were meant for."}
              sub={aboutContent?.closingBody ?? "Start with eight questions. They take ten minutes. If the results tell you something useful, keep going."}
              description={aboutContent?.closingBody ?? "Start with eight questions. They take ten minutes. If the results tell you something useful, keep going."}
              buttonText={aboutContent?.ctaButtonText ?? "Discover Your Ikigai"}
              buttonLink="/ikigai"
              previewItems={[
                { number: '01', text: 'Eight questions, ten minutes — ungated and free' },
                { number: '02', text: 'Results identify which of the four ikigai circles are strong or missing' },
                { number: '03', text: 'Saves to your portal if you have an account' },
              ]}
            />
          </SectionContent>
        </SectionWrapper>

      </PageTransition>
    </div>
  );
}
