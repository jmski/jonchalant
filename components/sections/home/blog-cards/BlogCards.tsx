import { BlogCard } from '@/components/utilities/cards';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface BlogPost {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: { asset?: { url?: string }; alt?: string };
}

interface BlogCardsProps {
  posts: BlogPost[];
  heading?: string;
  description?: string;
  showFeatured?: boolean;
}

export function BlogCards({ posts, heading, description, showFeatured }: BlogCardsProps) {
  return (
    <section className="blog-cards-section">
      {heading && (
        <SectionHeader title={heading} description={description} />
      )}
      <div className="blog-cards-grid">
        {posts.map((post, index) => (
          <div key={post._id} className={index === 0 ? 'blog-card-featured' : 'blog-card-secondary'}>
            <BlogCard
              _id={post._id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              publishedAt={post.publishedAt}
              coverImage={post.coverImage}
              variant={index === 0 ? 'featured' : 'default'}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
