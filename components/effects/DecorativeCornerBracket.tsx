'use client';

import React from 'react';

interface DecorativeCornerBracketProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  color?: 'vibrant' | 'secondary' | 'tertiary' | 'primary';
}

/**
 * DecorativeCornerBracket Component
 * ─────────────────────────────────────────────────────────────
 * Adds decorative corner brackets to cards and sections.
 * Enhances maximalist, design-forward aesthetic.
 *
 * Positions:
 *   - top-left: Corner bracket in top-left
 *   - top-right: Corner bracket in top-right
 *   - bottom-left: Corner bracket in bottom-left
 *   - bottom-right: Corner bracket in bottom-right
 *
 * Sizes:
 *   - sm: 24px × 24px (small accents)
 *   - md: 32px × 32px (standard) - DEFAULT
 *   - lg: 48px × 48px (large emphasis)
 *
 * Colors:
 *   - vibrant: Orange (#ff5f1f)
 *   - neon: Cyan (#00ffff)
 *   - magenta: Magenta (#ff00ff)
 *   - primary: Theme primary color
 *
 * Features:
 *   - CSS borders only (no images)
 *   - Absolutely positioned
 *   - Non-interactive (pointer-events: none)
 *   - Responsive styling
 *   - Customizable color and size
 *
 * Usage Examples:
 *   // Top-left corner bracket
 *   <div className="relative">
 *     Content with corner bracket
 *   </div>
 *
 *   // Dual brackets (frame effect)
 *   <StyledCard>
 *     <DecorativeCornerBracket position="top-left" size="md" />
 *     <DecorativeCornerBracket position="bottom-right" size="md" />
 *     Framed content
 *   </StyledCard>
 *
 *   // Large accent on hero section
 *   <section className="relative overflow-hidden">
 *     <DecorativeCornerBracket position="top-left" size="lg" color="neon" />
 *     <DecorativeCornerBracket position="bottom-right" size="lg" color="neon" />
 *     Hero content
 *   </section>
 */
export default function DecorativeCornerBracket({
  position = 'top-left',
  size = 'md',
  color = 'vibrant',
}: DecorativeCornerBracketProps) {
  // Size mapping
  const sizeMap: Record<string, { width: string; height: string; borderWidth: string }> = {
    sm: {
      width: 'w-6',      // 24px
      height: 'h-6',     // 24px
      borderWidth: 'border', // 1px
    },
    md: {
      width: 'w-8',      // 32px
      height: 'h-8',     // 32px
      borderWidth: 'border-2',
    },
    lg: {
      width: 'w-12',     // 48px
      height: 'h-12',    // 48px
      borderWidth: 'border-2',
    },
  };

  // Position mapping (corners and their borders)
  const positionMap: Record<
    string,
    {
      positioning: string;
      borderClasses: string;
    }
  > = {
    'top-left': {
      positioning: 'top-0 left-0',
      borderClasses: 'border-t-2 border-l-2',
    },
    'top-right': {
      positioning: 'top-0 right-0',
      borderClasses: 'border-t-2 border-r-2',
    },
    'bottom-left': {
      positioning: 'bottom-0 left-0',
      borderClasses: 'border-b-2 border-l-2',
    },
    'bottom-right': {
      positioning: 'bottom-0 right-0',
      borderClasses: 'border-b-2 border-r-2',
    },
  };

  // Color mapping
  const colorMap: Record<string, string> = {
    vibrant: 'border-vibrant',
    neon: 'border-neon',
    magenta: 'border-magenta',
    primary: 'border-primary',
  };

  const sizeConfig = sizeMap[size] || sizeMap.md;
  const positionConfig = positionMap[position] || positionMap['top-left'];

  const classes = `
    absolute
    ${positionConfig.positioning}
    ${sizeConfig.width}
    ${sizeConfig.height}
    ${positionConfig.borderClasses}
    ${colorMap[color]}
    pointer-events-none
    transition-opacity duration-300
  `;

  return <div className={classes} />;
}
