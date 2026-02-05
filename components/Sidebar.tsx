'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

type Theme = 'default' | 'dark' | 'earthy';

const THEMES: Array<{ id: Theme; label: string; color: string }> = [
  { id: 'default', label: 'Paper', color: '#ffffff' },
  { id: 'dark', label: 'Blueprint', color: '#0a0a0a' },
  { id: 'earthy', label: 'Manual', color: '#e2ded0' },
];

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

function ThemeButton({
  theme,
  color,
  isActive,
  onClick,
}: {
  theme: Theme;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`theme-square ${isActive ? 'active' : ''}`}
      style={{
        backgroundColor: color,
        borderColor: isActive ? 'var(--accent-vibrant)' : 'var(--border-color)',
      }}
      aria-label={`Switch to ${THEMES.find((t) => t.id === theme)?.label} theme`}
    />
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

  const changeTheme = useCallback((newTheme: Theme) => {
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
          <div className="theme-buttons">
            {THEMES.map((t) => (
              <ThemeButton
                key={t.id}
                theme={t.id}
                color={t.color}
                isActive={theme === t.id}
                onClick={() => changeTheme(t.id)}
              />
            ))}
          </div>
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
