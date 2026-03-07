import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { Heading } from '@/components/typography';
import { CTA, BlogFeatured, BlogPosts } from '@/components/sections';
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout';

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
              <BlogFeatured posts={featuredPosts} />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* All Posts */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <BlogPosts posts={regularPosts} />
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
