import { CTA, FeaturedVideo, DanceApproach, DancePortfolio } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import type { Metadata } from 'next';
import { getPortfolioItems, getFeaturedPortfolioItem } from "@/lib/sanity";

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
              <FeaturedVideo
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
            <DancePortfolio items={dancePortfolio} />
          </SectionContent>
        </SectionWrapper>

        {/* APPROACH LINK */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <DanceApproach />
          </SectionContent>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section>
              <CTA
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