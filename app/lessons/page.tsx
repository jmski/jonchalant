import { CTA, LessonCategory, GenericHero } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { TextLink } from "@/components/typography";
import dynamic from 'next/dynamic';
import { getLessons } from "@/lib/sanity";

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

  return (
    <div className="lessons-main">
      <PageTransition animation="fade">
        {/* HERO */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <GenericHero
              subheading="Structured Learning"
              heading="Master Quiet Command: Leadership Lessons"
              description="Bite-sized lessons and deep-dives on building Quiet Command. Learn frameworks, scripts, and techniques that help introverts leverage their natural strengths to lead without losing themselves."
            >
              <p className="lessons-hero-meta">
                Organized by skill level: Beginner → Intermediate → Advanced
              </p>
            </GenericHero>
          </SectionContent>
        </SectionWrapper>

        {/* CONCEPT-TO-MOVEMENT LINK */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section className="lessons-supplemental-section">
              <p className="lessons-supplemental-text">
                See these principles in motion: Watch how body awareness creates executive presence in my{' '}
                <TextLink href="/dance">
                  choreography portfolio
                </TextLink>
                .
              </p>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* BEGINNER LESSONS */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <LessonCategory 
              level="Beginner"
              lessons={lessons.filter((l) => l.category === 'Beginner')} 
            />
          </SectionContent>
        </SectionWrapper>
        
        {/* INTERMEDIATE LESSONS */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <LessonCategory 
              level="Intermediate"
              lessons={lessons.filter((l) => l.category === 'Intermediate')} 
            />
          </SectionContent>
        </SectionWrapper>
        
        {/* ADVANCED LESSONS */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <LessonCategory 
              level="Advanced"
              lessons={lessons.filter((l) => l.category === 'Advanced')} 
            />
          </SectionContent>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section>
              <CTA
                title="Learn Better with Coaching"
                description="These lessons teach the frameworks. But transformation happens through application. Get personalized guidance, real-time feedback, and accountability through a coaching program."
                buttonText="Find Your Program"
                buttonLink="/programs"
              />
            </section>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
