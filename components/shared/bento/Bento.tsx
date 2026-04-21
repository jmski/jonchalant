import type { ReactNode } from 'react';

// ─── BentoCell ───────────────────────────────────────────────────────────────

interface BentoCellProps {
  size?: 'sm' | 'md' | 'lg' | 'tall' | 'wide';
  children: ReactNode;
  className?: string;
}

export function BentoCell({ size = 'md', children, className }: BentoCellProps) {
  const classes = ['bento-cell', `bento-cell--${size}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} data-size={size}>
      {children}
    </div>
  );
}

// ─── Bento ───────────────────────────────────────────────────────────────────

interface BentoProps {
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export function Bento({ columns = 4, gap = 'md', children, className }: BentoProps) {
  const classes = ['bento', `bento--gap-${gap}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div
      className={classes}
      style={{ '--bento-columns': columns } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
