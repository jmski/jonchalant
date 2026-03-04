import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { BlueprintGrid } from "@/components/decorative";
import dynamic from 'next/dynamic';
import { getPrograms, getProgramsFocusItems } from "@/lib/sanity";

const ProgramCardsSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.ProgramCardsSection })), {
  loading: () => <div className="py-16 md:py-24">Loading programs...</div>,
  ssr: true
});

export const metadata = {
  title: "Programs | The Kinetic Leader",
  description: "Coaching programs for introverts seeking quiet command and professional leadership."
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
      <PageTransition animation="scale">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="space-y-4">
                  <h1 
                    className="font-headline font-bold leading-tight"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Your Path to
                  </h1>
                  <h2 
                    className="font-headline font-bold leading-tight"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                      color: 'var(--accent-primary)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Quiet Command
                  </h2>
                </div>

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
                  Choose your learning path. Each program builds professional presence through the same proven methodology.
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
                          <h3 
                            className="font-headline font-bold text-lg"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {pillar.title}
                          </h3>
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
                  <div className="text-center py-8 text-slate-600">
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

          {/* PROGRAM CARDS */}
          <section id="programs-section" className="mb-24">
            {programCards.length > 0 ? (
              <ProgramCardsSection programs={programCards} />
            ) : (
              <div className="py-12 text-center text-slate-600">
                <p>Loading coaching programs...</p>
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="py-16">
            <CTASection
              title="Still Unsure Which Program Is Right for You?"
              description="Start with a free 30-minute Presence Audit. I'll assess your baseline, identify your biggest opportunities, and recommend the perfect program for your goals."
              buttonText="SCHEDULE YOUR AUDIT"
              buttonLink="/contact"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
