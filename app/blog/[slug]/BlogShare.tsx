'use client';

interface BlogShareProps {
  title: string;
}

export function BlogShare({ title }: BlogShareProps) {
  const getUrl = () =>
    typeof window !== 'undefined' ? window.location.href : '';

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=520');
  };

  const shareTwitter = () => {
    const text = `${title} — via @jonchalant`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="blog-share" aria-label="Share this article">
      <span className="blog-share-label">Share</span>

      <button
        type="button"
        onClick={shareLinkedIn}
        className="blog-share-btn"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        {/* LinkedIn icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452H17.21v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.102v1.561h.046c.432-.82 1.487-1.685 3.059-1.685 3.27 0 3.873 2.152 3.873 4.949v6.627zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.552 13.019H3.785V9h3.104v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        <span>LinkedIn</span>
      </button>

      <button
        type="button"
        onClick={shareTwitter}
        className="blog-share-btn"
        aria-label="Share on X (Twitter)"
        title="Share on X (Twitter)"
      >
        {/* X / Twitter icon */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.389 6.231H2.756l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>X</span>
      </button>
    </div>
  );
}
