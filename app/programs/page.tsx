import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import dynamic from 'next/dynamic';
import ProgramCardsSection from '@/components/sections/ProgramCardsSection';

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
    color: 'slate',
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
    color: 'blue',
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
    color: 'indigo',
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
    color: 'purple',
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
    color: 'teal',
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
    color: 'cyan',
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

export default function Programs() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PageTransition animation="scale">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* HERO SECTION - 60/40 LAYOUT */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block">
                <span className="text-sm uppercase tracking-widest font-medium text-slate-600 dark:text-slate-400">Personalized Coaching</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                Find Your Path to Quiet Command
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                From self-paced courses to premium 1-on-1 coaching, choose the program that matches your goals and learning style. Each path builds your professional presence through the same proven methodology.
              </p>

              <div className="pt-4">
                <a href="#inquiry-form" className="inline-block px-8 py-4 font-semibold uppercase tracking-widest text-sm border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors duration-300">
                  Compare Programs
                </a>
              </div>
            </div>

            {/* Right column visual placeholder */}
            <div className="lg:col-span-5 bg-slate-100 dark:bg-slate-800 rounded-lg h-96 flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Program Comparison Guide</p>
            </div>
          </section>

          {/* PROGRAM CARDS */}
          <section className="mb-24">
            <ProgramCardsSection programs={PROGRAMS} />
          </section>

          {/* THREE PILLARS */}
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                The Three Pillars
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Every program is built on these foundational principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROGRAM_FOCUS.map((pillar, idx) => (
                <div key={idx} className="border border-slate-200 dark:border-slate-700 p-8">
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY FORM */}
          <section id="inquiry-form" className="mb-24 py-16 border-t border-slate-200 dark:border-slate-700">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Let's Find Your Program
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
                Tell me about your goals and timeline. I'll respond within 48 hours with a program recommendation and next steps.
              </p>
            </div>
            <div className="max-w-3xl">
              <CollaborationForm />
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
