'use client';

import { useState, useEffect } from 'react';

export function HeroCyclingText({ outcomes }: { outcomes: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (outcomes.length <= 1) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % outcomes.length);
        setVisible(true);
      }, 400);
    }, 3500);

    return () => clearInterval(interval);
  }, [outcomes.length]);

  return (
    <span
      className={`hero-cycling-outcome${visible ? ' hero-cycling-outcome--visible' : ''}`}
    >
      {outcomes[index]}
    </span>
  );
}
