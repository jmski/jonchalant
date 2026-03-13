import { ScrollStagger, ScrollStaggerItem } from '@/components/animations';
import { BlogCard } from '@/components/utilities/cards';
import { BlogOptIn } from '@/components/forms/BlogOptIn';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  pillar: string;
  readingTime?: number;
  publishedAt?: string;
}

interface PostsProps {
  posts: BlogPost[];
}

export function Posts({ posts }: PostsProps) {
  if (posts.length === 0) {
    return (
      <div className="blog-empty-state">
        <p className="blog-empty-message">
          No blog posts yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <section className="blog-posts-section">
      <div className="blog-posts-section-header">
        <h2 className="blog-posts-section-title">All Articles</h2>
      </div>
      <ScrollStagger>
        <div className="blog-posts-list">
          {posts.map((post) => (
            <ScrollStaggerItem key={post._id}>
              <BlogCard
                {...post}
                variant="list"
              />
            </ScrollStaggerItem>
          ))}
        </div>
      </ScrollStagger>

      <BlogOptIn />
    </section>
  );
}
