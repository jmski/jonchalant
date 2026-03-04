import { HomeHero } from '@/components/hero';
import { PageTransition } from "@/components/layout";
import dynamic from 'next/dynamic';
import { getHomePageContent, getServices } from "@/lib/sanity";

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

const CollaborationForm = dynamic(() => import('@/components/forms/CollaborationForm'), {
  loading: () => <div className="py-12 px-8 text-center">Loading form...</div>,
  ssr: true
});

export default async function Home() {
  let homeContent = null;
  let services = [];

  try {
    const [sanityHome, sanityServices] = await Promise.all([
      getHomePageContent(),
      getServices()
    ]);
    
    if (sanityHome) {
      homeContent = sanityHome;
    }
    
    if (sanityServices && sanityServices.length > 0) {
      services = sanityServices;
    }
  } catch (error) {
    console.warn('Failed to fetch home content from Sanity, using fallback data:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      <PageTransition animation="fade">
        {/* HERO SECTION */}
        <HomeHero />

        {/* KEY STATS SECTION */}
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {homeContent?.stats?.map((stat: any, idx: number) => (
                <div key={idx} className="space-y-3 text-center md:text-left">
                  <div className="text-4xl sm:text-5xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-sm uppercase tracking-widest font-medium text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED AREAS SECTION */}
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </section>

        {/* SERVICES OVERVIEW */}
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {homeContent?.servicesHeadline}
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                {homeContent?.servicesDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
              {services && services.length > 0 ? (
                services.map((service: any) => (
                  <div
                    key={service._id}
                    className="group border border-slate-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full overflow-hidden"
                  >
                    {/* Icon header */}
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 pt-8 pb-6 border-b border-slate-200 group-hover:from-slate-100 group-hover:to-slate-100 transition-colors">
                      <div className="text-4xl mb-4">{service.icon || '🎯'}</div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Content section */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Description */}
                      <p className="text-slate-700 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features list */}
                      <div className="mb-6 space-y-3 flex-1">
                        {service.features && service.features.map((feature: string, fidx: number) => (
                          <div key={fidx} className="flex items-start gap-3">
                            <span className="text-accent font-bold mt-0.5">+</span>
                            <span className="text-sm text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-slate-100">
                      <button
                        className="text-white font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all hover:text-accent"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <span>Learn more</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-slate-600">
                  Loading services...
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FEATURED AREAS - PORTFOLIO CARDS */}
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {
                  title: 'Collaborations',
                  description: 'Brand partnerships, campaigns, and creative direction for forward-thinking organizations',
                  href: '/collaborations',
                  count: 'Brand Ready',
                  metrics: [
                    { label: 'Brand Partners', value: '20+' },
                    { label: 'Campaign Projects', value: '15+' }
                  ],
                  tags: ['Branding', 'Content', 'Direction'],
                  bgColor: 'from-slate-900 to-slate-950'
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="group relative border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full no-underline"
                >
                  {/* Visual header with gradient */}
                  <div className={`bg-gradient-to-br ${item.bgColor} h-40 flex flex-col items-center justify-center relative overflow-hidden`}>
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
          </div>
        </section>

        {/* WHY WORK TOGETHER */}
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </section>

        {/* INQUIRY FORM SECTION */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -ml-48 -mb-48"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Let's Work Together
              </span>
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Start Your Journey
              </h2>
              <p 
                className="text-lg sm:text-xl max-w-2xl mx-auto"
                style={{ color: 'var(--text-secondary)' }}
              >
                Whether you're interested in coaching or collaboration, let's explore how we can work together. Fill out the form below and I'll respond within 24 hours.
              </p>
            </div>

            {/* Form Container - Full Width */}
            <div className="w-full">
              <div 
                className="rounded-lg p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <CollaborationForm />
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-12 sm:py-16">
          <CTASection 
            title="Ready to Collaborate?"
            description="Let's explore how we can work together to bring your vision to life."
            buttonText="Start a Project"
            buttonLink="/collaborations"
          />
        </section>
      </PageTransition>
    </div>
  );
}
