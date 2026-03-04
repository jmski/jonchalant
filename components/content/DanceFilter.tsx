'use client';

import { useState } from 'react';
import { PortfolioCard } from './index';
import { ScrollFade, ScrollStagger } from '@/components/animations';

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
  const lowerCategory = category.toLowerCase();
  switch(lowerCategory) {
    case 'choreography':
    case 'choreography video':
      return 'vibrant';
    case 'freestyle':
    case 'freestyle video':
      return 'secondary';
    case 'performance':
    case 'performances':
    case 'performance video':
      return 'tertiary';
    case 'all':
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
      secondary: 'var(--accent-secondary)',
      tertiary: 'var(--accent-tertiary)',
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
              const displayText = cat === 'All' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1);

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
                    {displayText}
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
        {['choreography', 'freestyle', 'performance'].map((displayCategory) => {
          const categoryItems = items.filter(item => item.category?.toLowerCase() === displayCategory);

          // Skip this section if it's empty or if a specific category is selected and it's not this one
          if (categoryItems.length === 0) return null;
          if (activeCategory !== 'All' && activeCategory?.toLowerCase() !== displayCategory) return null;

          const itemsToDisplay = activeCategory === 'All' ? categoryItems : filteredItems;
          if (itemsToDisplay.length === 0) return null;

          const color = getCategoryColor(displayCategory);
          const colorVar = getColorVar(color);
          const displayName = displayCategory.charAt(0).toUpperCase() + displayCategory.slice(1);

          return (
            <div key={displayCategory}>
              <div className="mb-8 pb-4 border-b-3" style={{ borderColor: colorVar }}>
                <h3 
                  className="text-3xl font-black uppercase heading-display tracking-[0.1em]"
                  style={{ color: colorVar }}
                >
                  ▶ {displayName}
                </h3>
              </div>
              
              <ScrollStagger variant="slideInUp" staggerDelay={80}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {itemsToDisplay.map((item, idx) => (
                    <div key={item._id} className="group relative">
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
                  ))}
                </div>
              </ScrollStagger>
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
