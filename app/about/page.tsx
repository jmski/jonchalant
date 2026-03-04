import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { EnsoCircle } from "@/components/decorative";
import type { Metadata } from 'next';
import { getAboutPageContent, getServices } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Me | Jonchalant",
  description: "Discover how Jon combines dance choreography expertise with leadership coaching to teach introverts quiet command, executive presence, and body-aware confidence."
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
    <div className="min-h-screen bg-white text-slate-900">
      <PageTransition animation="blur">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" id="main-content">
          {/* HERO SECTION */}
          <section className="mb-24">
            {aboutContent?.heroHeadline ? (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  {aboutContent.heroHeadline}
                </h1>
                <p className="text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed">
                  {aboutContent.heroDescription}
                </p>
              </>
            ) : (
              <div className="py-16 text-center text-slate-600">Loading hero content...</div>
            )}
          </section>

          {/* ORIGIN STORY - 60/40 LAYOUT */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Subtle Enso circle decorative element - represents Ikigai/Purpose */}
            <EnsoCircle
              size={300}
              opacity={0.05}
              strokeWidth={1}
              style={{
                position: 'absolute',
                top: '40px',
                right: '-80px',
                color: 'var(--accent-primary)',
                zIndex: 0,
              }}
            />
            
            <div className="lg:col-span-7 space-y-6 relative z-10">
              {aboutContent?.originSectionHeadline ? (
                <>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    {aboutContent.originSectionHeadline}
                  </h2>
                  
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {aboutContent.originSectionDescription}
                  </p>

                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      The Three Phases
                    </h3>
                    <div className="space-y-4">
                      {aboutContent.phases?.map((phase: any, idx: number) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-slate-900 mb-2">{phase.title}</h4>
                          <p className="text-slate-700">
                            {phase.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-slate-600">Loading origin story...</div>
              )}
            </div>

            {/* Right column placeholder */}
            <div className="lg:col-span-5 bg-slate-100 rounded-lg h-96 flex items-center justify-center">
              <p className="text-slate-500">Editorial Image Placeholder</p>
            </div>
          </section>

          {/* KEY STATS */}
          <section className="mb-24">
            {aboutContent?.stats && aboutContent.stats.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {aboutContent.stats.map((stat: any, idx: number) => (
                    <div
                      key={idx}
                      className="border-l border-slate-200 pl-6 py-4"
                    >
                      <div className="text-sm uppercase tracking-widest text-slate-600 font-medium mb-2">
                        {stat.label}
                      </div>
                      <div className="text-3xl font-bold text-slate-900">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic mt-4">*Of those who complete programs</p>
              </>
            ) : (
              <div className="py-8 text-center text-slate-600">Loading stats...</div>
            )}
          </section>

          {/* WHAT I COACH - Now fetching from Sanity services */}
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                What I Coach
              </h2>
              <p className="text-lg text-slate-700">
                Three core pillars that transform how you show up professionally.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services && services.length > 0 ? (
                services.map((service: any) => (
                  <div
                    key={service._id}
                    className="border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <h3 className="font-semibold text-slate-900 mb-3 text-lg">
                      {service.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-slate-600">
                  Loading coaching services...
                </div>
              )}
            </div>
          </section>

          {/* MY PHILOSOPHY */}
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                How I Work
              </h2>
              <p className="text-lg text-slate-700">
                Three principles guide everything I do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {philosophies.length > 0 ? (
                philosophies.map((philosophy, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 p-8 hover:shadow-md transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      {philosophy.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {philosophy.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-slate-600">
                  Loading philosophy content...
                </div>
              )}
            </div>
          </section>

          {/* INTROVERT ADVANTAGE */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why Your Introversion Is Your Superpower
              </h2>

              <p className="text-lg text-slate-700 leading-relaxed">
                You listen more than you speak. You think before you act. You draw energy from depth, not breadth. These aren't weaknesses—they're advantages waiting to be weaponized.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                The world needs more leaders who think before they act, who listen deeply, and who lead from authenticity. That's you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {introvertTraits.length > 0 ? (
                introvertTraits.map((trait, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 p-4 text-center hover:shadow-md transition-shadow duration-300"
                  >
                    <p className="text-sm font-medium text-slate-900">{trait}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-slate-600">
                  Loading introvert traits...
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="py-16">
            <CTASection
              title="Ready to Discover Your Quiet Command?"
              description="This is more than coaching. It's a transformation that starts with understanding where you are now. Let's talk about your Presence Audit."
              buttonText="BOOK YOUR AUDIT"
              buttonLink="/programs"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
