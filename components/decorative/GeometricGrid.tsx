/**
 * GeometricGrid Component
 * 
 * Decorative SVG element representing Kaizen precision and architectural order.
 * Displays a subtle 20px dot grid or light line grid in the background.
 * 
 * Used at 3-5% opacity for extremely subtle visual texture
 * that reinforces the professional, methodical nature of the Kinetic Leader brand.
 */

import React from 'react';

interface GeometricGridProps {
  width?: number;
  height?: number;
  opacity?: number;
  color?: string;
  gridSize?: number;
  variant?: 'dots' | 'lines';
  className?: string;
  style?: React.CSSProperties;
}

export default function GeometricGrid({
  width = 500,
  height = 500,
  opacity = 0.04,
  color = 'var(--accent-primary)',
  gridSize = 20,
  variant = 'dots',
  className = '',
  style,
}: GeometricGridProps) {
  if (variant === 'dots') {
    const dots = [];
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        dots.push(
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="1"
            fill={color}
          />
        );
      }
    }

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={`absolute pointer-events-none ${className}`}
        style={{ opacity, ...style }}
        aria-hidden="true"
      >
        {dots}
      </svg>
    );
  }

  // Lines variant
  const lines = [];
  for (let i = 0; i <= width; i += gridSize) {
    lines.push(
      <line
        key={`v-${i}`}
        x1={i}
        y1="0"
        x2={i}
        y2={height}
        stroke={color}
        strokeWidth="0.5"
      />
    );
  }
  for (let i = 0; i <= height; i += gridSize) {
    lines.push(
      <line
        key={`h-${i}`}
        x1="0"
        y1={i}
        x2={width}
        y2={i}
        stroke={color}
        strokeWidth="0.5"
      />
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`absolute pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {lines}
    </svg>
  );
}
