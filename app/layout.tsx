import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { RouteAwareLayout } from "@/components/layout";
import { PersonSchema, OrganizationSchema, LocalBusinessSchema } from "@/lib/schema";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Leadership Coaching for Introverts | Executive Presence & Quiet Command | Jonchalant",
  description: "Build executive presence and quiet command through body-aware leadership coaching. Transform your confidence with dance-based techniques designed for introverts and shy professionals.",
  keywords: "leadership coaching for introverts, executive presence coaching, quiet command, confidence coaching, introvert leadership development, body-aware leadership, movement coaching",
  openGraph: {
    title: "Leadership Coaching for Introverts | Executive Presence | Jonchalant",
    description: "Build executive presence and quiet command through body-aware coaching. Originally trained in dance, Jon helps introverts develop professional confidence.",
    url: "https://jonchalant.com",
    type: "website",
    siteName: "Jonchalant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership Coaching for Introverts | Jonchalant",
    description: "Build executive presence, quiet command, and professional confidence",
    creator: "@jonchalant",
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
          
          {/* Route-Aware Layout: Home shows ToC, content pages show sidebar */}
          <RouteAwareLayout>
            {children}
          </RouteAwareLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
