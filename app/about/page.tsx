import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { EnsoCircle } from "@/components/decorative";
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAboutPageContent, getServices } from "@/lib/sanity";

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
          <section className="bg-slate-50 py-12 sm:py-16 px-8 rounded-lg mb-24">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Proven Results From Real Leaders</h2>
              <p className="text-slate-700">These outcomes matter because they represent how our clients show up differently—at work, with their teams, and in their own eyes.</p>
            </div>
            {aboutContent?.stats && aboutContent.stats.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {aboutContent.stats.map((stat: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 p-6 rounded-lg"
                    >
                      <div className="text-3xl font-bold text-slate-900 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic mt-6">*Of those who complete coaching programs</p>
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
                How I Coach: Three Non-Negotiables
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                This framework is the backbone of every coaching conversation. It's what makes the transformation real.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {philosophies.length > 0 ? (
                philosophies.map((philosophy, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 p-8 bg-white hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-4">
                      {idx === 0 && '🧠'}
                      {idx === 1 && '💫'}
                      {idx === 2 && '🎯'}
                    </div>
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

              <p className="text-sm text-slate-600 pt-4">
                See how these principles translate to movement and presence in my{' '}
                <Link href="/dance" className="font-semibold text-slate-900 hover:text-accent transition-colors underline">
                  choreography portfolio
                </Link>
                .
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
              title="Your Presence Matters. Let's Amplify It."
              description="Coaching works best when you're ready. This free Presence Audit shows exactly where your executive presence stands today—and the fastest path to where you want to be."
              buttonText="Get Your Free Audit Now"
              buttonLink="/contact"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
