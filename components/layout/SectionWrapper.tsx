import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'dark';
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * SectionWrapper component provides consistent full-width background sections
 * with proper responsive padding that accounts for the fixed sidebar layout.
 * 
 * Variants:
 * - primary: Uses --bg-primary color
 * - secondary: Uses --bg-secondary color
 * - tertiary: Uses --bg-tertiary color
 * - dark: Uses --mocha-deep with light text (WCAG AA)
 */
export default function SectionWrapper({
  children,
  variant = 'primary',
  className = '',
  id,
  style,
}: SectionWrapperProps) {
  const variantClass = `section-wrapper-${variant}`;
  const darkClass = variant === 'dark' ? ' jc-section--dark' : '';

  return (
    <div
      id={id}
      className={`section-wrapper ${variantClass}${darkClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
