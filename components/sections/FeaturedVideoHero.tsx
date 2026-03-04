'use client';

import { useState } from 'react';
import { FluidShape } from '@/components/decorative';

interface FeaturedVideoHeroProps {
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  duration?: number;
  publishedAt?: string;
}

const getCategoryColor = (category: string): string => {
  const categoryLower = category.toLowerCase();
  const colors: { [key: string]: string } = {
    'choreography': '#2563eb',
    'freestyle': '#f97316',
    'performance': '#7c3aed',
  };
  return colors[categoryLower] || '#64748b';
};

const getCategoryLabel = (category: string): string => {
  const labels: { [key: string]: string } = {
    'choreography': 'Choreography',
    'freestyle': 'Freestyle',
    'performance': 'Performance',
  };
  return labels[category.toLowerCase()] || category;
};

export default function FeaturedVideoHero({
  title,
  category,
  description,
  videoUrl,
  duration,
  publishedAt,
}: FeaturedVideoHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const categoryColor = getCategoryColor(category);
  const categoryLabel = getCategoryLabel(category);

  return (
    <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
      {/* Subtle fluid shape decorative element */}
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

      {/* Left column - Text content */}
      <div className="lg:col-span-6 space-y-6 relative z-10">
        <div className="inline-block">
          <span
            className="text-sm uppercase tracking-widest font-medium px-3 py-1 rounded text-white"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryLabel}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl">
          {description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-6 text-sm text-slate-600 pt-4">
          {duration && (
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span>{duration} mins</span>
            </div>
          )}
          {publishedAt && (
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span>{new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right column - Featured video */}
      <div className="lg:col-span-6 relative">
        <div className="relative w-full bg-slate-900 rounded-lg overflow-hidden aspect-video">
          {!isPlaying ? (
            <>
              {/* Video thumbnail/preview */}
              <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="relative z-10 group"
                  aria-label="Play featured video"
                >
                  {/* Play button */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: categoryColor }}>
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  {/* Outer ring animation on hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                    style={{
                      borderWidth: '2px',
                      borderColor: categoryColor,
                      width: '80px',
                      height: '80px',
                    }}
                  ></div>
                </button>
              </div>
            </>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`${videoUrl}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Subtle shadow effect */}
        <div
          className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rounded-lg blur-3xl"
          style={{ backgroundColor: categoryColor }}
        ></div>
      </div>
    </section>
  );
}
