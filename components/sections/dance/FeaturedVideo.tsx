'use client';

import { useState } from 'react';
import { FluidShape } from '@/components/decorative';

interface FeaturedVideoProps {
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

export default function FeaturedVideo({
  title,
  category,
  description,
  videoUrl,
  duration,
  publishedAt,
}: FeaturedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const categoryColor = getCategoryColor(category);
  const categoryLabel = getCategoryLabel(category);

  return (
    <section className="featured-video-hero">
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
      <div className="featured-video-hero-text">
        <span
          className="featured-video-hero-badge"
          style={{ backgroundColor: categoryColor }}
        >
          {categoryLabel}
        </span>

        <h1 className="featured-video-hero-title">
          {title}
        </h1>

        <p className="featured-video-hero-description">
          {description}
        </p>

        {/* Metadata */}
        <div className="featured-video-hero-metadata">
          {duration && (
            <div className="featured-video-hero-metadata-item">
              <span className="featured-video-hero-metadata-dot"></span>
              <span>{duration} mins</span>
            </div>
          )}
          {publishedAt && (
            <div className="featured-video-hero-metadata-item">
              <span className="featured-video-hero-metadata-dot"></span>
              <span>{new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right column - Featured video */}
      <div className="featured-video-hero-video-column">
        <div className="featured-video-hero-video-container">
          {!isPlaying ? (
            <>
              {/* Video thumbnail/preview */}
              <div className="featured-video-hero-placeholder">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="featured-video-hero-play-button"
                  aria-label="Play featured video"
                >
                  {/* Play button */}
                  <div 
                    className="featured-video-hero-play-circle"
                    style={{ backgroundColor: categoryColor }}
                  >
                    <svg
                      className="featured-video-hero-play-icon"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  {/* Outer ring animation on hover */}
                  <div
                    className="featured-video-hero-play-ring"
                    style={{
                      borderColor: categoryColor,
                    }}
                  ></div>
                </button>
              </div>
            </>
          ) : (
            <iframe
              className="featured-video-hero-iframe"
              src={`${videoUrl}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Subtle shadow effect */}
        <div
          className="featured-video-hero-shadow"
          style={{ backgroundColor: categoryColor }}
        ></div>
      </div>
    </section>
  );
}
