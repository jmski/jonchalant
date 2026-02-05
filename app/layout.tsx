import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import RouteAwareLayout from "@/components/RouteAwareLayout";

export const metadata: Metadata = {
  title: "Jon | Choreographer & Content Creator",
  description: "Professional brand hub showcasing dance portfolio, hobby content, and collaboration opportunities",
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
      <body style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', margin: 0, padding: 0 }} suppressHydrationWarning>
        {/* Skip to main content link (WCAG 2.1 Level A - 2.4.1 Bypass Blocks) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4"
          style={{ 
            backgroundColor: 'var(--accent-vibrant)',
            color: 'white',
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
