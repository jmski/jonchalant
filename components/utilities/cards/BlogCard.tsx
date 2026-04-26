import Image from 'next/image';
import Link from 'next/link';
import { TextLink } from '@/components/typography';

interface BlogCardProps {
  _id: string;
  title: string;
  slug: { current: string } | string;
  excerpt?: string;
  publishedAt?: string;
  pillar?: string;
  readingTime?: number;
  coverImage?: { asset?: { url?: string }; alt?: string };
  variant?: 'default' | 'featured' | 'list';
  showLink?: boolean;
}

function getBlogPlaceholderSymbol(pillar?: string): string {
  switch (pillar) {
    case 'movement-body':
      return '◇';
    case 'presence-confidence':
      return '○';
    case 'leadership-career':
      return '◈';
    default:
      return '⊙';
  }
}

export function BlogCard({
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  pillar,
  readingTime,
  coverImage,
  variant = 'default',
  showLink = true,
}: BlogCardProps) {
  const slugValue = typeof slug === 'string' ? slug : slug.current;
  const href = `/blog/${slugValue}`;
  const isLab = pillar === 'the-lab';

  if (variant === 'featured') {
    return (
      <article className="blog-featured-card">
        <TextLink href={href}>
          <div className="blog-featured-card-inner">
            {coverImage?.asset?.url ? (
              <div className="blog-featured-card-cover">
                <Image
                  src={coverImage.asset.url}
                  alt={coverImage.alt ?? title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="blog-featured-card-cover-img"
                />
              </div>
            ) : (
              <div className="blog-featured-card-cover blog-featured-card-cover-placeholder" aria-hidden="true" />
            )}
            <div className="blog-featured-card-header">
              {pillar && (
                <span className="blog-featured-card-pillar">{pillar}</span>
              )}
              {readingTime && (
                <span className="blog-featured-card-readtime">
                  {readingTime} min read
                </span>
              )}
            </div>
            {isLab && (
              <span className="blog-card-series-label">THE LAB</span>
            )}
            <h3 className="blog-featured-card-title">{title}</h3>
            {excerpt && (
              <p className="blog-featured-card-excerpt">{excerpt}</p>
            )}
            <div className="blog-featured-card-cta">
              Read Article <span className="blog-featured-card-cta-arrow" aria-hidden="true">→</span>
            </div>
          </div>
        </TextLink>
      </article>
    );
  }

  if (variant === 'list') {
    return (
      <article className="blog-list-card">
        <TextLink href={href} className="blog-list-card-content">
          <div className="blog-list-card-body">
            <div className="blog-list-card-meta">
              {pillar && (
                <span className="blog-list-card-pillar">{pillar}</span>
              )}
              {readingTime && (
                <span className="blog-list-card-readtime">
                  {readingTime} min read
                </span>
              )}
            </div>
            {isLab && (
              <span className="blog-card-series-label">THE LAB</span>
            )}
            <h3 className="blog-list-card-title">{title}</h3>
            {excerpt && (
              <p className="blog-list-card-excerpt">{excerpt}</p>
            )}
          </div>
          <div className="blog-list-card-action">
            Read <span className="blog-list-card-action-arrow" aria-hidden="true">→</span>
          </div>
        </TextLink>
      </article>
    );
  }

  // Default variant
  return (
    <article className="blog-card">
      {coverImage?.asset?.url ? (
        <div className="blog-card-cover">
          <Image
            src={coverImage.asset.url}
            alt={coverImage.alt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="blog-card-cover-img"
          />
        </div>
      ) : (
        <div className="blog-card-cover blog-card-cover-placeholder" aria-hidden="true">
          <span className="blog-card-cover-placeholder-symbol">
            {getBlogPlaceholderSymbol(pillar)}
          </span>
        </div>
      )}
      <div className="blog-card-header">
        {isLab && (
          <span className="blog-card-series-label">THE LAB</span>
        )}
        <h3 className="blog-card-title">{title}</h3>
        {publishedAt && (
          <time className="blog-card-date">
            {new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        )}
      </div>
      {excerpt && (
        <p className="blog-card-excerpt">{excerpt}</p>
      )}
      {showLink && (
        <div className="blog-card-cta" aria-hidden="true">
          Read Article <span className="blog-card-cta-arrow">→</span>
        </div>
      )}
      <Link href={href} className="blog-card-link" aria-label={`Read article: ${title}`} />
    </article>
  );
}
