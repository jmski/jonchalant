'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Start Here', href: '/ikigai' },
  { label: 'Programs', href: '/programs' },
  { label: 'Lessons', href: '/lessons' },
  { label: 'About', href: '/about' },
];

const MOBILE_LINKS: Array<{ label: string; href: string; emphasis?: boolean }> = [
  { label: 'Start Here', href: '/ikigai', emphasis: true },
  { label: 'Programs', href: '/programs' },
  { label: 'The Foundation', href: '/foundation' },
  { label: 'Lessons', href: '/lessons' },
  { label: 'Blog', href: '/blog' },
  { label: 'Dance', href: '/dance' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => setMobileOpen(false));
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="jc-nav">
      <Link href="/" className="jc-nav-logo">
        JONCHALANT
      </Link>

      <div className="jc-nav-links">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`jc-nav-link${isActive(link.href) ? ' is-active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="jc-nav-actions">
        <Link href="/login" className="jc-nav-signin">
          Sign In
        </Link>
        <button
          type="button"
          className={`jc-nav-hamburger${mobileOpen ? ' is-open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className="jc-nav-hamburger-icon">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className={`jc-nav-mobile${mobileOpen ? ' is-open' : ''}`}>
        {MOBILE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="jc-nav-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {link.emphasis ? <em>{link.label}</em> : link.label}
          </Link>
        ))}
        <div className="jc-nav-mobile-footer">
          <Link href="/login" className="jc-nav-mobile-link" onClick={() => setMobileOpen(false)}>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
