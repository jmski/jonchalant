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
  color: string;
}

interface ProgramCardsSectionProps {
  programs: Program[];
}

const getColorVar = (color: string) => {
  const colorMap: Record<string, string> = {
    vibrant: 'var(--accent-vibrant)',
    secondary: 'var(--accent-secondary)',
    tertiary: 'var(--accent-tertiary)',
    primary: 'var(--text-primary)'
  };
  return colorMap[color] || 'var(--text-primary)';
};

export default function ProgramCardsSection({ programs }: ProgramCardsSectionProps) {
  return (
    <section className="mb-24 py-12 sm:py-16 lg:py-20 relative">
      <div className="relative z-10">
        <ScrollFade>
          <div className="mb-12 pb-6 border-b-3 border-vibrant">
            <Heading level={2} className="mb-4">All Programs</Heading>
            <p className="text-base leading-relaxed text-primary font-body max-w-2xl">
              A program for every stage of your journey. From free assessment to intensive 1-on-1 coaching.
            </p>
          </div>
        </ScrollFade>

        <ScrollStagger variant="slideInUp" staggerDelay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program, idx) => {
              const colorVar = getColorVar(program.color);
              return (
                <ScrollFade key={program._id} delay={idx * 100}>
                  <div className="group relative border-2" style={{ borderColor: colorVar }}>
                    {/* Card content */}
                    <div className="p-8 h-full flex flex-col">
                      {/* Category badge */}
                      <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: colorVar }}>
                        {program.category}
                      </p>
                      
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest text-primary mb-4 leading-tight">
                        {program.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-primary mb-6 flex-grow">
                        {program.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {program.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex gap-2 items-start text-xs">
                            <span className="font-black flex-shrink-0" style={{ color: colorVar }}>✓</span>
                            <span className="text-primary">{feature}</span>
                          </div>
                        ))}
                        {program.features.length > 3 && (
                          <p className="text-xs text-primary italic pt-2">+ {program.features.length - 3} more</p>
                        )}
                      </div>

                      {/* Investment */}
                      <div className="border-t pt-4 mb-4" style={{ borderColor: colorVar }}>
                        <p className="text-xs uppercase tracking-widest text-primary font-black mb-1">Investment</p>
                        <p className="text-2xl font-black" style={{ color: colorVar }}>
                          {program.investment}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={program._id === 'program-6' ? '#audit-cta' : '#inquiry-form'}
                        className="w-full py-3 font-black uppercase tracking-widest text-sm border-2 transition-all duration-300"
                        style={{
                          borderColor: colorVar,
                          color: colorVar,
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.backgroundColor = colorVar;
                          el.style.color = 'var(--bg-primary)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.backgroundColor = 'transparent';
                          el.style.color = colorVar;
                        }}
                      >
                        Learn More
                      </a>
                    </div>

                    {/* Hover effect - corner accent */}
                    <div 
                      className="absolute -top-2 -right-2 w-4 h-4 border-2 border-t-0 border-l-0"
                      style={{ borderColor: colorVar }}
                    />
                  </div>
                </ScrollFade>
              );
            })}
          </div>
        </ScrollStagger>
      </div>
    </section>
  );
}
