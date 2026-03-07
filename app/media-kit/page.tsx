import type { Metadata } from 'next';
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { PageHero, CTA, KeyMetrics, PlatformBreakdown, ContentMix, AudienceProfile, HeroStats, CollaborationPackages } from "@/components/sections";
import { getMediaKitData, getPageMetadata, getCollaborationPackages } from "@/lib/sanity";
import '@/app/css/media-kit.css';

export const metadata: Metadata = {
  title: "Media Kit & Collaboration Opportunities | TikTok, Instagram, YouTube | Jonchalant",
  description: "Audience insights, platform metrics, and collaboration opportunities. Connect with Jon on TikTok, Instagram, and YouTube for brand partnerships.",
  keywords: "media kit, creator collaboration, TikTok influencer, Instagram partnership, YouTube collaborations, brand creator, influencer marketing, social media metrics, content creator",
  openGraph: {
    title: "Media Kit & Collaboration | Jonchalant",
    description: "Explore audience insights, platform metrics, and partnership opportunities with Jonchalant.",
    type: "website",
    url: "https://jonchalant.com/media-kit",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-media-kit-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Media Kit & Collaboration Opportunities",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Kit & Collaboration | Jonchalant",
    description: "Audience insights, platform metrics, and partnership opportunities.",
    images: ["https://jonchalant.com/social/og-media-kit-1200x630.png"],
    creator: "@jonchalant",
  },
};

const MOCK_PAGE_METADATA = {
  headline: 'Media Kit',
  subheadline: 'Comprehensive audience data, platform metrics, and collaboration opportunities.'
};

interface MediaKitData {
  keyMetrics?: Array<{ label: string; value: string; change: string }>;
  platforms?: Array<{ name: string; handle: string; followers: string; avgViews: string; category: string }>;
  contentCategories?: Array<{ name: string; percentage: number; description: string }>;
  audience?: {
    age?: Array<{ range: string; percentage: number }>;
    gender?: Array<{ label: string; percentage: number }>;
    locations?: Array<{ country: string; percentage: number }>;
  };
}

export default async function MediaKit() {
  let mediaKitData: MediaKitData = {};
  let pageMetadata = MOCK_PAGE_METADATA;
  let collaborationPackages = [];

  try {
    const [sanityMediaKit, sanityMetadata, packages] = await Promise.all([
      getMediaKitData(),
      getPageMetadata('mediaKit'),
      getCollaborationPackages()
    ]);
    
    if (sanityMediaKit) {
      mediaKitData = sanityMediaKit;
    }
    
    if (sanityMetadata) {
      pageMetadata = sanityMetadata;
    }
    
    if (packages?.packages && packages.packages.length > 0) {
      collaborationPackages = packages.packages;
    }
  } catch (error) {
    console.warn('Failed to fetch media kit from Sanity, using fallback data:', error);
  }

  return (
    <div className="media-kit-main">
      <PageTransition animation="fade">
        {/* HERO SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <PageHero
              eyebrow="Press & Collaboration"
              headline={['Audience Insights &', 'Collaboration Opportunities']}
              subheading={pageMetadata?.subheadline || 'Comprehensive audience data, platform metrics, and partnership opportunities.'}
              description="100,000+ engaged followers across TikTok, Instagram, and YouTube. Let's work together on something meaningful for your brand."
              ctaButtons={[
                { label: 'View Packages', href: '#collaboration-section', variant: 'primary' },
                { label: 'Custom Inquiry', href: '/contact', variant: 'secondary' },
              ]}
              rightColumn={<HeroStats />}
            />
          </SectionContent>
        </SectionWrapper>

        {/* KEY METRICS CARDS */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <KeyMetrics metrics={mediaKitData?.keyMetrics || []} />
          </SectionContent>
        </SectionWrapper>

        {/* PLATFORM BREAKDOWN */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <PlatformBreakdown platforms={mediaKitData?.platforms || []} />
          </SectionContent>
        </SectionWrapper>

        {/* CONTENT DISTRIBUTION */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <ContentMix categories={mediaKitData?.contentCategories || []} />
          </SectionContent>
        </SectionWrapper>

        {/* AUDIENCE DEMOGRAPHICS */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <AudienceProfile audience={mediaKitData?.audience || {}} />
          </SectionContent>
        </SectionWrapper>

        {/* COLLABORATION PACKAGES */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <CollaborationPackages packages={collaborationPackages} />
          </SectionContent>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <CTA
              title="Let's Collaborate"
              description="Interested in a partnership? Download the full media kit or contact me directly to discuss a custom collaboration package."
              buttonText="Start Conversation"
              buttonLink="/contact"
            />
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}