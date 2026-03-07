import { TextLink } from '@/components/typography';

interface BlogCardProps {
  _id: string;
  title: string;
  slug: { current: string } | string;
  excerpt?: string;
  publishedAt?: string;
  pillar?: string;
  readingTime?: number;
  variant?: 'default' | 'featured' | 'list';
}

export function BlogCard({
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  pillar,
  readingTime,
  variant = 'default',
}: BlogCardProps) {
  const slugValue = typeof slug === 'string' ? slug : slug.current;
  const href = `/blog/${slugValue}`;

  if (variant === 'featured') {
    return (
      <article className="blog-featured-card">
        <TextLink href={href}>
          <div className="blog-featured-card-inner">
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
            <h3 className="blog-featured-card-title">{title}</h3>
            {excerpt && (
              <p className="blog-featured-card-excerpt">{excerpt}</p>
            )}
            <div className="blog-featured-card-cta">
              Read Article →
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
            <h3 className="blog-list-card-title">{title}</h3>
            {excerpt && (
              <p className="blog-list-card-excerpt">{excerpt}</p>
            )}
          </div>
          <div className="blog-list-card-action">
            Read →
          </div>
        </TextLink>
      </article>
    );
  }

  // Default variant
  return (
    <article className="blog-card">
      <div className="blog-card-header">
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
      <TextLink href={href} className="blog-card-cta">
        Read Article →
      </TextLink>
    </article>
  );
}
