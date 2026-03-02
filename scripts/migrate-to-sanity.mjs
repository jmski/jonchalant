#!/usr/bin/env node

/**
 * Migration Script: Mock Data → Sanity
 *
 * This script takes the hardcoded mock data from the jonchalon pages
 * and migrates them to Sanity CMS.
 *
 * Usage:
 *   npm run migrate:data
 *
 * Requires:
 *   - SANITY_API_TOKEN environment variable set
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID set in .env.local
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌ Error: SANITY_API_TOKEN or NEXT_PUBLIC_SANITY_PROJECT_ID not set in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Mock data from existing pages
const PORTFOLIO_DATA = [
  {
    _type: "portfolioItem",
    title: "Ninjago Choreography | Urban Style",
    slug: { current: "ninjago-urban-style" },
    category: "choreography",
    description:
      "Original choreography to Japanese hip-hop. Featured on TikTok (2.4M views). High-energy urban style with precision footwork.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 5,
    order: 1,
  },
  {
    _type: "portfolioItem",
    title: "Midnight Dreams | Contemporary Fusion",
    slug: { current: "midnight-dreams-fusion" },
    category: "choreography",
    description:
      "Contemporary-hip hop fusion for music video. Ethereal slow sections transitioning to explosive moments. Directed & choreographed.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 7,
    order: 2,
  },
  {
    _type: "portfolioItem",
    title: "Cypher Session | Battle Flow",
    slug: { current: "cypher-session-battle" },
    category: "freestyle",
    description:
      "High-energy freestyle battle cypher. Improvisation to live beatboxing. Runner-up at NYC Freestyle Championship 2024.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 4,
    order: 3,
  },
  {
    _type: "portfolioItem",
    title: "Seoul Performance | International Stage",
    slug: { current: "seoul-festival-stage" },
    category: "performance",
    description:
      "Live performance at Seoul Dance Festival (August 2024). 8-minute showcase performance. 5000+ live audience.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 8,
    order: 4,
  },
];

const SERVICES_DATA = [
  {
    _type: "service",
    title: "Leadership Programs",
    slug: { current: "leadership-programs" },
    description: "Transform your presence and command authority with grace",
    icon: "coaching",
    features: ["1-on-1 Coaching", "Group Workshops", "Digital Courses"],
    isPrimary: true,
    color: "accent",
    order: 1,
  },
  {
    _type: "service",
    title: "Movement Coaching",
    slug: { current: "movement-coaching" },
    description: "Unlock physical grounding and body-aware presence",
    icon: "dance",
    features: ["Presence Training", "Body Mechanics", "Energy Control"],
    isPrimary: false,
    color: "accent",
    order: 2,
  },
  {
    _type: "service",
    title: "Brand Collaboration",
    slug: { current: "brand-collaboration" },
    description: "Create compelling visual narratives for your campaigns",
    icon: "collab",
    features: ["Choreography", "Content Creation", "Creative Direction"],
    isPrimary: false,
    color: "accent",
    order: 3,
  },
];

const COLLABORATIONS_DATA = [
  {
    _type: "collaboration",
    title: "Leadership Coaching for Teams",
    slug: { current: "leadership-coaching-teams" },
    category: "leadership-coaching",
    description:
      "Transform your leadership culture through the Kinetic Leader methodology. Custom workshops for executive teams seeking confident, inclusive leadership.",
    price: "Custom Quote",
    order: 1,
  },
  {
    _type: "collaboration",
    title: "Corporate Workshops",
    slug: { current: "corporate-workshops" },
    category: "organizations",
    description:
      "Build team confidence and communication skills through integrated physical and social presence training.",
    price: "$2,000-$5,000 per session",
    order: 2,
  },
  {
    _type: "collaboration",
    title: "Executive Coaching",
    slug: { current: "executive-coaching" },
    category: "speaking",
    description:
      "Guest keynote speaker on introvert leadership, quiet command, and presence development for professional conferences.",
    price: "Custom Quote",
    order: 3,
  },
  {
    _type: "collaboration",
    title: "Podcast/Media Appearances",
    slug: { current: "media-appearances" },
    category: "speaking",
    description:
      "Guest appearances discussing leadership for introverts, professional presence, and transformational coaching.",
    price: "Negotiable",
    order: 4,
  },
];

const MEDIA_KIT_DATA = {
  _type: "mediaKitData",
  title: "Media Kit Statistics",
  totalFollowers: "150K+",
  followerChange: "+15% YoY",
  avgMonthlyViews: "2.5M",
  viewsChange: "+22% YoY",
  engagementRate: "4.8%",
  engagementChange: "+0.5% YoY",
  activeSubscribers: "85K",
  subscriberChange: "+18% YoY",
  platforms: [
    {
      name: "TikTok",
      handle: "@jonhandle",
      followers: "120K",
      avgViews: "2.1M",
      category: "Dance Content",
    },
    {
      name: "Instagram",
      handle: "@jonhandle",
      followers: "45K",
      avgViews: "8K",
      category: "Photography & Reels",
    },
    {
      name: "YouTube",
      handle: "@jonhandle",
      followers: "32K",
      avgViews: "125K",
      category: "Long-form & Tutorials",
    },
  ],
  contentCategories: [
    {
      name: "Dance Choreography",
      percentage: 45,
      description: "Original choreography and dance covers",
    },
    {
      name: "Tutorials",
      percentage: 25,
      description: "Dance tutorials and how-to content",
    },
    {
      name: "Lifestyle",
      percentage: 20,
      description: "Behind-the-scenes and daily life",
    },
    {
      name: "Collaborations",
      percentage: 10,
      description: "Collaborations with other creators",
    },
  ],
};

const TESTIMONIALS_DATA = [
  {
    _type: "testimonial",
    clientName: "Sarah Chen",
    role: "VP of Sales",
    company: "TechCorp Industries",
    quote:
      "Jon transformed how I show up in meetings. I went from hiding my ideas to leading strategic conversations. The movement-based approach was revolutionary.",
    result: "87% increased confidence in 8 weeks",
    serviceType: "coaching",
    featured: true,
    order: 1,
  },
  {
    _type: "testimonial",
    clientName: "Marcus Williams",
    role: "Executive Director",
    company: "Creative Collective NYC",
    quote:
      "The corporate workshop completely changed our team dynamics. People are more present, more engaged, and the energy shifted immediately.",
    result: "76% team engagement increase post-workshop",
    serviceType: "workshop",
    featured: true,
    order: 2,
  },
];

async function migrateData() {
  console.log("🚀 Starting migration to Sanity...\n");

  try {
    // Migrate portfolio items
    console.log("📹 Migrating portfolio items...");
    for (const item of PORTFOLIO_DATA) {
      await client.create(item);
      console.log(`  ✓ Created: ${item.title}`);
    }

    // Migrate services
    console.log("\n🎯 Migrating services...");
    for (const service of SERVICES_DATA) {
      await client.create(service);
      console.log(`  ✓ Created: ${service.title}`);
    }

    // Migrate collaborations
    console.log("\n🤝 Migrating collaborations...");
    for (const collab of COLLABORATIONS_DATA) {
      await client.create(collab);
      console.log(`  ✓ Created: ${collab.title}`);
    }

    // Migrate media kit data
    console.log("\n📊 Migrating media kit data...");
    await client.create(MEDIA_KIT_DATA);
    console.log(`  ✓ Created: Media Kit Statistics`);

    // Migrate testimonials
    console.log("\n⭐ Migrating testimonials...");
    for (const testimonial of TESTIMONIALS_DATA) {
      await client.create(testimonial);
      console.log(`  ✓ Created testimonial from: ${testimonial.clientName}`);
    }

    console.log("\n✅ Migration complete! All data synced to Sanity.\n");
    console.log("📝 Next steps:");
    console.log("  1. Visit https://your-project.sanity.studio to review data");
    console.log("  2. Add real images and update any placeholder content");
    console.log("  3. Configure environment variables in .env.local");
    console.log("  4. Test Next.js integration with: npm run dev\n");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateData();
