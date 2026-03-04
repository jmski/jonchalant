'use client';

import React from 'react';

interface IkigaiSymbolProps {
  size?: number;
  opacity?: number;
  style?: React.CSSProperties;
}

export default function IkigaiSymbol({
  size = 720,
  opacity = 1,
  style = {}
}: IkigaiSymbolProps) {
  const circleScale = 1.8;
  const viewBoxScale = 2.4;
  const radiusMinor = size * 0.36 * circleScale;
  const padding = size * 0.15 * circleScale;
  const viewBoxSize = size * viewBoxScale;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const offset = size * 0.15 * circleScale; // Much closer for significant intersection

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className="ikigai-symbol"
      style={{ opacity, ...style }}
    >
      {/* Four overlapping circles in cross formation with significant overlap */}
      
      {/* Passion - Top (Blue-violet) */}
      <circle
        cx={centerX}
        cy={centerY - offset - padding}
        r={radiusMinor}
        fill="transparent"
        stroke="var(--accent-primary)"
        strokeWidth="1.2"
      />
      
      {/* Purpose - Right (Cyan) */}
      <circle
        cx={centerX + offset + padding}
        cy={centerY}
        r={radiusMinor}
        fill="transparent"
        stroke="var(--accent-secondary)"
        strokeWidth="1.2"
      />
      
      {/* Profession - Bottom (Orange) */}
      <circle
        cx={centerX}
        cy={centerY + offset + padding}
        r={radiusMinor}
        fill="transparent"
        stroke="var(--accent-primary)"
        strokeWidth="1.2"
      />
      
      {/* People - Left (Teal) */}
      <circle
        cx={centerX - offset - padding}
        cy={centerY}
        r={radiusMinor}
        fill="transparent"
        stroke="var(--accent-secondary)"
        strokeWidth="1.2"
      />

      {/* Center dot for Ikigai */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.03 * circleScale}
        fill="var(--accent-primary)"
        opacity="0.5"
      />

      {/* Section Labels - Small, positioned in outer part of circles */}
      
      {/* PASSION - Top */}
      <text
        x={centerX}
        y={centerY - offset * 1.85 - padding}
        textAnchor="middle"
        fontSize={size * 0.045 * circleScale}
        fontWeight="600"
        fill="var(--text-primary)"
      >
        Passion
      </text>

      {/* PURPOSE - Right */}
      <text
        x={centerX + offset * 1.85 + padding}
        y={centerY + size * 0.015 * circleScale}
        textAnchor="middle"
        fontSize={size * 0.045 * circleScale}
        fontWeight="600"
        fill="var(--text-primary)"
      >
        Purpose
      </text>

      {/* PROFESSION - Bottom */}
      <text
        x={centerX}
        y={centerY + offset * 1.95 + padding}
        textAnchor="middle"
        fontSize={size * 0.045 * circleScale}
        fontWeight="600"
        fill="var(--text-primary)"
      >
        Profession
      </text>

      {/* PEOPLE - Left */}
      <text
        x={centerX - offset * 1.85 - padding}
        y={centerY + size * 0.015 * circleScale}
        textAnchor="middle"
        fontSize={size * 0.045 * circleScale}
        fontWeight="600"
        fill="var(--text-primary)"
      >
        People
      </text>

      {/* Center label */}
      <text
        x={centerX}
        y={centerY + size * 0.04 * circleScale}
        textAnchor="middle"
        fontSize={size * 0.065 * circleScale}
        fontWeight="700"
        fill="var(--accent-primary)"
        opacity="0.7"
        letterSpacing="1.5"
      >
        IKIGAI
      </text>
    </svg>
  );
}
