/**
 * JSON-LD Schema Generators
 * Provides structured data for SEO and search engine crawlers
 */

/**
 * Person Schema - for Jon as the creator/coach
 */
export function PersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jon Chal',
    url: 'https://jonchalant.com',
    image: 'https://jonchalant.com/jon-photo.jpg',
    description: 'Leadership coach and choreographer specializing in executive presence for introverts',
    jobTitle: 'Leadership Coach & Choreographer',
    knowsAbout: [
      'Leadership Coaching',
      'Executive Presence',
      'Body-Aware Leadership',
      'Dance Choreography',
      'Professional Development',
      'Introvert Strengths'
    ],
    sameAs: [
      'https://www.tiktok.com/@jonchalant',
      'https://www.instagram.com/jonchalant',
      'https://www.youtube.com/@jonchalant'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@jonchalant.com'
    }
  };
}

/**
 * LocalBusiness Schema - for Jon's coaching services
 */
export function LocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Jonchalant',
    image: 'https://jonchalant.com/logo.svg',
    description: 'Executive presence and quiet command coaching for introverts',
    telephone: '+1-555-0000', // Replace with actual number if available
    email: 'hello@jonchalant.com',
    url: 'https://jonchalant.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
      // Add city/state if applicable
    },
    priceRange: '$$',
    areaServed: 'US',
    serviceType: [
      'Leadership Coaching',
      'Executive Presence Training',
      'One-on-One Coaching',
      'Group Workshops'
    ],
    sameAs: [
      'https://www.tiktok.com/@jonchalant',
      'https://www.instagram.com/jonchalant',
      'https://www.youtube.com/@jonchalant'
    ]
  };
}

/**
 * Organization Schema - for Jonchalant as a business
 */
export function OrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jonchalant',
    url: 'https://jonchalant.com',
    logo: 'https://jonchalant.com/logo.svg',
    description: 'Body-led leadership coaching for introverts and shy professionals',
    sameAs: [
      'https://www.tiktok.com/@jonchalant',
      'https://www.instagram.com/jonchalant',
      'https://www.youtube.com/@jonchalant'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@jonchalant.com'
    }
  };
}

/**
 * Course Schema - for coaching programs
 */
export function CourseSchema(courseData: {
  name: string;
  description: string;
  price?: string;
  duration?: string;
  level?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseData.name,
    description: courseData.description,
    provider: {
      '@type': 'Organization',
      name: 'Jonchalant',
      url: 'https://jonchalant.com'
    },
    ...(courseData.price && { 
      offers: {
        '@type': 'Offer',
        currency: 'USD',
        price: courseData.price
      }
    }),
    ...(courseData.duration && { duration: courseData.duration }),
    ...(courseData.level && { educationalLevel: courseData.level })
  };
}

/**
 * BreadcrumbList Schema - for navigation hierarchy
 */
export function BreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * FAQPage Schema - for FAQ sections
 */
export function FAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * BlogPosting Schema - for individual blog post pages
 */
export function BlogPostingSchema(post: {
  title: string;
  description?: string;
  slug: string;
  publishedAt?: string;
  modifiedAt?: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description ?? '',
    url: `https://jonchalant.com/blog/${post.slug}`,
    ...(post.publishedAt && { datePublished: post.publishedAt }),
    ...(post.modifiedAt
      ? { dateModified: post.modifiedAt }
      : post.publishedAt
      ? { dateModified: post.publishedAt }
      : {}),
    image: post.imageUrl ?? 'https://jonchalant.com/social/og-blog-1200x630.png',
    author: {
      '@type': 'Person',
      name: 'Jon',
      url: 'https://jonchalant.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jonchalant',
      url: 'https://jonchalant.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jonchalant.com/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://jonchalant.com/blog/${post.slug}`,
    },
  };
}

/**
 * AggregateRating Schema - for testimonials/reviews
 */
export function AggregateRatingSchema(ratingData: {
  name: string;
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  ratingCount: number;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    name: ratingData.name,
    ratingValue: ratingData.ratingValue,
    bestRating: ratingData.bestRating || 5,
    worstRating: ratingData.worstRating || 1,
    ratingCount: ratingData.ratingCount,
    ...(ratingData.reviewCount && { reviewCount: ratingData.reviewCount })
  };
}
