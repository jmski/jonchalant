'use client';

import Link from 'next/link';
import { useCallback, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'default' | 'dark' | 'earthy';

const THEMES: Array<{ id: Theme; label: string }> = [
  { id: 'default', label: 'Paper' },
  { id: 'dark', label: 'Blueprint' },
  { id: 'earthy', label: 'Manual' },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Dance', href: '/dance' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Collaborations', href: '/collaborations' },
  { label: 'Media Kit', href: '/media-kit' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function ThemeButton({
  theme,
  isActive,
  onClick,
}: {
  theme: Theme;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`theme-button ${isActive ? 'active' : ''}`}
      aria-label={`Switch to ${theme} theme`}
    >
      {THEMES.find((t) => t.id === theme)?.label}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('default');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

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

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const isActive = (href: string) => pathname === href;

  if (!mounted) return null;

  return (
    <nav className="border-b sticky top-0 z-50 backdrop-blur-sm" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(var(--bg-primary-rgb), 0.95)' }}>
      <div className="container py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
            JONCHALON
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Group: Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Theme Toggle */}
            <div className="hidden md:flex theme-toggle">
              {THEMES.map(({ id }) => (
                <ThemeButton
                  key={id}
                  theme={id}
                  isActive={theme === id}
                  onClick={() => changeTheme(id)}
                />
              ))}
            </div>

            {/* Mobile Menu Button - Hamburger with proper sizing */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-12 h-12 p-2 border rounded transition-all duration-200 hover:border-accent-vibrant focus:outline-none focus:ring-2"
              style={{ 
                borderColor: 'var(--border-color)',
              }}
              aria-label="Toggle menu"
              title={isOpen ? 'Close menu' : 'Open menu'}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                {isOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/30 z-30" 
            style={{ backgroundColor: 'var(--overlay-dark)' }}
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Menu Drawer - Opens from Right */}
        <div 
          className={`md:hidden fixed top-0 right-0 w-64 h-screen bg-white dark:bg-slate-900 border-l z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto`}
          style={{ 
            backgroundColor: 'var(--bg-primary)',
            borderLeftColor: 'var(--border-color)',
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Content */}
          <div className="pt-16 px-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`nav-link block py-2 px-3 rounded transition-colors ${isActive(link.href) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--border-color)' }}>
              <div className="text-xs font-semibold text-secondary uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Theme</div>
              <div className="flex gap-2">
                {THEMES.map(({ id }) => (
                  <ThemeButton
                    key={id}
                    theme={id}
                    isActive={theme === id}
                    onClick={() => {
                      changeTheme(id);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
