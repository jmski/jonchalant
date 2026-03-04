import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { FluidShape } from "@/components/decorative";
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getPortfolioItems, getFeaturedPortfolioItem } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Dance Choreography Portfolio | Hip-Hop & Contemporary | Jonchalant",
  description: "Explore professional choreography portfolio with 30+ original hip-hop and contemporary videos. Premium choreography for brands, events, and performers.",
  keywords: "dance choreography, hip-hop choreography, contemporary dance, freestyle dance, professional choreographer, dance videos, movement coaching",
  openGraph: {
    title: "Dance Choreography Portfolio | Jonchalant",
    description: "Professional choreography work: hip-hop, contemporary, freestyle, and original pieces.",
    type: "website",
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
    <div className="min-h-screen bg-white">
      <PageTransition animation="slide-left">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* HERO SECTION */}
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

          {/* PORTFOLIO FILTER */}
          <section className="mb-24">
            <DanceFilter items={dancePortfolio} categories={DANCE_FILTER_CATEGORIES} />
          </section>

          {/* CTA */}
          <section className="py-16">
            <CTASection
              title="Ready to Integrate Movement into Your Leadership?"
              description="See how dance principles translate directly into professional presence, confidence, and command. Let's explore what's possible."
              buttonText="EXPLORE COACHING"
              buttonLink="/contact"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
