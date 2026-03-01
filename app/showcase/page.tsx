import { ScrollFade, ScrollStagger } from "@/components/animations";
import {
  DecorativeDivider,
} from "@/components/effects";
import { Heading } from "@/components/typography";
import { PageTransition } from "@/components/layout";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

// Below-fold dynamic imports
const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});
import { PAGE_CONTENT } from "@/lib/pageContent";

export const metadata = {
  title: "Lessons | The Kinetic Leader",
  description: "Social skill lessons, communication frameworks, and presence master classes for introverts"
};

const pageContent = PAGE_CONTENT.lessons;

// Fallback mock data for lessons
const MOCK_LESSONS = [
  {
    _id: 'lesson-1',
    title: 'Eye Contact Without Intensity',
    category: 'Beginner',
    pillar: 'Physical Grounding',
    description: 'Master the 70/30 rule: Hold eye contact for 70% of conversation, look away 30%. Maintain presence without intimidation.',
    duration: '8 min read',
    image: '/images/lessons/eye-contact.jpg',
    icon: '👁️'
  },
  {
    _id: 'lesson-2',
    title: 'The Power Pause',
    category: 'Beginner',
    pillar: 'Physical Grounding',
    description: 'Learn to command space through deliberate silence. Strategic pauses amplify presence and authority without words.',
    duration: '6 min read',
    image: '/images/lessons/power-pause.jpg',
    icon: '⏸️'
  },
  {
    _id: 'lesson-3',
    title: 'Active Listening Scripts',
    category: 'Beginner',
    pillar: 'Social Scripting',
    description: 'Templated responses that make people feel heard. "So what you\'re saying is..." frameworks to deepen connection.',
    duration: '10 min read',
    image: '/images/lessons/active-listening.jpg',
    icon: '👂'
  },
  {
    _id: 'lesson-4',
    title: 'The Confident Introduction',
    category: 'Beginner',
    pillar: 'Social Scripting',
    description: 'A 30-second introduction framework that positions your value without overselling. Perfect for networking and first meetings.',
    duration: '7 min read',
    image: '/images/lessons/introduction.jpg',
    icon: '🤝'
  },
  {
    _id: 'lesson-5',
    title: 'Body Language Mapping',
    category: 'Intermediate',
    pillar: 'Physical Grounding',
    description: 'Decode what your body is communicating. Posture, hand placement, and stance adjustments that signal confidence.',
    duration: '12 min read',
    image: '/images/lessons/body-language.jpg',
    icon: '💪'
  },
  {
    _id: 'lesson-6',
    title: 'Managing Social Fatigue',
    category: 'Intermediate',
    pillar: 'Energy Mastery',
    description: 'Strategic activation and recovery protocols. How to maintain presence through long events without burnout.',
    duration: '11 min read',
    image: '/images/lessons/energy-management.jpg',
    icon: '🔋'
  },
  {
    _id: 'lesson-7',
    title: 'Navigating Difficult Conversations',
    category: 'Intermediate',
    pillar: 'Social Scripting',
    description: 'Framework for disagreeing, setting boundaries, and handling conflict with composure and clarity.',
    duration: '13 min read',
    image: '/images/lessons/difficult-conversations.jpg',
    icon: '💬'
  },
  {
    _id: 'lesson-8',
    title: 'Advanced Presence in High-Stakes Meetings',
    category: 'Advanced',
    pillar: 'Physical Grounding',
    description: 'Command rooms without dominating. How to influence decisions and shape perception at executive levels.',
    duration: '14 min read',
    image: '/images/lessons/executive-presence.jpg',
    icon: '🎯'
  },
  {
    _id: 'lesson-9',
    title: 'Building Your Presence Multiplier',
    category: 'Advanced',
    pillar: 'Energy Mastery',
    description: 'Scale your influence through systems. Delegate, empower, and amplify your leadership beyond your presence.',
    duration: '15 min read',
    image: '/images/lessons/presence-multiplier.jpg',
    icon: '📈'
  }
];

export default async function Showcase() {
  // For now, use mock data. In future, fetch from Sanity curated lessons content
  const lessons = MOCK_LESSONS;

  return (
    <div className="min-h-screen page-wrapper bg-primary">
      <PageTransition animation="slide-right">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24" id="main-content">
        {/* HERO SECTION */}
        <div className="relative py-12 sm:py-20 lg:py-28">
          {/* Technical background grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, var(--border-color) 25%, var(--border-color) 26%, transparent 27%, transparent 74%, var(--border-color) 75%, var(--border-color) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, var(--border-color) 25%, var(--border-color) 26%, transparent 27%, transparent 74%, var(--border-color) 75%, var(--border-color) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '60px 60px'
          }} />

          {/* CONTENT */}
          <div className="relative z-10 space-y-8 max-w-3xl">
            <div className="inline-flex items-center gap-3 px-5 py-3 border-2 border-tertiary bg-tertiary">
              <span className="w-2 h-2 bg-tertiary animate-pulse rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-tertiary">📚 MASTER CLASSES</span>
            </div>

            <div>
              <Heading level={1} className="mb-4">SOCIAL SKILL<br />
                <span className="text-tertiary">LESSONS</span>
              </Heading>
              <div className="h-1 w-40 bg-neon" />
            </div>

            <p className="text-lg font-black text-secondary leading-tight">
              Beginner → Intermediate → Advanced | Physical Grounding | Social Scripting | Energy Mastery
            </p>
            <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
              Bite-sized lessons and deep-dives on building Quiet Command. Learn frameworks, scripts, and techniques that help introverts leverage their natural strengths to lead without losing themselves.
            </p>
          </div>
        </div>

        {/* BEGINNER SECTION */}
        <section className="mb-24 py-12 sm:py-16 lg:py-20 relative">
          <div className="relative z-10">
          <ScrollFade>
            <div className="mb-12 pb-6 border-b-3" style={{ borderColor: 'var(--accent-vibrant)' }}>
              <Heading level={2} className="mb-4 uppercase text-readable" style={{ color: 'var(--accent-vibrant)' }}>▶ BEGINNER FUNDAMENTALS</Heading>
              <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
                Start here. Master the foundational skills of physical presence and social mechanics. Build the confidence that comes from knowing what to do and say.
              </p>
            </div>
          </ScrollFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.filter((l: any) => l.category === 'Beginner').map((lesson: any) => (
              <div key={lesson._id} className="group card border-2 border-slate-200 hover:border-vibrant transition-all duration-300 overflow-hidden flex flex-col">
                <div className="h-32 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl relative overflow-hidden">
                  <span className="group-hover:scale-125 transition-transform duration-300">{lesson.icon}</span>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-vibrant)' }}>
                    {lesson.pillar}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-vibrant transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-tertiary leading-relaxed flex-1">
                    {lesson.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xs text-tertiary">{lesson.duration}</span>
                    <a href="#" className="text-xs font-bold uppercase text-vibrant hover:gap-2 hover:translate-x-1 transition-all inline-flex items-center gap-1">Read →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        <DecorativeDivider color="vibrant" variant="line-dots" dotCount={7} className="bg-primary" />

        {/* INTERMEDIATE SECTION */}
        <section className="mb-24 py-12 sm:py-16 lg:py-20 relative">
          <div className="relative z-10">
          <ScrollFade>
            <div className="mb-12 pb-6 border-b-3" style={{ borderColor: 'var(--accent-secondary)' }}>
              <Heading level={2} className="mb-4 uppercase text-readable" style={{ color: 'var(--accent-secondary)' }}>▶ INTERMEDIATE MASTERY</Heading>
              <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
                Build on fundamentals. Advanced applications of the three pillars. Learn to manage energy, navigate complexity, and influence outcomes in professional settings.
              </p>
            </div>
          </ScrollFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.filter((l: any) => l.category === 'Intermediate').map((lesson: any) => (
              <div key={lesson._id} className="group card border-2 border-slate-200 hover:border-secondary transition-all duration-300 overflow-hidden flex flex-col">
                <div className="h-32 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl relative overflow-hidden">
                  <span className="group-hover:scale-125 transition-transform duration-300">{lesson.icon}</span>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-secondary)' }}>
                    {lesson.pillar}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-secondary transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-tertiary leading-relaxed flex-1">
                    {lesson.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xs text-tertiary">{lesson.duration}</span>
                    <a href="#" className="text-xs font-bold uppercase text-secondary hover:gap-2 hover:translate-x-1 transition-all inline-flex items-center gap-1">Read →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        <DecorativeDivider color="secondary" variant="line-dots" dotCount={5} className="bg-primary" />

        {/* ADVANCED SECTION */}
        <section className="mb-20 py-12 sm:py-16 lg:py-20 relative">
          <div className="relative z-10">
          <ScrollFade>
            <div className="mb-12 pb-6 border-b-3" style={{ borderColor: 'var(--accent-tertiary)' }}>
              <Heading level={2} className="mb-4 uppercase text-readable" style={{ color: 'var(--accent-tertiary)' }}>▶ ADVANCED AMPLIFICATION</Heading>
              <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
                Command your field. Executive presence, system building, and scaling your influence. From personal mastery to organizational impact.
              </p>
            </div>
          </ScrollFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.filter((l: any) => l.category === 'Advanced').map((lesson: any) => (
              <div key={lesson._id} className="group card border-2 border-slate-200 hover:border-tertiary transition-all duration-300 overflow-hidden flex flex-col">
                <div className="h-32 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl relative overflow-hidden">
                  <span className="group-hover:scale-125 transition-transform duration-300">{lesson.icon}</span>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-tertiary)' }}>
                    {lesson.pillar}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-tertiary transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-tertiary leading-relaxed flex-1">
                    {lesson.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xs text-tertiary">{lesson.duration}</span>
                    <a href="#" className="text-xs font-bold uppercase text-tertiary hover:gap-2 hover:translate-x-1 transition-all inline-flex items-center gap-1">Read →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Master Quiet Command?"
          description="Choose a coaching program that matches your skill level, or start with a free Presence Audit to assess your baseline."
          buttonText="Book Your Audit"
          buttonLink="/programs"
        />
      </main>
      </PageTransition>
    </div>
  );
}
