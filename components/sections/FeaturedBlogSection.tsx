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
    <section className="bg-linear-to-b from-slate-50 to-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded mb-4 bg-blue-100 text-blue-700">
            Insights & Resources
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Read Latest Articles
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Practical insights on executive presence, quiet command, and leadership coaching for introverts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <article className="group h-full flex flex-col p-6 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-lg bg-white hover:bg-slate-50 transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide bg-slate-100 px-2.5 py-1 rounded whitespace-nowrap">
                    {post.pillar}
                  </span>
                  {post.readingTime && (
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {post.readingTime} min
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-slate-600 mb-4 grow line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Read Article →
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA to Blog */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-lg text-slate-900 font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors"
          >
            View All Articles
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
