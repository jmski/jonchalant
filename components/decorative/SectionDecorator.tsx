/**
 * SectionDecorator Component
 * 
 * Wrapper that adds context-appropriate decorative SVG elements to sections.
 * Intelligently positions Enso circles, Fluid shapes, and Blueprint grids.
 * 
 * Variants:
 * - 'ikigai' - Enso circle (purpose, meditation)
 * - 'dance' - Fluid shapes (movement, energy)
 * - 'kaizen' - Blueprint grid (structure, improvement)
 * - 'wellness' - Combined elements
 */

import { EnsoCircle } from './EnsoCircle';
import { FluidShape } from './FluidShape';
import { BlueprintGrid } from './BlueprintGrid';

interface SectionDecoratorProps {
  children: React.ReactNode;
  variant?: 'ikigai' | 'dance' | 'kaizen' | 'wellness' | 'none';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  opacity?: number;
  className?: string;
}

export function SectionDecorator({
  children,
  variant = 'none',
  position = 'top-left',
  opacity,
  className = '',
}: SectionDecoratorProps) {
  if (variant === 'none') {
    return <div className={className}>{children}</div>;
  }

  // Position styles
  const positionStyles = {
    'top-left': { top: '-40px', left: '-60px' },
    'top-right': { top: '-40px', right: '-60px' },
    'bottom-left': { bottom: '-40px', left: '-60px' },
    'bottom-right': { bottom: '-40px', right: '-60px' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  const baseOpacity = opacity ?? 0.04;

  return (
    <div className={`relative ${className}`}>
      {/* Decorative SVG elements - positioned absolutely */}
      {(variant === 'ikigai' || variant === 'wellness') && (
        <EnsoCircle
          size={320}
          opacity={baseOpacity}
          strokeWidth={1.5}
          style={{
            ...positionStyles[position],
            color: 'var(--accent-primary)',
          }}
        />
      )}

      {(variant === 'dance' || variant === 'wellness') && (
        <FluidShape
          size={280}
          opacity={baseOpacity}
          variant="blob"
          style={{
            ...positionStyles[position],
            color: 'var(--color-muted-moss)',
          }}
        />
      )}

      {(variant === 'kaizen' || variant === 'wellness') && (
        <BlueprintGrid
          size={400}
          spacing={30}
          opacity={baseOpacity * 0.5}
          variant="dots"
          style={{
            ...positionStyles[position],
            color: 'var(--text-primary)',
          }}
        />
      )}

      {/* Content rendered on top of decorations */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default SectionDecorator;
