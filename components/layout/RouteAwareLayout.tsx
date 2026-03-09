'use client';

interface RouteAwareLayoutProps {
  children: React.ReactNode;
}

/**
 * Route-Aware Layout
 * Simple wrapper for main site pages
 * Navigation is now handled by the top-level Navbar component
 * Portal and Admin pages have their own sidebar layouts
 */
export default function RouteAwareLayout({ children }: RouteAwareLayoutProps) {
  return (
    <main className="main-content" id="main-content">
      {children}
    </main>
  );
}
