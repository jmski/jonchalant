'use client';

import { useEffect, useState } from 'react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  items,
  direction = 'left',
  speed = 20,
  pauseOnHover = true,
  className = ''
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const animationDuration = `${speed}s`;
  const keyframes = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      className={`marquee overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="marquee-content"
        style={{
          animation: `${keyframes} ${animationDuration} linear infinite`,
          animationPlayState: isHovered && pauseOnHover ? 'paused' : 'running',
          transition: 'animation-play-state 200ms ease',
        }}
      >
        {/* Repeat items enough times to fill the screen smoothly */}
        {[...Array(4)].map((_, setIndex) =>
          items.map((item, idx) => (
            <div
              key={`${setIndex}-${idx}`}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <span>{item}</span>
              <span className="text-accent-vibrant font-bold">◆</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Marquee;
