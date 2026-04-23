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

interface NavLink {
  label: string;
  href: string;
  isPrimary?: boolean;
}

const LEFT_LINKS: NavLink[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Lessons', href: '/lessons' },
  { label: 'Dance', href: '/dance' },
];

const RIGHT_LINKS: NavLink[] = [
  { label: 'Start Here', href: '/ikigai', isPrimary: true },
  { label: 'Programs', href: '/programs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Essentials',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Start Here', href: '/ikigai' },
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
          { label: 'The Foundation', href: '/foundation' },
          { label: 'Ikigai', href: '/ikigai' },
        ],
      },
    ],
  },
  {
    title: 'Learn',
    links: [
      {
        label: '',
        href: '#',
        subitems: [
          { label: 'The Blueprint', href: '/lessons' },
          { label: 'The Archives', href: '/blog' },
          { label: 'The Breakdown', href: '/dance' },
        ],
      },
    ],
  },
];

export default function Navbar({ socialLinks = [] }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    Promise.resolve().then(() => setMobileMenuOpen(false));
  }, [pathname]);

  // Condensed pill on scroll past 40px
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    const t = setTimeout(handleScroll, 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-wrapper">
        {/* Centered floating pill */}
        <div className={`navbar-pill${isScrolled ? ' is-scrolled' : ''}`}>
          <div className="navbar-pill-inner">
            <div className="navbar-links-left">
              {LEFT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navbar-pill-link${isActive(link.href) ? ' active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link href="/" className="navbar-logo">
              JONCHALANT
            </Link>

            <div className="navbar-links-right">
              {RIGHT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'navbar-pill-link',
                    link.isPrimary ? 'navbar-pill-link--cta' : '',
                    isActive(link.href) ? 'active' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sign In — outside the pill, right-aligned */}
        <div className="navbar-signin">
          <span className="navbar-signin-divider" aria-hidden="true" />
          <Link href="/login" className="navbar-signin-link">
            Sign In
          </Link>
        </div>
      </div>

      {/* Hamburger — mobile only, outside pill */}
      <button
        className={`navbar-hamburger${mobileMenuOpen ? ' is-open' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className="navbar-hamburger-line" />
        <span className="navbar-hamburger-line" />
        <span className="navbar-hamburger-line" />
      </button>

      {/* Mobile sidebar menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
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
                            <span className="navbar-mobile-category">{link.label}</span>
                          )}
                          <ul className="navbar-mobile-subitems">
                            {link.subitems.map((subitem) => (
                              <li key={subitem.href}>
                                <Link
                                  href={subitem.href}
                                  className={`navbar-mobile-link${isActive(subitem.href) ? ' active' : ''}`}
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
                          className={`navbar-mobile-link${isActive(link.href) ? ' active' : ''}`}
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

          <div className="navbar-mobile-footer">
            <Link
              href="/ikigai"
              className="navbar-mobile-cta-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Here
            </Link>
            <Link
              href="/login"
              className="navbar-mobile-login-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>

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
    </nav>
  );
}
