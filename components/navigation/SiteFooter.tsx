import Link from 'next/link';
import { BlogOptIn } from '@/components/forms/BlogOptIn';
import { FOOTER_NAV, FALLBACK_SOCIAL } from '@/lib/footerData';
import type { EmailOptInContent } from '@/lib/types';

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
};

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
  const linkedIn =
    socialLinks.find((s) => s.label.toLowerCase().includes('linkedin')) ??
    FALLBACK_SOCIAL.linkedin;
  const instagram =
    socialLinks.find((s) => s.label.toLowerCase().includes('instagram')) ??
    FALLBACK_SOCIAL.instagram;
  const displaySocial = [linkedIn, instagram];

  return (
    <footer className="jc-footer">
      <div className="jc-footer-optin">
        <BlogOptIn optIn={optIn} variant="footer" />
      </div>

      <div className="jc-footer-inner">
        <div className="jc-footer-grid">
          <div className="jc-footer-brand">
            <Link href="/" className="jc-footer-brand-name">
              <em>Jon</em>chalant
            </Link>
            <p className="jc-footer-blurb">
              Find the work you were meant for — then learn to inhabit it.
            </p>
            <div className="jc-footer-social">
              {displaySocial.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jc-footer-social-link"
                  data-platform={link.label.toLowerCase()}
                  aria-label={link.label}
                >
                  {SOCIAL_ICONS[link.label.toLowerCase()] ?? link.icon}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_NAV.map((section) => (
            <div key={section.heading} className="jc-footer-col">
              <p className="jc-footer-col-heading">{section.heading}</p>
              <ul className="jc-footer-list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="jc-footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jonchalant. All rights reserved.</p>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
