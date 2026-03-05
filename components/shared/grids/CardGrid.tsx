import { ReactNode } from 'react';

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export function CardGrid({ children, columns = 3, gap = 'md' }: CardGridProps) {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  const gapClass = {
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12'
  }[gap];

  return (
    <div className={`card-grid ${gridColsClass} ${gapClass} auto-rows-fr`}>
      {children}
    </div>
  );
}
