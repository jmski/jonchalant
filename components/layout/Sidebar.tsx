'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const SITE_SECTIONS = [
  {
    title: 'Primary',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Portfolio',
    links: [
      { label: 'Dance', href: '/dance' },
    ],
  },
  {
    title: 'Coaching',
    links: [
      { label: 'Programs', href: '/programs' },
      { label: 'Lessons', href: '/lessons' },
      { label: 'Media Kit', href: '/media-kit' },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
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
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h1>JONCHALON</h1>
      </div>

      {/* Sidebar Sections */}
      <nav className="sidebar-sections">
        {SITE_SECTIONS.map((section) => (
          <div key={section.title} className="sidebar-section">
            <div className="sidebar-section-title">{section.title}</div>
            <ul className="sidebar-links">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`sidebar-links ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
                      style={{
                        color: isActive ? 'var(--accent-vibrant)' : 'var(--text-secondary)',
                        backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                        borderLeftColor: isActive ? 'var(--accent-vibrant)' : 'transparent',
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

      {/* Sidebar Footer */}
      <div className="sidebar-footer"></div>
    </aside>
  );
}
