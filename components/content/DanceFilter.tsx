'use client';

import { useState } from 'react';
import { DanceCard } from './index';
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

/**
 * Color mapping for dance categories
 * Maps category names to CSS variable references
 */
const getCategoryColor = (category: string): string => {
  const lowerCategory = category.toLowerCase();
  switch(lowerCategory) {
    case 'choreography':
    case 'choreography video':
      return 'var(--color-burnt-indigo)';
    case 'freestyle':
    case 'freestyle video':
      return 'var(--color-muted-moss)';
    case 'performance':
    case 'performances':
    case 'performance video':
      return 'var(--accent-primary)';
    case 'all':
      return 'var(--text-primary)';
    default:
      return 'var(--text-primary)';
  }
};

/**
 * DanceFilter Component
 * ─────────────────────────────────────────────
 * Portfolio filter with category buttons and responsive grid layout.
 * All styling handled through CSS classes in dance-filter.css
 * 
 * CSS Classes Used:
 * - .dance-filter-header: Header container
 * - .dance-filter-title: "Filter by Style" heading
 * - .dance-filter-buttons: Button container with flex layout
 * - .filter-button: Individual button class (base)
 * - .filter-button.active: Active button state styling
 * - .filter-button-bar: Animated pulse bar for active button
 * - .dance-portfolio-sections: Grid sections container
 * - .dance-section-header: Section header with color-coded border
 * - .dance-section-title: Section title text
 * - .dance-grid: Responsive grid layout (1 → 2 → 3 columns)
 * - .dance-grid-item: Individual grid item
 * - .dance-grid-item-underline: Hover underline effect
 * - .dance-empty-state: Empty state message
 * 
 * Props:
 *   items: Array of dance portfolio items
 *   categories: Array of category strings for filtering
 */
export default function DanceFilter({ items, categories }: DanceFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <>
      {/* CATEGORY FILTER */}
      <ScrollFade>
        <div className="dance-filter-header">
          <h2 className="dance-filter-title">Filter by Style</h2>
          <div className="dance-filter-buttons">
            {(['All', ...categories.filter(c => c !== 'All')] as string[]).map((cat) => {
              const colorVar = getCategoryColor(cat);
              const isActive = cat === activeCategory;
              const displayText = cat === 'All' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1);

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-button ${isActive ? 'active' : ''}`}
                  style={{
                    borderColor: colorVar,
                    backgroundColor: isActive ? colorVar : 'transparent',
                    color: isActive ? 'white' : colorVar,
                  }}
                >
                  <span>{displayText}</span>
                  {isActive && (
                    <div 
                      className="filter-button-bar"
                      style={{ backgroundColor: colorVar }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollFade>

      {/* Portfolio Grid */}
      <div className="dance-portfolio-sections">
        {['choreography', 'freestyle', 'performance'].map((displayCategory) => {
          const categoryItems = items.filter(item => item.category?.toLowerCase() === displayCategory);

          if (categoryItems.length === 0) return null;
          if (activeCategory !== 'All' && activeCategory?.toLowerCase() !== displayCategory) return null;

          const itemsToDisplay = activeCategory === 'All' ? categoryItems : filteredItems;
          if (itemsToDisplay.length === 0) return null;

          const colorVar = getCategoryColor(displayCategory);
          const displayName = displayCategory.charAt(0).toUpperCase() + displayCategory.slice(1);

          return (
            <div key={displayCategory}>
              <div className="dance-section-header" style={{ borderColor: colorVar }}>
                <h3 
                  className="dance-section-title"
                  style={{ color: colorVar }}
                >
                  ▶ {displayName}
                </h3>
              </div>
              
              <ScrollStagger variant="slideInUp" staggerDelay={80}>
                <div className="dance-grid">
                  {itemsToDisplay.map((item) => (
                    <div key={item._id} className="dance-grid-item">
                      <DanceCard
                        title={item.title}
                        category={item.category}
                        description={item.description}
                        image={item.thumbnail}
                      />
                      <div 
                        className="dance-grid-item-underline"
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
          <div className="dance-empty-state">
            <p>
              No videos in this category yet. Check back soon! 🎬
            </p>
          </div>
        )}
      </div>
    </>
  );
}
