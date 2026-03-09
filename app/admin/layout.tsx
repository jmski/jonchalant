'use client';

import { useState, useCallback } from 'react';
import { AdminSidebar } from '@/components/layout';
import { SidebarOverlay } from '@/components/layout';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin Layout
 * Provides admin-specific sidebar navigation with mobile responsive behavior
 * Used for all pages under /admin/* routes
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="layout-with-sidebar">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="admin-sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle admin navigation menu"
        aria-expanded={sidebarOpen}
      >
        ☰ MENU
      </button>

      <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <SidebarOverlay isOpen={sidebarOpen} onClick={closeSidebar} />

      <main className="main-content" id="main-content">
        {children}
      </main>
    </div>
  );
}
