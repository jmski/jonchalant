'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

interface NavbarProps {
  socialLinks?: SocialLink[];
}

interface NavSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
    subitems?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Essentials',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Coaching',
    links: [
      {
        label: '',
        href: '#',
        subitems: [
          { label: 'Programs', href: '/programs' },
          { label: 'Lessons', href: '/lessons' },
          { label: 'Blog', href: '/blog' },
        ],
      },
    ],
  },
  {
    title: 'Media',
    links: [
      {
        label: '',
        href: '#',
        subitems: [
          { label: 'Dance', href: '/dance' },
          { label: 'Media Kit', href: '/media-kit' },
        ],
      },
    ],
  },
];

// Flattened structure for desktop navbar
const FLAT_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Coaching', href: '#', dropdown: [
    { label: 'Programs', href: '/programs' },
    { label: 'Lessons', href: '/lessons' },
    { label: 'Blog', href: '/blog' },
  ]},
  { label: 'About', href: '/about' },
  { label: 'Media', href: '#', dropdown: [
    { label: 'Dance', href: '/dance' },
    { label: 'Media Kit', href: '/media-kit' },
  ]},
  { label: 'Contact', href: '/contact' },
];

export default function Navbar({ socialLinks = [] }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleDropdownEnter = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link href="/" className="navbar-brand">
          JONCHALANT
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {FLAT_NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="navbar-item"
              onMouseEnter={() => link.dropdown && handleDropdownEnter(link.label)}
              onMouseLeave={() => link.dropdown && handleDropdownLeave()}
            >
              {link.dropdown ? (
                <span
                  className={`navbar-link has-dropdown ${link.dropdown.some((item) => isActive(item.href)) ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === link.label ? null : link.label);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={openDropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <span className="navbar-dropdown-arrow">▼</span>
                </span>
              ) : (
                <Link
                  href={link.href}
                  className={`navbar-link ${isActive(link.href) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              )}

              {/* Dropdown Menu */}
              {link.dropdown && (
                <div
                  className={`navbar-dropdown ${openDropdown === link.label ? 'visible' : ''}`}
                  onMouseEnter={() => handleDropdownEnter(link.label)}
                  onMouseLeave={() => handleDropdownLeave()}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`navbar-dropdown-item ${isActive(item.href) ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Portal Login Button */}
        <Link href="/login" className="navbar-login-btn">
          Portal Login
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Navigation - Sidebar-like with sections */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-menu">
            {/* Mobile Menu Sections */}
            <nav className="navbar-mobile-sections">
              {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="navbar-mobile-section">
                  <div className="navbar-mobile-section-title">{section.title}</div>
                  <ul className="navbar-mobile-links">
                    {section.links.map((link, linkIdx) => (
                      <li key={link.label || linkIdx}>
                        {link.subitems ? (
                          <>
                            {link.label && (
                              <span className="navbar-mobile-category">
                                {link.label}
                              </span>
                            )}
                            <ul className="navbar-mobile-subitems">
                              {link.subitems.map((subitem) => (
                                <li key={subitem.href}>
                                  <Link
                                    href={subitem.href}
                                    className={`navbar-mobile-link ${isActive(subitem.href) ? 'active' : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subitem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            className={`navbar-mobile-link ${isActive(link.href) ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Mobile Menu Footer */}
            <div className="navbar-mobile-footer">
              {/* Portal Login Button for Mobile */}
              <Link
                href="/login"
                className="navbar-mobile-login-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portal Login
              </Link>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="navbar-mobile-social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navbar-mobile-social-link"
                      title={social.label}
                      aria-label={social.label}
                    >
                      <span className="navbar-mobile-social-icon">{social.icon}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
