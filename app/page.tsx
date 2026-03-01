import { HomeHero } from '@/components/hero';
import { PageTransition } from "@/components/layout";
import dynamic from 'next/dynamic';

const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PageTransition animation="fade">
        {/* HERO SECTION */}
        <HomeHero />

        {/* KEY STATS SECTION */}
        <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: 'Coaching Clients Transformed', value: '100+' },
                { label: 'Brand Collaborations', value: '30+' },
                { label: 'Years in Creative Direction', value: '8+' },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-3 text-center md:text-left">
                  <div className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm uppercase tracking-widest font-medium text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED AREAS SECTION */}
        <section className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Where I Create Impact
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main featured area */}
              <div className="lg:col-span-2 space-y-6">
                <div className="aspect-video rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Dance & Movement Direction
                </h3>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Choreography, performance, and creative direction for brands and artists. I blend precision with expression—creating movement that communicates and inspires.
                </p>
              </div>

              {/* Sidebar features */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Leadership Coaching
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Transform your presence and command rooms with quiet authority.
                  </p>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700" />
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Brand Partnerships
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Collaborate on campaigns that move audiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES OVERVIEW */}
        <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Services & Offerings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Leadership Programs',
                  description: '1-on-1 coaching, group workshops, and digital courses for building Quiet Command.'
                },
                {
                  title: 'Movement Coaching',
                  description: 'Physical grounding techniques and body-aware presence training.'
                },
                {
                  title: 'Brand Collaboration',
                  description: 'Choreography, content creation, and creative direction for campaigns.'
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-slate-700 p-8 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED AREAS - PORTFOLIO CARDS */}
        <section className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Explore My Work
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                From dance portfolio to leadership coaching, discover what I offer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Dance Portfolio',
                  description: 'Choreography, freestyle, performances & tutorials',
                  href: '/dance',
                  count: '30+ Videos'
                },
                {
                  title: 'Social Skill Lessons',
                  description: 'Beginner to advanced frameworks for Quiet Command',
                  href: '/lessons',
                  count: 'Master Classes'
                },
                {
                  title: 'Collaborations',
                  description: 'Partnerships, campaigns & brand opportunities',
                  href: '/collaborations',
                  count: 'Brand Ready'
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-widest font-medium text-slate-600 dark:text-slate-400 mb-2">
                        {item.count}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* WHY WORK TOGETHER */}
        <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8">
                  Why Work Together
                </h2>
                <div className="space-y-6">
                  {[
                    { title: 'Technical Excellence', desc: 'Precision choreography with professional production quality' },
                    { title: 'Creative Partnership', desc: 'Collaborative approach from concept to final execution' },
                    { title: 'Strategic Thinking', desc: 'Brand alignment and audience engagement optimization' },
                    { title: 'Fast Turnaround', desc: 'Efficient workflows without compromising on quality' },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 flex-shrink-0 text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-lg h-96 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400">Visual Showcase</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 sm:py-24">
          <CTASection />
        </section>
      </PageTransition>
    </div>
  );
}
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-3 text-vibrant font-black">▶</div>
                  <div className="text-xs font-black uppercase tracking-widest text-vibrant retro-label">
                    30+ Videos
                  </div>
                </div>
              </div>
              <div className="p-6 border-t-3 border-vibrant">
                <Heading level={3} className="mb-3">Dance Portfolio</Heading>
                <p className="text-sm text-primary font-body">
                  Choreography, freestyle, performances & tutorials
                </p>
              </div>
            </div>
            </ScrollFade>

            {/* Lessons - NEON */}
            <ScrollFade variant="slideInUp" delay={80}>
            <div 
              className="border-bold border-secondary bg-tertiary group cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-square bg-linear-to-br from-secondary/20 to-transparent flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, var(--accent-secondary) 10px, var(--accent-secondary) 11px)'
                }} />
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-3 text-secondary font-black">📚</div>
                  <div className="text-xs font-black uppercase tracking-widest text-secondary retro-label">
                    Master Classes
                  </div>
                </div>
              </div>
              <div className="p-6 border-t-3 border-secondary">
                <Heading level={3} className="mb-3">Social Skill Lessons</Heading>
                <p className="text-sm text-primary font-body">
                  Beginner to advanced frameworks for Quiet Command
                </p>
              </div>
            </div>
            </ScrollFade>

            {/* Collaborations - MAGENTA */}
            <ScrollFade variant="slideInUp" delay={160}>
            <div 
              className="border-bold border-tertiary bg-tertiary group cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-square bg-linear-to-br from-tertiary/20 to-transparent flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, var(--accent-tertiary) 10px, var(--accent-tertiary) 11px)'
                }} />
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-3 text-tertiary font-black">◆</div>
                  <div className="text-xs font-black uppercase tracking-widest text-tertiary retro-label">
                    Brand Ready
                  </div>
                </div>
              </div>
              <div className="p-6 border-t-3 border-tertiary">
                <Heading level={3} className="mb-3">Collaborations</Heading>
                <p className="text-sm text-primary font-body">
                  Partnerships, campaigns & brand opportunities
                </p>
              </div>
            </div>
            </ScrollFade>
          </div>

          {/* What's Possible - Services Grid */}
          <div className="border-t-4 border-primary pt-16">
            <div className="mb-12">
              <h3 className="section-label">→ Services & Offerings</h3>
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
                  className="border-2 border-primary p-4 text-center hover:border-vibrant hover:bg-tertiary transition-all duration-300 group"
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
                      <p className="text-sm text-primary">
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
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary">
            From concept to execution, I'm ready to bring your movement and creative vision to life.
          </p>
          <a 
            href="/collaborations"
            className="inline-block px-8 py-4 border-2 font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-lg border-accent text-accent"
          >
            Start a Project <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      {/* Decorative Divider */}
      <DecorativeDivider color="tertiary" variant="line-dots" dotCount={5} className="bg-primary" />
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



