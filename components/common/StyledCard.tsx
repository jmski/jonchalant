'use client';

import React, { ReactNode } from 'react';

interface StyledCardProps {
  children: ReactNode;
  variant?: 'default' | 'vibrant' | 'neon' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  accent?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * StyledCard Component
 * ─────────────────────────────────────────────────────────────
 * Reusable card component with multiple variants and sizes.
 * Replaces scattered border/padding styles throughout the codebase.
 *
 * Variants:
 *   - default: Primary colors (border-primary, bg-secondary)
 *   - vibrant: Orange accent (border-vibrant, vibrant-tinted bg)
 *   - neon: Cyan accent (border-neon, neon-tinted bg)
 *   - magenta: Magenta accent (border-magenta, magenta-tinted bg)
 *
 * Sizes:
 *   - sm: Compact card (p-3, gap-2)
 *   - md: Standard card (p-4, gap-3) - DEFAULT
 *   - lg: Spacious card (p-6, gap-4)
 *
 * Features:
 *   - Smooth hover scale (1.02) and shadow with hoverable={true}
 *   - Optional accent prop for colored borders
 *   - Click handler support
 *   - Custom className extension
 *   - Accessibility support (role, onClick semantics)
 *
 * Usage Examples:
 *   <StyledCard variant="vibrant">
 *     <h3>Title</h3>
 *     <p>Description</p>
 *   </StyledCard>
 *
 *   <StyledCard variant="neon" size="lg" hoverable>
 *     Large card with hover effects
 *   </StyledCard>
 *
 *   <StyledCard onClick={handleClick} className="cursor-pointer">
 *     Clickable card
 *   </StyledCard>
 */
export default function StyledCard({
  children,
  variant = 'default',
  size = 'md',
  hoverable = false,
  accent = false,
  onClick,
  className = '',
}: StyledCardProps) {
  // Variant styles
  const variantStyles: Record<string, string> = {
    default: 'border-primary bg-secondary',
    vibrant: 'border-vibrant bg-vibrant/5',
    neon: 'border-neon bg-neon/5',
    magenta: 'border-magenta bg-magenta/5',
  };

  // Size styles
  const sizeStyles: Record<string, string> = {
    sm: 'p-3 gap-2',
    md: 'p-4 gap-3',
    lg: 'p-6 gap-4',
  };

  // Base styles
  const baseClasses = `
    border-2 rounded transition-all duration-300
    flex flex-col
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${hoverable ? 'hover:shadow-lg hover:scale-105' : ''}
    ${accent ? 'border-accent-vibrant' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div
      className={baseClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
}
