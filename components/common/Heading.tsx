/**
 * Heading Component
 * 
 * Reusable heading component replacing scattered h1/h2/h3 styling
 * Supports semantic heading levels with consistent typography
 */

import { ReactNode, CSSProperties } from 'react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingVariant = 'display' | 'section' | 'subsection' | 'label';
type TextColor = 'primary' | 'secondary' | 'vibrant' | 'neon' | 'magenta' | 'inherit';
type TextAlign = 'left' | 'center' | 'right';

interface HeadingProps {
  children: ReactNode;
  level?: HeadingLevel;
  variant?: HeadingVariant;
  color?: TextColor;
  align?: TextAlign;
  className?: string;
  style?: CSSProperties;
  underline?: boolean;
  underlineColor?: string;
  tracking?: 'tight' | 'normal' | 'wide' | 'widest';
}

/**
 * Get font size based on heading level and variant
 */
function getFontSize(level: HeadingLevel, variant: HeadingVariant): string {
  // Display headings (h1-h2 with display variant)
  if (variant === 'display') {
    const sizeMap = {
      h1: 'text-6xl sm:text-7xl lg:text-8xl',
      h2: 'text-5xl sm:text-6xl lg:text-7xl',
      h3: 'text-4xl sm:text-5xl lg:text-6xl',
      h4: 'text-3xl sm:text-4xl lg:text-5xl',
      h5: 'text-2xl sm:text-3xl',
      h6: 'text-xl sm:text-2xl',
    };
    return sizeMap[level];
  }

  // Section headings (h2-h3)
  if (variant === 'section') {
    const sizeMap = {
      h1: 'text-5xl sm:text-6xl',
      h2: 'text-4xl sm:text-5xl',
      h3: 'text-3xl sm:text-4xl',
      h4: 'text-2xl sm:text-3xl',
      h5: 'text-xl sm:text-2xl',
      h6: 'text-lg sm:text-xl',
    };
    return sizeMap[level];
  }

  // Subsection headings (h3-h6)
  if (variant === 'subsection') {
    const sizeMap = {
      h1: 'text-3xl sm:text-4xl',
      h2: 'text-2xl sm:text-3xl',
      h3: 'text-xl sm:text-2xl',
      h4: 'text-lg sm:text-xl',
      h5: 'text-base sm:text-lg',
      h6: 'text-sm sm:text-base',
    };
    return sizeMap[level];
  }

  // Label variant (small, uppercase)
  if (variant === 'label') {
    return 'text-xs sm:text-sm uppercase';
  }

  // Default
  return 'text-lg';
}

/**
 * Get font weight based on variant
 */
function getFontWeight(variant: HeadingVariant): string {
  const weightMap = {
    display: 'font-black',         // 900
    section: 'font-bold',          // 700
    subsection: 'font-semibold',   // 600
    label: 'font-black',           // 900
  };
  return weightMap[variant];
}

/**
 * Get text color from token
 */
function getTextColor(color: TextColor): string {
  if (color === 'inherit') return 'inherit';
  
  const colorMap = {
    primary: 'text-primary dark:text-white',
    secondary: 'text-secondary dark:text-gray-300',
    vibrant: 'text-accent-vibrant',
    neon: 'text-neon',
    magenta: 'text-magenta',
  };
  return colorMap[color] || 'text-primary dark:text-white';
}

/**
 * Get letter spacing from tracking prop
 */
function getTracking(tracking?: 'tight' | 'normal' | 'wide' | 'widest'): string {
  const trackingMap = {
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    widest: 'tracking-[0.2em]',
  };
  return trackingMap[tracking || 'normal'];
}

/**
 * Heading Component
 * 
 * Usage Examples:
 * 
 * // Display heading (h1)
 * <Heading level="h1" variant="display">
 *   Main Title
 * </Heading>
 * 
 * // Section heading with color
 * <Heading level="h2" variant="section" color="vibrant">
 *   Section Title
 * </Heading>
 * 
 * // Subsection with underline
 * <Heading level="h3" variant="subsection" underline>
 *   Subsection
 * </Heading>
 * 
 * // Label with wide tracking
 * <Heading level="h4" variant="label" tracking="widest">
 *   Category Label
 * </Heading>
 * 
 * // Centered with custom color
 * <Heading level="h2" align="center" color="neon">
 *   Centered Title
 * </Heading>
 */
export default function Heading({
  children,
  level = 'h2',
  variant = 'section',
  color = 'primary',
  align = 'left',
  className = '',
  style,
  underline = false,
  underlineColor = 'var(--accent-vibrant)',
  tracking,
}: HeadingProps) {
  const fontSize = getFontSize(level, variant);
  const fontWeight = getFontWeight(variant);
  const textColor = getTextColor(color);
  const trackingClass = getTracking(tracking);
  
  // Base classes for all headings
  const baseClasses = `${fontSize} ${fontWeight} leading-tight transition-colors duration-300`;
  
  // Alignment
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];
  
  // Underline styling (if enabled)
  const underlineClass = underline ? 'pb-3 border-b-2' : '';
  
  // Combine all classes
  const allClasses = [baseClasses, textColor, alignClass, trackingClass, underlineClass, className]
    .filter(Boolean)
    .join(' ');

  // Inline styles for dynamic values
  const inlineStyles: CSSProperties = {
    ...(underline && { borderBottomColor: underlineColor }),
    ...style,
  };

  // Create the heading element dynamically
  const HeaderElement = level as unknown as React.ElementType;

  return (
    <HeaderElement className={allClasses} style={inlineStyles}>
      {children}
    </HeaderElement>
  );
}

/**
 * HeadingWithSubtext Component
 * Combines heading with subtext for quick access
 */
export function HeadingWithSubtext({
  title,
  subtitle,
  level = 'h2',
  variant = 'section',
  color = 'primary',
  subtitleColor = 'secondary',
  align = 'left',
}: {
  title: ReactNode;
  subtitle: ReactNode;
  level?: HeadingLevel;
  variant?: HeadingVariant;
  color?: TextColor;
  subtitleColor?: TextColor;
  align?: TextAlign;
}) {
  return (
    <div className={`text-${align}`}>
      <Heading level={level} variant={variant} color={color} align={align}>
        {title}
      </Heading>
      <p
        className={`${getTextColor(subtitleColor)} text-base leading-relaxed mt-2`}
      >
        {subtitle}
      </p>
    </div>
  );
}
