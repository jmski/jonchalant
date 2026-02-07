/**
 * Card Component
 * 
 * Reusable card component replacing 100+ lines of scattered card styling
 * Supports multiple variants for different use cases
 */

import { ReactNode, CSSProperties } from 'react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

type CardVariant = 'default' | 'enhanced' | 'cta' | 'content' | 'accent' | 'outlined';
type CardSize = 'sm' | 'md' | 'lg';
type BorderColor = 'primary' | 'vibrant' | 'neon' | 'magenta' | 'none';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  borderColor?: BorderColor;
  hoverable?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

/**
 * Get padding based on card size
 */
function getPadding(size: CardSize): string {
  const paddingMap = {
    sm: DESIGN_TOKENS.SPACING.MD,      // 1rem (16px)
    md: DESIGN_TOKENS.CARD.PADDING,    // 1.5rem (24px)
    lg: DESIGN_TOKENS.CARD.PADDING_LG, // 2rem (32px)
  };
  return paddingMap[size];
}

/**
 * Get border color from token
 */
function getBorderColor(color: BorderColor): string {
  if (color === 'none') return 'transparent';
  
  const colorMap = {
    primary: 'var(--text-primary)',
    vibrant: 'var(--accent-vibrant)',
    neon: 'var(--accent-neon)',
    magenta: 'var(--accent-magenta)',
  };
  return colorMap[color] || 'var(--text-primary)';
}

/**
 * Card Component
 * 
 * Usage Examples:
 * 
 * // Default card
 * <Card>Content</Card>
 * 
 * // Enhanced card with hover
 * <Card variant="enhanced" hoverable>Content</Card>
 * 
 * // Accent border card
 * <Card borderColor="vibrant" variant="accent">Content</Card>
 * 
 * // CTA card with gradient
 * <Card variant="cta">Content</Card>
 * 
 * // Content card with custom color
 * <Card variant="content" borderColor="neon" size="lg">Content</Card>
 */
export default function Card({
  children,
  variant = 'default',
  size = 'md',
  borderColor = 'primary',
  hoverable = false,
  className = '',
  style,
  onClick,
}: CardProps) {
  const padding = getPadding(size);
  const borderColorValue = getBorderColor(borderColor);
  
  // Base classes for all cards
  const baseClasses = 'relative transition-all duration-300';
  
  // Variant-specific classes
  const variantClasses = {
    default: `border-${DESIGN_TOKENS.BORDERS.WIDTH.SM} bg-white dark:bg-slate-900`,
    enhanced: `border-${DESIGN_TOKENS.BORDERS.WIDTH.SM} bg-white dark:bg-slate-900 shadow-${DESIGN_TOKENS.SHADOW.SM}`,
    cta: `border-none shadow-${DESIGN_TOKENS.SHADOW.LG}`,
    content: `border-${DESIGN_TOKENS.BORDERS.WIDTH.SM} bg-transparent`,
    accent: `border-${DESIGN_TOKENS.BORDERS.WIDTH.MD} bg-transparent`,
    outlined: `border-${DESIGN_TOKENS.BORDERS.WIDTH.SM} border-dashed bg-transparent`,
  };
  
  // Hover effects
  const hoverClasses = hoverable
    ? 'hover:shadow-lg hover:scale-105 hover:-translate-y-1 cursor-pointer'
    : '';

  // Combine all classes
  const allClasses = [baseClasses, variantClasses[variant], hoverClasses, className]
    .filter(Boolean)
    .join(' ');

  // Inline styles for dynamic values
  const inlineStyles: CSSProperties = {
    padding,
    borderColor: borderColorValue,
    borderWidth: `${DESIGN_TOKENS.BORDERS.WIDTH.SM}px`,
    borderStyle: variant === 'outlined' ? 'dashed' : 'solid',
    ...(variant === 'cta' && {
      background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-muted))',
    }),
    ...style,
  };

  return (
    <div
      className={allClasses}
      style={inlineStyles}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader Component
 * Use inside Card for consistent header styling
 */
export function CardHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-4 pb-4 border-b border-opacity-20 ${className}`}
      style={{ borderColor: 'currentColor' }}
    >
      {children}
    </div>
  );
}

/**
 * CardContent Component
 * Use inside Card for consistent content styling
 */
export function CardContent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`text-sm leading-relaxed ${className}`}>{children}</div>;
}

/**
 * CardFooter Component
 * Use inside Card for consistent footer styling
 */
export function CardFooter({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-opacity-20 ${className}`}
      style={{ borderColor: 'currentColor' }}
    >
      {children}
    </div>
  );
}
