'use client';

import { useEffect, useState, useCallback } from 'react';
import { type ToCHeading } from './headings';

interface BlogToCProps {
  headings: ToCHeading[];
}

export function BlogToC({ headings }: BlogToCProps) {
  const [activeId, setActiveId] = useState<string>('');

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY + 120; // offset for any sticky header
    let current = '';
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el && el.offsetTop <= scrollY) {
        current = h.id;
      }
    }
    setActiveId(current);
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  if (headings.length === 0) return null;

  return (
    <aside className="blog-toc" aria-label="Table of contents">
      <p className="blog-toc-label">In this article</p>
      <nav>
        <ol className="blog-toc-list">
          {headings.map((h) => (
            <li
              key={h.id}
              className={`blog-toc-item${h.level === 3 ? ' blog-toc-item--sub' : ''}${activeId === h.id ? ' active' : ''}`}
            >
              <a
                href={`#${h.id}`}
                className="blog-toc-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}


