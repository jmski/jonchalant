'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

// Map routes to breadcrumb labels
const BREADCRUMB_MAP: Record<string, string> = {
  '/dance': 'Dance Portfolio',
  '/showcase': 'Showcase',
  '/collaborations': 'Collaborations',
  '/media-kit': 'Media Kit',
  '/about': 'About',
  '/contact': 'Contact',
};

export default function Breadcrumb() {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  // Build breadcrumb items
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
  ];

  // Add current page if it's in the map
  if (BREADCRUMB_MAP[pathname]) {
    items.push({
      label: BREADCRUMB_MAP[pathname],
      href: pathname,
    });
  }

  return (
    <nav 
      aria-label="Breadcrumb"
      className="py-4 border-b"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span style={{ color: 'var(--border-color)' }}>/</span>
              )}
              {index === items.length - 1 ? (
                <span style={{ color: 'var(--accent-vibrant)', fontWeight: '600' }}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-accent-vibrant transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
