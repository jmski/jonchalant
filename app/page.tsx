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
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 shrink-0 text-white font-bold text-sm">
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
