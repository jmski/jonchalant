import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import Link from 'next/link';
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
      <PageTransition animation="blur">
        {/* HERO SECTION */}
        <div className="about-section-wrapper about-section-hero">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="main-content">
            <section className="about-hero-section">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 about-hero-container">
                {aboutContent?.heroHeadline ? (
                  <>
                    <span className="about-hero-intro">Who I Am</span>
                    <h1 className="about-hero-title">
                      {aboutContent.heroHeadline}
                    </h1>
                    <p className="about-hero-subtitle">
                      {aboutContent.heroDescription}
                    </p>
                  </>
                ) : (
                  <div className="py-16 text-center text-slate-600">Loading hero content...</div>
                )}
              </div>
              <div className="about-hero-divider"></div>
            </section>
          </main>
        </div>

        {/* ORIGIN STORY - 60/40 LAYOUT */}
        <div className="about-section-wrapper about-section-origin">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="about-origin-section">
              <div className="about-origin-content">
                {aboutContent?.originSectionHeadline ? (
                  <>
                    <h2 className="about-origin-title">
                      {aboutContent.originSectionHeadline}
                    </h2>
                    
                    <p className="about-origin-description">
                      {aboutContent.originSectionDescription}
                    </p>

                    <div className="about-phases">
                      <h3 className="about-phases-title">
                        The Three Phases
                      </h3>
                      <div className="about-phases-list">
                        {aboutContent.phases?.map((phase: any, idx: number) => (
                          <div key={idx}>
                            <h4 className="about-phase-item-title">{phase.title}</h4>
                            <p className="about-phase-item-description">
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
              <div className="about-origin-image">
                <p className="about-origin-image-text">Editorial Image Placeholder</p>
              </div>
            </section>
          </main>
        </div>

        {/* KEY STATS */}
        <div className="about-section-wrapper about-section-stats">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="about-stats-section">
              <div className="about-stats-header">
                <h2 className="about-stats-title">Proven Results From Real Leaders</h2>
                <p className="about-stats-description">These outcomes matter because they represent how our clients show up differently—at work, with their teams, and in their own eyes.</p>
              </div>
              {aboutContent?.stats && aboutContent.stats.length > 0 ? (
                <>
                  <div className="about-stats-grid">
                    {aboutContent.stats.map((stat: any, idx: number) => (
                      <div key={idx} className="about-stat-card">
                        <div className="about-stat-value">
                          {stat.value}
                        </div>
                        <div className="about-stat-label">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="about-stats-footnote">*Of those who complete coaching programs</p>
                </>
              ) : (
                <div className="py-8 text-center text-slate-600">Loading stats...</div>
              )}
            </section>
          </main>
        </div>

        {/* WHAT I COACH - Now fetching from Sanity services */}
        <div className="about-section-wrapper about-section-services">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="about-services-section">
              <div className="about-services-header">
                <h2 className="about-services-title">
                  What I Coach
                </h2>
                <p className="about-services-subtitle">
                  Three core pillars that transform how you show up professionally.
                </p>
              </div>

              <div className="about-services-grid">
                {services && services.length > 0 ? (
                  services.map((service: any) => (
                    <div key={service._id} className="about-service-card">
                      <h3 className="about-service-card-title">
                        {service.title}
                      </h3>
                      <p className="about-service-card-description">
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
          </main>
        </div>

        {/* MY PHILOSOPHY */}
        <div className="about-section-wrapper about-section-philosophy">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="about-philosophy-section">
              <div className="about-philosophy-header">
                <h2 className="about-philosophy-title">
                  How I Coach: Three Non-Negotiables
                </h2>
                <p className="about-philosophy-subtitle">
                  This framework is the backbone of every coaching conversation. It's what makes the transformation real.
                </p>
              </div>

              <div className="about-philosophy-grid">
                {philosophies.length > 0 ? (
                  philosophies.map((philosophy, idx) => (
                    <div key={idx} className="about-philosophy-card">
                      <div className="about-philosophy-emoji">
                        {idx === 0 && '🧠'}
                        {idx === 1 && '💫'}
                        {idx === 2 && '🎯'}
                      </div>
                      <h3 className="about-philosophy-card-title">
                        {philosophy.title}
                      </h3>
                      <p className="about-philosophy-card-description">
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
          </main>
        </div>

        {/* INTROVERT ADVANTAGE */}
        <div className="about-section-wrapper about-section-introvert">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="about-introvert-section">
              <div className="about-introvert-content">
                <h2 className="about-introvert-title">
                  Why Your Introversion Is Your Superpower
                </h2>

                <p className="about-introvert-paragraph">
                  You listen more than you speak. You think before you act. You draw energy from depth, not breadth. These aren't weaknesses—they're advantages waiting to be weaponized.
                </p>

                <p className="about-introvert-paragraph">
                  The world needs more leaders who think before they act, who listen deeply, and who lead from authenticity. That's you.
                </p>

                <p className="about-introvert-cta-text">
                  See how these principles translate to movement and presence in my{' '}
                  <Link href="/dance" className="about-introvert-link">
                    choreography portfolio
                  </Link>
                  .
                </p>
              </div>

              <div className="about-traits-grid">
                {introvertTraits.length > 0 ? (
                  introvertTraits.map((trait, idx) => (
                    <div key={idx} className="about-trait-card">
                      <p className="about-trait-text">{trait}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-slate-600">
                    Loading introvert traits...
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>

        {/* CTA */}
        <div className="about-section-wrapper about-section-cta">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="about-cta-section">
              <CTASection
                title="Your Presence Matters. Let's Amplify It."
                description="Coaching works best when you're ready. This free Presence Audit shows exactly where your executive presence stands today—and the fastest path to where you want to be."
                buttonText="Get Your Free Audit Now"
                buttonLink="/contact"
              />
            </section>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
