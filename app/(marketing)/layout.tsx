import { Navbar, SiteFooter } from '@/components/navigation';
import { getContactInfo, getEmailOptIn } from '@/lib/sanity';
import type { EmailOptInContent } from '@/lib/types';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let socialLinks: { label: string; href: string; icon: string }[] = [];
  let optIn: EmailOptInContent | null = null;
  try {
    const [contactInfo, emailOptIn] = await Promise.all([
      getContactInfo(),
      getEmailOptIn(),
    ]);
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
    optIn = emailOptIn ?? null;
  } catch {
    // Non-critical — Navbar and Footer extras are optional
  }

  return (
    <>
      <Navbar />
      <main className="main-content" id="main-content">
        {children}
      </main>
      <SiteFooter socialLinks={socialLinks} optIn={optIn} />
    </>
  );
}
