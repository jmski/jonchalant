import { HomeHero } from '@/components/hero';
import { DeconstructedHamburger } from '@/components/sections';
import { CTASection } from '@/components/sections';

export default function Home() {
  return (
    <div className="bg-primary text-primary">
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

      {/* TECHNICAL VISUALIZATION SECTION */}
      <section 
        className="py-12 md:py-20 border-t border-b bg-tertiary border-primary"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Stats Cards with nested borders */}
            {[
              { label: 'CHOREOGRAPHY PIECES', value: '50+', icon: '▶' },
              { label: 'BRAND COLLABORATIONS', value: '30+', icon: '◆' },
              { label: 'YEARS EXPERIENCE', value: '8+', icon: '●' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="border relative group hover:shadow-lg transition-all duration-300 border-primary bg-secondary card-padding"
              >
                {/* Inner border */}
                <div className="absolute inset-1 border pointer-events-none border-accent" style={{ opacity: 0.5 }} />
                
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-accent">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest mb-3 text-tertiary mono-text">
                    {stat.label}
                  </div>
                  <div className="text-2xl opacity-20 text-accent">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deconstructed Hamburger - Visual Interest */}
          <div className="border p-8 md:p-12 border-primary bg-primary">
            <DeconstructedHamburger />
          </div>
        </div>
      </section>

      {/* MAXIMALIST CONTENT GRID - "More is More" */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">
            Featured Areas
          </h2>

          {/* 3-Column Dense Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Dance Portfolio */}
            <div 
              className="border group cursor-pointer hover:shadow-md transition-all duration-300 border-primary bg-secondary"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center relative overflow-hidden">
                {/* Layered grid pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 48%, var(--text-primary) 49%, var(--text-primary) 51%, transparent 52%)',
                  backgroundSize: '20px 20px'
                }} />
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
                
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-2 text-accent">▶</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-tertiary">
                    30+ Videos
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-primary">
                <h3 className="font-bold mb-2 text-lg text-primary">Dance Portfolio</h3>
                <p className="text-sm text-secondary">
                  Choreography, freestyle, performances & tutorials
                </p>
              </div>
            </div>

            {/* Showcase */}
            <div 
              className="border group cursor-pointer hover:shadow-md transition-all duration-300 border-primary bg-secondary"
            >
              <div className="aspect-square bg-gradient-to-br from-amber-500/10 to-red-500/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, var(--text-primary) 10px, var(--text-primary) 11px)'
                }} />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-2 text-accent">✦</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-tertiary">
                    Gunpla & Pokémon
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-primary">
                <h3 className="font-bold mb-2 text-lg text-primary">Creative Showcase</h3>
                <p className="text-sm text-secondary">
                  Model builds, collections & digital media
                </p>
              </div>
            </div>

            {/* Collaborations */}
            <div 
              className="border group cursor-pointer hover:shadow-md transition-all duration-300 border-primary bg-secondary"
            >
              <div className="aspect-square bg-gradient-to-br from-green-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'conic-gradient(from 0deg, transparent 0deg 90deg, var(--text-primary) 90deg 180deg)',
                  backgroundSize: '40px 40px'
                }} />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-2 text-accent">◆</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-tertiary">
                    Brand Ready
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-primary">
                <h3 className="font-bold mb-2 text-lg text-primary">Collaborations</h3>
                <p className="text-sm text-secondary">
                  Partnerships, campaigns & brand opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Dense Info Grid */}
          <div className="border-t pt-12 border-primary">
            <h3 className="text-xl font-bold mb-6 text-primary">What's Possible</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'Music Videos',
                'TikTok/Reels',
                'Choreography',
                'Brand Campaigns',
                'Live Events',
                'Workshops',
                'Consulting',
                'Content Direction',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border p-3 text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border-accent"
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-accent">
                    ◆
                  </div>
                  <div className="text-sm mt-1 text-secondary">
                    {item}
                  </div>
                </div>
              ))}
            </div>
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
                      className="text-2xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center text-accent"
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

      {/* CTA Section */}
      <CTASection 
        title="Ready to Collaborate?"
        description="Let's create something amazing together. From dance choreography to creative projects, I'm ready for your next big idea."
        buttonText="Start a Project"
        buttonLink="/collaborations"
      />

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



