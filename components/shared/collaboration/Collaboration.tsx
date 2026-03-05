'use client';

import { useState } from 'react';

interface Package {
  name: string;
  price: string;
  features: string[];
  order?: number;
}

interface CollaborationProps {
  packages: Package[];
}

export default function Collaboration({
  packages,
}: CollaborationProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="p-8 rounded transition-all duration-300 hover:shadow-md"
              style={{
                border: '1px solid var(--border-color)',
                transform:
                  hoveredIndex === idx ? 'translateY(-4px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <p
                className="text-xs uppercase tracking-widest font-medium mb-3"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {pkg.name}
              </p>
              <p
                className="text-3xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                {pkg.price}
              </p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3">
                    <span
                      className="font-semibold"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      ✓
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full font-semibold py-3 px-4 rounded transition-colors duration-300"
                style={{
                  border: '1px solid var(--border-color)',
                  color:
                    hoveredIndex === idx
                      ? 'var(--accent-primary)'
                      : 'var(--text-primary)',
                  backgroundColor:
                    hoveredIndex === idx
                      ? 'var(--bg-muted)'
                      : 'transparent',
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="col-span-3 text-center py-8"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Loading collaboration packages...
        </div>
      )}
    </>
  );
}
