import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { PersonSchema, OrganizationSchema, LocalBusinessSchema } from "@/lib/schema";
import MochaCursor from "@/components/utilities/cursor/MochaCursor";
import MochaSweep from "@/components/layout/MochaSweep";
import CookieConsent from "@/components/layout/CookieConsent";
// Validate env at boot — throws on missing required vars.
import "@/lib/env";

// Fraunces loads via Google Fonts @import in globals.css (next/font strips WONK silently).
// DM Sans stays on next/font — no exotic axes, no penalty.
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
    default: "Jonchalant | Find the Work You Were Meant For",
    template: "%s | Jonchalant",
  },

  description:
    "Ikigai assessment and embodiment practice for professionals who are competent, in-demand, and quietly misaligned. Find the work you were meant for — then learn to inhabit it.",
  keywords: [
    "ikigai assessment",
    "find your purpose",
    "embodiment practice",
    "corporate professionals",
    "ikigai framework",
    "four circles ikigai",
    "purpose-driven work",
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
    title: "Jonchalant | Find the Work You Were Meant For",
    description:
      "Ikigai assessment and embodiment practice for professionals who are competent, in-demand, and quietly misaligned.",
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
    title: "Jonchalant | Find the Work You Were Meant For",
    description:
      "Ikigai assessment and embodiment practice. Find the work you were meant for — then learn to inhabit it.",
    images: ["/social/og-home-1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default" suppressHydrationWarning className={dmSans.variable}>
      <head>
        {/* Light-only site — tells browser not to apply forced dark-mode styles */}
        <meta name="color-scheme" content="light" />

        {/* Warm Google Fonts connection — Fraunces @import in globals.css */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Warm the connection before GA scripts load (no data sent) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <MochaCursor />
        <MochaSweep />
        {children}

        {/* JSON-LD Structured Data — placed at end of body (valid per Google) to avoid
            hydration mismatches from browser extensions that inject scripts into <head> */}
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

        {/* Google Analytics — afterInteractive defers load until the page is interactive.
            Consent Mode v2: defaults to denied; CookieConsent banner updates on user choice. */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id="google-consent-default"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'analytics_storage': 'denied',
                    'wait_for_update': 500
                  });
                `,
              }}
            />
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
                `,
              }}
            />
            <CookieConsent />
          </>
        )}
      </body>
    </html>
  );
}
