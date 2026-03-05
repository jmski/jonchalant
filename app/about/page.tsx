import { CTASection, StatsSection, AboutHeroSection, AboutOriginSection, AboutServicesSection, AboutPhilosophySection, AboutIntrovertSection, FAQSection } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import type { Metadata } from 'next';
import { getAboutPageContent, getServices } from "@/lib/sanity";
import '@/app/css/about.css';

export const metadata: Metadata = {
  title: "About Jon | Leadership Coach & Choreographer | Jonchalant",
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
      if (sanityAbout.philosophies) {
        philosophies = sanityAbout.philosophies;
      }
      if (sanityAbout.introvertTraits) {
        introvertTraits = sanityAbout.introvertTraits;
      }
    }
    
    if (sanityServices && sanityServices.length > 0) {
      services = sanityServices;
    }
  } catch (error) {
    console.warn('Failed to fetch about content from Sanity, using fallback data:', error);
  }

  return (
    <div className="about-main">
      <PageTransition animation="fade">
        {/* HERO SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <AboutHeroSection
              headline={aboutContent?.heroHeadline}
              description={aboutContent?.heroDescription}
            />
          </SectionContent>
        </SectionWrapper>

        {/* ORIGIN STORY - 60/40 LAYOUT */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <AboutOriginSection
              headline={aboutContent?.originSectionHeadline}
              description={aboutContent?.originSectionDescription}
              phases={aboutContent?.phases}
            />
          </SectionContent>
        </SectionWrapper>

        {/* KEY STATS */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <StatsSection 
              stats={aboutContent?.stats || []} 
              heading="Proven Results From Real Leaders"
              description="These outcomes matter because they represent how our clients show up differently—at work, with their teams, and in their own eyes."
              columns={3}
            />
          </SectionContent>
        </SectionWrapper>

        {/* WHAT I COACH - Now fetching from Sanity services */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <AboutServicesSection services={services} />
          </SectionContent>
        </SectionWrapper>

        {/* MY PHILOSOPHY */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <AboutPhilosophySection philosophies={philosophies} />
          </SectionContent>
        </SectionWrapper>

        {/* INTROVERT ADVANTAGE */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <AboutIntrovertSection traits={introvertTraits} />
          </SectionContent>
        </SectionWrapper>

        {/* FAQ SECTION */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <FAQSection />
          </SectionContent>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <CTASection
              title="Your Presence Matters. Let's Amplify It."
              description="Coaching works best when you're ready. This free Presence Audit shows exactly where your executive presence stands today—and the fastest path to where you want to be."
              buttonText="Get Your Free Audit Now"
              buttonLink="/contact"
            />
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
