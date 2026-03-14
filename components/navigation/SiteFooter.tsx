'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

interface SiteFooterProps {
  socialLinks?: SocialLink[];
}

const FOOTER_NAV = [
  {
    heading: 'Essentials',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Coaching',
    links: [
      { label: 'Programs', href: '/programs' },
      { label: 'Lessons', href: '/lessons' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Media',
    links: [
      { label: 'Dance', href: '/dance' },
      { label: 'Media Kit', href: '/media-kit' },
    ],
  },
];

// Fallback social URLs — overridden by Sanity data when available
const FALLBACK_SOCIAL = {
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jonchalant', icon: 'in' },
  instagram: { label: 'Instagram', href: 'https://www.instagram.com/jonchalant', icon: 'ig' },
};

export function SiteFooter({ socialLinks = [] }: SiteFooterProps) {
  const pathname = usePathname();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Hide on portal, admin, and login routes — those have their own layouts
  if (
    pathname.startsWith('/portal') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/login')
  ) {
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  // Resolve social links: prefer Sanity data, fall back to hardcoded
  const linkedIn =
    socialLinks.find((s) => s.label.toLowerCase().includes('linkedin')) ??
    FALLBACK_SOCIAL.linkedin;
  const instagram =
    socialLinks.find((s) => s.label.toLowerCase().includes('instagram')) ??
    FALLBACK_SOCIAL.instagram;
  const displaySocial = [linkedIn, instagram];

  return (
    <footer className="site-footer">
      {/* ── Opt-in strip ── */}
      <div className="site-footer-optin">
        <div className="site-footer-optin-inner">
          <div className="site-footer-optin-copy">
            <span className="site-footer-optin-eyebrow">Free guide</span>
            <h3 className="site-footer-optin-title">
              Get the Quiet Command Starter Guide
            </h3>
            <p className="site-footer-optin-description">
              The 5 body-aware habits that help introverts build executive
              presence — without performing or pretending.
            </p>
          </div>

          {status === 'success' ? (
            <div className="site-footer-optin-success">
              <span className="site-footer-optin-success-icon">✓</span>
              <p className="site-footer-optin-success-title">You&#39;re in!</p>
              <p className="site-footer-optin-success-body">
                Check your inbox — the guide is on its way.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="site-footer-optin-form"
              noValidate
            >
              <div className="site-footer-optin-fields">
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                  autoComplete="given-name"
                  className="site-footer-optin-input"
                  disabled={status === 'submitting'}
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="site-footer-optin-input"
                  disabled={status === 'submitting'}
                />
                <button
                  type="submit"
                  className="site-footer-optin-btn"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send me the guide'}
                </button>
              </div>
              {status === 'error' && (
                <p className="site-footer-optin-error">{errorMsg}</p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* ── Main body: brand + nav columns ── */}
      <div className="site-footer-body">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-brand-name">
            JONCHALANT
          </Link>
          <p className="site-footer-tagline">
            Executive Presence Coaching for Introverts
          </p>
          <div className="site-footer-social">
            {displaySocial.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-social-link"
                data-platform={link.label.toLowerCase()}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <nav className="site-footer-nav" aria-label="Footer navigation">
          {FOOTER_NAV.map((section) => (
            <div key={section.heading} className="site-footer-nav-col">
              <p className="site-footer-nav-heading">{section.heading}</p>
              <ul className="site-footer-nav-list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="site-footer-nav-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* ── Bottom bar ── */}
      <div className="site-footer-bottom">
        <p className="site-footer-copyright">
          &copy; {new Date().getFullYear()} Jonchalant. All rights reserved.
        </p>
        <Link href="/privacy" className="site-footer-legal-link">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
