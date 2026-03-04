import React from 'react';
import '@/app/css/section-wrapper.css';

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
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
