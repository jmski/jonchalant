import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { RouteAwareLayout } from "@/components/layout";
import { Navbar, SiteFooter } from "@/components/navigation";
import { PersonSchema, OrganizationSchema, LocalBusinessSchema } from "@/lib/schema";
import { getContactInfo } from "@/lib/sanity";

// next/font self-hosts both typefaces — no external request, no render block
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase lets Next.js resolve relative OG/Twitter image URLs from /public
  metadataBase: new URL("https://jonchalant.com"),

  // title.template appends "| Jonchalant" to every page title automatically.
  // Individual pages should omit the "| Jonchalant" suffix from their own title strings.
  // title.default is used by pages with no metadata export (e.g. portal, login).
  title: {
    default: "Jonchalant | Executive Presence Coaching for Introverts",
    template: "%s | Jonchalant",
  },

  description:
    "Build executive presence and quiet command through body-aware leadership coaching. Transform your confidence with dance-based techniques designed for introverts and shy professionals.",
  keywords: [
    "leadership coaching for introverts",
    "executive presence coaching",
    "quiet command",
    "confidence coaching",
    "introvert leadership development",
    "body-aware leadership",
    "movement coaching",
  ],
  authors: [{ name: "Jon", url: "https://jonchalant.com/about" }],
  creator: "Jon",
  publisher: "Jonchalant",

  // Default robots directives — auth-gated routes override these with noindex
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Fallback OG block — individual pages override title/description/url/images
  openGraph: {
    type: "website",
    siteName: "Jonchalant",
    locale: "en_US",
    title: "Jonchalant | Executive Presence Coaching for Introverts",
    description:
      "Build executive presence and quiet command through body-aware coaching for introverts and shy professionals.",
    url: "https://jonchalant.com",
    images: {
      url: "/social/og-home-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Jonchalant — Executive Presence Coaching for Introverts",
      type: "image/png",
    },
  },

  // Fallback Twitter card — individual pages override title/description/images
  twitter: {
    card: "summary_large_image",
    site: "@jonchalant",
    creator: "@jonchalant",
    title: "Jonchalant | Executive Presence Coaching for Introverts",
    description:
      "Build executive presence and quiet command through body-aware coaching for introverts.",
    images: ["/social/og-home-1200x630.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch social links server-side so Sanity client stays out of the client JS bundle
  let socialLinks: { label: string; href: string; icon: string }[] = [];
  try {
    const contactInfo = await getContactInfo();
    if (contactInfo?.contactMethods) {
      socialLinks = contactInfo.contactMethods
        .filter((m) => ['LinkedIn', 'Instagram', 'TikTok', 'YouTube'].includes(m.label))
        .map((m) => ({
          label: m.label,
          href: m.href,
          icon: m.label.toLowerCase().includes('linkedin')
            ? 'in'
            : m.label.toLowerCase().includes('instagram')
            ? 'ig'
            : m.label.toLowerCase().includes('youtube')
            ? 'yt'
            : 'tk',
        }));
    }
  } catch {
    // Non-critical — navbar social icons are optional
  }
  return (
    <html lang="en" data-theme="default" suppressHydrationWarning className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        {/* Light-only site — tells browser not to apply forced dark-mode styles */}
        <meta name="color-scheme" content="light" />

        {/* Warm the connection before GA scripts load (no data sent) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        )}

        {/* JSON-LD Structured Data — plain <script> is inlined in initial HTML so crawlers see it immediately */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PersonSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(OrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LocalBusinessSchema()) }}
        />
      </head>
      <body suppressHydrationWarning>
          {/* Skip to main content link (WCAG 2.1 Level A - 2.4.1 Bypass Blocks) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4 bg-accent text-white"
            style={{
              fontWeight: 'bold'
            }}
          >
            Skip to main content
          </a>
          
          {/* Main Navigation Navbar */}
          <Navbar socialLinks={socialLinks} />
          
          {/* Route-Aware Layout: Renders main pages and portal/admin with their own sidebars */}
          <RouteAwareLayout>
            {children}
          </RouteAwareLayout>

          {/* Site Footer — hidden on portal/admin routes via internal pathname check */}
          <SiteFooter socialLinks={socialLinks} />

        {/* Google Analytics — afterInteractive defers load until the page is interactive */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
