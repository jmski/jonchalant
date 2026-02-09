import { ScrollFade } from "@/components/animations";
import { DanceFilter } from "@/components/content";
import {
  PatternBackground,
  DecorativeDivider,
  LayeredPatternOverlay,
  AccentLine,
  DecorativeCornerBracket,
} from "@/components/effects";
import { Heading } from "@/components/typography";
import { PageTransition } from "@/components/layout";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Below-fold dynamic imports
const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});
import { sanityClient } from "@/lib/sanityClient";
import { dancePortfolioQuery } from "@/lib/sanityQueries";
import { PAGE_CONTENT, DANCE_FILTER_CATEGORIES } from "@/lib/pageContent";

export const metadata = {
  title: "Dance Portfolio | Jon",
  description: "Dance choreography, freestyle performances, and movement artistry"
};

const pageContent = PAGE_CONTENT.dance;

// Fallback mock data if Sanity fails
const MOCK_CHOREOGRAPHY = [
  {
    _id: 'chore-1',
    title: 'Ninjago Choreography | Urban Style',
    category: 'Choreography',
    description: 'Original choreography to Japanese hip-hop. Featured on TikTok (2.4M views). High-energy urban style with precision footwork.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/choreography/ninjago-urban-style.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'chore-2',
    title: 'Midnight Dreams | Contemporary Fusion',
    category: 'Choreography',
    description: 'Contemporary-hip hop fusion for music video. Ethereal slow sections transitioning to explosive moments. Directed & choreographed.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/choreography/midnight-dreams-fusion.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'chore-3',
    title: 'Synthwave Sunday | Retro Future',
    category: 'Choreography',
    description: 'Y2K-inspired choreography with 80s synth music. Winner of Seoul Dance Festival 2024. Clean lines meets fluid movement.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/choreography/synthwave-sunday-retro.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'chore-4',
    title: 'Street King | Commercial Grade',
    category: 'Choreography',
    description: 'High-impact choreography for global brand campaign. 15 dancers, multiple locations. Featured in TikTok creator spotlight.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/choreography/street-king-commercial.jpg',
    width: 800,
    height: 600
  }
];

const MOCK_FREESTYLE = [
  {
    _id: 'free-1',
    title: 'Cypher Session | Battle Flow',
    category: 'Freestyle',
    description: 'High-energy freestyle battle cypher. Improvisation to live beatboxing. Runner-up at NYC Freestyle Championship 2024.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/freestyle/cypher-session-battle.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'free-2',
    title: 'Jazz Jam | Studio Improvisation',
    category: 'Freestyle',
    description: 'Spontaneous freestyle to live jazz musicians. Studio session showing dynamic movement vocabulary and musicality.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/freestyle/jazz-jam-improv.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'free-3',
    title: 'Lo-Fi Vibes | Chill Freestyle',
    category: 'Freestyle',
    description: 'Relaxed freestyle to lo-fi hip-hop beats. Slower, more controlled movement. Pure flow and feel.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/freestyle/lofi-vibes-chill.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'free-4',
    title: 'Beat Switch | Multi-Genre Freestyle',
    category: 'Freestyle',
    description: 'Freestyle switching between 5 different genres (pop, hip-hop, jazz, EDM, waacking). Adaptability showcase.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/freestyle/beat-switch-multitype.jpg',
    width: 800,
    height: 600
  }
];

const MOCK_PERFORMANCES = [
  {
    _id: 'perf-1',
    title: 'Seoul Performance | International Stage',
    category: 'Performance',
    description: 'Live performance at Seoul Dance Festival (August 2024). 8-minute showcase performance. 5000+ live audience.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/performances/seoul-festival-stage.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'perf-2',
    title: 'Tour Performance | US East Coast',
    category: 'Performance',
    description: 'Live performance as featured artist on "Movement Tour 2024". Boston, New York, Philadelphia. Sold-out venues.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/performances/tour-performance-eastcoast.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'perf-3',
    title: 'Music Video Lead | Cinematic Performance',
    category: 'Performance',
    description: 'Lead dancer & choreographer for Grammy-nominated artist music video. Professional production, narrative-driven.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/performances/music-video-cinematic.jpg',
    width: 800,
    height: 600
  },
  {
    _id: 'perf-4',
    title: 'Fashion Show Close | Runway Performance',
    category: 'Performance',
    description: 'Closing performance for New York Fashion Week. Fashion brand collaboration. Integrated movement & costume.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/dance/performances/fashion-show-runway.jpg',
    width: 800,
    height: 600
  }
];

export default async function Dance() {
  let dancePortfolio: any[] = [];

  try {
    dancePortfolio = await sanityClient.fetch(dancePortfolioQuery);
  } catch (error) {
    console.error('Error fetching dance data:', error);
    // Use mock data if Sanity fails
    dancePortfolio = [...MOCK_CHOREOGRAPHY, ...MOCK_FREESTYLE, ...MOCK_PERFORMANCES];
  }

  // Fallback to mock data if empty
  if (dancePortfolio.length === 0) {
    dancePortfolio = [...MOCK_CHOREOGRAPHY, ...MOCK_FREESTYLE, ...MOCK_PERFORMANCES];
  }

  return (
    <div className="min-h-screen page-wrapper bg-primary">
      <PageTransition animation="slide-left">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24" id="main-content">
        {/* TECHNICAL HERO SECTION */}
        <div className="relative py-12 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Technical background grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, var(--border-color) 25%, var(--border-color) 26%, transparent 27%, transparent 74%, var(--border-color) 75%, var(--border-color) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, var(--border-color) 25%, var(--border-color) 26%, transparent 27%, transparent 74%, var(--border-color) 75%, var(--border-color) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '60px 60px'
          }} />

          {/* LEFT - BOLD TEXT */}
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-3 border-2 border-vibrant bg-vibrant-faint">
              <span className="w-2 h-2 bg-vibrant animate-pulse rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-vibrant">💃 CHOREOGRAPHY</span>
            </div>

            <div>
              <Heading level={1} className="mb-4">MOVEMENT<br />
                <span className="text-vibrant">PORTFOLIO</span>
              </Heading>
              <div className="h-1 w-40 bg-vibrant" />
            </div>

            <p className="text-lg font-black text-secondary leading-tight">
              Choreography | Freestyle | Performances
            </p>
            <p className="text-base leading-relaxed text-tertiary font-body max-w-lg">
              A collection of my best dance work across multiple platforms, styles, and collaborations. Each piece represents precision, creativity, and technical excellence.
            </p>
          </div>

          {/* RIGHT - TECHNICAL VISUAL */}
          <div className="relative hidden lg:flex items-center justify-center">
            <svg className="w-full max-w-sm" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              {/* Outer frame */}
              <rect x="30" y="30" width="340" height="340" fill="none" stroke="var(--accent-vibrant)" strokeWidth="2" />
              
              {/* Corner marks */}
              <g stroke="var(--accent-vibrant)" strokeWidth="3" fill="none">
                <line x1="30" y1="30" x2="70" y2="30" />
                <line x1="30" y1="30" x2="30" y2="70" />
                <line x1="370" y1="30" x2="330" y2="30" />
                <line x1="370" y1="30" x2="370" y2="70" />
                <line x1="30" y1="370" x2="70" y2="370" />
                <line x1="30" y1="370" x2="30" y2="330" />
                <line x1="370" y1="370" x2="330" y2="370" />
                <line x1="370" y1="370" x2="370" y2="330" />
              </g>

              {/* Center movement indicator */}
              <circle cx="200" cy="200" r="50" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" opacity="0.7" strokeDasharray="5,3" />
              
              {/* Movement vectors */}
              <line x1="200" y1="120" x2="200" y2="60" stroke="var(--accent-vibrant)" strokeWidth="2" opacity="0.6" />
              <line x1="200" y1="280" x2="200" y2="340" stroke="var(--accent-vibrant)" strokeWidth="2" opacity="0.6" />
              <line x1="120" y1="200" x2="60" y2="200" stroke="var(--accent-secondary)" strokeWidth="2" opacity="0.6" />
              <line x1="280" y1="200" x2="340" y2="200" stroke="var(--accent-secondary)" strokeWidth="2" opacity="0.6" />
              
              {/* Category indicators */}
              <circle cx="140" cy="140" r="8" fill="var(--accent-vibrant)" opacity="0.8" />
              <circle cx="260" cy="140" r="8" fill="var(--accent-secondary)" opacity="0.8" />
              <circle cx="200" cy="260" r="8" fill="var(--accent-tertiary)" opacity="0.8" />
              
              {/* Labels */}
              <text x="140" y="120" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="middle">CHORE</text>
              <text x="260" y="120" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="middle">FREE</text>
              <text x="200" y="290" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="middle">PERFORM</text>
            </svg>
          </div>
        </div>

        {/* Dynamic Filter and Portfolio */}
        <section className="py-12 sm:py-16 lg:py-20 relative mb-12">
          {/* Pattern background */}
          <LayeredPatternOverlay
            pattern1="diagonal"
            pattern2="dots"
            color1="vibrant"
            color2="secondary"
            opacity1={0.035}
            opacity2={0.025}
            rotation={-30}
            className="z-0"
          />
          <div className="relative z-10">
            <DanceFilter items={dancePortfolio} categories={DANCE_FILTER_CATEGORIES} />
          </div>
        </section>

        {/* Decorative Divider */}
        <DecorativeDivider color="tertiary" variant="line-dots" dotCount={5} className="bg-primary" />

        {/* CTA Section */}
        <CTASection
          title={pageContent.ctaTitle}
          description={pageContent.ctaDescription}
          buttonText={pageContent.ctaButtonText}
          buttonLink="/collaborations"
        />
      </main>
      </PageTransition>
    </div>
  );
}
