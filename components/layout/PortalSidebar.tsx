'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const PORTAL_NAV_SECTIONS = [
  {
    title: 'Portal',
    links: [
      { label: 'Dashboard', href: '/portal' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Settings', href: '/portal/settings' },
      { label: 'Progress', href: '/portal/progress' },
    ],
  },
];

interface PortalSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Portal-specific sidebar for the learning platform
 * Shows dashboard and account navigation
 * Responds to mobile/desktop with passed state
 */
export default function PortalSidebar({ isOpen = false, onClose }: PortalSidebarProps) {
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
    <aside className={`portal-sidebar ${isOpen ? 'mobile-open' : ''}`}>
      {/* Portal Sidebar Header */}
      <div className="portal-sidebar-header">
        <div className="portal-sidebar-header-content">
          <h6>PORTAL</h6>
          <button
            className="portal-sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Portal Navigation Sections */}
      <nav className="portal-sidebar-sections">
        {PORTAL_NAV_SECTIONS.map((section) => (
          <div key={section.title} className="portal-sidebar-section">
            <div className="portal-sidebar-section-title">{section.title}</div>
            <ul className="portal-sidebar-links">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`portal-sidebar-link ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
                      style={{
                        color: isActive ? 'var(--accent-Primary)' : 'var(--text-secondary)',
                        backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                        borderLeftColor: isActive ? 'var(--accent-Primary)' : 'transparent',
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

      {/* Portal Sidebar Footer */}
      <div className="portal-sidebar-footer">
        <Link href="/logout" className="portal-sidebar-logout">
          Logout
        </Link>
      </div>
    </aside>
  );
}
