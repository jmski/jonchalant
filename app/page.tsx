import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { Marquee } from '@/components/effects';
import { 
  HomeHeroSection,
  StatsSection,
  ServicesSection, 
  FeaturedAreasSection,
  FeaturedBlogSection, 
  TestimonialSection, 
  CaseStudySection,
  CTASection 
} from '@/components/sections';
import type { Metadata } from 'next';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { getHomePageContent, getServices, getTestimonials, getCaseStudies } from "@/lib/sanity";
import { AggregateRatingSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Executive Presence Coaching for Introverts | 8-Week Program | Jonchalant",
  description: "Build executive presence and quiet command in 8-12 weeks. Leadership coaching for introverts using evidence-based, body-aware techniques. Master confident communication.",
  keywords: "executive presence coaching, leadership coaching for introverts, quiet command, confidence coaching, introvert leadership, professional presence",
  openGraph: {
    title: "Executive Presence Coaching for Introverts | Jonchalant",
    description: "Transform your professional presence in 8-12 weeks. Body-aware leadership for shy professionals and introverts.",
    type: "website",
    url: "https://jonchalant.com",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-home-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Executive Presence Coaching for Introverts",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Presence Coaching for Introverts | Jonchalant",
    description: "Transform your professional presence in 8-12 weeks. Body-aware leadership for introverts.",
    images: ["https://jonchalant.com/social/og-home-1200x630.png"],
    creator: "@jonchalant",
  },
};

const FinalCTASection = dynamic(() => import('@/components/sections').then(mod => mod.CTASection), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

export default async function Home() {
  let homeContent = null;
  let services = [];
  let testimonials = [];

  try {
    const [sanityHome, sanityServices, sanityTestimonials] = await Promise.all([
      getHomePageContent(),
      getServices(),
      getTestimonials(true) // Fetch featured testimonials only
    ]);
    
    if (sanityHome) {
      homeContent = sanityHome;
    }
    
    if (sanityServices && sanityServices.length > 0) {
      services = sanityServices;
    }
    
    if (sanityTestimonials && sanityTestimonials.length > 0) {
      testimonials = sanityTestimonials;
    }
  } catch (error) {
    console.warn('Failed to fetch home content from Sanity, using fallback data:', error);
  }

  return (
    <div className="bg-white">
      {/* Aggregate Rating Schema - Coach reviews */}
      <Script
        id="coach-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(AggregateRatingSchema({
            name: "Jonchalant Leadership Coaching",
            ratingValue: 4.9,
            ratingCount: testimonials?.length || 25,
            reviewCount: testimonials?.length || 25
          })),
        }}
      />
      
      <PageTransition animation="fade" className="-mt-6 lg:-mt-16">
        {/* HERO SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <HomeHeroSection />
          </SectionContent>
        </SectionWrapper>

        {/* MARQUEE BANNER */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <Marquee
              items={[
                'Movement-Based Leadership',
                'Dance • Coaching • Professional Presence',
                'From Stage to Boardroom',
                'Quiet Command Through Motion'
              ]}
              speed={30}
              className="bg-slate-900 text-white py-3 sm:py-4 text-sm sm:text-base font-semibold"
            />
          </SectionContent>
        </SectionWrapper>

        {/* KEY STATS SECTION - Impact at a Glance */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <StatsSection 
              stats={homeContent?.stats || []} 
              heading="Proven Results"
              description="Real outcomes from real coaching. These numbers represent transformations in confidence, presence, and professional impact."
              columns={3}
            />
          </SectionContent>
        </SectionWrapper>

        {/* FEATURED AREAS SECTION */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {homeContent?.impactSectionHeadline}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main featured area */}
              <div className="lg:col-span-2 space-y-6">
                <div className="aspect-video rounded-lg bg-slate-100 border border-slate-200" />
                <h3 className="text-2xl font-bold text-slate-900">
                  {homeContent?.featuredMainTitle}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {homeContent?.featuredMainDescription}
                </p>
              </div>

              {/* Sidebar features */}
              <div className="space-y-8">
                {homeContent?.sidebarFeatures?.map((feature: any, idx: number) => (
                  <div key={idx}>
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-slate-900">
                        {feature.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    {idx < (homeContent?.sidebarFeatures?.length || 0) - 1 && (
                      <div className="h-px bg-slate-200 mt-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionContent>
        </SectionWrapper>

        {/* SERVICES OVERVIEW */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <ServicesSection 
              services={services || []} 
              heading={homeContent?.servicesHeadline}
              description={homeContent?.servicesDescription}
            />
          </SectionContent>
        </SectionWrapper>

        {/* FEATURED AREAS - PORTFOLIO CARDS */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Explore My Work
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                Each area represents years of expertise, refined methodology, and proven results. Discover what makes each unique.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
              {[
                {
                  title: 'Dance Portfolio',
                  description: 'Professional choreography, freestyle sessions, and performance videos',
                  href: '/dance',
                  count: '30+ Videos',
                  metrics: [
                    { label: 'Choreography Pieces', value: '12' },
                    { label: 'Performance Hours', value: '100+' }
                  ],
                  tags: ['Choreography', 'Freestyle', 'Performance'],
                  bgColor: 'from-slate-700 to-slate-800'
                },
                {
                  title: 'Social Skill Lessons',
                  description: 'Structured frameworks for building Quiet Command and professional presence',
                  href: '/lessons',
                  count: 'Master Classes',
                  metrics: [
                    { label: 'Course Modules', value: '15' },
                    { label: 'Students Trained', value: '100+' }
                  ],
                  tags: ['Coaching', 'Training', 'Leadership'],
                  bgColor: 'from-slate-800 to-slate-900'
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="group relative border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full"
                >
                  {/* Visual header with gradient */}
                  <div className={`bg-linear-to-br ${item.bgColor} h-40 flex flex-col items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" 
                      style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <p className="text-xs uppercase tracking-widest font-medium text-slate-300 mb-2">
                        {item.count}
                      </p>
                      <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 mx-auto" />
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Title and description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="mb-6 space-y-3 border-t border-b border-slate-100 py-4">
                      {item.metrics.map((metric, midx) => (
                        <div key={midx} className="flex justify-between items-baseline">
                          <span className="text-xs uppercase tracking-widest font-medium text-slate-600">
                            {metric.label}
                          </span>
                          <span className="text-lg font-bold text-accent">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tidx) => (
                        <span
                          key={tidx}
                          className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium group-hover:bg-accent group-hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA indicator */}
                    <div className="mt-auto pt-4 flex items-center text-accent font-medium text-sm group-hover:gap-2 gap-1 transition-all">
                      <span>Explore</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </SectionContent>
        </SectionWrapper>
        <SectionWrapper variant="primary">
          <SectionContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
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
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent shrink-0 text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-700">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg h-96 border border-slate-200 flex items-center justify-center">
                <p className="text-slate-500">Visual Showcase</p>
              </div>
            </div>
          </SectionContent>
        </SectionWrapper>

        {/* CLIENT TESTIMONIALS SECTION */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              <span 
                className="inline-block text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded mb-4"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'white',
                  letterSpacing: '0.15em'
                }}
              >
                Transformation Stories
              </span>
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                See Real Results from Real Clients
              </h2>
              <p 
                className="text-lg sm:text-xl max-w-2xl mx-auto"
                style={{ color: 'var(--text-secondary)' }}
              >
                These leaders transformed how they show up. From speaking up in meetings to commanding rooms with quiet confidence—see what they achieved.
              </p>
            </div>

            {/* Testimonials Carousel */}
            {testimonials && testimonials.length > 0 ? (
              <TestimonialSection testimonials={testimonials} />
            ) : (
              <div className="text-center py-12 text-slate-600">
                <p>Loading testimonials...</p>
              </div>
            )}
          </SectionContent>
        </SectionWrapper>

        {/* CASE STUDIES SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <CaseStudySection />
          </SectionContent>
        </SectionWrapper>

        {/* FEATURED BLOG SECTION */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <FeaturedBlogSection />
          </SectionContent>
        </SectionWrapper>

        {/* FINAL CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <CTASection 
              title="Ready to Transform Your Executive Presence?"
              description="Whether you're looking to command more authority, speak up confidently, or lead from a place of authenticity—coaching is the path forward. Let's start with your Presence Audit."
              buttonText="Schedule Your Free Audit"
              buttonLink="/contact"
            />
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
