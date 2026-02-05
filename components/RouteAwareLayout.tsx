'use client';

import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';

interface RouteAwareLayoutProps {
  children: React.ReactNode;
}

export default function RouteAwareLayout({ children }: RouteAwareLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Content pages show sidebar + main content
  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        ☰ Index
      </button>

      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'mobile-open' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Layout Container */}
      <div className="layout-with-sidebar">
        {/* Sidebar Navigation */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Main Content Area */}
        <main className="main-content" id="main-content">
          {children}
        </main>
      </div>
    </>
  );
}
