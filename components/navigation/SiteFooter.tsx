import Link from 'next/link';
import { BlogOptIn } from '@/components/forms/BlogOptIn';
import { FOOTER_NAV, FALLBACK_SOCIAL } from '@/lib/footerData';
import type { EmailOptInContent } from '@/lib/types';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

interface SiteFooterProps {
  socialLinks?: SocialLink[];
  optIn?: EmailOptInContent | null;
}

export function SiteFooter({ socialLinks = [], optIn }: SiteFooterProps) {
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
        <BlogOptIn optIn={optIn} variant="footer" />
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
