/**
 * IkigaiCircles Component
 * 
 * Decorative SVG element representing the Ikigai philosophy:
 * Purpose, passion, profession, and people intersecting.
 * 
 * Used as subtle background decorative elements (5-10% opacity)
 * to add visual interest without overwhelming the layout.
 */

import React from 'react';

interface IkigaiCirclesProps {
  size?: number;
  opacity?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function IkigaiCircles({
  size = 400,
  opacity = 0.08,
  color = 'var(--accent-primary)',
  className = '',
  style,
}: IkigaiCirclesProps) {
  const radius = size / 2;
  const circleRadius = size / 3;
  const spacing = size / 6;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`absolute pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {/* Four overlapping circles representing Ikigai */}
      {/* Top-left circle */}
      <circle
        cx={radius - spacing}
        cy={radius - spacing * 0.5}
        r={circleRadius}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Top-right circle */}
      <circle
        cx={radius + spacing}
        cy={radius - spacing * 0.5}
        r={circleRadius}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Bottom-left circle */}
      <circle
        cx={radius - spacing * 0.5}
        cy={radius + spacing * 0.5}
        r={circleRadius}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Bottom-right circle */}
      <circle
        cx={radius + spacing * 0.5}
        cy={radius + spacing * 0.5}
        r={circleRadius}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Center circle (intersection of all four) */}
      <circle
        cx={radius}
        cy={radius}
        r={circleRadius * 0.4}
        fill={color}
        fillOpacity="0.3"
      />
    </svg>
  );
}
