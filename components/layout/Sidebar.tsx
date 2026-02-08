'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

type Theme = 'default' | 'dark';

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
      { label: 'Showcase', href: '/showcase' },
    ],
  },
  {
    title: 'Professional',
    links: [
      { label: 'Collaborations', href: '/collaborations' },
      { label: 'Media Kit', href: '/media-kit' },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function ThemeToggle({
  isLight,
  onChange,
}: {
  isLight: boolean;
  onChange: (isLight: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!isLight)}
      className="theme-toggle"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      role="switch"
      aria-checked={isLight}
    >
      {/* Toggle switch track and knob */}
      <span className="toggle-track" />
      <span className="toggle-knob" />
      {/* Light and dark icons */}
      <span className="toggle-icon toggle-icon-light">☀️</span>
      <span className="toggle-icon toggle-icon-dark">🌙</span>
    </button>
  );
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('jonchalon-theme') as Theme | null;
    const initialTheme = stored || 'default';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    setMounted(true);
  }, []);

  const changeTheme = useCallback((isLight: boolean) => {
    const newTheme: Theme = isLight ? 'default' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jonchalon-theme', newTheme);
  }, []);

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  if (!mounted) return null;

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {/* Theme Selector */}
        <div className="sidebar-theme-selector">
          <ThemeToggle
            isLight={theme === 'default'}
            onChange={changeTheme}
          />
        </div>
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
