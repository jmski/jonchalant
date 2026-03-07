import { CTA, PageHero, Programs as ProgramsSection } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { TextLink } from "@/components/typography";
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { getPrograms, getProgramsFocusItems } from "@/lib/sanity";
import { CourseSchema } from "@/lib/schema";
import '@/app/css/programs.css';

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
    const focusItemsData = await getProgramsFocusItems();
    if (Array.isArray(focusItemsData) && focusItemsData.length > 0) {
      focusItems = focusItemsData;
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
            <PageHero
              eyebrow="Coaching Programs"
              headline={['Transform Your', 'Executive Presence']}
              subheading="Building quiet command isn't complicated. It's methodical. Pick your format and commit to the process."
              description="From self-paced courses ($297) to premium 1-on-1 coaching (custom). Find the program that matches your goals, timeline, and investment level."
              ctaButtons={[
                { label: 'Explore Programs', href: '#programs-section', variant: 'primary' },
                { label: 'Start Audit (Free)', href: '#inquiry-form', variant: 'secondary' },
              ]}
              rightColumn={
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
              }
            />
          </SectionContent>
        </SectionWrapper>

        {/* PROGRAM CARDS */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section id="programs-section">
              {programCards.length > 0 ? (
                <ProgramsSection programs={programCards} />
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
              <CTA
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
