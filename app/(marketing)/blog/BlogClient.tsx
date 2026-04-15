'use client';

import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { BlogCard } from '@/components/utilities/cards';
import { BlogOptIn } from '@/components/forms/BlogOptIn';
import { ScrollStagger, ScrollStaggerItem } from '@/components/animations';
import { SectionWrapper, SectionContent } from '@/components/layout';
import type { EmailOptInContent, BlogConfig } from '@/lib/types';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  pillar?: string;
  readingTime?: number;
  publishedAt?: string;
  featured?: boolean;
  coverImage?: { asset?: { url?: string }; alt?: string };
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'the-lab', label: 'The Lab' },
  { id: 'movement-body', label: 'Movement & Body' },
  { id: 'presence-confidence', label: 'Presence & Confidence' },
  { id: 'leadership-career', label: 'Leadership & Career' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

interface BlogClientProps {
  posts: BlogPost[];
  optIn?: EmailOptInContent | null;
  siteSettings?: BlogConfig | null;
  initialPillar?: string | null;
  seriesBanner?: ReactNode;
}

export function BlogClient({ posts, optIn, initialPillar, seriesBanner }: BlogClientProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterId>(() => {
    if (initialPillar && FILTERS.some((f) => f.id === initialPillar)) {
      return initialPillar as FilterId;
    }
    return 'all';
  });

  const isFiltering = search.trim() !== '' || activeFilter !== 'all';

  const filtered = useMemo(() => {
    let result = posts;

    if (activeFilter !== 'all') {
      result = result.filter((p) => p.pillar === activeFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.pillar?.toLowerCase().includes(q),
      );
    }

    return result;
  }, [posts, search, activeFilter]);

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <>
      {/* Hero + Search */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <div className="blog-page-header">
            <h1 className="blog-page-title">The Archives</h1>
            <p className="blog-page-subtitle">
              Practical writing on presence, movement, and what it actually takes to stop disappearing in rooms.
            </p>
            <div className="blog-search-bar">
              <svg
                className="blog-search-icon"
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="blog-search-input"
                aria-label="Search articles"
              />
              {search && (
                <button
                  type="button"
                  className="blog-search-clear"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div
              className="blog-filter-tabs"
              role="tablist"
              aria-label="Filter articles by category"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={activeFilter === f.id}
                  className={`blog-filter-tab${activeFilter === f.id ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </SectionContent>
      </SectionWrapper>

      {/* Filtered results */}
      {isFiltering ? (
        <SectionWrapper variant="primary">
          <SectionContent>
            {filtered.length === 0 ? (
              <div className="blog-no-results">
                <p className="blog-no-results-message">
                  No articles found
                  {activeFilter !== 'all' ? ` in "${FILTERS.find((f) => f.id === activeFilter)?.label}"` : ''}
                  {search ? ` matching "${search}"` : ''}.
                </p>
                <button
                  type="button"
                  className="blog-no-results-reset"
                  onClick={() => {
                    setSearch('');
                    setActiveFilter('all');
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <section className="blog-posts-section">
                <div className="blog-posts-section-header">
                  <h2 className="blog-posts-section-title">
                    {filtered.length} {filtered.length === 1 ? 'Article' : 'Articles'}
                    {activeFilter !== 'all' ? ` — ${FILTERS.find((f) => f.id === activeFilter)?.label}` : ''}
                  </h2>
                </div>
                <ScrollStagger>
                  <div className="blog-posts-list">
                    {filtered.map((post) => (
                      <ScrollStaggerItem key={post._id}>
                        <BlogCard {...post} variant="list" />
                      </ScrollStaggerItem>
                    ))}
                  </div>
                </ScrollStagger>
                <BlogOptIn optIn={optIn} />
              </section>
            )}
          </SectionContent>
        </SectionWrapper>
      ) : (
        <>
          {/* Series banner — shown in default (non-filtered) view */}
          {/* SectionContent intentionally omitted: series-banner is full-bleed, */}
          {/* series-banner-inner constrains the content width internally */}
          {seriesBanner && (
            <SectionWrapper variant="secondary">
              {seriesBanner}
            </SectionWrapper>
          )}

          {/* Featured articles */}
          {featuredPosts.length > 0 && (
            <SectionWrapper variant="secondary">
              <SectionContent>
                <section className="blog-featured-section">
                  <div className="blog-featured-section-header">
                    <h2 className="blog-featured-section-title">Featured</h2>
                  </div>
                  <ScrollStagger>
                    <div className="blog-featured-grid">
                      {featuredPosts.map((post) => (
                        <ScrollStaggerItem key={post._id}>
                          <BlogCard {...post} variant="featured" />
                        </ScrollStaggerItem>
                      ))}
                    </div>
                  </ScrollStagger>
                </section>
              </SectionContent>
            </SectionWrapper>
          )}

          {/* Empty state — only when there are truly no posts at all */}
          {posts.length === 0 && (
            <SectionWrapper variant="primary">
              <SectionContent>
                <div className="blog-empty-state">
                  <p className="blog-empty-message">No blog posts yet. Check back soon!</p>
                </div>
              </SectionContent>
            </SectionWrapper>
          )}

          {/* All articles */}
          {regularPosts.length > 0 && (
            <SectionWrapper variant="primary">
              <SectionContent>
                <section className="blog-posts-section">
                  <div className="blog-posts-section-header">
                    <h2 className="blog-posts-section-title">All Articles</h2>
                  </div>
                  <ScrollStagger>
                    <div className="blog-posts-list">
                      {regularPosts.map((post) => (
                        <ScrollStaggerItem key={post._id}>
                          <BlogCard {...post} variant="list" />
                        </ScrollStaggerItem>
                      ))}
                    </div>
                  </ScrollStagger>
                  <BlogOptIn optIn={optIn} />
                </section>
              </SectionContent>
            </SectionWrapper>
          )}
        </>
      )}
    </>
  );
}
