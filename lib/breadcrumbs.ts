/**
 * Breadcrumb configuration and utilities
 * Centralized breadcrumb mapping and logic for consistent navigation
 */

export const BREADCRUMB_MAP: Record<string, string> = {
  '/dance': 'Dance Portfolio',
  '/showcase': 'Showcase',
  '/collaborations': 'Collaborations',
  '/media-kit': 'Media Kit',
  '/about': 'About',
  '/contact': 'Contact',
};

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

/**
 * Generate breadcrumb items based on pathname
 * Always includes Home, but only shows breadcrumbs on non-home pages
 */
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === '/') {
    return [];
  }

  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/', isActive: false },
  ];

  if (BREADCRUMB_MAP[pathname]) {
    items.push({
      label: BREADCRUMB_MAP[pathname],
      href: pathname,
      isActive: true,
    });
  }

  return items;
}
