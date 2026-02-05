'use client';

import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/breadcrumbs';

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component
 * Displays navigation path with current page highlighted
 * Only renders if items array is not empty
 */
export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumb-nav"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="breadcrumb-container">
        <ol className="breadcrumb-list">
          {items.map((item, index) => (
            <li key={item.href} className="breadcrumb-item">
              {index > 0 && (
                <span className="breadcrumb-separator" style={{ color: 'var(--border-color)' }}>
                  /
                </span>
              )}
              {item.isActive ? (
                <span className="breadcrumb-current">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="breadcrumb-link"
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
