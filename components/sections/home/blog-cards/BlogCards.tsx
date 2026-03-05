import { BlogCard } from '@/components/shared/cards';
import { CardGrid } from '@/components/shared/grids';

interface BlogPost {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
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
      {(heading || description) && (
        <div className="blog-cards-header">
          {heading && <h2 className="blog-cards-heading">{heading}</h2>}
          {description && <p className="blog-cards-description">{description}</p>}
        </div>
      )}
      <CardGrid columns={3}>
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            _id={post._id}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            publishedAt={post.publishedAt}
          />
        ))}
      </CardGrid>
    </section>
  );
}
