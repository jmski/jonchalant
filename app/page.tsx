import { HomeHero } from '@/components/hero';
import { PageTransition } from '@/components/layout';
import { ScrollFade, ScrollStagger } from '@/components/animations';
import {
  CornerBrackets,
  DecorativeDivider,
  PatternBackground,
  LayeredPatternOverlay,
  DecorativeCornerBracket,
} from '@/components/effects';
import { Heading } from '@/components/typography';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Below-fold dynamic imports
const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

export default function Home() {
  return (
    <div className="bg-primary text-primary">
      <PageTransition animation="fade">
      {/* MAXIMALIST HERO SECTION */}
      <section 
        className="relative overflow-hidden pt-0 pb-16 md:pb-32"
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 95, 31, 0.05) 25%, rgba(255, 95, 31, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 95, 31, 0.05) 75%, rgba(255, 95, 31, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 95, 31, 0.05) 25%, rgba(255, 95, 31, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 95, 31, 0.05) 75%, rgba(255, 95, 31, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      >
        {/* Floating SVG Elements - Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large circle */}
          <svg className="absolute top-10 left-5 opacity-10 md:opacity-20 animate-pulse" width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--accent-vibrant)" strokeWidth="2" />
          </svg>

          {/* Floating squares */}
          <svg className="absolute top-32 right-10 opacity-15 md:opacity-25" width="150" height="150" viewBox="0 0 150 150" style={{ animation: 'float 6s ease-in-out infinite' }}>
            <rect x="10" y="10" width="130" height="130" fill="none" stroke="var(--accent-vibrant)" strokeWidth="1.5" />
            <rect x="30" y="30" width="90" height="90" fill="none" stroke="var(--accent-vibrant)" strokeWidth="1" opacity="0.6" />
          </svg>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, var(--border-color) 25%, var(--border-color) 26%, transparent 27%, transparent 74%, var(--border-color) 75%, var(--border-color) 76%, transparent 77%, transparent)',
            backgroundSize: '60px 60px'
          }} />

          {/* Accent dots */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-vibrant rounded-full opacity-30" />
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-accent-vibrant rounded-full opacity-40" />
          <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-accent-vibrant rounded-full opacity-25" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeHero />
        </div>
      </section>

      {/* BOLD STATS & METRICS SECTION - MAXIMALIST */}
      <section 
        className="py-16 md:py-24 border-t border-b border-primary relative"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          backgroundImage: 'linear-gradient(135deg, rgba(0, 255, 255, 0.02) 0%, rgba(255, 0, 255, 0.02) 100%)'
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 border-3 border-neon opacity-5" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 border-2 border-magenta opacity-3" style={{ borderStyle: 'dashed' }} />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollStagger variant="slideInUp" staggerDelay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Stats Cards - BOLD NEW STYLE */}
              {[
                { label: 'CHOREOGRAPHY PIECES', value: '50+', icon: '▶' },
                { label: 'BRAND COLLABORATIONS', value: '30+', icon: '◆' },
                { label: 'YEARS EXPERIENCE', value: '8+', icon: '●' },
              ].map((stat, idx) => (
              <div
                key={idx}
                className="relative group border-bold border-primary bg-primary transition-all duration-300 hover:shadow-bold card-padding-lg overflow-hidden"
              >
                {/* Corner brackets */}
                <CornerBrackets color="vibrant" size="sm" position="all" thickness={2} opacity={0.7} />
                
                <div className="relative z-10 space-y-4">
                  <div className="text-5xl md:text-6xl font-black mb-2 heading-display text-vibrant">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-tertiary retro-label">
                    {stat.label}
                  </div>
                  <div className="text-4xl opacity-30 select-none text-vibrant">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Decorative Divider */}
      <DecorativeDivider color="neon" variant="line-dots" dotCount={7} className="bg-primary" />

      {/* FEATURED AREAS - EDITORIAL ASYMMETRIC LAYOUT */}
      <section className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Layered pattern background */}
        <LayeredPatternOverlay
          pattern1="grid"
          pattern2="diagonal"
          color1="neon"
          color2="magenta"
          opacity1={0.04}
          opacity2={0.02}
          rotation={-15}
        />

        {/* Maximalist background decoration */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 border-4 border-neon rounded-full" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 border-3 border-magenta" style={{ borderStyle: 'dashed' }} />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 pr-0 md:pr-12">
            <span className="retro-label text-neon text-xs">→ PRIMARY FOCUS AREAS</span>
            <Heading level={2} className="mt-4 mb-6">What I<br />Specialize In</Heading>
            <div className="w-32 h-3 bg-vibrant" />
          </div>

          {/* EDITORIAL ASYMMETRIC GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Dance Portfolio - BOLD */}
              <ScrollFade variant="slideInUp" delay={0}>
            <div 
              className="border-bold border-vibrant bg-vibrant-faint group cursor-pointer transition-all duration-300 hover:shadow-vibrant"
            >
              <div className="aspect-square bg-linear-to-br from-vibrant/20 to-transparent flex items-center justify-center relative overflow-hidden">
                {/* Diagonal lines pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--accent-vibrant) 10px, var(--accent-vibrant) 11px)'
                }} />
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-3 text-vibrant font-black">▶</div>
                  <div className="text-xs font-black uppercase tracking-widest text-vibrant retro-label">
                    30+ Videos
                  </div>
                </div>
              </div>
              <div className="p-6 border-t-3 border-vibrant">
                <Heading level={3} className="mb-3">Dance Portfolio</Heading>
                <p className="text-sm text-secondary font-body">
                  Choreography, freestyle, performances & tutorials
                </p>
              </div>
            </div>
            </ScrollFade>

            {/* Showcase - NEON */}
            <ScrollFade variant="slideInUp" delay={80}>
            <div 
              className="border-bold border-neon bg-neon-faint group cursor-pointer transition-all duration-300 hover:shadow-neon"
            >
              <div className="aspect-square bg-linear-to-br from-neon/20 to-transparent flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, var(--accent-neon) 10px, var(--accent-neon) 11px)'
                }} />
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-3 text-neon font-black">✦</div>
                  <div className="text-xs font-black uppercase tracking-widest text-neon retro-label">
                    Gunpla & Pokémon
                  </div>
                </div>
              </div>
              <div className="p-6 border-t-3 border-neon">
                <Heading level={3} className="mb-3">Creative Showcase</Heading>
                <p className="text-sm text-secondary font-body">
                  Model builds, collections & digital media
                </p>
              </div>
            </div>
            </ScrollFade>

            {/* Collaborations - MAGENTA */}
            <ScrollFade variant="slideInUp" delay={160}>
            <div 
              className="border-bold border-magenta bg-magenta-faint group cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-square bg-linear-to-br from-magenta/20 to-transparent flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, var(--accent-magenta) 10px, var(--accent-magenta) 11px)'
                }} />
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-3 text-magenta font-black">◆</div>
                  <div className="text-xs font-black uppercase tracking-widest text-magenta retro-label">
                    Brand Ready
                  </div>
                </div>
              </div>
              <div className="p-6 border-t-3 border-magenta">
                <Heading level={3} className="mb-3">Collaborations</Heading>
                <p className="text-sm text-secondary font-body">
                  Partnerships, campaigns & brand opportunities
                </p>
              </div>
            </div>
            </ScrollFade>
          </div>

          {/* What's Possible - Services Grid */}
          <div className="border-t-4 border-primary pt-16">
            <div className="mb-12">
              <h3 className="text-lg font-black uppercase tracking-widest text-tertiary retro-label mb-3">→ Services & Offerings</h3>
              <Heading level={3}>What We Can Create</Heading>
            </div>
            <ScrollStagger variant="scaleUp" staggerDelay={60}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { item: 'Music Videos', icon: '▶' },
                  { item: 'TikTok/Reels', icon: '⬜' },
                  { item: 'Choreography', icon: '💃' },
                  { item: 'Brand Campaigns', icon: '◆' },
                  { item: 'Live Events', icon: '🎪' },
                  { item: 'Workshops', icon: '📚' },
                  { item: 'Consulting', icon: '⚙️' },
                  { item: 'Content Direction', icon: '🎬' },
                ].map((service, idx) => (
                <div
                  key={idx}
                  className="border-2 border-primary p-4 text-center hover:border-vibrant hover:bg-vibrant-faint transition-all duration-300 group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-125 transition-transform">
                    {service.icon}
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-primary group-hover:text-vibrant">
                    {service.item}
                  </div>
                </div>
              ))}
              </div>
            </ScrollStagger>
          </div>
        </div>
      </section>

      {/* LAYERED VISUAL SECTION */}
      <section 
        className="py-16 md:py-24 relative bg-tertiary"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Layered visual */}
            <div className="relative h-80 md:h-96">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                {/* Concentric circles */}
                <circle cx="200" cy="200" r="150" fill="none" stroke="var(--accent-vibrant)" strokeWidth="1" opacity="0.3" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="var(--accent-vibrant)" strokeWidth="1" opacity="0.5" />
                <circle cx="200" cy="200" r="90" fill="none" stroke="var(--accent-vibrant)" strokeWidth="2" opacity="0.7" />
                <circle cx="200" cy="200" r="50" fill="var(--accent-vibrant)" opacity="0.2" />
                
                {/* Radiating lines */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30) * (Math.PI / 180);
                  const x2 = 200 + 150 * Math.cos(angle);
                  const y2 = 200 + 150 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="200"
                      y1="200"
                      x2={x2}
                      y2={y2}
                      stroke="var(--accent-vibrant)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <div className="text-5xl font-bold mb-2 text-accent">
                    ◆
                  </div>
                  <p className="text-sm uppercase tracking-widest text-tertiary">
                    Creative Convergence
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Feature list */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">
                Why Work Together
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Technical Excellence', desc: 'Precision choreography with professional production quality' },
                  { title: 'Creative Partnership', desc: 'Collaborative approach from concept to final execution' },
                  { title: 'Strategic Thinking', desc: 'Brand alignment and audience engagement optimization' },
                  { title: 'Fast Turnaround', desc: 'Efficient workflows without compromising on quality' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div 
                      className="text-2xl font-bold shrink-0 w-8 h-8 flex items-center justify-center text-accent"
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-primary">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-secondary">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with maximalist styling */}
      <section className="py-16 md:py-24 border-t border-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 text-5xl opacity-40 text-accent">
            ◆ ▶ ◆
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Let's Create Something Extraordinary
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-secondary">
            From concept to execution, I'm ready to bring your movement and creative vision to life.
          </p>
          <a 
            href="/collaborations"
            className="inline-block px-8 py-4 border-2 font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-lg border-accent text-accent"
          >
            Start a Project →
          </a>
        </div>
      </section>
      {/* Decorative Divider */}
      <DecorativeDivider color="magenta" variant="line-dots" dotCount={5} className="bg-primary" />
      {/* CTA Section */}
      <CTASection 
        title="Ready to Collaborate?"
        description="Let's create something amazing together. From dance choreography to creative projects, I'm ready for your next big idea."
        buttonText="Start a Project"
        buttonLink="/collaborations"
      />

      </PageTransition>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}



