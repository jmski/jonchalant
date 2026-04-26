import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Jonchalant collects, uses, and protects your personal information under PIPEDA.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    /* LEGAL: Review with a lawyer before going live with real clients */
    <main className="privacy-page">
      <div className="privacy-container">

        <p className="privacy-effective-date">Effective: January 1, 2026</p>
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-intro">
          Jonchalant is operated by Jon, an executive presence coach based in Canada. This policy
          explains how we collect, use, and protect your personal information in accordance with the{' '}
          <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA).
        </p>

        {/* 1 */}
        <h2>1. Information We Collect</h2>

        <p>
          <strong>Email opt-in (Jonchalant newsletter).</strong> When you subscribe to the newsletter, we collect your email address. You are providing
          this information voluntarily and consenting to receive weekly emails from Jon at
          the time of submission.
        </p>

        <p>
          <strong>Portal account registration.</strong> When you create an account on the coaching
          portal, we collect your name and email address via Supabase Auth. If you choose to sign in
          with Google, we also receive the name, email address, and profile picture associated with
          your Google account, as permitted by Google&rsquo;s OAuth scope.
        </p>

        <p>
          <strong>Lesson progress and usage data.</strong> Once you are logged in to the portal, we
          store your lesson progress and course completion records in Supabase so that your progress
          is saved between sessions.
        </p>

        <p>
          <strong>No analytics or tracking.</strong> We do not use Google Analytics, Facebook Pixel,
          or any third-party advertising or behavioural tracking tools on this website.
        </p>

        {/* 2 */}
        <h2>2. How We Use Your Information</h2>

        <p>
          We use the information we collect for the following purposes only:
        </p>

        <p>
          To deliver the Jonchalant newsletter to your inbox after you opt in. To create and
          manage your coaching portal account and save your lesson progress. To send
          coaching-related emails — including the welcome sequence, lesson updates, and relevant
          coaching resources — to subscribers who have opted in. We will not send marketing
          communications without your prior consent.
        </p>

        <p>
          We do not sell, rent, or share your personal information with any third parties for their
          own marketing purposes, under any circumstances.
        </p>

        {/* 3 */}
        <h2>3. Data Storage and Security</h2>

        <p>
          Your data is stored securely using Supabase, a hosted infrastructure provider that
          implements industry-standard security practices including encryption at rest and in
          transit. Supabase operates under its own privacy policy, which governs how it handles
          data on our behalf. We use Supabase as a data processor; we remain responsible for
          determining how and why your data is used.
        </p>

        <p>
          While we take reasonable precautions to protect your information, no method of electronic
          transmission or storage is 100% secure. We encourage you to use a strong, unique password
          for your portal account.
        </p>

        {/* 4 */}
        <h2>4. Your Rights Under PIPEDA</h2>

        <p>
          As a resident of Canada, you have the following rights with respect to your personal
          information held by Jonchalant:
        </p>

        <p>
          <strong>Right to access.</strong> You may request a copy of the personal information we
          hold about you at any time.
        </p>

        <p>
          <strong>Right to correct.</strong> If any of your personal information is inaccurate or
          incomplete, you may request that we correct it.
        </p>

        <p>
          <strong>Right to withdraw consent.</strong> You may withdraw your consent to receiving
          email communications at any time by clicking the unsubscribe link in any email, or by
          contacting us directly. Withdrawing consent to marketing emails does not affect your
          portal account.
        </p>

        <p>
          To exercise any of these rights, please use the{' '}
          <Link href="/contact">contact page</Link>. We will respond to requests within 30 days.
        </p>

        {/* 5 */}
        <h2>5. Cookies</h2>

        <p>
          We use only functional cookies that are strictly necessary to operate the coaching portal.
          These are session cookies set by Supabase Auth to keep you logged in while you navigate
          the portal. They are not used for advertising, retargeting, or cross-site tracking, and
          they are deleted when your session ends or you sign out.
        </p>

        <p>
          We do not use advertising cookies, analytics cookies, or any cookies from third-party
          tracking services.
        </p>

        {/* 6 */}
        <h2>6. Policy Updates</h2>

        <p>
          We may update this Privacy Policy from time to time. When we do, the &ldquo;Effective&rdquo; date at
          the top of this page will be updated. Your continued use of the website after a policy
          update constitutes your acceptance of the updated terms. We encourage you to review this
          page periodically.
        </p>

        {/* 7 */}
        <h2>7. Contact</h2>

        <p>
          If you have any questions, concerns, or requests relating to this Privacy Policy or how
          your personal information is handled, please reach out via the{' '}
          <Link href="/contact">contact page</Link>. We take privacy inquiries seriously and will
          respond promptly.
        </p>

        <div className="privacy-back">
          <Link href="/">← Back to home</Link>
        </div>

      </div>
    </main>
  )
}
