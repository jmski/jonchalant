import Link from 'next/link';

const TOC_SECTIONS = [
  {
    title: 'Introduction',
    description: 'Who I am and how to reach me',
    links: [
      { label: 'About Me', href: '/about', icon: '→' },
      { label: 'Contact', href: '/contact', icon: '→' },
    ],
  },
  {
    title: 'Portfolio',
    description: 'My work and creative projects',
    links: [
      { label: 'Dance', href: '/dance', icon: '→' },
      { label: 'Showcase', href: '/showcase', icon: '→' },
    ],
  },
  {
    title: 'Professional',
    description: 'Collaboration opportunities and metrics',
    links: [
      { label: 'Collaborations', href: '/collaborations', icon: '→' },
      { label: 'Media Kit', href: '/media-kit', icon: '→' },
    ],
  },
];

export default function TableOfContents() {
  return (
    <div className="toc-container">
      <div className="toc-content">
        {/* Hero Header */}
        <div className="toc-hero">
          <div className="toc-hero-badge">
            <span className="badge-text">Digital Artist</span>
          </div>
          <h1 className="toc-title">JONCHALON</h1>
          <p className="toc-tagline">
            Dance. Content. Collaboration.
          </p>
          <p className="toc-description">
            Professional brand hub for a multi-niche creator specializing in dance, digital media, and collaborative projects.
          </p>
        </div>

        {/* Divider */}
        <div className="toc-divider" />

        {/* Index Grid */}
        <div className="toc-index-grid">
          {TOC_SECTIONS.map((section, idx) => (
            <div key={section.title} className="toc-index-card">
              {/* Card Header */}
              <div className="card-header-section">
                <span className="section-number">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="section-title">{section.title}</h2>
                  <p className="section-desc">{section.description}</p>
                </div>
              </div>

              {/* Card Links */}
              <ul className="toc-links-grid">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="toc-link-item">
                      <span className="link-label">{link.label}</span>
                      <span className="link-arrow">{link.icon}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="toc-footer">
          <div className="footer-divider" />
          <p className="footer-text">
            Explore sections above or use the sidebar to navigate. Theme toggle available in the bottom-left corner.
          </p>
        </div>
      </div>
    </div>
  );
}
