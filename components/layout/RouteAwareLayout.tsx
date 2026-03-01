'use client';

import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Sidebar } from '@/components/layout';
import { SidebarToggle } from '@/components/layout';
import { SidebarOverlay } from '@/components/layout';

interface RouteAwareLayoutProps {
  children: React.ReactNode;
}

export default function RouteAwareLayout({ children }: RouteAwareLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <>
      <SidebarToggle onClick={toggleSidebar} />
      <SidebarOverlay isOpen={sidebarOpen} onClick={closeSidebar} />

      <div className="layout-with-sidebar">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="main-content" id="main-content">
          {children}
        </main>
      </div>
    </>
  );
}
