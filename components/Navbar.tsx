'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useTheme, type Theme } from '@/lib/useTheme';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Dance', href: '/dance' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Collaborations', href: '/collaborations' },
  { label: 'Media Kit', href: '/media-kit' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const THEMES: Array<{ id: Theme; label: string }> = [
  { id: 'default', label: 'Default' },
  { id: 'executive', label: 'Executive' },
  { id: 'midnight', label: 'Midnight' },
];

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ThemeButton({ theme, isActive, onClick }: { theme: Theme; isActive: boolean; onClick: () => void }) {
  const getThemeColor = () => {
    if (theme === 'default') return 'var(--accent-primary)';
    if (theme === 'executive') return 'var(--accent-primary)';
    if (theme === 'midnight') return 'var(--accent-secondary)';
    return 'var(--text-secondary)';
  };

  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 rounded transition-all duration-200 hover:scale-110 ${
        isActive ? 'ring-2 ring-offset-2 ring-slate-400' : 'opacity-50 hover:opacity-75'
      }`}
      style={{ backgroundColor: getThemeColor() }}
      aria-label={`Switch to ${theme} theme`}
      title={`${theme === 'default' ? 'Default' : theme === 'executive' ? 'Executive' : 'Midnight'} theme`}
    />
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, changeTheme } = useTheme();
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <nav className="sticky top-0 z-40 border-b backdrop-blur-sm bg-opacity-95" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-xl bg-clip-text text-transparent transition-all duration-300"
          >
            Jonchalon
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 ml-16">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-2 ml-auto mr-6">
            {THEMES.map(({ id, label }) => (
              <ThemeButton
                key={id}
                theme={id}
                isActive={theme === id}
                onClick={() => changeTheme(id)}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 transition-transform duration-300"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            style={{ color: 'var(--text-heading)' }}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block py-2 nav-link"
              >
                {link.label}
              </Link>
            ))}
            {/* Theme Toggle - Mobile */}
            <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              {THEMES.map(({ id, label }) => (
                <ThemeButton
                  key={id}
                  theme={id}
                  isActive={theme === id}
                  onClick={() => {
                    changeTheme(id);
                    closeMenu();
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
