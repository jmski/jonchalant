import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { BlueprintGrid } from "@/components/decorative";
import dynamic from 'next/dynamic';
import ProgramCardsSection from '@/components/sections/ProgramCardsSection';
import { getPrograms } from "@/lib/sanity";

const CollaborationForm = dynamic(() => import('@/components/forms').then(mod => ({ default: mod.CollaborationForm })), {
  loading: () => <div className="py-12 px-8 text-center">Loading form...</div>,
  ssr: true
});

export const metadata = {
  title: "Programs | The Kinetic Leader",
  description: "Coaching programs for introverts seeking quiet command and professional leadership."
};

// Kinetic Leader Programs
const PROGRAMS = [
  {
    _id: 'program-1',
    title: 'The 90-Day Presence Pivot',
    category: 'Premium 1-on-1 Coaching',
    description: 'Intensive 12-week personal transformation. Weekly sessions, customized movement modules, social scripting frameworks, and ongoing support. For introverts seeking leadership promotions or major career transitions.',
    investment: 'Custom Quote',
    features: [
      '12 weekly 1-on-1 sessions',
      'Personalized movement coaching',
      'Social mechanics framework',
      'Energy management strategy',
      'Pre-interview/presentation coaching',
      'Lifetime community access'
    ],
  },
  {
    _id: 'program-2',
    title: 'Social Choreography Workshop',
    category: 'Group Training (6 weeks)',
    description: 'Learn the three pillars in a cohort-based format. Meet other ambitious introverts, practice live, receive feedback. For those seeking guided learning with peer support.',
    investment: '$1,500',
    features: [
      '6 weekly 2-hour group sessions',
      'Physical Grounding module',
      'Social Scripting workshop',
      'Energy Mastery deep dive',
      'Group practice & feedback',
      'Private community'
    ],
  },
  {
    _id: 'program-3',
    title: 'The Quiet Command Essentials',
    category: 'Self-Paced Digital Course',
    description: 'Video modules, worksheets, and frameworks you can learn at your own pace. Foundation-level introduction to Physical Grounding and Social Scripting.',
    investment: '$297',
    features: [
      '8 HD video modules',
      'Downloadable worksheets',
      'Social framework templates',
      'Body language checklists',
      'Quick-reference guides',
      'Email support included'
    ],
  },
  {
    _id: 'program-4',
    title: 'Interview & Pitch Coaching',
    category: 'High-Stakes Preparation',
    description: 'Specialized coaching for critical moments. Job interviews, investor pitches, presentations. 1-on-1 training with live practice and video feedback.',
    investment: '$500-$1,000',
    features: [
      '3-5 intensive sessions',
      'Mock interview/pitch practice',
      'Video feedback & analysis',
      'Body language optimization',
      'Q&A strategy development',
      'Anxiety management techniques'
    ],
  },
  {
    _id: 'program-5',
    title: 'Team Leadership Program',
    category: 'Organization Custom',
    description: 'For leadership teams wanting to build more confident, inclusive organizations. Multi-session workshops designed for your specific context and team size.',
    investment: 'Custom Quote',
    features: [
      'Customized to your needs',
      'Multi-session format available',
      'Whole-team participation',
      'Leadership development focus',
      'Measured outcomes & metrics',
      'Ongoing support options'
    ],
  },
  {
    _id: 'program-6',
    title: 'Book Your Presence Audit',
    category: 'First Step (Complimentary)',
    description: 'Not sure where to start? Let\'s assess your current baseline. In this 30-minute call, I\'ll identify your strengths, barriers, and the right program for your goals.',
    investment: 'Free',
    features: [
      '30-minute discovery call',
      'Personal baseline assessment',
      'Customized program recommendation',
      'No obligation to proceed',
      'Confidential & judgment-free',
      'Available within 5 business days'
    ],
  }
];

const PROGRAM_FOCUS = [
  {
    title: 'Physical Grounding',
    description: 'Master posture, positioning, and body language. Learn how your physical presence shapes perception and authority.',
    icon: '🧭'
  },
  {
    title: 'Social Scripting',
    description: 'Professional communication frameworks, conversation mechanics, and relationship-building strategies tailored for introverts.',
    icon: '🔗'
  },
  {
    title: 'Energy Mastery',
    description: 'Strategic activation and recovery. Lead from strength without burnout. Manage your energy like a professional athlete.',
    icon: '⚡'
  }
];

export default async function Programs() {
  let programCards = PROGRAMS;

  try {
    const sanityPrograms = await getPrograms();
    if (sanityPrograms && sanityPrograms.length > 0) {
      programCards = sanityPrograms;
    }
  } catch (error) {
    console.warn('Failed to fetch programs from Sanity, using fallback data:', error);
    // Falls back to PROGRAMS if Sanity fails
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
                {PROGRAM_FOCUS.map((pillar, idx) => (
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
                        className="text-4xl flex-shrink-0"
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
                ))}
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
            <ProgramCardsSection programs={programCards} />
          </section>

          {/* INQUIRY FORM */}
          <section id="inquiry-form" className="mb-24 py-16 border-t border-slate-200">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Let's Find Your Program
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                Tell me about your goals and timeline. I'll respond within 48 hours with a program recommendation and next steps.
              </p>
            </div>
            <div className="max-w-3xl">
              <CollaborationForm formType="program" />
            </div>
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
