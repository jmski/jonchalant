/**
 * EnsoCircle Component
 * 
 * Zen Buddhist meditation circle - a single brushstroke forming an incomplete circle.
 * Symbolizes meditation, enlightenment, and the beauty of imperfection (Wabi-Sabi).
 * 
 * Renders as an SVG with subtle stroke, positioned absolutely for background use.
 */

interface EnsoCircleProps {
  size?: number; // Diameter in pixels
  opacity?: number; // 0-1, default 0.05
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function EnsoCircle({
  size = 400,
  opacity = 0.05,
  strokeWidth = 2,
  className = "",
  style = {},
}: EnsoCircleProps) {
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
      {/* Hand-drawn Enso circle - starts at top, goes 3/4 way around */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={`${(size * Math.PI * 1.5)}, ${size * Math.PI * 2}`}
        strokeDashoffset={0}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default EnsoCircle;
