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
    <section className="featured-blog-section">
      <div className="featured-blog-container">
        {/* Section Header */}
        <div className="featured-blog-header">
          <span className="featured-blog-badge text-badge">
            Insights & Resources
          </span>
          <h2 className="featured-blog-title text-display-lg">
            Read Latest Articles
          </h2>
          <p className="featured-blog-subtitle">
            Practical insights on executive presence, quiet command, and leadership coaching for introverts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="featured-blog-grid">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <article className="featured-blog-card card">
                <div className="featured-blog-card-meta">
                  <span className="featured-blog-card-pillar text-label">
                    {post.pillar}
                  </span>
                  {post.readingTime && (
                    <span className="featured-blog-card-reading-time">
                      {post.readingTime} min
                    </span>
                  )}
                </div>
                <h3 className="featured-blog-card-title">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="featured-blog-card-excerpt">
                    {post.excerpt}
                  </p>
                )}
                <div className="featured-blog-card-cta">
                  Read Article →
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA to Blog */}
        <div className="featured-blog-footer">
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

