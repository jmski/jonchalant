import React, { CSSProperties, ReactNode } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  children: ReactNode;
  accent?: boolean;
  className?: string;
  as?: HeadingLevel;
  style?: CSSProperties;
}

/**
 * Heading Component
 * ─────────────────────────────────────────────
 * Semantic heading component with responsive sizing and accent colors.
 * Replaces repetitive heading style combinations throughout the codebase.
 *
 * Heading Levels & CSS Classes:
 *   - h1: text-display-1xl - Page titles
 *   - h2: text-display-lg - Section titles
 *   - h3: text-heading-1 - Subsection titles
 *   - h4: text-heading-2 - Large text
 *   - h5: text-heading-3 - Medium text
 *   - h6: text-heading-4 - Small text
 *
 * Props:
 *   level: Heading level (h1-h6), defaults to h2
 *   accent: Apply accent color (sage-whisper) to heading
 *   className: Additional CSS classes
 *   as: Override semantic element (h1-h6)
 *   style: Inline styles (minimal usage)
 *
 * Features:
 *   - Mobile-first responsive sizing via CSS clamp()
 *   - Professional typography via CSS variables
 *   - Optional accent color
 *   - Semantic HTML
 *
 * Usage:
 *   <Heading level={1}>Page Title</Heading>
 *   <Heading level={2} accent>Section with Accent</Heading>
 */
export default function Heading({
  level = 2,
  children,
  accent = false,
  className = '',
  as,
  style,
}: HeadingProps) {
  // CSS class mapping for responsive sizing
  const sizeMap: Record<HeadingLevel, string> = {
    1: 'text-display-1xl',
    2: 'text-display-lg',
    3: 'text-heading-1',
    4: 'text-heading-2',
    5: 'text-heading-3',
    6: 'text-heading-4',
  };

  const displayLevel = as || level;
  const accentStyle = accent ? { color: 'var(--sage-whisper)' } : undefined;

  const headingClass = `${sizeMap[level]} ${className}`
  const headingStyle = { ...accentStyle, ...style }

  switch (displayLevel) {
    case 1:
      return <h1 className={headingClass} style={headingStyle}>{children}</h1>
    case 2:
      return <h2 className={headingClass} style={headingStyle}>{children}</h2>
    case 3:
      return <h3 className={headingClass} style={headingStyle}>{children}</h3>
    case 4:
      return <h4 className={headingClass} style={headingStyle}>{children}</h4>
    case 5:
      return <h5 className={headingClass} style={headingStyle}>{children}</h5>
    case 6:
      return <h6 className={headingClass} style={headingStyle}>{children}</h6>
    default:
      return <h2 className={headingClass} style={headingStyle}>{children}</h2>
  }
}
