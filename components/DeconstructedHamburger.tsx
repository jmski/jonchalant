'use client';

import { useState, useRef } from 'react';

interface PartPosition {
  id: string;
  label: string;
  offset: number;
}

const PARTS: PartPosition[] = [
  { id: 'top', label: 'Top Bun', offset: -60 },
  { id: 'middle', label: 'Meat', offset: 0 },
  { id: 'bottom', label: 'Bottom Bun', offset: 60 },
];

export default function DeconstructedHamburger() {
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center py-16 md:py-24"
    >
      {/* Technical Drawing Title */}
      <div className="text-center mb-12">
        <p 
          className="text-xs md:text-sm uppercase tracking-widest mb-4"
          style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
        >
          Technical Specification: Menu Assembly
        </p>
        <h2 
          className="text-3xl md:text-5xl font-bold mb-2"
          style={{ fontFamily: '"Silkscreen", monospace' }}
        >
          Deconstructed Navigation
        </h2>
        <p 
          className="text-sm md:text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          Hover to assemble | Technical manual diagram view
        </p>
      </div>

      {/* Main SVG Container - Exploded View */}
      <div 
        className="relative w-full max-w-2xl aspect-square cursor-pointer transition-all duration-500"
        onMouseEnter={() => setIsAssembled(true)}
        onMouseLeave={() => setIsAssembled(false)}
      >
        <svg 
          viewBox="0 0 400 300" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.1))' }}
        >
          {/* Grid background for technical feel */}
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-color)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--border-color)" strokeWidth="1"/>
            </pattern>
          </defs>

          {/* Subtle grid background */}
          <rect width="400" height="300" fill="url(#grid)" opacity="0.3" />

          {/* Center assembly point indicator */}
          <circle cx="200" cy="150" r="3" fill="var(--accent-vibrant)" opacity="0.5" />
          <circle cx="200" cy="150" r="15" fill="none" stroke="var(--accent-vibrant)" strokeWidth="0.5" opacity="0.3" strokeDasharray="2,2" />

          {/* Top Bun */}
          <g 
            className="transition-all duration-500"
            style={{
              transform: isAssembled 
                ? 'translate(0px, 0px)' 
                : 'translate(0px, -60px)'
            }}
          >
            {/* Bar */}
            <rect 
              x="120" 
              y="80" 
              width="160" 
              height="20" 
              fill="var(--bg-secondary)"
              stroke="var(--text-primary)"
              strokeWidth="2"
              rx="2"
            />
            
            {/* Leader line to label */}
            <line 
              x1="280" 
              y1="90" 
              x2="320" 
              y2="90" 
              stroke="var(--border-color)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.6"
            />
            
            {/* Label box */}
            <rect 
              x="315" 
              y="75" 
              width="80" 
              height="30"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="1"
            />
            <text 
              x="355" 
              y="95"
              textAnchor="middle"
              fontSize="12"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
              fontWeight="bold"
            >
              Top Bun
            </text>
          </g>

          {/* Middle - Meat */}
          <g 
            className="transition-all duration-500"
            style={{
              transform: isAssembled 
                ? 'translate(0px, 0px)' 
                : 'translate(0px, 0px)'
            }}
          >
            {/* Bar */}
            <rect 
              x="120" 
              y="140" 
              width="160" 
              height="20" 
              fill="var(--accent-vibrant)"
              stroke="var(--text-primary)"
              strokeWidth="2"
              rx="2"
            />
            
            {/* Leader line to label */}
            <line 
              x1="280" 
              y1="150" 
              x2="320" 
              y2="150" 
              stroke="var(--border-color)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.6"
            />
            
            {/* Label box */}
            <rect 
              x="315" 
              y="135" 
              width="80" 
              height="30"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="1"
            />
            <text 
              x="355" 
              y="155"
              textAnchor="middle"
              fontSize="12"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
              fontWeight="bold"
            >
              Meat
            </text>
          </g>

          {/* Bottom Bun */}
          <g 
            className="transition-all duration-500"
            style={{
              transform: isAssembled 
                ? 'translate(0px, 0px)' 
                : 'translate(0px, 60px)'
            }}
          >
            {/* Bar */}
            <rect 
              x="120" 
              y="200" 
              width="160" 
              height="20" 
              fill="var(--bg-secondary)"
              stroke="var(--text-primary)"
              strokeWidth="2"
              rx="2"
            />
            
            {/* Leader line to label */}
            <line 
              x1="280" 
              y1="210" 
              x2="320" 
              y2="210" 
              stroke="var(--border-color)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.6"
            />
            
            {/* Label box */}
            <rect 
              x="315" 
              y="195" 
              width="80" 
              height="30"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="1"
            />
            <text 
              x="355" 
              y="215"
              textAnchor="middle"
              fontSize="12"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
              fontWeight="bold"
            >
              Bottom Bun
            </text>
          </g>

          {/* Dimension lines and assembly markers */}
          <g opacity="0.3" stroke="var(--text-tertiary)" strokeWidth="1">
            {/* Left dimension line */}
            <line x1="100" y1="80" x2="100" y2="220" strokeDasharray="2,2" />
            <line x1="95" y1="80" x2="105" y2="80" />
            <line x1="95" y1="220" x2="105" y2="220" />
            
            {/* Measurement text */}
            <text 
              x="85" 
              y="155"
              textAnchor="end"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fill="var(--text-tertiary)"
            >
              140px
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Hint */}
      <div className="mt-8 text-center">
        <p 
          className="text-xs md:text-sm uppercase tracking-wider animate-pulse"
          style={{ color: 'var(--accent-vibrant)' }}
        >
          {isAssembled ? '◆ ASSEMBLED ◆' : '➜ HOVER TO ASSEMBLE ➜'}
        </p>
      </div>

      {/* Technical specs footer */}
      <div 
        className="mt-12 max-w-lg text-center border-t pt-8"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <p 
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
        >
          Assembly Instructions
        </p>
        <ul 
          className="text-sm space-y-2"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
        >
          <li>1. Position parts in technical drawing view (exploded)</li>
          <li>2. Hover diagram to trigger assembly sequence</li>
          <li>3. Parts translate to final position</li>
          <li>4. Leader lines guide assembly process</li>
        </ul>
      </div>
    </div>
  );
}
