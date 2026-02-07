/**
 * Decorative Pattern Components
 * 
 * Collection of reusable visual pattern decorators for maximalist design:
 * - Corner brackets (SVG frames)
 * - Pattern backgrounds (grid, diagonal, dots, checkerboard)
 * - Decorative dividers with accent dots
 * - Layered pattern overlays
 * 
 * Each component is themeable and responsive.
 */

import React from 'react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

/**
 * CornerBrackets - SVG frame with corner decorations
 * Adds minimalist border treatment to containers
 */
interface CornerBracketsProps {
  color?: 'vibrant' | 'neon' | 'magenta' | 'inherit';
  size?: 'sm' | 'md' | 'lg';
  position?: 'all' | 'top' | 'bottom' | 'top-left' | 'top-right';
  thickness?: number;
  opacity?: number;
  corners?: boolean; // Show corner brackets
}

export function CornerBrackets({
  color = 'inherit',
  size = 'md',
  position = 'all',
  thickness = 2,
  opacity = 1,
  corners = true,
}: CornerBracketsProps) {
  const sizeMap = { sm: 30, md: 50, lg: 80 };
  const colorMap = {
    vibrant: 'var(--accent-vibrant)',
    neon: 'var(--accent-neon)',
    magenta: 'var(--accent-magenta)',
    inherit: 'currentColor',
  };

  const bracketSize = sizeMap[size];
  const strokeColor = colorMap[color];
  const showTop = position === 'all' || position === 'top' || position === 'top-left' || position === 'top-right';
  const showBottom = position === 'all' || position === 'bottom';
  const showLeft = position === 'all' || position === 'top-left';
  const showRight = position === 'all' || position === 'top-right';

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 100% 100%`}
        preserveAspectRatio="none"
        style={{ stroke: strokeColor, strokeWidth: thickness, fill: 'none' }}
      >
        {/* Top-left bracket */}
        {corners && showTop && showLeft && (
          <g>
            <line x1="0%" y1={`${bracketSize * 0.5}%`} x2="0%" y2="0%" />
            <line x1="0%" y1="0%" x2={`${bracketSize * 0.5}%`} y2="0%" />
          </g>
        )}

        {/* Top-right bracket */}
        {corners && showTop && showRight && (
          <g>
            <line x1="100%" y1="0%" x2={`${100 - bracketSize * 0.5}%`} y2="0%" />
            <line x1="100%" y1="0%" x2="100%" y2={`${bracketSize * 0.5}%`} />
          </g>
        )}

        {/* Bottom-left bracket */}
        {corners && showBottom && showLeft && (
          <g>
            <line x1="0%" y1={`${100 - bracketSize * 0.5}%`} x2="0%" y2="100%" />
            <line x1="0%" y1="100%" x2={`${bracketSize * 0.5}%`} y2="100%" />
          </g>
        )}

        {/* Bottom-right bracket */}
        {corners && showBottom && showRight && (
          <g>
            <line x1="100%" y1={`${100 - bracketSize * 0.5}%`} x2="100%" y2="100%" />
            <line x1={`${100 - bracketSize * 0.5}%`} y1="100%" x2="100%" y2="100%" />
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * DecorativeDivider - Horizontal divider with accent dots
 * Separates content sections with visual flair
 */
interface DecorativeDividerProps {
  color?: 'vibrant' | 'neon' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
  dotCount?: number;
  variant?: 'dots' | 'line-dots' | 'gradient';
  className?: string;
}

export function DecorativeDivider({
  color = 'neon',
  size = 'md',
  dotCount = 5,
  variant = 'line-dots',
  className = '',
}: DecorativeDividerProps) {
  const colorMap = {
    vibrant: 'var(--accent-vibrant)',
    neon: 'var(--accent-neon)',
    magenta: 'var(--accent-magenta)',
  };
  const sizeMap = { sm: 4, md: 6, lg: 8 };
  const dotRadius = sizeMap[size];
  const lineColor = colorMap[color];

  const dots = Array.from({ length: dotCount });

  return (
    <div className={`relative my-12 flex items-center justify-center ${className}`}>
      {variant !== 'dots' && (
        <div
          className="absolute inset-0 h-0.5 top-1/2 -translate-y-1/2"
          style={{ backgroundColor: lineColor, opacity: 0.2 }}
        />
      )}

      <div className="relative flex items-center gap-2 z-10">
        {dots.map((_, idx) => (
          <div
            key={idx}
            className="transition-all duration-300 hover:scale-150"
            style={{
              width: dotRadius * 2,
              height: dotRadius * 2,
              backgroundColor: lineColor,
              borderRadius: '50%',
              cursor: 'default',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * PatternBackground - CSS-based pattern layer
 * Adds layered visual texture to containers
 */
interface PatternBackgroundProps {
  pattern: 'grid' | 'diagonal' | 'dots' | 'checkerboard' | 'waves' | 'none';
  color?: 'vibrant' | 'neon' | 'magenta' | 'muted';
  opacity?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PatternBackground({
  pattern = 'grid',
  color = 'muted',
  opacity = 0.05,
  size = 'md',
  className = '',
}: PatternBackgroundProps) {
  const colorMap = {
    vibrant: 'var(--accent-vibrant)',
    neon: 'var(--accent-neon)',
    magenta: 'var(--accent-magenta)',
    muted: 'var(--text-primary)',
  };

  const sizeMap = {
    sm: '10px',
    md: '20px',
    lg: '40px',
  };

  const patternColor = colorMap[color];
  const patternSize = sizeMap[size];

  const getPatternStyle = (): React.CSSProperties => {
    switch (pattern) {
      case 'grid':
        return {
          backgroundImage: `
            linear-gradient(${patternColor} 1px, transparent 1px),
            linear-gradient(90deg, ${patternColor} 1px, transparent 1px)
          `,
          backgroundSize: `${patternSize} ${patternSize}`,
          opacity,
        };

      case 'diagonal':
        return {
          backgroundImage: `
            linear-gradient(45deg, ${patternColor} 25%, transparent 25%),
            linear-gradient(-45deg, ${patternColor} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${patternColor} 75%),
            linear-gradient(-45deg, transparent 75%, ${patternColor} 75%)
          `,
          backgroundSize: `${patternSize} ${patternSize}`,
          backgroundPosition: `0 0, 0 ${patternSize}, ${patternSize} -${patternSize}, -${patternSize} 0`,
          opacity,
        };

      case 'dots':
        return {
          backgroundImage: `radial-gradient(circle, ${patternColor} 20%, transparent 20%)`,
          backgroundSize: `${patternSize} ${patternSize}`,
          backgroundPosition: `0 0`,
          opacity,
        };

      case 'checkerboard':
        return {
          backgroundImage: `
            linear-gradient(45deg, ${patternColor} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${patternColor} 75%)
          `,
          backgroundSize: `${patternSize} ${patternSize}`,
          backgroundPosition: `0 0, ${patternSize} ${patternSize}`,
          opacity,
        };

      case 'waves':
        return {
          backgroundImage: `
            linear-gradient(0deg, ${patternColor} 25%, transparent 25%),
            linear-gradient(90deg, ${patternColor} 25%, transparent 25%)
          `,
          backgroundSize: `${patternSize} ${patternSize}`,
          opacity,
        };

      default:
        return { opacity: 0 };
    }
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={getPatternStyle()}
    />
  );
}

/**
 * GlowingCTA - CTA button with glow effect
 * Enhances call-to-action visibility and interactivity
 */
interface GlowingCTAProps {
  children: React.ReactNode;
  color?: 'vibrant' | 'neon' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  href?: string;
}

export function GlowingCTA({
  children,
  color = 'neon',
  size = 'md',
  onClick,
  className = '',
  href,
}: GlowingCTAProps) {
  const colorMap = {
    vibrant: 'var(--accent-vibrant)',
    neon: 'var(--accent-neon)',
    magenta: 'var(--accent-magenta)',
  };

  const sizeMap = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const glowColor = colorMap[color];
  const sizeClass = sizeMap[size];

  const ButtonComponent = href ? 'a' : 'button';

  return (
    <ButtonComponent
      href={href}
      onClick={onClick}
      className={`
        relative inline-block font-semibold rounded-lg
        transition-all duration-300 hover:scale-105
        text-white
        ${sizeClass}
        ${className}
      `}
      style={{
        backgroundColor: glowColor,
        boxShadow: `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`,
      }}
      onMouseEnter={(e) => {
        if (e.currentTarget) {
          e.currentTarget.style.boxShadow = `0 0 30px ${glowColor}60, 0 0 60px ${glowColor}40`;
        }
      }}
      onMouseLeave={(e) => {
        if (e.currentTarget) {
          e.currentTarget.style.boxShadow = `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`;
        }
      }}
    >
      {children}
    </ButtonComponent>
  );
}

/**
 * LayeredPatternOverlay - Multi-layered pattern effects
 * Creates depth through overlapping pattern layers
 */
interface LayeredPatternOverlayProps {
  pattern1?: 'grid' | 'diagonal' | 'dots' | 'checkerboard' | 'waves';
  pattern2?: 'grid' | 'diagonal' | 'dots' | 'checkerboard' | 'waves';
  color1?: 'vibrant' | 'neon' | 'magenta';
  color2?: 'vibrant' | 'neon' | 'magenta';
  opacity1?: number;
  opacity2?: number;
  rotation?: number;
  className?: string;
}

export function LayeredPatternOverlay({
  pattern1 = 'grid',
  pattern2 = 'diagonal',
  color1 = 'neon',
  color2 = 'magenta',
  opacity1 = 0.03,
  opacity2 = 0.02,
  rotation = 45,
  className = '',
}: LayeredPatternOverlayProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <PatternBackground
        pattern={pattern1}
        color={color1}
        opacity={opacity1}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <PatternBackground
          pattern={pattern2}
          color={color2}
          opacity={opacity2}
        />
      </div>
    </div>
  );
}

/** 
 * AccentLine - Minimalist decorative line (left/top border)
 */
interface AccentLineProps {
  color?: 'vibrant' | 'neon' | 'magenta';
  position?: 'left' | 'top' | 'right' | 'bottom';
  thickness?: number;
  length?: string | number; // allows "100%" or px values
  className?: string;
}

export function AccentLine({
  color = 'neon',
  position = 'left',
  thickness = 3,
  length = '100%',
  className = '',
}: AccentLineProps) {
  const colorMap = {
    vibrant: 'var(--accent-vibrant)',
    neon: 'var(--accent-neon)',
    magenta: 'var(--accent-magenta)',
  };

  const isVertical = position === 'left' || position === 'right';

  return (
    <div
      className={`absolute ${className}`}
      style={{
        backgroundColor: colorMap[color],
        ...(isVertical
          ? {
              width: thickness,
              height: length,
              [position]: 0,
              top: 0,
            }
          : {
              height: thickness,
              width: length,
              [position]: 0,
              left: 0,
            }),
      }}
    />
  );
}
