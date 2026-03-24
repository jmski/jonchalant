import { CTA, Stats } from "@/components/sections";
import { Hero as AboutHero, Origin, Services as AboutServices, Philosophy, Introvert, TurningPoint, MethodologyNarrative, WhyExists, WhoFor } from "@/components/sections/about";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import type { Metadata } from 'next';
import { getAboutPageContent, getServices } from "@/lib/sanity";

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
  let services = [];
  let philosophies = [];
  let introvertTraits = [];

  try {
    const [sanityAbout, sanityServices] = await Promise.all([
      getAboutPageContent(),
      getServices()
    ]);
    
    if (sanityAbout) {
      aboutContent = sanityAbout;
      if (sanityAbout.philosophies) philosophies = sanityAbout.philosophies;
      if (sanityAbout.introvertTraits) introvertTraits = sanityAbout.introvertTraits;
    }
    
    if (sanityServices && sanityServices.length > 0) services = sanityServices;
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
              headline={aboutContent?.originSectionHeadline}
              description={aboutContent?.originSectionDescription}
              phases={aboutContent?.phases}
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
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 5 — METHODOLOGY: philosophy card grid */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <Philosophy philosophies={philosophies} />
          </SectionContent>
        </SectionWrapper>

        {/* 6 — CREDENTIALS: track record in numbers */}
        <SectionWrapper variant="tertiary" className="section-wrapper--indigo">
          <SectionContent>
            <Stats
              stats={aboutContent?.stats || []}
              heading="The Work in Numbers"
              description="Not vanity metrics. These are the outcomes that matter to real people in real jobs."
              columns={3}
            />
          </SectionContent>
        </SectionWrapper>

        {/* 7 — WHY THIS EXISTS */}
        {aboutContent?.whyExistsHeadline && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <WhyExists
                headline={aboutContent.whyExistsHeadline}
                body={aboutContent.whyExistsBody ?? ''}
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 8 — WHO THIS IS FOR */}
        {aboutContent?.whoForHeadline && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <WhoFor
                headline={aboutContent.whoForHeadline}
                body={aboutContent.whoForBody ?? ''}
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 9 — CREDENTIALS: what we actually work on */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <AboutServices services={services} />
          </SectionContent>
        </SectionWrapper>

        {/* 10 — VALUES: the introvert advantage */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <Introvert traits={introvertTraits} />
          </SectionContent>
        </SectionWrapper>

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
