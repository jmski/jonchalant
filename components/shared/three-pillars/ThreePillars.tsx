'use client';

import { ScrollStagger, ScrollFade } from '@/components/animations';
import { Heading } from '@/components/typography';

interface Pillar {
  title: string;
  description: string;
  icon: string;
  colorClass: 'pillar-card-burnt-indigo' | 'pillar-card-moss' | 'pillar-card-accent';
}

const pillars: Pillar[] = [
  {
    title: 'Physical Grounding',
    description: 'Your body speaks before your words do. I teach you how to use movement, posture, and spatial awareness to command presence naturally—without forcing it.',
    icon: '🧭',
    colorClass: 'pillar-card-burnt-indigo'
  },
  {
    title: 'Social Scripting',
    description: 'Networking, conversations, and influence don\'t require you to be a natural extrovert. Learn the frameworks and mechanics I discovered in sales that make human connection predictable.',
    icon: '🔗',
    colorClass: 'pillar-card-moss'
  },
  {
    title: 'Energy Mastery',
    description: 'As an introvert, you have a limited but powerful energy reserve. I teach you how to activate it strategically, lead authentically, and avoid burnout.',
    icon: '⚡',
    colorClass: 'pillar-card-accent'
  }
];

/**
 * ThreePillars Component
 * ─────────────────────────────────────────────
 * Displays three core pillars of the Kinetic Method.
 * 
 * CSS Classes Used:
 * - .three-pillars: Main section wrapper
 * - .three-pillars-content: Constrained width container
 * - .three-pillars-header: Header section
 * - .three-pillars-tag: Tag styling
 * - .three-pillars-title: Main heading
 * - .three-pillars-description: Header description
 * - .three-pillars-grid: Card grid layout
 * - .pillar-card: Individual card base
 * - .pillar-card-{variant}: Color variants (burnt-indigo, moss, accent)
 * - .pillar-icon: Icon styling
 * - .pillar-title: Card title
 * - .pillar-description: Card description
 * - .pillar-accent-bar: Animated bottom bar
 */
export default function ThreePillars() {
  return (
    <section className="three-pillars">
      <div className="three-pillars-content">
        {/* Header */}
        <div className="three-pillars-header">
          <span className="three-pillars-tag">→ THE KINETIC METHOD</span>
          <Heading level={2} className="mt-4 mb-6">Three Pillars of Quiet Command</Heading>
          <p className="three-pillars-description">
            Every introvert has the capacity to lead. The question isn't whether you can—it's whether you know <em>how</em>. My methodology combines three proven drivers of professional presence.
          </p>
        </div>

        {/* Three Pillar Cards */}
        <ScrollStagger variant="slideInUp" staggerDelay={120}>
          <div className="three-pillars-grid">
            {pillars.map((pillar, idx) => (
              <ScrollFade key={idx} variant="slideInUp" delay={idx * 150}>
                <div className={`pillar-card ${pillar.colorClass}`}>
                  {/* Icon */}
                  <div className="pillar-icon">
                    {pillar.icon}
                  </div>

                  {/* Title */}
                  <h3 className="pillar-title">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="pillar-description">
                    {pillar.description}
                  </p>

                  {/* Accent decoration */}
                  <div className="pillar-accent-bar" />
                </div>
              </ScrollFade>
            ))}
          </div>
        </ScrollStagger>

        {/* Bottom CTA */}
        <div style={{ marginTop: 'var(--spacing-2xl)', paddingTop: 'var(--spacing-3xl)', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-muted-moss)', fontSize: '1.125rem', marginBottom: 'var(--spacing-md)', maxWidth: '40rem', margin: '0 auto var(--spacing-md)' }}>
            These three drivers compound. Master them, and you become unstoppable—while staying true to who you are.
          </p>
          <a
            href="/programs"
            className="btn-primary-bold"
          >
            Explore Programs
          </a>
        </div>
      </div>
    </section>
  );
}
