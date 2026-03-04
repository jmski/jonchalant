import { CTASection } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { TextLink } from "@/components/typography";
import { FluidShape } from "@/components/decorative";
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getPortfolioItems, getFeaturedPortfolioItem } from "@/lib/sanity";
import '@/app/css/dance.css';

export const metadata: Metadata = {
  title: "Dance Choreography Portfolio | Hip-Hop & Contemporary | Jonchalant",
  description: "Explore professional choreography portfolio with 30+ original hip-hop and contemporary videos. Premium choreography for brands, events, and performers.",
  keywords: "dance choreography, hip-hop choreography, contemporary dance, freestyle dance, professional choreographer, dance videos, movement coaching",
  openGraph: {
    title: "Dance Choreography Portfolio | Jonchalant",
    description: "Professional choreography work: hip-hop, contemporary, freestyle, and original pieces.",
    type: "website",
    url: "https://jonchalant.com/dance",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-dance-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Dance Choreography Portfolio",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dance Choreography Portfolio | Jonchalant",
    description: "Professional choreography: hip-hop, contemporary, freestyle, and original pieces.",
    images: ["https://jonchalant.com/social/og-dance-1200x630.png"],
    creator: "@jonchalant",
  },
};

// Below-fold dynamic import
const DanceFilter = dynamic(() => import('@/components/content').then(mod => ({ default: mod.DanceFilter })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

const CTASectionDynamic = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

const FeaturedVideoHero = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.FeaturedVideoHero })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

import { DANCE_FILTER_CATEGORIES } from "@/lib/pageContent";

export default async function Dance() {
  let dancePortfolio: any[] = [];
  let featuredItem: any = null;

  try {
    // Try to fetch from Sanity CMS
    const sanityData = await getPortfolioItems();
    if (sanityData && sanityData.length > 0) {
      dancePortfolio = sanityData;
    }

    // Fetch featured item for hero
    const featured = await getFeaturedPortfolioItem();
    if (featured) {
      featuredItem = featured;
    }
  } catch (error) {
    console.warn('Failed to fetch portfolio from Sanity, using fallback data:', error);
    // Falls back to MOCK_DANCEDATA if Sanity fails
  }

  return (
    <div className="dance-main">
      <PageTransition animation="fade">
        {/* HERO SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            {featuredItem && (
              <FeaturedVideoHero
                title={featuredItem.title}
                category={featuredItem.category}
                description={featuredItem.description}
                videoUrl={featuredItem.videoUrl}
                duration={featuredItem.duration}
                publishedAt={featuredItem.publishedAt}
              />
            )}
          </SectionContent>
        </SectionWrapper>

        {/* PORTFOLIO FILTER */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section>
              <DanceFilter items={dancePortfolio} categories={DANCE_FILTER_CATEGORIES} />
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* APPROACH LINK */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="dance-approach-section">
              <h2 className="dance-approach-title">Why Movement Matters for Leadership</h2>
              <p className="dance-approach-description">
                Every piece in this portfolio demonstrates principles that directly transfer to executive presence. Your body communicates before your words do.
              </p>
              <p className="dance-approach-links">
                Learn more about how choreography principles translate to professional leadership in the{' '}
                <TextLink href="/lessons">
                  leadership lessons
                </TextLink>
                {' '}or{' '}
                <TextLink href="/about">
                  about my approach
                </TextLink>
                .
              </p>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section>
              <CTASection
                title="Ready to Integrate Movement into Your Leadership?"
                description="See how dance principles translate directly into professional presence, confidence, and command. Let's explore what's possible."
                buttonText="EXPLORE COACHING"
                buttonLink="/contact"
              />
            </section>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
