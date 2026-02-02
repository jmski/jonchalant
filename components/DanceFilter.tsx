'use client';

import { useState } from 'react';
import PortfolioCard from './PortfolioCard';
import ScrollFade from './ScrollFade';

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

export default function DanceFilter({ items, categories }: DanceFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <ScrollFade>
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
              style={{
                backgroundColor: cat === activeCategory ? 'var(--accent-primary)' : 'var(--card-bg)',
                color: cat === activeCategory ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (cat !== activeCategory) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                  e.currentTarget.style.color = 'var(--btn-primary-text)';
                }
              }}
              onMouseLeave={(e) => {
                if (cat !== activeCategory) {
                  e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollFade>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <ScrollFade key={item._id} delay={idx * 100}>
              <PortfolioCard
                title={item.title}
                category={item.category}
                description={item.description}
                image={item.thumbnail}
              />
            </ScrollFade>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p style={{ color: 'var(--text-secondary)' }}>
              No videos in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
