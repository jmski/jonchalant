import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import dynamic from 'next/dynamic';
import { getLessons } from "@/lib/sanity";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Leadership Lessons & Coaching | Jonchalant",
  description: "Master quiet command, executive presence, and body-aware leadership through evidence-based lessons and communication frameworks for introverts."
};

export default async function Lessons() {
  let lessons: any[] = [];

  try {
    const sanityLessons = await getLessons();
    if (sanityLessons && sanityLessons.length > 0) {
      lessons = sanityLessons;
    }
  } catch (error) {
    console.warn('Failed to fetch lessons from Sanity, using fallback data:', error);
    // Falls back to MOCK_LESSONS if Sanity fails
  }

  const LessonCategory = ({ level, pillarColor, lessons }: { level: string; pillarColor: string; lessons: any[] }) => (
    <section className="mb-24">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          {level === 'Beginner' && 'Beginner Fundamentals'}
          {level === 'Intermediate' && 'Intermediate Mastery'}
          {level === 'Advanced' && 'Advanced Amplification'}
        </h2>
        <p className="text-lg text-slate-700 max-w-2xl">
          {level === 'Beginner' && 'Start here. Master the foundational skills of physical presence and social mechanics. Build the confidence that comes from knowing what to do and say.'}
          {level === 'Intermediate' && 'Build on fundamentals. Advanced applications of the three pillars. Learn to manage energy, navigate complexity, and influence outcomes in professional settings.'}
          {level === 'Advanced' && 'Command your field. Executive presence, system building, and scaling your influence. From personal mastery to organizational impact.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="border border-slate-200 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="h-32 bg-slate-100 flex items-center justify-center text-4xl">
              {lesson.icon}
            </div>
            <div className="flex-1 p-8 flex flex-col">
              <span className="text-xs uppercase tracking-widest font-medium text-slate-600 mb-3">
                {lesson.pillar}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {lesson.title}
              </h3>
              <p className="text-slate-700 leading-relaxed flex-1 mb-4">
                {lesson.description}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <span className="text-xs text-slate-600">{lesson.duration}</span>
                <a href="#" className="text-sm font-medium text-slate-900 hover:text-slate-600">
                  Read →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <PageTransition animation="slide-right">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* HERO */}
          <section className="mb-24">
            <div className="inline-block mb-6">
              <span className="text-sm uppercase tracking-widest font-medium text-slate-600">Structured Learning</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Social Skill Lessons
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl">
              Bite-sized lessons and deep-dives on building Quiet Command. Learn frameworks, scripts, and techniques that help introverts leverage their natural strengths to lead without losing themselves.
            </p>
            <p className="text-base text-slate-600 mt-4">
              Organized by skill level: Beginner → Intermediate → Advanced
            </p>
          </section>

          {/* LESSON CATEGORIES */}
          <LessonCategory 
            level="Beginner" 
            pillarColor="text-slate-900"
            lessons={lessons.filter((l) => l.category === 'Beginner')} 
          />
          
          <LessonCategory 
            level="Intermediate" 
            pillarColor="text-slate-900"
            lessons={lessons.filter((l) => l.category === 'Intermediate')} 
          />
          
          <LessonCategory 
            level="Advanced" 
            pillarColor="text-slate-900"
            lessons={lessons.filter((l) => l.category === 'Advanced')} 
          />

          {/* CTA */}
          <section className="py-16">
            <CTASection
              title="Ready to Master Quiet Command?"
              description="Choose a coaching program that matches your skill level, or start with a free Presence Audit to assess your baseline."
              buttonText="Book Your Audit"
              buttonLink="/programs"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
