import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'dark';
  className?: string;
  id?: string;
}

/**
 * SectionWrapper component provides consistent full-width background sections
 * with proper responsive padding that accounts for the fixed sidebar layout.
 * 
 * Variants:
 * - primary: Uses --bg-primary color
 * - secondary: Uses --bg-secondary color
 * - tertiary: Uses --bg-tertiary color
 * - dark: Uses --color-burnt-indigo with light text (WCAG AA)
 */
export default function SectionWrapper({
  children,
  variant = 'primary',
  className = '',
  id,
}: SectionWrapperProps) {
  const variantClass = `section-wrapper-${variant}`;

  return (
    <div
      id={id}
      className={`section-wrapper ${variantClass} ${className}`}
    >
      {children}
    </div>
  );
}
