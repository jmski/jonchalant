import Link from 'next/link';
import { client } from '@/lib/sanity';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  pillar: string;
  readingTime?: number;
  publishedAt?: string;
  featured?: boolean;
}

async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    pillar,
    readingTime,
    publishedAt,
    featured
  }`;

  try {
    const posts = await client.fetch(query);
    return posts || [];
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

export async function FeaturedBlogSection() {
  const posts = await getFeaturedBlogPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <section style={{ background: 'var(--bg-primary)', paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-3xl)' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', paddingLeft: 'var(--spacing-md)', paddingRight: 'var(--spacing-md)' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <span className="text-badge" style={{ display: 'inline-block', color: 'var(--accent-primary)', marginBottom: 'var(--spacing-md)' }}>
            Insights & Resources
          </span>
          <h2 className="text-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
            Read Latest Articles
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--text-secondary)', maxWidth: '40rem', margin: '0 auto', lineHeight: 'var(--leading-relaxed)' }}>
            Practical insights on executive presence, quiet command, and leadership coaching for introverts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid-responsive-3" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <article className="card flex flex-col min-h-full group" style={{ cursor: 'pointer', transition: 'all var(--transition-base)' }}>
                <div className="flex items-start justify-between gap-3" style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <span className="text-label" style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {post.pillar}
                  </span>
                  {post.readingTime && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {post.readingTime} min
                    </span>
                  )}
                </div>
                <h3 className="font-black" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)', lineHeight: 'var(--leading-tight)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-body grow" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.excerpt}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.95rem', transition: 'transform var(--transition-base)' }}>
                  Read Article →
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA to Blog */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/blog"
            className="cta-link"
          >
            View All Articles
            <span className="cta-link-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
