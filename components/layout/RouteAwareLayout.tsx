'use client';

import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Sidebar } from '@/components/layout';
import { SidebarToggle } from '@/components/layout';
import { SidebarOverlay } from '@/components/layout';
import { BreadcrumbNav } from '@/components/navigation';
import { generateBreadcrumbs } from '@/lib/breadcrumbs';

interface RouteAwareLayoutProps {
  children: React.ReactNode;
}

export default function RouteAwareLayout({ children }: RouteAwareLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Generate breadcrumb items based on current route
  const breadcrumbItems = generateBreadcrumbs(pathname);

  return (
    <>
      <SidebarToggle onClick={toggleSidebar} />
      <SidebarOverlay isOpen={sidebarOpen} onClick={closeSidebar} />

      <div className="layout-with-sidebar">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="main-content" id="main-content">
          <BreadcrumbNav items={breadcrumbItems} />
          {children}
        </main>
      </div>
    </>
  );
}
