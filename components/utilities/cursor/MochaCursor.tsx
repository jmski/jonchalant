'use client';

import { useEffect, useRef, useState } from 'react';

export default function MochaCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => setVisible(true), 0);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const factor = reduced ? 1 : 0.18;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: Event) => {
      const isInteractive = !!(e.target as Element).closest(
        'a, button, [role="button"], [data-cursor="hover"]'
      );
      setHover(isInteractive);
    };

    const onVisibility = () => setVisible(!document.hidden);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('visibilitychange', onVisibility);

    const tick = () => {
      if (dotRef.current) {
        pos.current.x = lerp(pos.current.x, mouse.current.x, factor);
        pos.current.y = lerp(pos.current.y, mouse.current.y, factor);
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={dotRef}
      className={`mocha-cursor${hover ? ' mocha-cursor--hover' : ''}`}
      aria-hidden="true"
    />
  );
}
