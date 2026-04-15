import { Metadata } from 'next';
import { client, getEmailOptIn, getBlogConfig } from '@/lib/sanity';
import { CTA } from '@/components/sections';
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout';
import { BlogClient } from './BlogClient';
import type { EmailOptInContent, BlogConfig } from '@/lib/types';
import { SeriesBanner } from '@/components/shared/series-banner';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'The Archives | Jonchalant',
  description: 'Practical writing on presence, movement, and what it actually takes to stop disappearing in rooms. Articles on executive presence coaching for introverts and corporate leaders.',
  keywords: 'executive presence, leadership coaching, quiet command, confidence, professional presence, introvert leadership, body language, nonverbal communication',
  openGraph: {
    title: 'The Archives | Jonchalant',
    description: 'Practical writing on presence, movement, and what it actually takes to stop disappearing in rooms.',
    type: 'website',
    url: 'https://jonchalant.com/blog',
    siteName: 'Jonchalant',
    locale: 'en_US',
    images: {
      url: 'https://jonchalant.com/social/og-blog-1200x630.png',
      width: 1200,
      height: 630,
      alt: 'The Archives — Jonchalant',
      type: 'image/png',
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jonchalant',
    creator: '@jonchalant',
    title: 'The Archives | Jonchalant',
    description: 'Practical writing on presence, movement, and what it actually takes to stop disappearing in rooms.',
    images: ['https://jonchalant.com/social/og-blog-1200x630.png'],
  },
};

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  metaDescription?: string;
  pillar?: string;
  readingTime?: number;
  publishedAt?: string;
  featured?: boolean;
  coverImage?: { asset?: { url?: string }; alt?: string };
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
    featured,
    coverImage { asset->{ url }, alt }
  }`;

  try {
    const posts = await client.fetch(query);
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>;
}) {
  const [posts, optIn, blogConfig, { pillar: initialPillar }] = await Promise.all([
    getBlogPosts(),
    getEmailOptIn() as Promise<EmailOptInContent | null>,
    getBlogConfig() as Promise<BlogConfig | null>,
    searchParams,
  ]);

  return (
    <main className="blog-page-main">
      <PageTransition animation="fade">
        <BlogClient
          posts={posts}
          optIn={optIn}
          siteSettings={blogConfig}
          initialPillar={initialPillar ?? null}
          seriesBanner={<SeriesBanner siteSettings={blogConfig} />}
        />

        {/* CTA Section */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section>
              <CTA
                title="Want to follow along?"
                description="The Presence Audit takes 5 minutes. No account needed. You'll get a score and a note from me."
                buttonText="Take the Presence Audit"
                buttonLink="/audit"
              />
            </section>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </main>
  );
}
