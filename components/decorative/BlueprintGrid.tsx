/**
 * BlueprintGrid Component
 * 
 * Subtle architect blueprint style grid/dot pattern.
 * Represents structure, kaizen, continuous improvement, and order.
 * 
 * Renders as an SVG grid of dots or lines for background use.
 */

interface BlueprintGridProps {
  size?: number;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
  variant?: 'dots' | 'lines' | 'crosshatch';
  className?: string;
  style?: React.CSSProperties;
}

export function BlueprintGrid({
  size = 400,
  dotSize = 1.5,
  spacing = 20,
  opacity = 0.02,
  variant = 'dots',
  className = "",
  style = {},
}: BlueprintGridProps) {
  const dots = [];
  const lines = [];

  // Generate grid dots or lines
  for (let x = 0; x < size; x += spacing) {
    for (let y = 0; y < size; y += spacing) {
      if (variant === 'dots') {
        dots.push(
          <circle key={`dot-${x}-${y}`} cx={x} cy={y} r={dotSize} fill="currentColor" />
        );
      } else if (variant === 'lines') {
        if (x === 0) {
          lines.push(
            <line
              key={`vline-${y}`}
              x1={x}
              y1={y}
              x2={size}
              y2={y}
              stroke="currentColor"
              strokeWidth={0.5}
            />
          );
        }
        if (y === 0) {
          lines.push(
            <line
              key={`hline-${x}`}
              x1={x}
              y1={0}
              x2={x}
              y2={size}
              stroke="currentColor"
              strokeWidth={0.5}
            />
          );
        }
      } else if (variant === 'crosshatch') {
        if (x % (spacing * 2) === 0 && y % (spacing * 2) === 0) {
          dots.push(
            <circle key={`cross-${x}-${y}`} cx={x} cy={y} r={dotSize * 0.5} fill="currentColor" />
          );
        }
      }
    }
  }

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
      {variant === 'dots' || variant === 'crosshatch' ? dots : lines}
    </svg>
  );
}

export default BlueprintGrid;
