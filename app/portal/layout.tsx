'use client';

import { useState, useCallback } from 'react';
import { PortalSidebar } from '@/components/layout';
import { SidebarOverlay } from '@/components/layout';

interface PortalLayoutProps {
  children: React.ReactNode;
}

/**
 * Portal Layout
 * Provides portal-specific sidebar navigation with mobile responsive behavior
 * Used for all pages under /portal/* routes
 */
export default function PortalLayout({ children }: PortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="layout-with-sidebar">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="portal-sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle portal navigation menu"
        aria-expanded={sidebarOpen}
      >
        ☰ MENU
      </button>

      <PortalSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <SidebarOverlay isOpen={sidebarOpen} onClick={closeSidebar} />

      <main className="main-content" id="main-content">
        {children}
      </main>
    </div>
  );
}
