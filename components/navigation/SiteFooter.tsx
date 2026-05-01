import Link from 'next/link';
import { BlogOptIn } from '@/components/forms/BlogOptIn';
import { FOOTER_NAV, FALLBACK_SOCIAL } from '@/lib/footerData';
import type { NewsletterCapture, SiteConfig, SocialLink } from '@/lib/types';

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

interface SiteFooterProps {
  siteConfig?: SiteConfig | null;
  newsletter?: NewsletterCapture | null;
}

function pickSocial(socialLinks: SocialLink[] | undefined, platform: SocialLink['platform']) {
  return socialLinks?.find((s) => s.platform === platform);
}

export function SiteFooter({ siteConfig, newsletter }: SiteFooterProps) {
  const linkedInResolved = pickSocial(siteConfig?.socialLinks, 'linkedin');
  const instagramResolved = pickSocial(siteConfig?.socialLinks, 'instagram');

  const linkedIn = linkedInResolved
    ? { label: linkedInResolved.label ?? 'LinkedIn', href: linkedInResolved.url, platform: 'linkedin' }
    : { label: FALLBACK_SOCIAL.linkedin.label, href: FALLBACK_SOCIAL.linkedin.href, platform: 'linkedin' };

  const instagram = instagramResolved
    ? { label: instagramResolved.label ?? 'Instagram', href: instagramResolved.url, platform: 'instagram' }
    : { label: FALLBACK_SOCIAL.instagram.label, href: FALLBACK_SOCIAL.instagram.href, platform: 'instagram' };

  const displaySocial = [linkedIn, instagram];

  const newsletterSuccess = siteConfig?.successStates?.find((s) => s.key === 'newsletter')?.message;

  return (
    <footer className="jc-footer">
      <div className="jc-footer-optin">
        <BlogOptIn newsletter={newsletter} successMessage={newsletterSuccess} variant="footer" />
      </div>

      <div className="jc-footer-inner">
        <div className="jc-footer-grid">
          <div className="jc-footer-brand">
            <Link href="/" className="jc-footer-brand-name">
              <em>Jon</em>chalant
            </Link>
            <p className="jc-footer-blurb">
              {siteConfig?.brandLine ?? 'Find the work you were meant for — then learn to inhabit it.'}
            </p>
            <div className="jc-footer-social">
              {displaySocial.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jc-footer-social-link"
                  data-platform={link.platform}
                  aria-label={link.label}
                >
                  {SOCIAL_ICONS[link.platform] ?? link.label}
                </a>
              ))}
            </div>
            {siteConfig?.contactEmail && (
              <p className="jc-footer-contact">
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              </p>
            )}
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
          <p>{siteConfig?.copyright ?? `© ${new Date().getFullYear()} Jonchalant. All rights reserved.`}</p>
          <Link href={siteConfig?.privacyLink?.href ?? '/privacy'}>
            {siteConfig?.privacyLink?.label ?? 'Privacy Policy'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
