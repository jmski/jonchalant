
import { PortfolioCard } from "@/components/content";
import { ScrollFade } from "@/components/animations";
import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { sanityClient } from "@/lib/sanityClient";
import { showcaseQuery } from "@/lib/sanityQueries";
import { PAGE_CONTENT } from "@/lib/pageContent";

export const metadata = {
  title: "Showcase | Jon",
  description: "Gunpla builds, model photography, and Pokémon collection"
};

const pageContent = PAGE_CONTENT.showcase;

// Fallback mock data if Sanity fails
const MOCK_GUNPLA = [
  {
    _id: 'gunpla-1',
    title: 'RG Evangelion Unit-01',
    category: 'Gunpla',
    description: 'Detailed Real Grade build with custom weathering and LED lighting. Professional display photography.',
    image: '/api/placeholder/400/400'
  },
  {
    _id: 'gunpla-2',
    title: 'MG Unicorn Gundam',
    category: 'Gunpla',
    description: 'Master Grade with full transformation mechanics. Handpainted details and metallic accents.',
    image: '/api/placeholder/400/400'
  },
  {
    _id: 'gunpla-3',
    title: 'HG Barbatos Lupus Rex',
    category: 'Gunpla',
    description: 'High Grade with custom painting and weathering effects. Action pose showcase.',
    image: '/api/placeholder/400/400'
  },
  {
    _id: 'gunpla-4',
    title: 'PG Strike Freedom',
    category: 'Gunpla',
    description: 'Perfect Grade with advanced LED system and mechanical detail customization.',
    image: '/api/placeholder/400/400'
  }
];

const MOCK_POKEMON = [
  {
    _id: 'poke-1',
    title: 'Charizard VMAX Gold Secret',
    category: 'Pokémon',
    description: 'PSA 8 graded. Vivid Voltage era premium collection piece.',
    image: '/api/placeholder/400/400'
  },
  {
    _id: 'poke-2',
    title: 'Pikachu Illustrator',
    category: 'Pokémon',
    description: 'Japanese promotional holographic. Vintage 1997 original.',
    image: '/api/placeholder/400/400'
  },
  {
    _id: 'poke-3',
    title: 'Mewtwo EX Crystal',
    category: 'Pokémon',
    description: 'Crystal Type holographic. Neo Genesis era rare collectible.',
    image: '/api/placeholder/400/400'
  },
  {
    _id: 'poke-4',
    title: 'Blastoise Base Set',
    category: 'Pokémon',
    description: 'First Edition holographic. Shadowless condition. Mint center.',
    image: '/api/placeholder/400/400'
  }
];

export default async function Showcase() {
  let showcaseItems: any[] = [];

  try {
    showcaseItems = await sanityClient.fetch(showcaseQuery);
  } catch (error) {
    console.error('Error fetching showcase data:', error);
    // Use mock data if Sanity fails
    showcaseItems = [...MOCK_GUNPLA, ...MOCK_POKEMON];
  }

  // Fallback to mock data if empty
  if (showcaseItems.length === 0) {
    showcaseItems = [...MOCK_GUNPLA, ...MOCK_POKEMON];
  }

  const gunplaShowcase = showcaseItems.filter((item: any) => item.category === "Gunpla");
  const pokemonShowcase = showcaseItems.filter((item: any) => item.category === "Pokémon");

  return (
    <div className="min-h-screen page-wrapper bg-primary">
      <PageTransition animation="slide-right">
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
            <div className="inline-flex items-center gap-3 px-5 py-3 border-2 border-neon bg-neon-faint">
              <span className="w-2 h-2 bg-neon animate-pulse rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-neon">🎨 COLLECTION</span>
            </div>

            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight heading-display text-primary mb-4">
                PASSION<br />
                <span className="text-neon">PROJECTS</span>
              </h1>
              <div className="h-1 w-40 bg-neon" />
            </div>

            <p className="text-lg font-black text-secondary leading-tight">
              Gunpla Builds | Pokémon Cards | Model Photography
            </p>
            <p className="text-base leading-relaxed text-tertiary font-body max-w-lg">
              Detailed showcase of my hobbies: custom gundam model engineering and premium card collecting. Each piece represents dedication to craftsmanship and visual storytelling.
            </p>
          </div>

          {/* RIGHT - TECHNICAL VISUAL */}
          <div className="relative hidden lg:flex items-center justify-center">
            <svg className="w-full max-w-sm" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              {/* Outer frame */}
              <rect x="30" y="30" width="340" height="340" fill="none" stroke="var(--accent-neon)" strokeWidth="2" />
              
              {/* Corner marks */}
              <g stroke="var(--accent-neon)" strokeWidth="3" fill="none">
                <line x1="30" y1="30" x2="70" y2="30" />
                <line x1="30" y1="30" x2="30" y2="70" />
                <line x1="370" y1="30" x2="330" y2="30" />
                <line x1="370" y1="30" x2="370" y2="70" />
                <line x1="30" y1="370" x2="70" y2="370" />
                <line x1="30" y1="370" x2="30" y2="330" />
                <line x1="370" y1="370" x2="330" y2="370" />
                <line x1="370" y1="370" x2="370" y2="330" />
              </g>

              {/* Diagonal divisions */}
              <line x1="30" y1="30" x2="370" y2="370" stroke="var(--accent-magenta)" strokeWidth="1" opacity="0.4" />
              <line x1="370" y1="30" x2="30" y2="370" stroke="var(--accent-magenta)" strokeWidth="1" opacity="0.4" />
              
              {/* Category zones */}
              <circle cx="120" cy="120" r="50" fill="none" stroke="var(--accent-neon)" strokeWidth="2" opacity="0.6" />
              <circle cx="280" cy="280" r="50" fill="none" stroke="var(--accent-magenta)" strokeWidth="2" opacity="0.6" />
              <circle cx="200" cy="200" r="40" fill="none" stroke="var(--accent-vibrant)" strokeWidth="2" opacity="0.5" strokeDasharray="5,3" />
              
              {/* Labels */}
              <text x="120" y="200" fontSize="10" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="middle">MODELS</text>
              <text x="280" y="380" fontSize="10" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="middle">CARDS</text>
            </svg>
          </div>
        </div>

        {/* GUNPLA SECTION - NEON CYAN */}
        <section className="mb-24">
          <ScrollFade>
            <div className="mb-12 pb-6 border-b-3" style={{ borderColor: 'var(--accent-neon)' }}>
              <h2 className="text-4xl sm:text-5xl font-black uppercase heading-display tracking-[0.1em] mb-4" style={{ color: 'var(--accent-neon)' }}>
                ▶ GUNPLA BUILD GALLERY
              </h2>
              <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
                Custom Gundam model engineering featuring Real Grade, Master Grade, and Perfect Grade builds with professional photography, LED customization, and hand-painted details.
              </p>
            </div>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gunplaShowcase.map((item: any, idx: number) => (
              <ScrollFade key={item._id} delay={idx * 100}>
                <div className="group relative">
                  <PortfolioCard
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    image={item.image}
                  />
                  <div 
                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: 'var(--accent-neon)' }}
                  />
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* POKÉMON SECTION - MAGENTA */}
        <section className="mb-20">
          <ScrollFade>
            <div className="mb-12 pb-6 border-b-3" style={{ borderColor: 'var(--accent-magenta)' }}>
              <h2 className="text-4xl sm:text-5xl font-black uppercase heading-display tracking-[0.1em] mb-4" style={{ color: 'var(--accent-magenta)' }}>
                ▶ POKÉMON CARD COLLECTION
              </h2>
              <p className="text-base leading-relaxed text-tertiary font-body max-w-2xl">
                Premium trading card collection spanning vintage base sets, holographic rares, and modern chase cards. Japanese imports, graded specimens, and official promotional releases.
              </p>
            </div>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pokemonShowcase.map((item: any, idx: number) => (
              <ScrollFade key={item._id} delay={idx * 100}>
                <div className="group relative">
                  <PortfolioCard
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    image={item.image}
                  />
                  <div 
                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: 'var(--accent-magenta)' }}
                  />
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

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
