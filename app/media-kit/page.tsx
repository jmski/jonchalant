import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { TextLink } from "@/components/typography";
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

const CTASection = dynamic(() => import('@/components/sections').then(mod => mod.CTASection), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

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
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-sm uppercase tracking-widest font-medium" style={{ color: 'var(--text-tertiary)' }}>Press & Collaboration</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {pageMetadata?.headline || 'Media Kit'}
                </h1>

                <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {pageMetadata?.subheadline || 'Comprehensive audience data, platform metrics, and collaboration opportunities.'}
                </p>
              </div>

              {/* Right column visual placeholder */}
              <div className="rounded-lg h-96 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <p style={{ color: 'var(--text-tertiary)' }}>Media Kit Overview</p>
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* KEY METRICS CARDS */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                Key Metrics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mediaKitData?.keyMetrics?.map((stat: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-8 rounded hover:shadow-md transition-shadow duration-300"
                    style={{ border: '1px solid var(--border-color)' }}
                  >
                    <p className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: 'var(--text-tertiary)' }}>
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {stat.value}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* PLATFORM BREAKDOWN */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                Platform Breakdown
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mediaKitData?.platforms?.map((platform: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-8 rounded"
                    style={{ border: '1px solid var(--border-color)' }}
                  >
                    <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      {platform.name}
                    </p>
                    <p className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                      {platform.handle}
                    </p>

                    <div className="space-y-4 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                      <div>
                        <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                          Followers
                        </p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {platform.followers}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                          Avg Monthly Views
                        </p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {platform.avgViews}
                        </p>
                      </div>
                      <div className="pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {platform.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* CONTENT DISTRIBUTION */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                Content Mix
              </h2>

              <div className="space-y-8">
                {mediaKitData?.contentCategories?.map((category: any, idx: number) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {category.name}
                      </h3>
                      <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                        {category.percentage}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <div
                        className="h-full transition-all duration-700"
                        style={{ width: `${category.percentage}%`, backgroundColor: 'var(--accent-primary)' }}
                      />
                    </div>

                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* AUDIENCE DEMOGRAPHICS */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                Audience Profile
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Age Distribution */}
                <div className="p-8 rounded" style={{ border: '1px solid var(--border-color)' }}>
                  <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Age</h3>
                  <div className="space-y-5">
                    {mediaKitData?.audience?.age?.map((age: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {age.range}
                          </span>
                          <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                            {age.percentage}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
                          <div
                            className="h-full transition-all duration-700"
                            style={{ width: `${age.percentage}%`, backgroundColor: 'var(--accent-primary)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gender Distribution */}
                <div className="p-8 rounded" style={{ border: '1px solid var(--border-color)' }}>
                  <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Gender</h3>
                  <div className="space-y-5">
                    {mediaKitData?.audience?.gender?.map((gender: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {gender.label}
                          </span>
                          <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                            {gender.percentage}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
                          <div
                            className="h-full transition-all duration-700"
                            style={{ width: `${gender.percentage}%`, backgroundColor: 'var(--accent-primary)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Locations */}
                <div className="p-8 rounded" style={{ border: '1px solid var(--border-color)' }}>
                  <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Top Locations</h3>
                  <div className="space-y-5">
                    {mediaKitData?.audience?.locations?.map((location: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {location.country}
                          </span>
                          <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                            {location.percentage}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
                          <div
                            className="h-full transition-all duration-700"
                            style={{ width: `${location.percentage}%`, backgroundColor: 'var(--accent-primary)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* COLLABORATION PACKAGES */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                Collaboration Packages
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {collaborationPackages.length > 0 ? (
                  collaborationPackages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="p-8 rounded hover:shadow-md transition-shadow duration-300"
                      style={{ border: '1px solid var(--border-color)' }}
                    >
                      <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>
                        {pkg.name}
                      </p>
                      <p className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                        {pkg.price}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, fidx) => (
                          <li key={fidx} className="flex items-center gap-3">
                            <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>✓</span>
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="w-full font-semibold py-3 px-4 rounded transition-colors" style={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        Get Started
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8" style={{ color: 'var(--text-tertiary)' }}>
                    Loading collaboration packages...
                  </div>
                )}
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section>
              <CTASection
                title="Let's Collaborate"
                description="Interested in a partnership? Download the full media kit or contact me directly to discuss a custom collaboration package."
                buttonText="Start Conversation"
                buttonLink="/contact"
              />
            </section>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
