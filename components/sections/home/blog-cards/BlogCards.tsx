import { BlogCard } from '@/components/utilities/cards';
import { CardGrid } from '@/components/utilities/grids';
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
      <CardGrid columns={3}>
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            _id={post._id}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            publishedAt={post.publishedAt}
            coverImage={post.coverImage}
          />
        ))}
      </CardGrid>
    </section>
  );
}
