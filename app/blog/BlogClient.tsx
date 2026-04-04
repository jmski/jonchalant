'use client';

import { useState, useMemo } from 'react';
import { BlogCard } from '@/components/utilities/cards';
import { BlogOptIn } from '@/components/forms/BlogOptIn';
import { ScrollStagger, ScrollStaggerItem } from '@/components/animations';
import { SectionWrapper, SectionContent } from '@/components/layout';
import type { EmailOptInContent } from '@/lib/types';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  pillar: string;
  readingTime?: number;
  publishedAt?: string;
  featured?: boolean;
}

interface BlogClientProps {
  posts: BlogPost[];
  optIn?: EmailOptInContent | null;
}

export function BlogClient({ posts, optIn }: BlogClientProps) {
  const categories = useMemo(() => {
    const pillars = posts.map((p) => p.pillar).filter(Boolean)
    return ['All', ...Array.from(new Set(pillars))]
  }, [posts])

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const isFiltering = search.trim() !== '' || activeCategory !== 'All';


  const filtered = useMemo(() => {
    let result = posts;

    if (activeCategory !== 'All') {
      result = result.filter(
        (p) => p.pillar?.toLowerCase() === activeCategory.toLowerCase(),
      );
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
  }, [posts, search, activeCategory]);

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <>
      {/* Hero + Search */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <div className="blog-page-header">
            <h1 className="blog-page-title">Leadership Blog</h1>
            <p className="blog-page-subtitle">
              Articles on executive presence, quiet command, confidence coaching, and leadership for introverts.
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
          </div>
        </SectionContent>
      </SectionWrapper>

      {/* Category Filter */}
      <SectionWrapper variant="secondary">
        <SectionContent>
          <div
            className="blog-filter-tabs"
            role="tablist"
            aria-label="Filter articles by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`blog-filter-tab${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
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
                  {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
                  {search ? ` matching "${search}"` : ''}.
                </p>
                <button
                  type="button"
                  className="blog-no-results-reset"
                  onClick={() => {
                    setSearch('');
                    setActiveCategory('All');
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
                    {activeCategory !== 'All' ? ` — ${activeCategory}` : ''}
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
          {/* Featured articles (default view only) */}
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
