'use client';

import { useState } from 'react';
import { PortfolioCard } from './index';
import { ScrollFade } from '@/components/animations';

interface DanceItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  videoUrl?: string;
  thumbnail?: string;
}

interface DanceFilterProps {
  items: DanceItem[];
  categories: string[];
}

const getCategoryColor = (category: string): string => {
  switch(category) {
    case 'Choreography':
    case 'Choreography Video':
      return 'vibrant';
    case 'Freestyle':
    case 'Freestyle Video':
      return 'neon';
    case 'Performance':
    case 'Performances':
    case 'Performance Video':
      return 'magenta';
    case 'All':
      return 'primary';
    default:
      return 'primary';
  }
};

export default function DanceFilter({ items, categories }: DanceFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [glitchActive, setGlitchActive] = useState<string | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const getColorVar = (color: string) => {
    const colorMap: Record<string, string> = {
      vibrant: 'var(--accent-vibrant)',
      neon: 'var(--accent-neon)',
      magenta: 'var(--accent-magenta)',
      primary: 'var(--text-primary)'
    };
    return colorMap[color] || 'var(--text-primary)';
  };

  return (
    <>
      {/* CATEGORY FILTER - BOLD & COLOR-CODED */}
      <ScrollFade>
        <div className="mb-16">
          <h2 className="text-2xl font-black uppercase tracking-[0.15em] text-primary mb-6 heading-display">Filter by Style</h2>
          <div className="flex flex-wrap gap-4">
            {(['All', ...categories.filter(c => c !== 'All')] as string[]).map((cat) => {
              const color = getCategoryColor(cat);
              const colorVar = getColorVar(color);
              const isActive = cat === activeCategory;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setGlitchActive(cat)}
                  onMouseLeave={() => setGlitchActive(null)}
                  className="relative group px-6 py-3 font-black uppercase tracking-[0.1em] text-sm transition-all duration-300 overflow-hidden"
                  style={{
                    borderWidth: isActive ? '3px' : '2px',
                    borderStyle: 'solid',
                    borderColor: colorVar,
                    backgroundColor: isActive ? colorVar : 'transparent',
                    color: isActive ? 'var(--primary)' : colorVar,
                  }}
                >
                  <span className={glitchActive === cat && !isActive ? 'glitch-text' : ''}>
                    {cat}
                  </span>
                  {isActive && (
                    <div 
                      className="absolute bottom-0 left-0 h-1 animate-pulse"
                      style={{
                        backgroundColor: colorVar,
                        width: '100%'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollFade>

      {/* Portfolio Grid - COLOR CODED BY CATEGORY */}
      <div className="space-y-16 pb-20">
        {['Choreography', 'Freestyle', 'Performance', 'Other'].map((displayCategory) => {
          const categoryItems = items.filter(item => {
            if (displayCategory === 'Choreography') return item.category?.includes('Choreography');
            if (displayCategory === 'Freestyle') return item.category?.includes('Freestyle');
            if (displayCategory === 'Performance') return item.category?.includes('Performance');
            return !item.category?.includes('Choreography') && !item.category?.includes('Freestyle') && !item.category?.includes('Performance');
          });

          if (activeCategory !== 'All' && !categoryItems.some(item => item.category === activeCategory)) {
            return null;
          }

          const displayItems = activeCategory === 'All' ? categoryItems : filteredItems;
          if (displayItems.length === 0 && activeCategory !== 'All') return null;

          const color = getCategoryColor(displayCategory);
          const colorVar = getColorVar(color);

          return (
            <div key={displayCategory}>
              <div className="mb-8 pb-4 border-b-3" style={{ borderColor: colorVar }}>
                <h3 
                  className="text-3xl font-black uppercase heading-display tracking-[0.1em]"
                  style={{ color: colorVar }}
                >
                  ▶ {displayCategory}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(activeCategory === 'All' ? categoryItems : displayItems).map((item, idx) => (
                  <ScrollFade key={item._id} delay={idx * 100}>
                    <div className="group relative">
                      <PortfolioCard
                        title={item.title}
                        category={item.category}
                        description={item.description}
                        image={item.thumbnail}
                      />
                      {/* Color underline on hover */}
                      <div 
                        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                        style={{ backgroundColor: colorVar }}
                      />
                    </div>
                  </ScrollFade>
                ))}
              </div>
            </div>
          );
        })}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p style={{ color: 'var(--text-secondary)' }}>
              No videos in this category yet. Check back soon! 🎬
            </p>
          </div>
        )}
      </div>
    </>
  );
}
