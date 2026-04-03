import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { BlogRelated } from '@/components/sections';
import { portableTextComponents } from '@/lib/blog/portableTextComponents';
import { BlogToC } from './BlogToC';
import { extractHeadings } from './headings';
import { BlogShare } from './BlogShare';
import { BlogPostingSchema } from '@/lib/schema';

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
  const headings = extractHeadings(post.content ?? []);

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <main className="blog-main">
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(BlogPostingSchema({
            title: post.title,
            description: post.metaDescription || post.excerpt,
            slug: post.slug.current,
            publishedAt: post.publishedAt,
          })),
        }}
      />
      {/* Breadcrumb */}
      <div className="blog-breadcrumb-bar">
        <div className="blog-breadcrumb">
          <Link href="/blog" className="blog-breadcrumb-link">
            Blog
          </Link>
          <span>/</span>
          <span className="blog-breadcrumb-current">{post.title}</span>
        </div>
      </div>

      {/* Two-column layout: ToC sidebar + article */}
      <div className="blog-layout">

        {/* Sticky ToC — only renders on desktop when there are headings */}
        {headings.length > 0 && (
          <div className="blog-toc-col">
            <BlogToC headings={headings} />
          </div>
        )}

        {/* Main article column */}
        <article className="blog-article-col">

          {/* Article Header */}
          <header className="blog-article-header">
            <div className="blog-meta">
              <span className="blog-pillar-badge">{post.pillar}</span>

              {post.readingTime && (
                <span className="blog-meta-text blog-meta-readtime">
                  {/* Clock icon */}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {post.readingTime} min read
                </span>
              )}

              {publishDate && (
                <span className="blog-meta-text">{publishDate}</span>
              )}
            </div>

            <h1 className="blog-title">{post.title}</h1>

            {post.excerpt && (
              <p className="blog-excerpt">{post.excerpt}</p>
            )}

            {/* Share buttons — below excerpt, above the rule */}
            <BlogShare title={post.title} />
          </header>

          {/* Body content */}
          <div className="blog-content">
            {post.content && post.content.length > 0 ? (
              <PortableText value={post.content} components={portableTextComponents} />
            ) : (
              <p>No content available for this post.</p>
            )}
          </div>

          {/* Bottom share — after reading the full article */}
          <div className="blog-share-bottom">
            <p className="blog-share-bottom-label">Found this useful? Share it.</p>
            <BlogShare title={post.title} />
          </div>

          {/* Post-level CTA */}
          {post.cta && post.cta.url && (
            <div className="blog-cta">
              <p className="blog-cta-text">{post.cta.text || 'Ready to work with me?'}</p>
              <Link href={post.cta.url} className="blog-cta-button">
                Get Started
              </Link>
            </div>
          )}

          {/* Related posts from same pillar */}
          {relatedPosts.length > 0 && (
            <BlogRelated posts={relatedPosts} />
          )}

          {/* Back link */}
          <div className="blog-back-section">
            <Link href="/blog" className="blog-back-link">
              ← Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
