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

/**
 * ProgramCardsSection Component
 * ─────────────────────────────────────────────
 * Displays programs in a responsive grid of cards with features and pricing.
 * 
 * CSS Classes Used:
 * - .grid, .grid-responsive-3: Grid layout (1 → 3 columns)
 * - .flex, .flex-col, .items-start: Card layout
 * - .min-h-full, .grow, .mt-auto: Flexible content sizing
 * - .gap-6, .space-y-2: Spacing utilities
 * - .line-clamp-2: Text truncation
 * - .font-black, .uppercase, .tracking-widest: Text styling
 * - .text-badge, .text-label: Typography combinations
 * 
 * Props:
 *   programs: Array of program objects with title, category, description, etc.
 */
export default function ProgramCardsSection({ programs }: ProgramCardsSectionProps) {
  return (
    <section style={{ marginBottom: 'var(--spacing-3xl)', paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-3xl)' }}>
      <ScrollFade>
        <div style={{ marginBottom: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-md)', borderBottom: '2px solid var(--border-color)' }}>
          <Heading level={2} style={{ marginBottom: 'var(--spacing-md)' }}>All Programs</Heading>
          <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
            A program for every stage of your journey. From free assessment to intensive 1-on-1 coaching.
          </p>
        </div>
      </ScrollFade>

      <ScrollStagger variant="slideInUp" staggerDelay={100}>
        <div className="grid-responsive-3">
          {programs.map((program, idx) => (
            <ScrollFade key={program._id} delay={idx * 100}>
              <div 
                className="card flex flex-col min-h-full"
                style={{ 
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                {/* Category badge */}
                <p 
                  className="text-badge"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {program.category}
                </p>
                
                {/* Title */}
                <h3 
                  className="font-black uppercase tracking-widest"
                  style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)', fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', lineHeight: 'var(--leading-tight)' }}
                >
                  {program.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm grow"
                  style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)', lineHeight: 'var(--leading-relaxed)' }}
                >
                  {program.description}
                </p>

                {/* Features */}
                <div className="space-y-2" style={{ marginBottom: 'var(--spacing-lg)' }}>
                  {program.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex gap-2 items-start text-xs">
                      <span 
                        className="font-black shrink-0"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        ✓
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                  {program.features.length > 3 && (
                    <p 
                      className="text-xs italic"
                      style={{ color: 'var(--text-tertiary)', paddingTop: 'var(--spacing-sm)' }}
                    >
                      + {program.features.length - 3} more
                    </p>
                  )}
                </div>

                {/* Investment */}
                <div 
                  className="border-t"
                  style={{ borderColor: 'var(--border-color)', paddingTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}
                >
                  <p 
                    className="text-badge"
                    style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}
                  >
                    Investment
                  </p>
                  <p 
                    className="font-black"
                    style={{ color: 'var(--accent-primary)', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
                  >
                    {program.investment}
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href={program._id === 'program-6' ? '#audit-cta' : '#inquiry-form'}
                  className="btn btn-primary w-full text-center mt-auto"
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
