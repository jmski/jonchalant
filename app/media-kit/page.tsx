'use client';

import { ScrollFade } from "@/components/animations";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { PageTransition } from "@/components/layout";

// Below-fold dynamic import
const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

const MEDIA_KIT_DATA = {
  headline: 'MEDIA KIT',
  subheadline: 'Audience statistics, engagement metrics, and collaboration potential',
      keyMetrics: [
    { label: 'Total Followers', value: '150K+', change: '+15% YoY', color: 'vibrant' },
    { label: 'Avg Monthly Views', value: '2.5M', change: '+22% YoY', color: 'neon' },
    { label: 'Engagement Rate', value: '4.8%', change: '+0.5% YoY', color: 'magenta' },
    { label: 'Active Subscribers', value: '85K', change: '+18% YoY', color: 'vibrant' }
  ],
  platforms: [
    { name: 'TikTok', handle: '@jonhandle', followers: '120K', avgViews: '2.1M', category: 'Dance Content', color: 'neon' },
    { name: 'Instagram', handle: '@jonhandle', followers: '45K', avgViews: '8K', category: 'Photography & Reels', color: 'vibrant' },
    { name: 'YouTube', handle: '@jonhandle', followers: '32K', avgViews: '125K', category: 'Long-form & Tutorials', color: 'magenta' }
  ],
  contentCategories: [
    { name: 'Dance Choreography', percentage: 45, description: 'Original choreography and dance covers' },
    { name: 'Tutorials', percentage: 25, description: 'Dance tutorials and how-to content' },
    { name: 'Lifestyle', percentage: 20, description: 'Behind-the-scenes and daily life' },
    { name: 'Collaborations', percentage: 10, description: 'Collaborations with other creators' }
  ],
  audience: {
    age: [
      { range: '13-17', percentage: 15 },
      { range: '18-24', percentage: 45 },
      { range: '25-34', percentage: 25 },
      { range: '35+', percentage: 15 }
    ],
    gender: [
      { label: 'Female', percentage: 68 },
      { label: 'Male', percentage: 28 },
      { label: 'Other', percentage: 4 }
    ],
    locations: [
      { country: 'United States', percentage: 42 },
      { country: 'Canada', percentage: 12 },
      { country: 'United Kingdom', percentage: 10 },
      { country: 'Australia', percentage: 8 },
      { country: 'Other', percentage: 28 }
    ]
  }
};

const getColorVars = (color: string) => {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    vibrant: { bg: 'var(--bg-vibrant-faint)', border: 'var(--accent-vibrant)', text: 'var(--accent-vibrant)' },
    neon: { bg: 'var(--bg-neon-faint)', border: 'var(--accent-neon)', text: 'var(--accent-neon)' },
    magenta: { bg: 'var(--bg-magenta-faint)', border: 'var(--accent-magenta)', text: 'var(--accent-magenta)' }
  };
  return colors[color] || colors.vibrant;
};

export default function MediaKit() {
  return (
    <div className="min-h-screen page-wrapper bg-primary">
      <PageTransition animation="scale">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TECHNICAL HERO SECTION */}
        <div className="relative py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Technical background grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }} />

          {/* Left: Title */}
          <div className="relative z-10">
            <div className="retro-label text-neon uppercase text-xs tracking-widest mb-4">→ METRICS & INSIGHTS</div>
            <h1 className="heading-display text-6xl sm:text-7xl lg:text-8xl font-black text-primary mb-6 leading-none">
              MEDIA<br />KIT
            </h1>
            <p className="text-lg text-secondary max-w-lg mb-8">
              Comprehensive audience data, platform breakdown, and collaboration potential metrics
            </p>
            <div className="flex gap-4">
              <div className="w-24 h-1 bg-neon" />
              <div className="w-16 h-1 bg-magenta" />
            </div>
          </div>

          {/* Right: Technical SVG Schematic */}
          <div className="relative z-10 flex justify-end">
            <svg width="300" height="300" viewBox="0 0 300 300" className="opacity-80">
              {/* Outer ring */}
              <circle cx="150" cy="150" r="140" fill="none" stroke="var(--accent-neon)" strokeWidth="2" opacity="0.6"/>
              <circle cx="150" cy="150" r="120" fill="none" stroke="var(--accent-neon)" strokeWidth="1" opacity="0.3"/>
              
              {/* Inner circle */}
              <circle cx="150" cy="150" r="80" fill="none" stroke="var(--accent-neon)" strokeWidth="2"/>
              <circle cx="150" cy="150" r="3" fill="var(--accent-neon)"/>
              
              {/* Quadrants with lines */}
              <line x1="150" y1="70" x2="150" y2="40" stroke="var(--accent-neon)" strokeWidth="1" opacity="0.5"/>
              <line x1="230" y1="150" x2="260" y2="150" stroke="var(--accent-neon)" strokeWidth="1" opacity="0.5"/>
              <line x1="150" y1="230" x2="150" y2="260" stroke="var(--accent-neon)" strokeWidth="1" opacity="0.5"/>
              <line x1="70" y1="150" x2="40" y2="150" stroke="var(--accent-neon)" strokeWidth="1" opacity="0.5"/>
              
              {/* Diagonal accents */}
              <line x1="100" y1="100" x2="80" y2="80" stroke="var(--accent-magenta)" strokeWidth="1" opacity="0.4"/>
              <line x1="200" y1="100" x2="220" y2="80" stroke="var(--accent-magenta)" strokeWidth="1" opacity="0.4"/>
              <line x1="100" y1="200" x2="80" y2="220" stroke="var(--accent-vibrant)" strokeWidth="1" opacity="0.4"/>
              <line x1="200" y1="200" x2="220" y2="220" stroke="var(--accent-vibrant)" strokeWidth="1" opacity="0.4"/>
              
              {/* Center data points */}
              <circle cx="120" cy="150" r="8" fill="none" stroke="var(--accent-vibrant)" strokeWidth="1.5" opacity="0.7"/>
              <circle cx="180" cy="150" r="8" fill="none" stroke="var(--accent-magenta)" strokeWidth="1.5" opacity="0.7"/>
              <circle cx="150" cy="120" r="8" fill="none" stroke="var(--accent-neon)" strokeWidth="1.5" opacity="0.7"/>
              <circle cx="150" cy="180" r="8" fill="none" stroke="var(--accent-vibrant)" strokeWidth="1.5" opacity="0.7"/>
            </svg>
          </div>
        </div>

        {/* KEY METRICS CARDS */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEDIA_KIT_DATA.keyMetrics.map((stat, idx) => {
            const colors = getColorVars(stat.color);
            return (
              <div
                key={idx}
                className="border-bold relative group transition-all duration-300 hover:shadow-bold"
                style={{ borderColor: colors.border, backgroundColor: colors.bg }}
              >
                {/* Top accent corner */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-2" style={{ borderColor: colors.border }} />
                
                <div className="card-padding-lg relative z-10 space-y-4">
                  <div style={{ color: colors.text }} className="text-xs uppercase tracking-[0.2em] retro-label">
                    {stat.label}
                  </div>
                  <div style={{ color: colors.text }} className="text-5xl font-black heading-display">
                    {stat.value}
                  </div>
                  <div style={{ color: colors.text }} className="text-sm font-bold">
                    {stat.change}
                  </div>
                </div>

                {/* Bottom accent corner */}
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-2" style={{ borderColor: colors.border }} />
              </div>
            );
          })}
        </section>

        {/* PLATFORM BREAKDOWN */}
        <section className="py-20 border-t border-primary">
          <div className="mb-16">
            <span className="retro-label text-magenta text-xs">→ PLATFORM PRESENCE</span>
            <h2 className="heading-display text-6xl sm:text-7xl font-black text-primary mt-4 leading-none">
              Social Reach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MEDIA_KIT_DATA.platforms.map((platform, idx) => {
              const colors = getColorVars(platform.color);
              return (
                <div
                  key={idx}
                  className="border-bold group cursor-pointer transition-all duration-300 hover:shadow-bold"
                  style={{ borderColor: colors.border, backgroundColor: colors.bg }}
                >
                  <div className="card-padding-lg space-y-6">
                    {/* Platform header */}
                    <div>
                      <div style={{ color: colors.text }} className="retro-label text-xs uppercase mb-2">
                        {platform.name}
                      </div>
                      <div style={{ color: colors.text }} className="text-lg font-bold mono-text">
                        {platform.handle}
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="space-y-4 border-t" style={{ borderColor: colors.border, paddingTop: '1.5rem' }}>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-tertiary mb-2">Followers</div>
                        <div style={{ color: colors.text }} className="text-3xl font-black">
                          {platform.followers}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-tertiary mb-2">Avg Views</div>
                        <div style={{ color: colors.text }} className="text-3xl font-black">
                          {platform.avgViews}
                        </div>
                      </div>
                      <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
                        <div style={{ color: colors.text }} className="text-sm font-bold">
                          {platform.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTENT DISTRIBUTION */}
        <section className="py-20 border-t border-primary">
          <div className="mb-12">
            <span className="retro-label text-vibrant text-xs">→ CONTENT MIX</span>
            <h2 className="heading-display text-6xl sm:text-7xl font-black text-primary mt-4 leading-none">
              Distribution
            </h2>
          </div>

          <div className="space-y-8">
            {MEDIA_KIT_DATA.contentCategories.map((category, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold text-primary">
                    {category.name}
                  </h3>
                  <span className="text-3xl font-black text-vibrant">
                    {category.percentage}%
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="h-4 border-2 border-primary relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-vibrant to-neon transition-all duration-700"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                
                <p className="text-secondary text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* AUDIENCE DEMOGRAPHICS */}
        <section className="py-20 border-t border-primary">
          <div className="mb-12">
            <span className="retro-label text-magenta text-xs">→ AUDIENCE INSIGHTS</span>
            <h2 className="heading-display text-6xl sm:text-7xl font-black text-primary mt-4 leading-none">
              Demographics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Age Distribution */}
            <div className="border-bold border-neon bg-neon-faint p-8">
              <h3 className="text-xl font-black text-primary mb-8">Age Distribution</h3>
              <div className="space-y-6">
                {MEDIA_KIT_DATA.audience.age.map((age, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-secondary">{age.range}</span>
                      <span className="text-neon font-black text-lg">{age.percentage}%</span>
                    </div>
                    <div className="h-3 border border-neon bg-primary relative overflow-hidden">
                      <div
                        className="h-full bg-neon transition-all duration-500"
                        style={{ width: `${age.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="border-bold border-vibrant bg-vibrant-faint p-8">
              <h3 className="text-xl font-black text-primary mb-8">Gender</h3>
              <div className="space-y-6">
                {MEDIA_KIT_DATA.audience.gender.map((gender, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-secondary">{gender.label}</span>
                      <span className="text-vibrant font-black text-lg">{gender.percentage}%</span>
                    </div>
                    <div className="h-3 border border-vibrant bg-primary relative overflow-hidden">
                      <div
                        className="h-full bg-vibrant transition-all duration-500"
                        style={{ width: `${gender.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Locations */}
            <div className="border-bold border-magenta bg-magenta-faint p-8">
              <h3 className="text-xl font-black text-primary mb-8">Top Locations</h3>
              <div className="space-y-4">
                {MEDIA_KIT_DATA.audience.locations.map((location, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-magenta">
                    <span className="text-sm font-bold text-secondary">{location.country}</span>
                    <span className="text-magenta font-black">{location.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COLLABORATION PACKAGES */}
        <section className="py-20 border-t border-primary">
          <div className="mb-12">
            <span className="retro-label text-neon text-xs">→ OPPORTUNITIES</span>
            <h2 className="heading-display text-6xl sm:text-7xl font-black text-primary mt-4 leading-none">
              Collaborate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Content Placement', price: 'Custom', features: ['Brand integration', 'Custom content', 'Performance report'] },
              { title: 'Campaign Package', price: 'Premium', features: ['Multi-platform', 'Creative direction', 'Analytics dashboard'] },
              { title: 'Exclusive Partnership', price: 'Enterprise', features: ['Long-term strategy', 'Dedicated support', 'Custom metrics'] },
            ].map((pkg, idx) => {
              const colors = getColorVars(['vibrant', 'neon', 'magenta'][idx]);
              return (
                <div
                  key={idx}
                  className="border-bold p-8 relative transition-all duration-300 hover:shadow-bold"
                  style={{ borderColor: colors.border, backgroundColor: colors.bg }}
                >
                  <div style={{ color: colors.text }} className="text-sm uppercase tracking-widest retro-label mb-2">
                    {pkg.title}
                  </div>
                  <div style={{ color: colors.text }} className="text-4xl font-black mb-6">
                    {pkg.price}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-3">
                        <span style={{ color: colors.text }} className="text-lg font-black">▶</span>
                        <span className="text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full border-2 font-bold py-3 px-4 transition-all duration-300"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    GET STARTED
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 border-t border-primary">
          <CTASection
            title="Ready to Collaborate?"
            description="Download the full media kit or let's discuss a custom collaboration package tailored to your brand."
            buttonText="START CONVERSATION"
            buttonLink="/contact"
          />
        </section>
      </main>
      </PageTransition>
    </div>
  );
}
