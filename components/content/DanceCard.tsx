'use client';
import Image from 'next/image';
import { useState } from 'react';
import { getOptimizedImageProps } from '@/lib/imageConfig';

interface DanceCardProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  link?: string;
}

export default function DanceCard({
  title,
  description,
  image,
  category,
  link,
}: DanceCardProps) {
  const [shinePosition, setShinePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setShinePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const content = (
    <div 
      className="card-enhanced overflow-hidden h-full group relative"
      onMouseMove={handleMouseMove}
    >
      {/* Shine effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at ${shinePosition.x}px ${shinePosition.y}px, rgba(255, 255, 255, 0.3), transparent)`,
          zIndex: 20,
        }}
      />

      {/* Image */}
      {image && (
        <div className="relative w-full h-48 overflow-hidden transition-colors duration-300 bg-secondary">
          <Image
            src={image}
            alt={title}
            {...getOptimizedImageProps('PORTFOLIO_CARD')}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Enhanced overlay with theme-aware accent gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, var(--accent-vibrant), var(--accent-vibrant-hover))`,
              opacity: 0.15,
            }}
          />
          
          {category && (
            <div className="absolute top-3 left-3 group-hover:top-2 group-hover:left-2 transition-all duration-300 transform group-hover:scale-110">
              <span className="badge">{category}</span>
            </div>
          )}

          {/* Arrow icon reveal with theme-aware background */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div 
              className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-all duration-300 border"
              style={{ 
                background: 'var(--accent-vibrant)',
                color: 'var(--btn-primary-text)',
                border: '1px solid var(--accent-vibrant)',
                borderRadius: '0px',
              }}
            >
              →
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 transition-all duration-300" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
        <h3 className="text-lg font-bold mb-2 transition-colors duration-300 text-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed transition-colors duration-300 text-secondary">
          {description}
        </p>
        {link && (
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 text-primary">
            Learn more <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block transition-all duration-300">
        {content}
      </a>
    );
  }

  return content;
}
