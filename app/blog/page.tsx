import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { Heading, TextLink } from '@/components/typography';
import { CTA } from '@/components/sections';
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout';
import { ScrollStagger, ScrollStaggerItem } from '@/components/animations';
import '@/app/css/blog.css';

export const metadata: Metadata = {
  title: 'Leadership Blog | Executive Presence & Quiet Command - Jonchalant',
  description: 'Read articles on executive presence coaching, quiet command, leadership for introverts, and professional presence from expert coach Jon.',
  keywords: 'executive presence, leadership coaching, quiet command, confidence, professional presence, introvert leadership',
  openGraph: {
    title: 'Leadership Blog - Jonchalant',
    description: 'Expert insights on executive presence, quiet command, and leadership coaching for introverts.',
    type: 'website',
    url: 'https://jonchalant.com/blog',
  },
};

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  metaDescription?: string;
  pillar: string;
  readingTime?: number;
  publishedAt?: string;
  featured?: boolean;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    metaDescription,
    pillar,
    readingTime,
    publishedAt,
    featured
  }`;

  try {
    const posts = await client.fetch(query);
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <main className="blog-page-main">
      <PageTransition animation="fade">
      {/* Header */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <div className="blog-page-header">
            <Heading level={1} className="blog-page-title">
              Leadership Blog
            </Heading>
            <p className="blog-page-subtitle">
              Articles on executive presence, quiet command, confidence coaching, and leadership for introverts.
            </p>
          </div>
        </SectionContent>
      </SectionWrapper>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section>
              <h2 className="blog-featured-title">Featured</h2>
              <ScrollStagger>
                <div className="blog-featured-grid">
                  {featuredPosts.map((post) => (
                    <ScrollStaggerItem key={post._id}>
                      <article className="blog-featured-card">
                        <TextLink href={`/blog/${post.slug.current}`}>
                          <div className="blog-featured-card-inner">
                            <div className="blog-featured-card-header">
                              <span className="blog-featured-card-pillar">
                                {post.pillar}
                              </span>
                              {post.readingTime && (
                                <span className="blog-featured-card-readtime">
                                  {post.readingTime} min read
                                </span>
                              )}
                            </div>
                            <h3 className="blog-featured-card-title">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="blog-featured-card-excerpt">
                                {post.excerpt}
                              </p>
                            )}
                            <div className="blog-featured-card-cta">
                              Read Article →
                            </div>
                          </div>
                        </TextLink>
                      </article>
                    </ScrollStaggerItem>
                  ))}
                </div>
              </ScrollStagger>
            </section>
          </SectionContent>
        </SectionWrapper>
      )}

      {/* All Posts */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <section>
            <h2 className="blog-all-title">All Articles</h2>
            
            {posts.length === 0 ? (
              <div className="blog-empty-state">
                <p className="blog-empty-message">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <ScrollStagger>
                <div className="blog-posts-list">
                  {regularPosts.map((post) => (
                    <ScrollStaggerItem key={post._id}>
                      <article className="blog-list-card">
                        <TextLink href={`/blog/${post.slug.current}`} className="blog-list-card-content">
                          <div className="blog-list-card-body">
                            <div className="blog-list-card-meta">
                              <span className="blog-list-card-pillar">
                                {post.pillar}
                              </span>
                              {post.readingTime && (
                                <span className="blog-list-card-readtime">
                                  {post.readingTime} min read
                                </span>
                              )}
                            </div>
                            <h3 className="blog-list-card-title">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="blog-list-card-excerpt">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                          <div className="blog-list-card-action">
                            Read →
                          </div>
                        </TextLink>
                      </article>
                    </ScrollStaggerItem>
                  ))}
                </div>
              </ScrollStagger>
            )}
          </section>
        </SectionContent>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper variant="tertiary">
        <SectionContent>
          <section>
            <CTA
              title="Ready to Build Your Executive Presence?"
              description="Get personalized guidance from an expert coach. Start with a free 30-minute presence audit."
              buttonText="Schedule Your Free Audit"
              buttonLink="/contact"
            />
          </section>
        </SectionContent>
      </SectionWrapper>
      </PageTransition>
    </main>
  );
}
