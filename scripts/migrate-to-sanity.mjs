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

const LESSONS_DATA = [
  {
    _type: "lesson",
    title: "Eye Contact Without Intensity",
    slug: { current: "eye-contact-without-intensity" },
    category: "Beginner",
    pillar: "Physical Grounding",
    description:
      "Master the 70/30 rule: Hold eye contact for 70% of conversation, look away 30%. Maintain presence without intimidation.",
    duration: "8 min read",
    icon: "👁️",
    order: 1,
  },
  {
    _type: "lesson",
    title: "The Power Pause",
    slug: { current: "the-power-pause" },
    category: "Beginner",
    pillar: "Physical Grounding",
    description:
      "Learn to command space through deliberate silence. Strategic pauses amplify presence and authority without words.",
    duration: "6 min read",
    icon: "⏸️",
    order: 2,
  },
  {
    _type: "lesson",
    title: "Active Listening Scripts",
    slug: { current: "active-listening-scripts" },
    category: "Beginner",
    pillar: "Social Scripting",
    description:
      'Templated responses that make people feel heard. "So what you\'re saying is..." frameworks to deepen connection.',
    duration: "10 min read",
    icon: "👂",
    order: 3,
  },
  {
    _type: "lesson",
    title: "The Confident Introduction",
    slug: { current: "the-confident-introduction" },
    category: "Beginner",
    pillar: "Social Scripting",
    description:
      "A 30-second introduction framework that positions your value without overselling. Perfect for networking and first meetings.",
    duration: "7 min read",
    icon: "🤝",
    order: 4,
  },
  {
    _type: "lesson",
    title: "Body Language Mapping",
    slug: { current: "body-language-mapping" },
    category: "Intermediate",
    pillar: "Physical Grounding",
    description:
      "Decode what your body is communicating. Posture, hand placement, and stance adjustments that signal confidence.",
    duration: "12 min read",
    icon: "💪",
    order: 5,
  },
  {
    _type: "lesson",
    title: "Managing Social Fatigue",
    slug: { current: "managing-social-fatigue" },
    category: "Intermediate",
    pillar: "Energy Mastery",
    description:
      "Strategic activation and recovery protocols. How to maintain presence through long events without burnout.",
    duration: "11 min read",
    icon: "🔋",
    order: 6,
  },
];

const PROGRAMS_DATA = [
  {
    _type: "program",
    title: "The 90-Day Presence Pivot",
    slug: { current: "90-day-presence-pivot" },
    category: "Premium 1-on-1 Coaching",
    description:
      "Intensive 12-week personal transformation. Weekly sessions, customized movement modules, social scripting frameworks, and ongoing support. For introverts seeking leadership promotions or major career transitions.",
    investment: "Custom Quote",
    features: [
      "12 weekly 1-on-1 sessions",
      "Personalized movement coaching",
      "Social mechanics framework",
      "Energy management strategy",
      "Pre-interview/presentation coaching",
      "Lifetime community access",
    ],
    order: 1,
  },
  {
    _type: "program",
    title: "Social Choreography Workshop",
    slug: { current: "social-choreography-workshop" },
    category: "Group Training (6 weeks)",
    description:
      "Learn the three pillars in a cohort-based format. Meet other ambitious introverts, practice live, receive feedback. For those seeking guided learning with peer support.",
    investment: "$1,500",
    features: [
      "6 weekly 2-hour group sessions",
      "Physical Grounding module",
      "Social Scripting workshop",
      "Energy Mastery deep dive",
      "Group practice & feedback",
      "Private community",
    ],
    order: 2,
  },
  {
    _type: "program",
    title: "The Quiet Command Essentials",
    slug: { current: "quiet-command-essentials" },
    category: "Self-Paced Digital Course",
    description:
      "Video modules, worksheets, and frameworks you can learn at your own pace. Foundation-level introduction to Physical Grounding and Social Scripting.",
    investment: "$297",
    features: [
      "8 HD video modules",
      "Downloadable worksheets",
      "Social framework templates",
      "Body language checklists",
      "Quick-reference guides",
      "Email support included",
    ],
    order: 3,
  },
  {
    _type: "program",
    title: "Interview & Pitch Coaching",
    slug: { current: "interview-pitch-coaching" },
    category: "High-Stakes Preparation",
    description:
      "Specialized coaching for critical moments. Job interviews, investor pitches, presentations. 1-on-1 training with live practice and video feedback.",
    investment: "$500-$1,000",
    features: [
      "3-5 intensive sessions",
      "Mock interview/pitch practice",
      "Video feedback & analysis",
      "Body language optimization",
      "Q&A strategy development",
      "Anxiety management techniques",
    ],
    order: 4,
  },
];

// Page Metadata
const PAGE_METADATA = [
  {
    _type: "pageMetadata",
    page: "dance",
    headline: "Dance Portfolio",
    subheadline: "Choreography, freestyle performances, and artistic movement.",
    ctaTitle: "Let's Create Together",
    ctaDescription:
      "Ready to collaborate on a dance project? Reach out with your vision.",
    ctaButtonText: "Start a Project",
  },
  {
    _type: "pageMetadata",
    page: "lessons",
    headline: "Social Presence Mastery",
    subheadline:
      "Transform your communication style and build genuine confidence in any environment.",
    ctaTitle: "Start Learning Today",
    ctaDescription:
      "Discover the frameworks that help introverts lead with authentic authority.",
    ctaButtonText: "Explore Lessons",
  },
  {
    _type: "pageMetadata",
    page: "programs",
    headline: "Coaching Programs",
    subheadline:
      "Choose your path to Quiet Command. From self-paced courses to premium 1-on-1 coaching.",
    ctaTitle: "Ready to Transform?",
    ctaDescription:
      "Start with a free Presence Audit to discover the perfect program for your goals.",
    ctaButtonText: "Book Your Audit",
  },
  {
    _type: "pageMetadata",
    page: "collaborations",
    headline: "Let's Work Together",
    subheadline:
      "Collaborate on projects that move audiences and build lasting partnerships.",
    ctaTitle: "Discuss Your Project",
    ctaDescription:
      "Share your vision and let's explore how we can create something memorable.",
    ctaButtonText: "Start a Conversation",
  },
  {
    _type: "pageMetadata",
    page: "contact",
    headline: "Get in Touch",
    subheadline:
      "Have questions about programs? Ready to book a Presence Audit? Reach out—I respond within 48 hours.",
    ctaTitle: "Contact Methods",
    ctaDescription: "Choose your preferred way to connect.",
    ctaButtonText: "Send Message",
  },
  {
    _type: "pageMetadata",
    page: "mediaKit",
    headline: "Media Kit",
    subheadline:
      "Audience statistics, engagement metrics, and collaboration opportunities.",
    ctaTitle: "Download Media Kit",
    ctaDescription: "Get comprehensive data for partnership discussions.",
    ctaButtonText: "Download PDF",
  },
  {
    _type: "pageMetadata",
    page: "home",
    headline: "The Kinetic Leader",
    subheadline:
      "Transform your presence and command rooms with quiet authority.",
    ctaTitle: "Ready to Lead Differently?",
    ctaDescription: "Start your journey to authentic leadership today.",
    ctaButtonText: "Book Free Audit",
  },
];

// Contact Information
const CONTACT_INFO = {
  _type: "contactInfo",
  title: "Contact Information",
  contactMethods: [
    {
      label: "Email",
      value: "jon@jonchalon.com",
      href: "mailto:jon@jonchalon.com",
      order: 0,
    },
    {
      label: "Instagram",
      value: "@jonchalon",
      href: "https://instagram.com/jonchalon",
      order: 1,
    },
    {
      label: "TikTok",
      value: "@jonchalon",
      href: "https://tiktok.com/@jonchalon",
      order: 2,
    },
  ],
};

// About Page Content
const ABOUT_PAGE = {
  _type: "aboutPage",
  title: "About",
  heroHeadline: "From the Back of the Room to the Front of the Floor",
  heroDescription:
    "For most of my life, I believed that leadership was a loud man's game. As a natural introvert, I was the one who overthought every email, stayed quiet in meetings, and felt like my social battery was perpetually at 5%.",
  originSectionHeadline:
    "Everything changed when I stopped thinking and started moving.",
  originSectionDescription:
    "I discovered that the same coordination, posture, and presence required on the dance floor were the exact 'mechanics' missing from my professional life. Dance taught me how to inhabit my body and take up space without saying a word.",
  phases: [
    {
      title: "Dance & Discipline",
      description:
        "I discovered movement as a language for expression that bypassed all my introverted self-doubt. My body could say things my words couldn't.",
    },
    {
      title: "Sales & Service",
      description:
        "I took that physical grounding into the high-pressure world of the fitness industry and realized that introverts don't need to change their personalities—they just need a better script and a stronger physical foundation.",
    },
    {
      title: "The Mission",
      description:
        "Today, I've mastered the skills to lead despite my introversion. I created The Kinetic Leader to help other quiet experts use movement and social mechanics to command the room—all while protecting their energy.",
    },
  ],
  stats: [
    { label: "Years Experience", value: "8+" },
    { label: "Clients Coached", value: "50+" },
    { label: "Transformations", value: "100%*" },
    { label: "Introvert-Led", value: "✓" },
  ],
};

// Home Page Content
const HOME_PAGE = {
  _type: "homePageContent",
  title: "Home Page",
  stats: [
    { label: "Coaching Clients Transformed", value: "100+" },
    { label: "Brand Collaborations", value: "30+" },
    { label: "Years in Creative Direction", value: "8+" },
  ],
  impactSectionHeadline: "Where I Create Impact",
  featuredMainTitle: "Dance & Movement Direction",
  featuredMainDescription:
    "Choreography, performance, and creative direction for brands and artists. I blend precision with expression—creating movement that communicates and inspires.",
  sidebarFeatures: [
    {
      title: "Leadership Coaching",
      description:
        "Transform your presence and command rooms with quiet authority.",
    },
    {
      title: "Brand Partnerships",
      description: "Collaborate on campaigns that move audiences.",
    },
  ],
  servicesHeadline: "Services & Offerings",
  servicesDescription:
    "Comprehensive solutions tailored to help you move better, lead stronger, and collaborate smarter.",
};

// Dance Category Filter
const DANCE_CATEGORIES = {
  _type: "danceCategoryFilter",
  title: "Dance Categories",
  categories: [
    { name: "All", order: 0 },
    { name: "Choreography", order: 1 },
    { name: "Freestyle", order: 2 },
    { name: "Performance", order: 3 },
  ],
};

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

    // Migrate lessons
    console.log("\n📚 Migrating lessons...");
    for (const lesson of LESSONS_DATA) {
      await client.create(lesson);
      console.log(`  ✓ Created: ${lesson.title}`);
    }

    // Migrate programs
    console.log("\n🎓 Migrating programs...");
    for (const program of PROGRAMS_DATA) {
      await client.create(program);
      console.log(`  ✓ Created: ${program.title}`);
    }

    // Migrate page metadata
    console.log("\n📄 Migrating page metadata...");
    for (const page of PAGE_METADATA) {
      await client.create(page);
      console.log(`  ✓ Created metadata for: ${page.page}`);
    }

    // Migrate contact information
    console.log("\n📧 Migrating contact information...");
    await client.create(CONTACT_INFO);
    console.log(`  ✓ Created: Contact Information`);

    // Migrate about page content
    console.log("\n👤 Migrating about page content...");
    await client.create(ABOUT_PAGE);
    console.log(`  ✓ Created: About Page Content`);

    // Migrate home page content
    console.log("\n🏠 Migrating home page content...");
    await client.create(HOME_PAGE);
    console.log(`  ✓ Created: Home Page Content`);

    // Migrate dance categories
    console.log("\n💃 Migrating dance categories...");
    await client.create(DANCE_CATEGORIES);
    console.log(`  ✓ Created: Dance Category Filter`);

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
