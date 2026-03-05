/**
 * ProgramCardsSection Component
 * ─────────────────────────────────────────────
 * Displays programs in a responsive grid of cards with features and pricing.
 * 
 * CSS Classes Used:
 * - .program-cards-section: Main container
 * - .program-cards-header: Section header
 * - .program-cards-grid: Responsive 1→2→3 column grid
 * - .program-card: Individual card wrapper with flex layout
 * - .program-card-*: Card sub-components (category, title, features, etc.)
 * 
 * Props:
 *   programs: Array of program objects with title, category, description, etc.
 */
'use client';

import { ScrollFade, ScrollStagger } from "@/components/animations";
import { Heading } from "@/components/typography";

interface Program {
  _id: string;
  title: string;
  category: string;
  description: string;
  investment: string;
  features: string[];
}

interface ProgramCardsSectionProps {
  programs: Program[];
}

export default function ProgramCardsSection({ programs }: ProgramCardsSectionProps) {
  return (
    <section className="program-cards-section">
      <ScrollFade>
        <div className="program-cards-header">
          <Heading level={2} className="program-cards-title">All Programs</Heading>
          <p className="program-cards-subtitle">
            A program for every stage of your journey. From free assessment to intensive 1-on-1 coaching.
          </p>
        </div>
      </ScrollFade>

      <ScrollStagger variant="slideInUp" staggerDelay={100}>
        <div className="program-cards-grid">
          {programs.map((program, idx) => (
            <ScrollFade key={program._id} delay={idx * 100}>
              <div className="program-card card">
                {/* Category badge */}
                <p className="program-card-category text-badge">
                  {program.category}
                </p>
                
                {/* Title */}
                <h3 className="program-card-title">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="program-card-description">
                  {program.description}
                </p>

                {/* Features */}
                <div className="program-card-features">
                  {program.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="program-card-feature">
                      <span className="program-card-feature-check">✓</span>
                      <span className="program-card-feature-text">{feature}</span>
                    </div>
                  ))}
                  {program.features.length > 3 && (
                    <p className="program-card-more-features">
                      + {program.features.length - 3} more
                    </p>
                  )}
                </div>

                {/* Investment */}
                <div className="program-card-investment">
                  <p className="program-card-investment-label text-badge">
                    Investment
                  </p>
                  <p className="program-card-investment-amount">
                    {program.investment}
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href={program._id === 'program-6' ? '#audit-cta' : '#inquiry-form'}
                  className="program-card-cta btn btn-primary"
                >
                  Learn More
                </a>
              </div>
            </ScrollFade>
          ))}
        </div>
      </ScrollStagger>
    </section>
  );
}
