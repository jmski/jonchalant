import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { FluidShape } from "@/components/decorative";
import dynamic from 'next/dynamic';
import { getPortfolioItems } from "@/lib/sanity";

// Below-fold dynamic import
const DanceFilter = dynamic(() => import('@/components/content').then(mod => ({ default: mod.DanceFilter })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

const CTASectionDynamic = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

import { DANCE_FILTER_CATEGORIES } from "@/lib/pageContent";

export const metadata = {
  title: "Dance Portfolio | The Kinetic Leader",
  description: "Dance choreography, freestyle performances, and movement artistry"
};

// Fallback mock data if Sanity fails
const MOCK_DANCEDATA = [
  {
    _id: 'chore-1',
    title: 'Ninjago Choreography | Urban Style',
    category: 'choreography',
    description: 'Original choreography to Japanese hip-hop. Featured on TikTok (2.4M views). High-energy urban style with precision footwork.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/choreography/ninjago-urban-style.jpg',
  },
  {
    _id: 'chore-2',
    title: 'Midnight Dreams | Contemporary Fusion',
    category: 'choreography',
    description: 'Contemporary-hip hop fusion for music video. Ethereal slow sections transitioning to explosive moments. Directed & choreographed.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/choreography/midnight-dreams-fusion.jpg',
  },
  {
    _id: 'free-1',
    title: 'Cypher Session | Battle Flow',
    category: 'freestyle',
    description: 'High-energy freestyle battle cypher. Improvisation to live beatboxing. Runner-up at NYC Freestyle Championship 2024.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/freestyle/cypher-session-battle.jpg',
  },
  {
    _id: 'perf-1',
    title: 'Seoul Performance | International Stage',
    category: 'performance',
    description: 'Live performance at Seoul Dance Festival (August 2024). 8-minute showcase performance. 5000+ live audience.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/performances/seoul-festival-stage.jpg',
  },
];

export default async function Dance() {
  let dancePortfolio: any[] = MOCK_DANCEDATA;

  try {
    // Try to fetch from Sanity CMS
    const sanityData = await getPortfolioItems();
    if (sanityData && sanityData.length > 0) {
      dancePortfolio = sanityData;
    }
  } catch (error) {
    console.warn('Failed to fetch portfolio from Sanity, using fallback data:', error);
    // Falls back to MOCK_DANCEDATA if Sanity fails
  }

  return (
    <div className="min-h-screen bg-white">
      <PageTransition animation="slide-left">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* HERO SECTION - 60/40 Editorial Layout */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Subtle fluid shape decorative element - represents dance/movement energy */}
            <FluidShape
              size={320}
              opacity={0.08}
              variant="blob"
              style={{
                position: 'absolute',
                top: '60px',
                left: '-100px',
                color: 'var(--accent-primary)',
                zIndex: 0,
              }}
            />
            
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="inline-block">
                <span className="text-sm uppercase tracking-widest font-medium text-slate-600">Choreography • Freestyle • Performance</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
                Movement<br />Portfolio
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl">
                A collection of my best dance work across multiple platforms, styles, and collaborations. Each piece represents precision, creativity, and technical excellence in movement.
              </p>

              <p className="text-base text-slate-600">
                Explore choreography, freestyle improvisation, and live performances that showcase the kinetic principles I teach.
              </p>
            </div>

            {/* Right column visual placeholder */}
            <div className="lg:col-span-5 bg-slate-100 rounded-lg h-96 flex items-center justify-center">
              <p className="text-slate-500">Featured Performance Placeholder</p>
            </div>
          </section>

          {/* PORTFOLIO FILTER */}
          <section className="mb-24">
            <DanceFilter items={dancePortfolio} categories={DANCE_FILTER_CATEGORIES} />
          </section>

          {/* CATEGORIES INTRO */}
          <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Choreography',
                desc: 'Original choreography pieces created for performances, music videos, and collaborations.',
              },
              {
                title: 'Freestyle',
                desc: 'Improvised movement in response to music, beatboxing, and live creative partners.',
              },
              {
                title: 'Performance',
                desc: 'Staged performances at festivals, theaters, fashion shows, and international venues.',
              },
            ].map((cat, idx) => (
              <div key={idx} className="border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {cat.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </section>

          {/* CTA */}
          <section className="py-16">
            <CTASection
              title="Ready to Integrate Movement into Your Leadership?"
              description="See how dance principles translate directly into professional presence, confidence, and command. Let's explore what's possible."
              buttonText="EXPLORE COACHING"
              buttonLink="/collaborations"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
