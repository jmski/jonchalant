/**
 * ZenCard Component
 * 
 * Unified card styling for the Kinetic Leader brand.
 * Zen Sleek design philosophy:
 * - 1px hairline border (#E0E0D6 - warm, subtle)
 * - No shadow OR extraordinarily subtle 2px blur
 * - Consistent internal padding
 * - Clean, minimal presentation
 * 
 * Variants:
 * - default: Clean, minimal (hairline border, no shadow)
 * - enhanced: Slight hover elevation with subtle glow
 * - accent: Highlight with accent color border
 */

import React from 'react';

type CardVariant = 'default' | 'enhanced' | 'accent';

interface ZenCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: React.ReactNode;
  hoverable?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: `
    border border-[#e8e3db]
    bg-white
    hover:border-[var(--accent-primary)]
    hover:bg-[#fafaf8]
  `,
  enhanced: `
    border border-[#e8e3db]
    bg-white
    shadow-[0_1px_2px_rgba(0,0,0,0.04)]
    hover:border-[var(--accent-primary)]
    hover:shadow-[0_4px_12px_rgba(107,142,99,0.08)]
    hover:bg-[#fafaf8]
  `,
  accent: `
    border border-[var(--accent-primary)]
    bg-white
    shadow-[0_1px_2px_rgba(0,0,0,0.04)]
    hover:shadow-[0_4px_12px_rgba(107,142,99,0.1)]
    hover:bg-[#fafaf8]
  `,
};

export default function ZenCard({
  variant = 'default',
  children,
  hoverable = false,
  className = '',
  ...props
}: ZenCardProps) {
  const baseClasses = `
    relative
    rounded-none
    p-6
    sm:p-8
    lg:p-10
    transition-all
    duration-300
    ease-smooth
    overflow-visible
    box-border
  `;

  const variantClass = variantClasses[variant];

  const shouldAddHoverAnimation = hoverable && variant !== 'default';

  const combinedClassName = `
    ${baseClasses}
    ${variantClass}
    ${shouldAddHoverAnimation ? 'cursor-pointer hover:-translate-y-1' : ''}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
