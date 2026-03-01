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
    <section className="mb-24 py-12 sm:py-16 lg:py-20">
      <ScrollFade>
        <div className="mb-12 pb-6 border-b-2" style={{ borderColor: 'var(--border-color)' }}>
          <Heading level={2} className="mb-4">All Programs</Heading>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            A program for every stage of your journey. From free assessment to intensive 1-on-1 coaching.
          </p>
        </div>
      </ScrollFade>

      <ScrollStagger variant="slideInUp" staggerDelay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, idx) => (
            <ScrollFade key={program._id} delay={idx * 100}>
              <div 
                className="card group flex flex-col min-h-full"
                style={{ 
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                {/* Category badge */}
                <p 
                  className="text-xs font-black uppercase tracking-widest mb-4"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {program.category}
                </p>
                
                {/* Title */}
                <h3 
                  className="text-lg sm:text-xl font-black uppercase tracking-widest mb-4 leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {program.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm leading-relaxed mb-6 grow"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {program.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
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
                      className="text-xs italic pt-2"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      + {program.features.length - 3} more
                    </p>
                  )}
                </div>

                {/* Investment */}
                <div 
                  className="border-t pt-4 mb-6"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <p 
                    className="text-xs uppercase tracking-widest font-black mb-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Investment
                  </p>
                  <p 
                    className="text-2xl font-black"
                    style={{ color: 'var(--accent-primary)' }}
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
