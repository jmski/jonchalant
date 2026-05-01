import { Navbar, SiteFooter } from '@/components/navigation';
import { getNewsletterCapture, getSiteConfig } from '@/lib/sanity';
import type { NewsletterCapture, SiteConfig } from '@/lib/types';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let siteConfig: SiteConfig | null = null;
  let newsletter: NewsletterCapture | null = null;
  try {
    const [config, optIn] = await Promise.all([
      getSiteConfig(),
      getNewsletterCapture(),
    ]);
    siteConfig = config ?? null;
    newsletter = optIn ?? null;
  } catch {
    // Non-critical — Footer extras are optional
  }

  return (
    <>
      <Navbar />
      <main className="main-content" id="main-content">
        {children}
      </main>
      <SiteFooter siteConfig={siteConfig} newsletter={newsletter} />
    </>
  );
}
