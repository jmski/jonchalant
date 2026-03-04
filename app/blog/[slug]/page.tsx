import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

interface BlogPostDocument {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  metaDescription?: string;
  pillar: string;
  content: any[];
  readingTime?: number;
  publishedAt?: string;
  cta?: {
    text?: string;
    url?: string;
  };
}

interface Props {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPostDocument | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    metaDescription,
    pillar,
    content,
    readingTime,
    publishedAt,
    cta
  }`;

  try {
    const post = await client.fetch(query, { slug });
    return post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getRelatedPosts(pillar: string, currentSlug: string): Promise<BlogPostDocument[]> {
  const query = `*[_type == "blogPost" && pillar == $pillar && slug.current != $currentSlug][0...3] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    pillar,
    readingTime,
    publishedAt
  }`;

  try {
    const posts = await client.fetch(query, { pillar, currentSlug });
    return posts || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Jonchalant`,
    description: post.metaDescription || post.excerpt || post.title,
    keywords: [post.pillar, 'executive presence', 'leadership coaching', 'confidence'].join(', '),
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `https://jonchalant.com/blog/${post.slug.current}`,
    },
  };
}

const portableTextComponents = {
  types: {
    block: ({ value }: any) => {
      const style = value._type === 'block' ? value.style : 'normal';

      if (style === 'h2') {
        return <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{value.children.map((child: any) => child.text).join('')}</h2>;
      }
      if (style === 'h3') {
        return <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">{value.children.map((child: any) => child.text).join('')}</h3>;
      }
      if (style === 'blockquote') {
        return (
          <blockquote className="pl-4 py-2 border-l-4 border-blue-600 italic text-slate-700 my-6">
            {value.children.map((child: any) => child.text).join('')}
          </blockquote>
        );
      }

      return (
        <p className="text-slate-700 leading-relaxed mb-4">
          {value.children?.map((child: any) => (
            <span key={child._key || Math.random()}>
              {child.text}
            </span>
          ))}
        </p>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => (
      <a href={value?.href} className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.pillar, params.slug);
  const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/blog" className="hover:text-slate-900">Blog</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{post.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide bg-slate-100 px-3 py-1 rounded">
              {post.pillar}
            </span>
            {post.readingTime && (
              <span className="text-sm text-slate-600">
                {post.readingTime} min read
              </span>
            )}
            {publishDate && (
              <span className="text-sm text-slate-600">
                {publishDate}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-slate-600 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-16 text-slate-700">
          {post.content && post.content.length > 0 ? (
            <PortableText value={post.content} components={portableTextComponents} />
          ) : (
            <p>No content available for this post.</p>
          )}
        </div>

        {/* CTA */}
        {post.cta && post.cta.url && (
          <div className="my-12 p-8 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-700 mb-4">{post.cta.text || 'Ready to work with me?'}</p>
            <Link
              href={post.cta.url}
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`}>
                  <article className="group p-6 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors h-full">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      {relatedPost.pillar}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {relatedPost.readingTime && (
                        <span className="text-xs text-slate-500">
                          {relatedPost.readingTime} min read
                        </span>
                      )}
                      <span className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Read →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
