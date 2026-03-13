import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { BlogRelated } from '@/components/sections';
import { portableTextComponents } from '@/lib/blog/portableTextComponents';

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
  params: Promise<{
    slug: string;
  }>;
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

export async function generateStaticParams() {
  const query = `*[_type == "blogPost"] {
    slug
  }`;

  try {
    const posts = await client.fetch(query);
    return posts.map((post: any) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const description = post.metaDescription || post.excerpt || post.title;

  return {
    title: post.title,
    description,
    keywords: [post.pillar, 'executive presence', 'leadership coaching', 'introvert leadership', 'confidence'].join(', '),
    authors: [{ name: 'Jon', url: 'https://jonchalant.com/about' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `https://jonchalant.com/blog/${post.slug.current}`,
      siteName: 'Jonchalant',
      locale: 'en_US',
      images: {
        url: 'https://jonchalant.com/social/og-blog-1200x630.png',
        width: 1200,
        height: 630,
        alt: post.title,
        type: 'image/png',
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: '@jonchalant',
      creator: '@jonchalant',
      title: post.title,
      description,
      images: ['https://jonchalant.com/social/og-blog-1200x630.png'],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.pillar, slug);
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <main className="blog-main">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="blog-breadcrumb">
          <Link href="/blog" className="blog-breadcrumb-link">
            Blog
          </Link>
          <span>/</span>
          <span className="blog-breadcrumb-current">{post.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="blog-article-header">
          <div className="blog-meta">
            <span className="blog-pillar-badge">
              {post.pillar}
            </span>
            {post.readingTime && (
              <span className="blog-meta-text">
                {post.readingTime} min read
              </span>
            )}
            {publishDate && (
              <span className="blog-meta-text">
                {publishDate}
              </span>
            )}
          </div>

          <h1 className="blog-title">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="blog-excerpt">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="blog-content">
          {post.content && post.content.length > 0 ? (
            <PortableText value={post.content} components={portableTextComponents} />
          ) : (
            <p>No content available for this post.</p>
          )}
        </div>

        {/* CTA */}
        {post.cta && post.cta.url && (
          <div className="blog-cta">
            <p className="blog-cta-text">{post.cta.text || 'Ready to work with me?'}</p>
            <Link href={post.cta.url} className="blog-cta-button">
              Get Started
            </Link>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <BlogRelated posts={relatedPosts} />
        )}
      </article>

      {/* Back to Blog */}
      <div className="blog-back-section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="blog-back-link">
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
