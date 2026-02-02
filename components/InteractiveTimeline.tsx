'use client';

import { useState, useRef, useEffect } from 'react';

interface TimelineItem {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'choreography' | 'performance' | 'freestyle' | 'breakthrough' | 'collaboration';
  image?: string;
  icon?: string;
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
  onItemClick?: (item: TimelineItem) => void;
}

const categoryColors = {
  choreography: { bg: 'var(--category-choreography-bg)', border: 'var(--category-choreography-border)', label: 'Choreography' },
  performance: { bg: 'var(--category-performance-bg)', border: 'var(--category-performance-border)', label: 'Performance' },
  freestyle: { bg: 'var(--category-freestyle-bg)', border: 'var(--category-freestyle-border)', label: 'Freestyle' },
  breakthrough: { bg: 'var(--category-breakthrough-bg)', border: 'var(--category-breakthrough-border)', label: 'Breakthrough' },
  collaboration: { bg: 'var(--category-collaboration-bg)', border: 'var(--category-collaboration-border)', label: 'Collaboration' },
};

export default function InteractiveTimeline({
  items,
  onItemClick,
}: InteractiveTimelineProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sortedItems = [...items].sort((a, b) => a.year - b.year);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-12 px-4"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Horizontal connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
          <div
            className="h-full"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0, 217, 255, 0.3), rgba(255, 215, 0, 0.3), rgba(255, 0, 110, 0.3), transparent)',
              boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)',
            }}
          />
        </div>

        {/* Timeline items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 relative z-10">
          {sortedItems.map((item, index) => {
            const color = categoryColors[item.category];
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Timeline dot */}
                <div className="flex justify-center mb-4">
                  <div
                    className="relative w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
                    style={{
                      backgroundColor: color.border,
                      boxShadow: isHovered
                        ? `0 0 20px ${color.border}, 0 0 40px ${color.border}80`
                        : `0 0 0 2px rgba(10, 6, 20, 1)`,
                      transform: isHovered ? 'scale(1.8)' : 'scale(1)',
                    }}
                  >
                    {/* Inner glow */}
                    <div
                      className="absolute inset-1 rounded-full"
                      style={{
                        background: `radial-gradient(circle at center, ${color.border}, transparent)`,
                        opacity: isHovered ? 0.8 : 0.4,
                      }}
                    />
                  </div>
                </div>

                {/* Year label */}
                <div
                  className="text-center text-sm font-bold mb-3 transition-all duration-300"
                  style={{
                    color: isHovered ? color.border : 'var(--text-secondary)',
                    textShadow: isHovered
                      ? `0 0 10px ${color.border}80`
                      : 'none',
                  }}
                >
                  {item.year}
                </div>

                {/* Card */}
                <div
                  className="relative p-4 rounded-lg border transition-all duration-300 cursor-pointer group/card overflow-hidden"
                  style={{
                    backgroundColor: isHovered ? color.bg : 'rgba(22, 33, 62, 0.4)',
                    borderColor: isHovered ? color.border : 'rgba(45, 34, 80, 0.6)',
                    borderWidth: '1px',
                    transform: isHovered
                      ? 'translateY(-8px) scale(1.05)'
                      : 'translateY(0) scale(1)',
                    boxShadow: isHovered
                      ? `0 20px 40px rgba(0, 217, 255, 0.1), 0 0 20px ${color.border}40`
                      : '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Animated border glow */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(45deg, transparent, ${color.border}20, transparent)`,
                      animation: 'shimmer 2s infinite',
                    }}
                  />

                  {/* Card content */}
                  <div className="relative z-10">
                    {/* Category badge */}
                    <div
                      className="inline-block px-2 py-1 rounded text-xs font-semibold mb-2 transition-all duration-300"
                      style={{
                        backgroundColor: isHovered
                          ? `${color.border}30`
                          : `${color.border}15`,
                        color: color.border,
                        borderBottom: `2px solid ${color.border}`,
                      }}
                    >
                      {color.label}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-sm font-bold mb-2 line-clamp-2 transition-all duration-300"
                      style={{
                        color: isHovered
                          ? '#ffffff'
                          : 'var(--text-heading)',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description - only show on hover/select */}
                    {isHovered && (
                      <p
                        className="text-xs line-clamp-3 transition-all duration-300"
                        style={{ color: 'var(--text-body)' }}
                      >
                        {item.description}
                      </p>
                    )}

                    {/* Image preview */}
                    {item.image && isHovered && (
                      <div className="mt-2 h-24 rounded overflow-hidden border border-opacity-30">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Connecting line from dot to card */}
                {isHovered && (
                  <div
                    className="absolute w-0.5 left-1/2 -translate-x-1/2 transition-all duration-300"
                    style={{
                      top: '32px',
                      height: '12px',
                      background: `linear-gradient(to bottom, ${color.border}, transparent)`,
                      boxShadow: `0 0 10px ${color.border}60`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-16 pt-8 border-t border-opacity-20 flex flex-wrap gap-6 justify-center">
          {Object.entries(categoryColors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: value.border }}
              />
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {value.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
