import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { RouteAwareLayout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Jonchalant | Leadership Coaching & Dance Choreography",
  description: "Body-led leadership coaching for introverts. Build executive presence, quiet command, and professional confidence through movement-based coaching and choreography.",
  openGraph: {
    title: "Jonchalant | Leadership Coaching & Choreography",
    description: "Transform your presence and confidence through body-aware leadership coaching.",
    url: "https://jonchalant.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonchalant | Leadership Coaching",
    description: "Body-led leadership for introverts",
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
      </body>
    </html>
  );
}
