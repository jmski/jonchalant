'use client';

import { ScrollStagger, ScrollFade } from '@/components/animations';
import { Heading } from '@/components/typography';

interface Pillar {
  title: string;
  description: string;
  icon: string;
  color: 'vibrant' | 'secondary' | 'tertiary';
}

const pillars: Pillar[] = [
  {
    title: 'Physical Grounding',
    description: 'Your body speaks before your words do. I teach you how to use movement, posture, and spatial awareness to command presence naturally—without forcing it.',
    icon: '🧭',
    color: 'vibrant'
  },
  {
    title: 'Social Scripting',
    description: 'Networking, conversations, and influence don\'t require you to be a natural extrovert. Learn the frameworks and mechanics I discovered in sales that make human connection predictable.',
    icon: '🔗',
    color: 'secondary'
  },
  {
    title: 'Energy Mastery',
    description: 'As an introvert, you have a limited but powerful energy reserve. I teach you how to activate it strategically, lead authentically, and avoid burnout.',
    icon: '⚡',
    color: 'tertiary'
  }
];

export default function ThreePillars() {
  const colorMap = {
    vibrant: 'border-vibrant text-vibrant',
    secondary: 'border-secondary text-secondary',
    tertiary: 'border-tertiary text-tertiary'
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-primary border-t border-b border-primary">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-3" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border-color) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="text-vibrant text-xs uppercase tracking-widest font-black">→ THE KINETIC METHOD</span>
          <Heading level={2} className="mt-4 mb-6">Three Pillars of Quiet Command</Heading>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed">
            Every introvert has the capacity to lead. The question isn't whether you can—it's whether you know <em>how</em>. My methodology combines three proven drivers of professional presence.
          </p>
        </div>

        {/* Three Pillar Cards */}
        <ScrollStagger variant="slideInUp" staggerDelay={120}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <ScrollFade key={idx} variant="slideInUp" delay={idx * 150}>
                <div
                  className={`relative p-8 border-3 ${colorMap[pillar.color]} bg-primary hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                  style={{
                    borderColor: pillar.color === 'vibrant' ? 'var(--accent-vibrant)' : 
                                 pillar.color === 'secondary' ? 'var(--accent-secondary)' : 
                                 'var(--accent-tertiary)'
                  }}
                >
                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-xl sm:text-2xl font-black mb-4 leading-tight"
                    style={{
                      color: pillar.color === 'vibrant' ? 'var(--accent-vibrant)' : 
                             pillar.color === 'secondary' ? 'var(--accent-secondary)' : 
                             'var(--accent-tertiary)'
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary leading-relaxed text-sm sm:text-base">
                    {pillar.description}
                  </p>

                  {/* Accent decoration */}
                  <div className="mt-6 h-1 w-0 group-hover:w-12 transition-all duration-300"
                    style={{
                      backgroundColor: pillar.color === 'vibrant' ? 'var(--accent-vibrant)' : 
                                       pillar.color === 'secondary' ? 'var(--accent-secondary)' : 
                                       'var(--accent-tertiary)'
                    }}
                  />
                </div>
              </ScrollFade>
            ))}
          </div>
        </ScrollStagger>

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-primary text-center">
          <p className="text-secondary text-lg mb-6 max-w-2xl mx-auto">
            These three drivers compound. Master them, and you become unstoppable—while staying true to who you are.
          </p>
          <a
            href="/programs"
            className="inline-block px-8 py-4 font-black uppercase tracking-[0.1em] text-sm border-2 border-vibrant bg-vibrant text-primary hover:bg-primary hover:text-vibrant transition-all duration-300"
          >
            Explore Programs
          </a>
        </div>
      </div>
    </section>
  );
}
