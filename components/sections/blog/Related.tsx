import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  pillar: string;
  readingTime?: number;
  publishedAt?: string;
}

interface RelatedProps {
  posts: BlogPost[];
}

export function Related({ posts }: RelatedProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="blog-related">
      <h2 className="blog-related-title">Related Articles</h2>
      <div className="blog-related-grid">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="blog-related-card"
          >
            <span className="blog-related-card-pillar">
              {post.pillar}
            </span>
            <h3 className="blog-related-card-title">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="blog-related-card-excerpt">
                {post.excerpt}
              </p>
            )}
            <div className="blog-related-card-footer">
              {post.readingTime && (
                <span className="blog-related-card-readtime">
                  {post.readingTime} min read
                </span>
              )}
              <span className="blog-related-card-link">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
