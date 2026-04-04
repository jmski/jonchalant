import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

const BASE_URL = 'https://jonchalant.com';

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/programs`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/audit`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/dance`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/lessons`, priority: 0.5, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/media-kit`, priority: 0.4, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/ikigai`, priority: 0.4, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/privacy`, priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await client.fetch(
      `*[_type == "blogPost"] | order(publishedAt desc) { slug, publishedAt }`
    );

    blogRoutes = (posts ?? []).map((post: { slug: { current: string }; publishedAt?: string }) => ({
      url: `${BASE_URL}/blog/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // Sanity unavailable — static routes still returned
  }

  return [...STATIC_ROUTES, ...blogRoutes];
}
