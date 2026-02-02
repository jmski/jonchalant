import Hero from '@/components/Hero';
import PortfolioCard from '@/components/PortfolioCard';
import ScrollFade from '@/components/ScrollFade';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import SectionDivider from '@/components/SectionDivider';
import PageTransition from '@/components/PageTransition';

const homeData = {
  headline: 'Dance Artist & Creator',
  subheadline: 'Transforming movement into stories. Specializing in choreography, content creation, and brand collaborations for creators who move the world.',
  ctaText: 'Start Collaboration',
  ctaLink: '/collaborations',
  secondaryCtaText: 'View Portfolio',
  secondaryCtaLink: '/dance',
  featuredTitle: 'Featured Work',
  featuredDescription: 'Explore my latest choreography, performances, and creative projects.',
  offerTitle: 'What I Offer',
  offerDescription: 'Professional dance content creation and brand collaborations',
  collaborateTitle: 'Ready to Work Together?',
  collaborateDescription: 'Let\'s create something amazing. From sponsored content to collaborations, I\'m always open to exciting opportunities.',
  collaborateButtonText: 'Explore Collaboration Options',
  services: [
    { title: 'Choreography', description: 'Custom choreography for your brand or project' },
    { title: 'Dance Content', description: 'High-quality dance videos for social media' },
    { title: 'Tutorials', description: 'Dance tutorials and how-to content' },
    { title: 'Brand Partnerships', description: 'Sponsored content and brand collaborations' }
  ]
};

export default async function Home() {

  return (
    <PageTransition>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <Hero
        headline={homeData.headline}
        subheadline={homeData.subheadline}
        ctaText={homeData.ctaText}
        ctaLink={homeData.ctaLink}
        secondaryCtaText={homeData.secondaryCtaText}
        secondaryCtaLink={homeData.secondaryCtaLink}
      />

      <SectionDivider variant="wave" />

      {/* Featured Section */}
      <section id="featured" className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <h2 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent mb-4 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {homeData.featuredTitle}
            </h2>
            <p className="mb-12 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {homeData.featuredDescription}
            </p>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollFade delay={100}>
              <PortfolioCard
                title="Choreography Reel"
                description="Original choreography combining hip-hop and contemporary dance"
                category="Dance"
                image="https://picsum.photos/500/400?random=1"
              />
            </ScrollFade>
            <ScrollFade delay={200}>
              <PortfolioCard
                title="Freestyle Jam"
                description="Freestyle dance performance showcasing improvisation skills"
                category="Dance"
                image="https://picsum.photos/500/400?random=2"
              />
            </ScrollFade>
            <ScrollFade delay={300}>
              <PortfolioCard
                title="Gunpla Build Showcase"
                description="Mobile suit builds with professional photography"
                category="Hobby"
                image="https://picsum.photos/500/400?random=3"
              />
            </ScrollFade>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal" />

      {/* Content Pillars */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <h2 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent mb-4 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {homeData.offerTitle}
            </h2>
            <p className="mb-12 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {homeData.offerDescription}
            </p>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeData.services.map((service, idx) => (
              <ScrollFade key={idx} delay={idx * 100}>
                <div className="card-enhanced p-8 group">
                  <h3 className="text-xl font-bold mb-3 group-hover:transition-colors group-hover:duration-300" style={{ color: 'var(--text-light)' }}>
                    {service.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTASection
            title={homeData.collaborateTitle}
            description={homeData.collaborateDescription}
            buttonText={homeData.collaborateButtonText}
            buttonLink="/collaborations"
          />
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <StatsSection />
      </section>
      </div>
    </PageTransition>
  );
}
