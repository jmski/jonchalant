import { ScrollFade, ScrollStagger } from "@/components/animations";
import { PageTransition } from "@/components/layout";
import { CornerBrackets, DecorativeDivider, LayeredPatternOverlay, GlowingCTA } from "@/components/effects";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

// Below-fold dynamic imports
const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

const CollaborationForm = dynamic(() => import('@/components/forms').then(mod => ({ default: mod.CollaborationForm })), {
  loading: () => <div className="py-12 px-8 text-center">Loading form...</div>,
  ssr: true
});
import { sanityClient } from "@/lib/sanityClient";
import { collaborationQuery } from "@/lib/sanityQueries";
import { PAGE_CONTENT } from "@/lib/pageContent";

export const metadata = {
  title: "Collaborations | Jon",
  description: "Brand partnerships, sponsored content, and collaboration opportunities"
};

const pageContent = PAGE_CONTENT.collaborations;

// Mock collaboration examples
const MOCK_COLLABORATIONS = [
  {
    _id: 'collab-1',
    title: 'Music Video Direction',
    category: 'Music Video',
    description: 'Original choreography and lead performance for music videos. Professional production, narrative-driven storytelling.',
    price: 'Custom Quote',
    image: '/images/collaborations/music-video-direction.jpg',
    width: 800,
    height: 480
  },
  {
    _id: 'collab-2',
    title: 'TikTok/Reels Content',
    category: 'Social Media',
    description: 'Trending dance content, choreography tutorials, behind-the-scenes footage. Optimized for short-form platforms.',
    price: '$500-$2,000 per video',
    image: '/images/collaborations/tiktok-reels-content.jpg',
    width: 800,
    height: 480
  },
  {
    _id: 'collab-3',
    title: 'Brand Campaign',
    category: 'Brand Partnership',
    description: 'Custom choreography for product launches, commercial videos, and brand activations. Multi-location shoots.',
    price: '$3,000-$15,000',
    image: '/images/collaborations/brand-campaign.jpg',
    width: 800,
    height: 480
  },
  {
    _id: 'collab-4',
    title: 'Live Performance',
    category: 'Event',
    description: 'Festival performances, concert tours, private events, corporate gatherings. Professional stage presence.',
    price: 'Custom Quote',
    image: '/images/collaborations/live-performance.jpg',
    width: 800,
    height: 480
  },
  {
    _id: 'collab-5',
    title: 'Choreography Teaching',
    category: 'Education',
    description: 'Workshop facilitation, masterclass instruction, online course creation. Train your team or audience.',
    price: '$200-$500/hour',
    image: '/images/collaborations/choreography-teaching.jpg',
    width: 800,
    height: 480
  },
  {
    _id: 'collab-6',
    title: 'Podcast/Interview',
    category: 'Media',
    description: 'Guest appearances, interview features, podcast episodes discussing movement, performance, and creativity.',
    price: 'Negotiable',
    image: '/images/collaborations/podcast-interview.jpg',
    width: 800,
    height: 480
  }
];

// Service categories
const SERVICE_CATEGORIES = [
  {
    name: 'Music Videos',
    items: [
      'Original choreography',
      'Lead performance',
      'Multi-dancer coordination',
      'Professional cinematography',
      'Post-production integration'
    ],
    color: 'vibrant'
  },
  {
    name: 'Social Content',
    items: [
      'TikTok/Reels choreography',
      'Trending dance content',
      'Tutorial series',
      'Behind-the-scenes footage',
      'Platform optimization'
    ],
    color: 'neon'
  },
  {
    name: 'Brand Partnerships',
    items: [
      'Custom campaign choreography',
      'Product promotion videos',
      'Brand activation events',
      'Commercial direction',
      'Multi-location shoots'
    ],
    color: 'magenta'
  },
  {
    name: 'Live Events',
    items: [
      'Festival performances',
      'Concert tours',
      'Private event choreography',
      'Corporate entertainment',
      'Stage presence coaching'
    ],
    color: 'vibrant'
  }
];

const getColorVar = (color: string) => {
  const colorMap: Record<string, string> = {
    vibrant: 'var(--accent-vibrant)',
    neon: 'var(--accent-neon)',
    magenta: 'var(--accent-magenta)',
    primary: 'var(--text-primary)'
  };
  return colorMap[color] || 'var(--text-primary)';
};

export default async function Collaborations() {
  let services: any[] = [];

  try {
    services = await sanityClient.fetch(collaborationQuery);
  } catch (error) {
    console.error('Error fetching collaboration data:', error);
    services = MOCK_COLLABORATIONS;
  }

  // Fallback to mock data if empty
  if (services.length === 0) {
    services = MOCK_COLLABORATIONS;
  }

  return (
    <div className="min-h-screen page-wrapper bg-primary">
      <PageTransition animation="scale">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TECHNICAL HERO SECTION */}
        <div className="relative py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            <div className="inline-flex items-center gap-3 px-5 py-3 border-2 border-magenta bg-magenta-faint">
              <span className="w-2 h-2 bg-magenta animate-pulse rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-magenta">🤝 LET'S CREATE</span>
            </div>

            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight heading-display text-primary mb-4">
                WORK<br />
                <span className="text-magenta">TOGETHER</span>
              </h1>
              <div className="h-1 w-40 bg-magenta" />
            </div>

            <p className="text-lg font-black text-secondary leading-tight">
              Music Videos | Brands | Events | Content
            </p>
            <p className="text-base leading-relaxed text-tertiary font-body max-w-lg">
              Strategic collaborations that blend movement, creativity, and storytelling. From TikTok trends to major brand campaigns, let's create something unforgettable together.
            </p>

            <div className="pt-4">
              <a href="#collaboration-form" className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-widest text-sm border-3 border-magenta text-magenta hover:bg-magenta hover:text-primary transition-all duration-300">
                ⬇ SEND INQUIRY
              </a>
            </div>
          </div>

          {/* RIGHT - TECHNICAL VISUAL */}
          <div className="relative hidden lg:flex items-center justify-center">
            <svg className="w-full max-w-sm" viewBox={`0 0 ${DESIGN_TOKENS.SIZES.SVG.VISUALIZATION} ${DESIGN_TOKENS.SIZES.SVG.VISUALIZATION}`} xmlns="http://www.w3.org/2000/svg">
              {/* Outer frame */}
              <rect x="30" y="30" width="340" height="340" fill="none" stroke="var(--accent-magenta)" strokeWidth={DESIGN_TOKENS.BORDERS.WIDTH.SM} />
              
              {/* Corner marks */}
              <g stroke="var(--accent-magenta)" strokeWidth={DESIGN_TOKENS.BORDERS.WIDTH.MD} fill="none">
                <line x1="30" y1="30" x2="70" y2="30" />
                <line x1="30" y1="30" x2="30" y2="70" />
                <line x1="370" y1="30" x2="330" y2="30" />
                <line x1="370" y1="30" x2="370" y2="70" />
                <line x1="30" y1="370" x2="70" y2="370" />
                <line x1="30" y1="370" x2="30" y2="330" />
                <line x1="370" y1="370" x2="330" y2="370" />
                <line x1="370" y1="370" x2="370" y2="330" />
              </g>

              {/* Connection nodes */}
              <g fill="var(--accent-magenta)" opacity="0.8">
                <circle cx="100" cy="150" r="6" />
                <circle cx="300" cy="150" r="6" />
                <circle cx="200" cy="300" r="6" />
              </g>

              {/* Connection lines */}
              <line x1="100" y1="150" x2="200" y2="300" stroke="var(--accent-vibrant)" strokeWidth="1.5" opacity="0.5" />
              <line x1="300" y1="150" x2="200" y2="300" stroke="var(--accent-neon)" strokeWidth="1.5" opacity="0.5" />
              <line x1="100" y1="150" x2="300" y2="150" stroke="var(--accent-magenta)" strokeWidth="1.5" opacity="0.4" strokeDasharray="3,3" />
              
              {/* Center circle */}
              <circle cx="200" cy="200" r="35" fill="none" stroke="var(--accent-magenta)" strokeWidth={DESIGN_TOKENS.BORDERS.WIDTH.SM} opacity="0.6" />
              
              {/* Labels */}
              <text x="100" y="175" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="middle">YOU</text>
              <text x="300" y="175" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="middle">ME</text>
              <text x="200" y="325" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="middle">MAGIC</text>
            </svg>
          </div>
        </div>

        {/* SERVICE CATEGORIES - COLOR CODED */}
        <section className="mb-24 relative">
          {/* Pattern background */}
          <LayeredPatternOverlay
            pattern1="checkerboard"
            pattern2="dots"
            color1="vibrant"
            color2="neon"
            opacity1={0.02}
            opacity2={0.015}
            rotation={15}
            className="z-0"
          />
          <div className="relative z-10">
            <ScrollFade>
              <div className="mb-12">
                <h2 className="text-4xl sm:text-5xl font-black uppercase heading-display tracking-widest text-primary mb-4">
                  Services & Collaboration Types
                </h2>
                <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
                  Flexible pricing and customizable packages based on your project scope and requirements.
                </p>
              </div>
            </ScrollFade>

            <ScrollStagger variant="slideInUp" staggerDelay={100}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {SERVICE_CATEGORIES.map((category, idx) => {
                const colorVar = getColorVar(category.color);
                return (
                  <div key={idx} className="relative group">
                      <div 
                        className="border-t-4 pt-6 pb-8 px-8 transition-all duration-300 hover:shadow-lg"
                        style={{ borderColor: colorVar, backgroundColor: 'rgba(255,255,255, 0.01)' }}
                      >
                        <h3 
                          className="text-3xl font-black uppercase heading-display tracking-widest mb-6"
                          style={{ color: colorVar }}
                        >
                          {category.name}
                        </h3>
                        <ul className="space-y-3">
                          {category.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-lg font-black mt-1" style={{ color: colorVar }}>✓</span>
                              <span className="text-sm leading-relaxed text-tertiary font-body">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Hover accent line */}
                      <div 
                        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                        style={{ backgroundColor: colorVar }}
                      />
                  </div>
                );
              })}
              </div>
            </ScrollStagger>
          </div>
        </section>


        {/* Decorative Divider */}
        <DecorativeDivider color="neon" variant="line-dots" dotCount={7} className="bg-primary mb-24" />

        {/* PAST COLLABORATIONS */}
        <section className="mb-24 relative">
          {/* Pattern background */}
          <LayeredPatternOverlay
            pattern1="grid"
            pattern2="diagonal"
            color1="magenta"
            color2="vibrant"
            opacity1={0.025}
            opacity2={0.02}
            rotation={-25}
            className="z-0"
          />
          <div className="relative z-10">
            <ScrollFade>
              <div className="mb-12 pb-6 border-b-3" style={{ borderColor: 'var(--accent-magenta)' }}>
                <h2 className="text-4xl sm:text-5xl font-black uppercase heading-display tracking-widest mb-4" style={{ color: 'var(--accent-magenta)' }}>
                  ▶ Recent Projects
                </h2>
                <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
                  A selection of successful brand partnerships and creative collaborations.
                </p>
              </div>
            </ScrollFade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((collab: any, idx: number) => (
                <ScrollFade key={collab._id} delay={idx * 100}>
                  <div className="group relative border-2 border-tertiary p-6 hover:border-magenta transition-all duration-300">
                    <CornerBrackets position="all" size="md" color="magenta" /> 
                    <h3 className="text-xl font-black uppercase tracking-widest text-primary mb-2">
                      {collab.title}
                    </h3>
                    <p className="text-xs font-black uppercase tracking-widest text-magenta mb-4">
                      {collab.category}
                    </p>
                    <p className="text-sm leading-relaxed text-tertiary font-body mb-4">
                      {collab.description}
                    </p>
                    {collab.price && (
                      <p className="text-sm font-black text-vibrant">
                        {collab.price}
                      </p>
                    )}
                    {/* Hover underline */}
                    <div 
                      className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: 'var(--accent-magenta)' }}
                    />
                  </div>
                </ScrollFade>
              ))}
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <DecorativeDivider color="vibrant" variant="line-dots" dotCount={5} className="bg-primary mb-24" />

        {/* COLLABORATION FORM */}
        <section id="collaboration-form" className="mb-20 py-12 relative">
          {/* Pattern background */}
          <LayeredPatternOverlay
            pattern1="dots"
            pattern2="diagonal"
            color1="neon"
            color2="magenta"
            opacity1={0.03}
            opacity2={0.02}
            rotation={30}
            className="z-0"
          />
          <div className="relative z-10">
            <ScrollFade>
              <div className="mb-12 pb-6 border-b-3" style={{ borderColor: 'var(--accent-vibrant)' }}>
                <h2 
                  className="text-4xl sm:text-5xl font-black uppercase heading-display tracking-widest mb-4"
                  style={{ color: 'var(--accent-vibrant)' }}
                >
                  ▶ Let's Connect
                </h2>
                <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
                  Have a project in mind? Send your collaboration inquiry below. I respond to all inquiries within 48 hours.
                </p>
              </div>
            </ScrollFade>
            <div className="max-w-3xl">
              <CollaborationForm />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection
          title="Let's Create Something Extraordinary"
          description="Ready to bring your vision to life? Let's collaborate and make magic happen."
          buttonText="START CONVERSATION"
          buttonLink="#collaboration-form"
        />
      </main>
      </PageTransition>
    </div>
  );
}
