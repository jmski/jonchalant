import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getLessons } from "@/lib/sanity";
import '@/app/css/lessons.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Leadership Lessons & Coaching | Evidence-Based Training | Jonchalant",
  description: "Master quiet command, executive presence, and body-aware leadership through evidence-based lessons and communication frameworks for introverts.",
  keywords: "leadership lessons, executive presence, quiet command, introvert leadership, body awareness, communication frameworks, executive coaching, subtle persuasion, nonverbal communication",
  openGraph: {
    title: "Leadership Lessons & Coaching | Jonchalant",
    description: "Master quiet command and executive presence through evidence-based lessons and body-aware techniques.",
    type: "website",
    url: "https://jonchalant.com/lessons",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-lessons-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Leadership Lessons & Coaching",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership Lessons & Coaching | Jonchalant",
    description: "Master quiet command and executive presence through evidence-based lessons.",
    images: ["https://jonchalant.com/social/og-lessons-1200x630.png"],
    creator: "@jonchalant",
  },
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
      <div className="mb-12 pb-6 border-b border-slate-200">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          {level === 'Beginner' && '🎯 Beginner: Build Your Foundation'}
          {level === 'Intermediate' && '🚀 Intermediate: Deepen Your Command'}
          {level === 'Advanced' && '👑 Advanced: Master Your Impact'}
        </h2>
        <p className="text-lg text-slate-700 max-w-3xl">
          {level === 'Beginner' && 'Learn what presence actually is—and isn\'t. These fundamentals cover body awareness, vocal clarity, and the psychology of how people perceive authority. Master these first.'}
          {level === 'Intermediate' && 'Apply the fundamentals in complex situations. Learn to read rooms, navigate power dynamics, manage your energy in high-stakes moments, and lead without being loud.'}
          {level === 'Advanced' && 'Command rooms, shape culture, and amplify your influence across teams and organizations. Executive presence that scales and sustains.'}
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
    <div className="lessons-main">
      <PageTransition animation="slide-right">
        {/* HERO */}
        <div className="lessons-section-wrapper lessons-section-hero">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section>
              <div className="inline-block mb-6">
                <span className="text-sm uppercase tracking-widest font-medium text-slate-600">Structured Learning</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Master Quiet Command: Leadership Lessons
              </h1>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl">
                Bite-sized lessons and deep-dives on building Quiet Command. Learn frameworks, scripts, and techniques that help introverts leverage their natural strengths to lead without losing themselves.
              </p>
              <p className="text-base text-slate-600 mt-4">
                Organized by skill level: Beginner → Intermediate → Advanced
              </p>
            </section>
          </main>
        </div>

        {/* CONCEPT-TO-MOVEMENT LINK */}
        <div className="lessons-section-wrapper lessons-section-supplemental">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="p-8 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-700">
                See these principles in motion: Watch how body awareness creates executive presence in my{' '}
                <Link href="/dance" className="font-semibold text-slate-900 hover:text-accent transition-colors underline">
                  choreography portfolio
                </Link>
                .
              </p>
            </section>
          </main>
        </div>

        {/* BEGINNER LESSONS */}
        <div className="lessons-section-wrapper lessons-section-beginner">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <LessonCategory 
              level="Beginner" 
              pillarColor="text-slate-900"
              lessons={lessons.filter((l) => l.category === 'Beginner')} 
            />
          </main>
        </div>
        
        {/* INTERMEDIATE LESSONS */}
        <div className="lessons-section-wrapper lessons-section-intermediate">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <LessonCategory 
              level="Intermediate" 
              pillarColor="text-slate-900"
              lessons={lessons.filter((l) => l.category === 'Intermediate')} 
            />
          </main>
        </div>
        
        {/* ADVANCED LESSONS */}
        <div className="lessons-section-wrapper lessons-section-advanced">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <LessonCategory 
              level="Advanced" 
              pillarColor="text-slate-900"
              lessons={lessons.filter((l) => l.category === 'Advanced')} 
            />
          </main>
        </div>

        {/* CTA */}
        <div className="lessons-section-wrapper lessons-section-cta">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section>
              <CTASection
                title="Learn Better with Coaching"
                description="These lessons teach the frameworks. But transformation happens through application. Get personalized guidance, real-time feedback, and accountability through a coaching program."
                buttonText="Find Your Program"
                buttonLink="/programs"
              />
            </section>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
