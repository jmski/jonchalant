'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getContactInfo } from '@/lib/sanity';

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
    ],
  },
  {
    title: 'Coaching',
    links: [
      { label: 'Programs', href: '/programs' },
      { label: 'Lessons', href: '/lessons' },
      { label: 'Media Kit', href: '/media-kit' },
    ],
  },
];

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const handleClose = () => {
    if (onClose) onClose();
  };
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const contactInfo = await getContactInfo();
        if (contactInfo?.contactMethods) {
          // Filter only social media links and map to SocialLink
          const socials = contactInfo.contactMethods
            .filter((method) => ['Instagram', 'TikTok', 'YouTube'].includes(method.label))
            .map((method) => ({
              label: method.label,
              href: method.href,
              icon: method.label.toLowerCase().includes('instagram') ? 'ig' : method.label.toLowerCase().includes('youtube') ? 'yt' : 'tk',
            }));
          setSocialLinks(socials);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    if (mounted) {
      fetchSocialLinks();
    }
  }, [mounted]);

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  if (!mounted) return null;

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-header-content">
          <h6>JONCHALON</h6>
          <button
            className="sidebar-close-btn"
            onClick={handleClose}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>
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
      <div className="sidebar-footer">
        <div className="social-links">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title={social.label}
              aria-label={social.label}
            >
              <span className="social-icon">{social.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
