import React from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Grid component - Provides responsive grid layout
 * Uses CSS custom properties for gap and column count.
 */
export default function Grid({
  children,
  columns = 2,
  gap = 'md',
  className = '',
}: GridProps) {
  const gridClass = `grid grid-cols-${columns} gap-${gap}`;

  return (
    <div className={`${gridClass} ${className}`}>
      {children}
    </div>
  );
}
