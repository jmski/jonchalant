'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'in' | 'hold' | 'out';

export default function MochaSweep() {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (pathname === prev.current) return;
    prev.current = pathname;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const t0 = setTimeout(() => setPhase('in'), 0);
    const t1 = setTimeout(() => setPhase('hold'), 250);
    const t2 = setTimeout(() => setPhase('out'), 350);
    const t3 = setTimeout(() => setPhase('idle'), 600);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  if (phase === 'idle') return null;

  return (
    <div className={`mocha-sweep mocha-sweep--${phase}`} aria-hidden="true" />
  );
}
