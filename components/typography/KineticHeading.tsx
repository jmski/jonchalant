'use client';

import { useRef } from 'react';
import { useScrollTrigger } from '@/lib/hooks/useScrollTrigger';
import { AnchorWord } from '@/components/typography/AnchorWord';

interface KineticHeadingProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3';
  anchorWords?: string[];
  className?: string;
}

/**
 * KineticHeading — animates a heading word-by-word as it enters the viewport.
 * Opt-in component for sections where typography IS the visual.
 * Uses useScrollTrigger (threshold 0.3) for the reveal trigger.
 * Respects prefers-reduced-motion via CSS.
 */
export function KineticHeading({
  children,
  as: Tag = 'h2',
  anchorWords = [],
  className,
}: KineticHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useScrollTrigger(ref, 0.3, true);

  const words = children.split(/(\s+)/);

  // Track actual word index (not whitespace tokens) for stagger delay
  let wordIdx = 0;

  const rendered = words.map((token, i) => {
    // Whitespace-only token — render as-is (preserves natural spacing)
    if (/^\s+$/.test(token)) {
      return token;
    }

    const currentIdx = wordIdx++;
    const isAnchor = anchorWords.some(
      (w) => w.toLowerCase() === token.toLowerCase()
    );

    const wordEl = (
      <span
        key={i}
        className="kinetic-word"
        style={{ '--word-index': currentIdx } as React.CSSProperties}
      >
        {isAnchor ? <AnchorWord>{token}</AnchorWord> : token}
      </span>
    );

    return wordEl;
  });

  const classes = [
    'kinetic-heading',
    isVisible ? 'kinetic-heading--revealed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={classes}>
      {rendered}
    </Tag>
  );
}

export default KineticHeading;
