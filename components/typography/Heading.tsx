import React, { ReactNode } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  children: ReactNode;
  accent?: boolean;
  className?: string;
  as?: HeadingLevel;
}

/**
 * Heading Component
 * ─────────────────────────────────────────────
 * Semantic heading component with responsive sizing and accent colors.
 * Replaces repetitive heading style combinations throughout the codebase.
 *
 * Heading Levels & Sizes:
 *   - h1: 6xl (sm:7xl lg:8xl) - Page titles
 *   - h2: 5xl (sm:6xl lg:7xl) - Section titles
 *   - h3: 4xl (sm:5xl lg:6xl) - Subsection titles
 *   - h4: 3xl (sm:4xl lg:5xl) - Large text
 *   - h5: 2xl (sm:3xl lg:4xl) - Medium text
 *   - h6: xl (sm:2xl lg:3xl)  - Small text
 *
 * Props:
 *   level: Heading level (h1-h6), defaults to h2
 *   accent: Apply accent color (vibrant) to heading
 *   className: Additional Tailwind classes
 *   as: Override semantic element (h1-h6)
 *
 * Features:
 *   - Mobile-first responsive sizing
 *   - Professional typography
 *   - Optional accent color
 *   - Semantic HTML
 *
 * Usage:
 *   <Heading level={1}>Page Title</Heading>
 *   <Heading level={2} accent>Section</Heading>
 */
export default function Heading({
  level = 2,
  children,
  accent = false,
  className = '',
  as,
}: HeadingProps) {
  const sizeMap: Record<HeadingLevel, string> = {
    1: 'text-6xl sm:text-7xl lg:text-8xl',
    2: 'text-5xl sm:text-6xl lg:text-7xl',
    3: 'text-4xl sm:text-5xl lg:text-6xl',
    4: 'text-3xl sm:text-4xl lg:text-5xl',
    5: 'text-2xl sm:text-3xl lg:text-4xl',
    6: 'text-xl sm:text-2xl lg:text-3xl',
  };

  const displayLevel = as || level;
  
  const baseClasses = `
    font-bold heading-display tracking-wider
    ${sizeMap[level]}
    ${accent ? 'text-vibrant' : 'text-primary'}
    ${className}
  `.trim();

  // Map heading level to HTML element
  const tagName = `h${displayLevel}` as const;
  const HeadingElement = tagName as any;

  return (
    <HeadingElement className={baseClasses}>
      {children}
    </HeadingElement>
  );
}
