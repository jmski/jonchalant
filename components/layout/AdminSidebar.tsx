'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const ADMIN_NAV_SECTIONS = [
  {
    title: 'Dashboard',
    links: [
      { label: 'Overview', href: '/admin' },
    ],
  },
  {
    title: 'Management',
    links: [
      { label: 'Inquiries', href: '/admin/inquiries' },
      { label: 'Users', href: '/admin/users' },
      { label: 'Content', href: '/admin/content' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Settings', href: '/admin/settings' },
    ],
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Admin-specific sidebar for the admin dashboard
 * Shows admin management and account navigation
 * Responds to mobile/desktop with passed state
 */
export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  if (!mounted) return null;

  return (
    <aside className={`admin-sidebar ${isOpen ? 'mobile-open' : ''}`}>
      {/* Admin Sidebar Header */}
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-header-content">
          <h6>ADMIN</h6>
          <button
            className="admin-sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Admin Navigation Sections */}
      <nav className="admin-sidebar-sections">
        {ADMIN_NAV_SECTIONS.map((section) => (
          <div key={section.title} className="admin-sidebar-section">
            <div className="admin-sidebar-section-title">{section.title}</div>
            <ul className="admin-sidebar-links">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
                      style={{
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                        borderLeftColor: isActive ? 'var(--accent-primary)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Admin Sidebar Footer */}
      <div className="admin-sidebar-footer">
        <Link href="/admin/logout" className="admin-sidebar-logout">
          Logout
        </Link>
      </div>
    </aside>
  );
}
