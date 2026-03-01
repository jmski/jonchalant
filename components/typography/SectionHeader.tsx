/**
 * SectionHeader Component
 * 
 * Unified section heading styling for the Kinetic Leader brand.
 * Enforces consistent typography hierarchy and accent color usage.
 * 
 * Features:
 * - Optional accent underline (default)
 * - Support for subtitle/eyebrow text
 * - Mathematical scaling across breakpoints
 * - Consistent margin/spacing
 */

import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  colorOverride?: string;
  withUnderline?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  alignment = 'left',
  withUnderline = true,
  className = '',
}: SectionHeaderProps) {
  const alignmentClass =
    alignment === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-8 sm:mb-12 lg:mb-16 ${alignmentClass} ${className}`}>
      {eyebrow && (
        <div className="inline-block mb-3">
          <span className="text-xs sm:text-sm uppercase tracking-widest font-medium text-[var(--text-tertiary)]">
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={`
          text-3xl sm:text-4xl lg:text-5xl
          font-bold
          text-[var(--text-primary)]
          mb-4
          leading-tight
          ${withUnderline ? 'relative inline-block' : ''}
        `}
      >
        {title}
        {withUnderline && (
          <span
            className="
              absolute
              bottom-0
              left-0
              h-1
              bg-[var(--accent-primary)]
              transition-all
              duration-300
            "
            style={{
              width: '60%',
              marginTop: '0.5rem',
            }}
            aria-hidden="true"
          />
        )}
      </h2>

      {subtitle && (
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mt-6">
          {subtitle}
        </p>
      )}
    </div>
  );
}
