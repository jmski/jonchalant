import { ScrollStagger, ScrollStaggerItem } from '@/components/animations';
import { BlogCard } from '@/components/utilities/cards';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  pillar: string;
  readingTime?: number;
  publishedAt?: string;
}

interface FeaturedProps {
  posts: BlogPost[];
}

export function Featured({ posts }: FeaturedProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="blog-featured-section">
      <div className="blog-featured-section-header">
        <h2 className="blog-featured-section-title">Featured</h2>
      </div>
      <ScrollStagger>
        <div className="blog-featured-grid">
          {posts.map((post) => (
            <ScrollStaggerItem key={post._id}>
              <BlogCard
                {...post}
                variant="featured"
              />
            </ScrollStaggerItem>
          ))}
        </div>
      </ScrollStagger>
    </section>
  );
}
