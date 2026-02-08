import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { ScrollFade, ScrollStagger } from "@/components/animations";
import { Heading } from "@/components/typography";

export const metadata = {
  title: "About | Jon Chalon",
  description: "Professional dancer and creator. Choreography, digital media, and strategic collaborations."
};

export default function About() {
  return (
    <div className="bg-primary text-primary">
      <PageTransition animation="blur">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20" id="main-content">
        {/* TECHNICAL HERO SECTION */}
        <div className="relative py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Technical background grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 95, 31, 0.1) 25%, rgba(255, 95, 31, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 95, 31, 0.1) 75%, rgba(255, 95, 31, 0.1) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }} />

          {/* Left: Title */}
          <div className="relative z-10">
            <div className="retro-label text-vibrant uppercase text-xs tracking-widest mb-4">→ ORIGIN STORY</div>
            <Heading level={1} className="mb-6">JON<br />CHALON</Heading>
            <p className="text-lg text-secondary max-w-lg">
              Professional choreographer. Creator. Collaborator. Blending movement, technology, and otaku culture.
            </p>
          </div>

          {/* Right: Technical SVG Schematic */}
          <div className="relative z-10 flex justify-end">
            <svg width="300" height="300" viewBox="0 0 300 300" className="opacity-80">
              {/* Outer Pentagon-like shape */}
              <circle cx="150" cy="150" r="140" fill="none" stroke="var(--accent-vibrant)" strokeWidth="2" opacity="0.6"/>
              <circle cx="150" cy="150" r="100" fill="none" stroke="var(--accent-vibrant)" strokeWidth="1" opacity="0.3"/>
              
              {/* Inner elements */}
              <circle cx="150" cy="150" r="60" fill="none" stroke="var(--accent-vibrant)" strokeWidth="2"/>
              <circle cx="150" cy="150" r="4" fill="var(--accent-vibrant)"/>
              
              {/* Radiating lines */}
              <line x1="150" y1="90" x2="150" y2="40" stroke="var(--accent-vibrant)" strokeWidth="1.5" opacity="0.6"/>
              <line x1="210" y1="150" x2="260" y2="150" stroke="var(--accent-vibrant)" strokeWidth="1.5" opacity="0.6"/>
              <line x1="150" y1="210" x2="150" y2="260" stroke="var(--accent-vibrant)" strokeWidth="1.5" opacity="0.6"/>
              <line x1="90" y1="150" x2="40" y2="150" stroke="var(--accent-vibrant)" strokeWidth="1.5" opacity="0.6"/>
              
              {/* Diagonal lines */}
              <line x1="105" y1="105" x2="75" y2="75" stroke="var(--accent-secondary)" strokeWidth="1" opacity="0.4"/>
              <line x1="195" y1="105" x2="225" y2="75" stroke="var(--accent-secondary)" strokeWidth="1" opacity="0.4"/>
              <line x1="195" y1="195" x2="225" y2="225" stroke="var(--accent-tertiary)" strokeWidth="1" opacity="0.4"/>
              <line x1="105" y1="195" x2="75" y2="225" stroke="var(--accent-tertiary)" strokeWidth="1" opacity="0.4"/>
              
              {/* Center nodes */}
              <circle cx="120" cy="180" r="7" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" opacity="0.7"/>
              <circle cx="180" cy="120" r="7" fill="none" stroke="var(--accent-tertiary)" strokeWidth="1.5" opacity="0.7"/>
            </svg>
          </div>
        </div>

        {/* BIO SECTION */}
        <section className="py-20 border-t border-primary grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-lg text-secondary leading-relaxed">
              I'm a professional choreographer and digital creator with 8+ years of experience delivering high-impact movement content for brands, creators, and live productions. My work combines technical choreographic precision with creative innovation.
            </p>
            <p className="text-lg text-secondary leading-relaxed">
              From TikTok viral choreography to music video direction, brand collaborations to educational workshops—I bring both artistic vision and strategic thinking to every project. I specialize in bridging the gap between artistic movement and commercial success.
            </p>
            <p className="text-lg text-secondary leading-relaxed">
              Beyond choreography, I'm deeply invested in animation (Gunpla), Pokémon culture, and the intersection of internet aesthetics with professional content creation. These intersecting worlds inform my creative approach and help me connect with diverse audiences.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <ScrollStagger variant="slideInUp" staggerDelay={100}>
            <div className="space-y-4">
            {[
              { label: 'Experience', value: '8+ Years', icon: '▶' },
              { label: 'Projects', value: '50+', icon: '◆' },
              { label: 'Followers', value: '150K+', icon: '●' },
              { label: 'Global Reach', value: 'Yes', icon: '✦' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="border-bold border-vibrant bg-vibrant-faint group p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="retro-label text-vibrant text-xs uppercase mb-2">
                      {stat.label}
                    </div>
                    <div className="text-3xl font-black text-vibrant">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-4xl opacity-30">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </ScrollStagger>
        </section>

        {/* EXPERTISE SECTION */}
        <section className="py-20 border-t border-primary">
          <div className="mb-12">
            <span className="retro-label text-neon text-xs">→ SPECIALIZATIONS</span>
            <Heading level={2} className="mt-4">What I Do</Heading>
          </div>

          <ScrollStagger variant="slideInUp" staggerDelay={90}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Choreography', desc: 'Custom movement design for music videos, commercials, performances, and digital content', color: 'vibrant' },
              { title: 'Brand Partnerships', desc: 'Strategic collaborations with authentic movement-based content and product integration', color: 'secondary' },
              { title: 'Content Direction', desc: 'Creative vision for dance content across TikTok, Instagram, YouTube, and emerging platforms', color: 'tertiary' },
              { title: 'Movement Consulting', desc: 'Art direction and technical movement expertise for film, TV, theater, and installations', color: 'vibrant' },
              { title: 'Workshops & Teaching', desc: 'Choreography workshops, intensives, technique classes, and creative coaching for creators', color: 'secondary' },
              { title: 'Creative Collaboration', desc: 'Cross-disciplinary projects blending dance with music, visual art, and multimedia', color: 'tertiary' },
            ].map((service, idx) => {
              const colorMap: Record<string, string> = { vibrant: 'var(--accent-vibrant)', secondary: 'var(--accent-secondary)', tertiary: 'var(--accent-tertiary)' };
              return (
                <div
                  key={idx}
                  className="border-bold group cursor-pointer transition-all duration-300 hover:shadow-bold p-8"
                  style={{ borderColor: colorMap[service.color], backgroundColor: `var(--bg-${service.color}-faint)` }}
                >
                  <div style={{ color: colorMap[service.color] }} className="retro-label text-xs uppercase mb-3">
                    {service.title}
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
            </div>
          </ScrollStagger>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="py-20 border-t border-primary">
          <div className="mb-12">
            <span className="retro-label text-tertiary text-xs">→ APPROACH</span>
            <Heading level={2} className="mt-4 mb-12">Philosophy</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Technical Excellence', desc: 'Precision choreography meets production quality. Every movement matters.' },
              { title: 'Authentic Storytelling', desc: 'Movement is narrative. I prioritize genuine creative expression over trends.' },
              { title: 'Strategic Growth', desc: 'All creative work serves measurable impact. Metrics and artistry aren\'t mutually exclusive.' },
            ].map((philosophy, idx) => (
              <div key={idx} className="border-bold border-primary p-8 relative">
                <div className="absolute -top-3 -left-3 w-6 h-6 border-2 border-primary" />
                
                <h3 className="heading-display text-2xl font-black text-primary mb-4">
                  {philosophy.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {philosophy.desc}
                </p>
                
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-2 border-primary" />
              </div>
            ))}
          </div>
        </section>

        {/* HOBBIES SECTION */}
        <section className="py-20 border-t border-primary">
          <div className="mb-12">
            <span className="retro-label text-neon text-xs">→ OUTSIDE THE STUDIO</span>
            <Heading level={2} className="mt-4">Also Known For</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-bold border-neon bg-neon-faint p-8">
              <div className="text-5xl mb-4">🤖</div>
              <Heading level={3} className="mb-4">Gunpla Building</Heading>
              <p className="text-secondary text-sm leading-relaxed">
                Scale modeling enthusiast. I approach Gunpla with the same precision and attention to detail as choreography. The intricate assembly process mirrors creative composition—each piece has its role in the larger vision.
              </p>
            </div>

            <div className="border-bold border-tertiary bg-tertiary-faint p-8">
              <div className="text-5xl mb-4">🎴</div>
              <Heading level={3} className="mb-4">Pokémon Collecting</Heading>
              <p className="text-secondary text-sm leading-relaxed">
                Active collector and enthusiast. The Pokémon universe connects with my audience and influences my creative aesthetic. Nostalgia, design, and community matter. It's not just a hobby—it's cultural commentary.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-primary">
          <CTASection
            title="Let's Work Together"
            description="Whether you're looking for choreography, content direction, or creative partnership—I'm ready to bring your vision to life."
            buttonText="START A CONVERSATION"
            buttonLink="/contact"
          />
        </section>
      </main>
      </PageTransition>
    </div>
  );
}
