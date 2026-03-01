/**
 * FluidShape Component
 * 
 * Organic, flowing blob shapes for Dance/Movement and dynamic sections.
 * Represents fluidity, organic growth, and kinetic energy.
 * 
 * Renders as an SVG blob with subtle animation.
 */

interface FluidShapeProps {
  size?: number;
  opacity?: number;
  variant?: 'blob' | 'wave' | 'organic';
  className?: string;
  style?: React.CSSProperties;
}

export function FluidShape({
  size = 300,
  opacity = 0.04,
  variant = 'blob',
  className = "",
  style = {},
}: FluidShapeProps) {
  // Different blob path variations
  const blobPaths = {
    blob: `
      M ${size * 0.5}, ${size * 0.1}
      Q ${size * 0.8}, ${size * 0.15} ${size * 0.85}, ${size * 0.4}
      Q ${size * 0.9}, ${size * 0.65} ${size * 0.7}, ${size * 0.85}
      Q ${size * 0.5}, ${size * 0.95} ${size * 0.3}, ${size * 0.9}
      Q ${size * 0.1}, ${size * 0.85} ${size * 0.05}, ${size * 0.6}
      Q ${size * 0.02}, ${size * 0.35} ${size * 0.2}, ${size * 0.15}
      Q ${size * 0.35}, ${size * 0.05} ${size * 0.5}, ${size * 0.1}
      Z
    `,
    wave: `
      M 0, ${size * 0.5}
      Q ${size * 0.25}, ${size * 0.3} ${size * 0.5}, ${size * 0.5}
      Q ${size * 0.75}, ${size * 0.7} ${size}, ${size * 0.5}
      L ${size}, ${size}
      L 0, ${size}
      Z
    `,
    organic: `
      M ${size * 0.4}, ${size * 0.1}
      C ${size * 0.6}, ${size * 0.05} ${size * 0.85}, ${size * 0.25} ${size * 0.9}, ${size * 0.5}
      C ${size * 0.95}, ${size * 0.75} ${size * 0.75}, ${size * 0.95} ${size * 0.4}, ${size * 0.95}
      C ${size * 0.15}, ${size * 0.95} ${size * 0.05}, ${size * 0.7} ${size * 0.1}, ${size * 0.4}
      C ${size * 0.15}, ${size * 0.15} ${size * 0.25}, ${size * 0.08} ${size * 0.4}, ${size * 0.1}
      Z
    `,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`absolute pointer-events-none ${className}`}
      style={{
        ...style,
        opacity,
      }}
      aria-hidden="true"
    >
      <path
        d={blobPaths[variant]}
        fill="currentColor"
        className="animate-pulse"
      />
    </svg>
  );
}

export default FluidShape;
