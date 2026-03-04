import { CTASection } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { TextLink } from "@/components/typography";
import { BlueprintGrid } from "@/components/decorative";
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { getPrograms, getProgramsFocusItems } from "@/lib/sanity";
import { CourseSchema } from "@/lib/schema";
import '@/app/css/programs.css';

const ProgramCardsSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.ProgramCardsSection })), {
  loading: () => <div className="py-16 md:py-24">Loading programs...</div>,
  ssr: true
});

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Leadership Coaching Programs | Quiet Command & Executive Presence | Jonchalant",
  description: "8-12 week programs for building executive presence and quiet command. Body-aware coaching for introverts to develop confidence and professional presence.",
  keywords: "leadership coaching programs, executive presence training, quiet command coaching, introvert leadership program, professional presence coaching, body-aware leadership",
  openGraph: {
    title: "Leadership Coaching Programs | Jonchalant",
    description: "Transform your professional presence with 8-12 week coaching programs for introverts.",
    type: "website",
    url: "https://jonchalant.com/programs",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-programs-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Leadership Coaching Programs",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership Coaching Programs | Jonchalant",
    description: "Transform your professional presence with 8-12 week coaching programs.",
    images: ["https://jonchalant.com/social/og-programs-1200x630.png"],
    creator: "@jonchalant",
  },
};



export default async function Programs() {
  let programCards = [];
  let focusItems: { title: string; description: string; icon: string }[] = [];

  try {
    const sanityPrograms = await getPrograms();
    if (sanityPrograms && sanityPrograms.length > 0) {
      programCards = sanityPrograms;
    }
  } catch (error) {
    console.warn('Failed to fetch programs from Sanity:', error);
  }

  try {
    const programsPageContent = await getProgramsFocusItems();
    if (programsPageContent?.programFocusItems && programsPageContent.programFocusItems.length > 0) {
      focusItems = programsPageContent.programFocusItems;
    }
  } catch (error) {
    console.warn('Failed to fetch program focus items from Sanity:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Course Schema - Featured programs */}
      <Script
        id="8week-course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CourseSchema({
            name: "8-Week Executive Presence & Quiet Command Program",
            description: "Transform your professional presence in 8 weeks through body-aware leadership coaching designed for introverts and shy professionals.",
            price: "1,997",
            duration: "P8W",
            level: "Intermediate"
          })),
        }}
      />
      <Script
        id="group-workshop-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CourseSchema({
            name: "Group Workshop: Building Quiet Command",
            description: "Interactive group workshop on developing executive presence and professional confidence for introvert leaders.",
            duration: "P1D",
            level: "Beginner"
          })),
        }}
      />
      
      <PageTransition animation="fade">
        {/* HERO SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
          {/* HERO SECTION - Enhanced Visual Design */}
          <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
            {/* Background decorative elements */}
            <BlueprintGrid
              size={500}
              spacing={40}
              opacity={0.05}
              variant="dots"
              style={{
                position: 'absolute',
                top: '-100px',
                right: '-150px',
                color: 'var(--accent-primary)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
              {/* Left Column - Content */}
              <div className="space-y-8">
                {/* Eyebrow */}
                <div>
                  <span 
                    className="inline-block text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'white',
                      letterSpacing: '0.15em'
                    }}
                  >
                    Coaching Programs
                  </span>
                </div>

                {/* Main Headline */}
                <h1 
                  className="font-headline font-bold leading-tight space-y-0"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    letterSpacing: '-0.01em'
                  }}
                >
                  <div style={{ color: 'var(--text-primary)' }}>Transform Your</div>
                  <div style={{ color: 'var(--accent-primary)' }}>Executive Presence</div>
                </h1>

                {/* Accent underline */}
                <div 
                  className="w-20 h-1"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />

                {/* Subheading */}
                <p 
                  className="text-lg sm:text-xl font-body leading-relaxed"
                  style={{
                    color: 'var(--text-secondary)',
                    maxWidth: '32rem'
                  }}
                >
                  Building quiet command isn't complicated. It's methodical. Pick your format and commit to the process.
                </p>

                {/* Description */}
                <p 
                  className="text-base sm:text-lg font-body leading-relaxed"
                  style={{
                    color: 'var(--text-tertiary)',
                    maxWidth: '34rem',
                    lineHeight: '1.8'
                  }}
                >
                  From self-paced courses ($297) to premium 1-on-1 coaching (custom). Find the program that matches your goals, timeline, and investment level.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <style>{`
                    .btn-primary:hover {
                      box-shadow: 0 4px 12px rgba(107, 142, 99, 0.2);
                      opacity: 0.95;
                    }
                    .btn-secondary:hover {
                      border-color: var(--accent-primary);
                      color: var(--accent-primary);
                    }
                  `}</style>
                  <a
                    href="#programs-section"
                    className="btn-primary px-8 py-4 font-body font-semibold uppercase text-sm tracking-wider transition-all duration-300 text-center"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'white',
                      borderRadius: '0px',
                      border: '1px solid var(--accent-primary)'
                    }}
                  >
                    Explore Programs
                  </a>

                  <a
                    href="#inquiry-form"
                    className="btn-secondary px-8 py-4 font-body font-semibold uppercase text-sm tracking-wider transition-all duration-300 text-center"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      borderRadius: '0px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    Start Audit (Free)
                  </a>
                </div>
              </div>

              {/* Right Column - Visual Pillar Cards */}
              <div className="space-y-6">
                <style>{`
                  .pillar-card {
                    transition: all 300ms ease-in-out;
                  }
                  .pillar-card:hover {
                    box-shadow: 0 8px 24px rgba(107, 142, 99, 0.12);
                    transform: translateY(-4px);
                  }
                `}</style>
                {focusItems.length > 0 ? (
                  focusItems.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="pillar-card p-6 sm:p-8 rounded-sm border-l-4"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderLeftColor: 'var(--accent-primary)',
                        borderLeftWidth: '4px'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="text-4xl shrink-0"
                          style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {pillar.icon}
                        </div>
                        <div className="flex-1 space-y-2">
                          <h2 
                            className="font-headline font-bold text-lg"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {pillar.title}
                          </h2>
                          <p 
                            className="text-sm leading-relaxed"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>
                    Loading program focus areas...
                  </div>
                )}
              </div>
            </div>

            {/* Bottom accent line */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ backgroundColor: 'var(--border-color)' }}
            />
          </section>
          </SectionContent>
        </SectionWrapper>

        {/* PROGRAM CARDS */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section id="programs-section">
              {programCards.length > 0 ? (
                <ProgramCardsSection programs={programCards} />
              ) : (
                <div className="py-12 text-center" style={{ color: 'var(--text-tertiary)' }}>
                  <p>Loading coaching programs...</p>
                </div>
              )}
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* SUPPLEMENTAL LEARNING CTA */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section>
              <div className="text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Learn at Your Own Pace
                </h3>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  Before committing to a program, explore foundational lessons on quiet command, executive presence, and body-aware leadership.
                </p>
                <TextLink 
                  href="/lessons" 
                  className="programs-cta-button"
                >
                  Explore Leadership Lessons →
                </TextLink>
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section>
              <CTASection
                title="Ready to Build Real Executive Presence?"
                description="Don't guess which program is right. Schedule a free 30-minute Presence Audit where we'll assess where you are now, identify your biggest opportunities, and create a custom roadmap to get you there."
                buttonText="Book Your Free Audit"
                buttonLink="/contact"
              />
            </section>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
