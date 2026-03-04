import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { Heading } from '@/components/typography';
import { CTASection } from '@/components/sections';

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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-linear-to-b from-slate-50 to-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level={1} className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Leadership Blog
          </Heading>
          <p className="text-lg text-slate-600 max-w-2xl">
            Articles on executive presence, quiet command, confidence coaching, and leadership for introverts.
          </p>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 md:py-16 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post._id}
                  className="group overflow-hidden rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="p-6 hover:bg-slate-50 transition-colors h-full flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                          {post.pillar}
                        </span>
                        {post.readingTime && (
                          <span className="text-sm text-slate-500 whitespace-nowrap">
                            {post.readingTime} min read
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-slate-600 mb-4 grow line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Read Article →
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">All Articles</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {regularPosts.map((post) => (
                <article
                  key={post._id}
                  className="group p-6 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <Link href={`/blog/${post.slug.current}`} className="block">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                            {post.pillar}
                          </span>
                          {post.readingTime && (
                            <span className="text-sm text-slate-500">
                              {post.readingTime} min read
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-slate-600 text-sm line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 text-accent font-medium text-sm group-hover:translate-x-1 transition-transform whitespace-nowrap">
                        Read →
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Build Your Executive Presence?"
        description="Get personalized guidance from an expert coach. Start with a free 30-minute presence audit."
        buttonText="Schedule Your Free Audit"
        buttonLink="/contact"
      />
    </main>
  );
}
