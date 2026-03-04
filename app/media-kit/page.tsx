import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageTransition } from "@/components/layout";
import { getMediaKitData, getPageMetadata, getCollaborationPackages } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Media Kit & Collaboration Opportunities | TikTok, Instagram, YouTube | Jonchalant",
  description: "Audience insights, platform metrics, and collaboration opportunities. Connect with Jon on TikTok, Instagram, and YouTube for brand partnerships.",
  keywords: "media kit, creator collaboration, TikTok influencer, Instagram partnership, YouTube collaborations, brand creator, influencer marketing, social media metrics, content creator",
  openGraph: {
    title: "Media Kit & Collaboration | Jonchalant",
    description: "Explore audience insights, platform metrics, and partnership opportunities with Jonchalant.",
    type: "website"
  }
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
    <div className="min-h-screen bg-white">
      <PageTransition animation="scale">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* HERO SECTION */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm uppercase tracking-widest font-medium text-slate-600">Press & Collaboration</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
                {pageMetadata?.headline || 'Media Kit'}
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                {pageMetadata?.subheadline || 'Comprehensive audience data, platform metrics, and collaboration opportunities.'}
              </p>
            </div>

            {/* Right column visual placeholder */}
            <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center">
              <p className="text-slate-500">Media Kit Overview</p>
            </div>
          </section>

          {/* KEY METRICS CARDS */}
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Key Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaKitData?.keyMetrics?.map((stat: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-slate-200 p-8 rounded hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-xs uppercase tracking-widest font-medium text-slate-600 mb-4">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold text-slate-900 mb-3">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600">
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PLATFORM BREAKDOWN */}
          <section className="mb-24 border-t border-slate-200 pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Platform Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mediaKitData?.platforms?.map((platform: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-slate-200 p-8 rounded"
                >
                  <p className="text-xs uppercase tracking-widest font-medium text-slate-600 mb-2">
                    {platform.name}
                  </p>
                  <p className="text-lg font-semibold text-slate-900 mb-6">
                    {platform.handle}
                  </p>

                  <div className="space-y-4 border-t border-slate-200 pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-medium text-slate-600 mb-2">
                        Followers
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {platform.followers}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-medium text-slate-600 mb-2">
                        Avg Monthly Views
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {platform.avgViews}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm font-medium text-slate-700">
                        {platform.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTENT DISTRIBUTION */}
          <section className="mb-24 border-t border-slate-200 pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Content Mix
            </h2>

            <div className="space-y-8">
              {mediaKitData?.contentCategories?.map((category: any, idx: number) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {category.name}
                    </h3>
                    <span className="text-2xl font-bold text-accent">
                      {category.percentage}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-700"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>

                  <p className="text-sm text-slate-700">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* AUDIENCE DEMOGRAPHICS */}
          <section className="mb-24 border-t border-slate-200 pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Audience Demographics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Age Distribution */}
              <div className="border border-slate-200 p-8 rounded">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Age Range</h3>
                <div className="space-y-5">
                  {mediaKitData?.audience?.age?.map((age: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">
                          {age.range}
                        </span>
                        <span className="text-sm font-bold text-accent">
                          {age.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-700"
                          style={{ width: `${age.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender Distribution */}
              <div className="border border-slate-200 p-8 rounded">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Gender</h3>
                <div className="space-y-5">
                  {mediaKitData?.audience?.gender?.map((gender: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">
                          {gender.label}
                        </span>
                        <span className="text-sm font-bold text-accent">
                          {gender.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-700"
                          style={{ width: `${gender.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Locations */}
              <div className="border border-slate-200 p-8 rounded">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Top Locations</h3>
                <div className="space-y-5">
                  {mediaKitData?.audience?.locations?.map((location: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">
                          {location.country}
                        </span>
                        <span className="text-sm font-bold text-accent">
                          {location.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-700"
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* COLLABORATION PACKAGES */}
          <section className="mb-24 border-t border-slate-200 pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Collaboration Packages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collaborationPackages.length > 0 ? (
                collaborationPackages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 p-8 rounded hover:shadow-md transition-shadow duration-300"
                  >
                    <p className="text-xs uppercase tracking-widest font-medium text-slate-600 mb-3">
                      {pkg.name}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mb-6">
                      {pkg.price}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-3">
                          <span className="text-accent font-semibold">✓</span>
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full border border-slate-200 text-slate-900 font-semibold py-3 px-4 rounded hover:bg-slate-50 transition-colors">
                      Get Started
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-slate-600">
                  Loading collaboration packages...
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section>
            <CTASection
              title="Let's Collaborate"
              description="Interested in a partnership? Download the full media kit or contact me directly to discuss a custom collaboration package."
              buttonText="Start Conversation"
              buttonLink="/contact"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
