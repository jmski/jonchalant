import { CTASection } from "@/components/sections";

export const metadata = {
  title: "About | Jon Chalon",
  description: "Professional dancer and creator. Choreography, digital media, and strategic collaborations."
};

export default function About() {
  return (
    <div className="bg-primary text-primary">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Left: Text Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: '"Silkscreen", monospace' }}>
              Jon Chalon
            </h1>
            <div className="space-y-4 text-base sm:text-lg" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              <p>
                I'm a professional choreographer and digital creator based in [City]. With 8+ years of experience in movement direction, dance education, and online content creation, I specialize in bridging the gap between artistic vision and commercial collaboration.
              </p>
              <p>
                My work spans contemporary dance choreography, brand-driven movement content, and digital media production. I bring both technical precision and creative innovation to every project, whether for established brands, emerging creators, or independent productions.
              </p>
            </div>
          </div>

          {/* Right: Info Grid (retro-tech style) */}
          <div className="space-y-4">
            <div className="border" style={{ borderColor: 'var(--border-color)', padding: '1.5rem' }}>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                PROFESSIONAL SUMMARY
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span style={{ color: 'var(--text-tertiary)' }}>Experience:</span>
                  <strong style={{ color: 'var(--accent-vibrant)' }}>8+ Years</strong>
                </li>
                <li className="flex justify-between">
                  <span style={{ color: 'var(--text-tertiary)' }}>Specialization:</span>
                  <strong style={{ color: 'var(--accent-vibrant)' }}>Choreography</strong>
                </li>
                <li className="flex justify-between">
                  <span style={{ color: 'var(--text-tertiary)' }}>Projects:</span>
                  <strong style={{ color: 'var(--accent-vibrant)' }}>50+</strong>
                </li>
                <li className="flex justify-between">
                  <span style={{ color: 'var(--text-tertiary)' }}>Collaboration:</span>
                  <strong style={{ color: 'var(--accent-vibrant)' }}>Global</strong>
                </li>
              </ul>
            </div>

            <div className="border" style={{ borderColor: 'var(--border-color)', padding: '1.5rem' }}>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                CORE COMPETENCIES
              </div>
              <div className="flex flex-wrap gap-2">
                {['Choreography', 'Movement Direction', 'Content Creation', 'Brand Strategy', 'Digital Media', 'Education'].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 border rounded"
                    style={{
                      borderColor: 'var(--accent-vibrant)',
                      color: 'var(--accent-vibrant)',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t" style={{ borderColor: 'var(--border-color)' }} />

        {/* Experience & Services Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
            Services & Specializations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Choreography',
                description: 'Custom choreography for music videos, commercials, live events, and digital content. Contemporary to experimental movement.',
              },
              {
                title: 'Brand Partnerships',
                description: 'Strategic collaborations with brands for authentic movement-based content. Product integration, campaigns, and sponsorships.',
              },
              {
                title: 'Content Direction',
                description: 'Creative direction for dance and movement content. From concept development through post-production. TikTok, Instagram, YouTube.',
              },
              {
                title: 'Movement Consulting',
                description: 'Art direction and movement expertise for film, TV, theater, and installation projects. Technical advising and talent direction.',
              },
              {
                title: 'Workshop & Teaching',
                description: 'Choreography workshops, movement intensive, technique classes, and creative coaching for performers and content creators.',
              },
              {
                title: 'Creative Collaboration',
                description: 'Cross-disciplinary projects combining dance with technology, music production, visual art, and multimedia.',
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="border p-6"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                }}
              >
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--accent-vibrant)' }}>
                  {service.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="my-16 border-t" style={{ borderColor: 'var(--border-color)' }} />

        {/* Philosophy Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            Philosophy
          </h2>

          <div className="space-y-6" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              I believe movement is a universal language that transcends boundaries. Whether choreographing for a major brand or creating digital content, my approach prioritizes authentic storytelling, technical excellence, and creative innovation.
            </p>
            <p>
              Every project is an opportunity to push creative boundaries. I work collaboratively with brands, creators, and technical teams to bring compelling movement-based narratives to life. My process combines artistic intuition with strategic thinking to deliver measurable creative impact.
            </p>
            <p>
              Beyond professional work, I'm passionate about dance education, emerging creator support, and exploring how traditional movement practices intersect with digital media. I also maintain active hobbies in model building (Gunpla) and Pokémon culture—bringing the same precision and enthusiasm to all creative endeavors.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="my-16 border-t" style={{ borderColor: 'var(--border-color)' }} />

        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'Projects', value: '50+' },
            { label: 'Clients', value: '30+' },
            { label: 'Years Active', value: '8+' },
            { label: 'Collaborators', value: 'Global' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="border text-center p-6"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}
            >
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--accent-vibrant)' }}>
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest mt-2" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <CTASection
          title="Ready to Collaborate?"
          description="Let's discuss how movement and creativity can elevate your next project. Whether it's choreography, content direction, or strategic partnership—I'm here to make it happen."
          buttonText="Start a Conversation"
          buttonLink="/collaborations"
        />
      </main>
    </div>
  );
}
