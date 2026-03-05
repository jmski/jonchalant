import { TextLink } from '@/components/typography';

interface BlogCardProps {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
}

export function BlogCard({ _id, title, slug, excerpt, publishedAt }: BlogCardProps) {
  const href = slug ? `/blog/${slug}` : '#';
  
  return (
    <article className="blog-card">
      <div className="blog-card-header">
        <h3 className="blog-card-title">{title}</h3>
        {publishedAt && (
          <time className="blog-card-date">
            {new Date(publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
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
