import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { RouteAwareLayout } from "@/components/layout";
import { Navbar } from "@/components/navigation";
import { PersonSchema, OrganizationSchema, LocalBusinessSchema } from "@/lib/schema";
import { AuthProvider } from "@/lib/auth-context";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        {/* FOUC Prevention: Apply stored theme before page renders */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('jonchalon-theme') || 'default';
                document.documentElement.setAttribute('data-theme', stored);
              })();
            `,
          }}
        />
        
        {/* JSON-LD Structured Data */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(PersonSchema()),
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(OrganizationSchema()),
          }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LocalBusinessSchema()),
          }}
        />
        
        {/* Google Analytics */}
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
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
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
          <Navbar />
          
          {/* Route-Aware Layout: Renders main pages and portal/admin with their own sidebars */}
          <RouteAwareLayout>
            {children}
          </RouteAwareLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
