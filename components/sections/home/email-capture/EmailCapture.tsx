'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useFormSubmission } from '@/lib/hooks';
import type { NewsletterCapture } from '@/lib/types';

interface EmailCaptureProps {
  newsletter?: NewsletterCapture | null;
  successMessage?: string;
}

const FALLBACK = {
  eyebrow: 'The Weekly',
  headline: 'One idea every Tuesday. No noise.',
  subhead: 'Purpose, presence, and the work you were meant for — one short read, every Tuesday.',
  emailPlaceholder: 'your@email.com',
  submitLabel: "I'm in",
  microcopy: 'No spam. Unsubscribe anytime.',
  success: "You're in. First issue arrives soon.",
};

export function EmailCapture({ newsletter, successMessage }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { state, submit } = useFormSubmission({
    endpoint: '/api/subscribe',
    onSuccess: () => setEmail(''),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ email });
  }

  const eyebrow = newsletter?.eyebrow ?? FALLBACK.eyebrow;
  const headline = newsletter?.headline ?? FALLBACK.headline;
  const subhead = newsletter?.subhead ?? FALLBACK.subhead;
  const placeholder = newsletter?.emailPlaceholder ?? FALLBACK.emailPlaceholder;
  const submitLabel = newsletter?.submitLabel ?? FALLBACK.submitLabel;
  const microcopy = newsletter?.microcopy ?? FALLBACK.microcopy;
  const success = successMessage ?? FALLBACK.success;

  return (
    <section className="email-capture-section email-capture-wipe" ref={sectionRef}>
      <div className="email-capture-inner">
        <div className="email-capture-copy">
          <span className="email-capture-eyebrow">{eyebrow}</span>
          <h2 className="email-capture-heading">{headline}</h2>
          <p className="email-capture-subheading">{subhead}</p>
        </div>

        {state.submitted ? (
          <div className="email-capture-success">
            <p className="email-capture-success-message">{success}</p>
          </div>
        ) : (
          <form className="email-capture-form" onSubmit={handleSubmit} noValidate>
            <div className="email-capture-field-group">
              <input
                type="email"
                className="email-capture-input"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label={newsletter?.emailLabel ?? 'Email address'}
                disabled={state.isSubmitting}
              />
              <Button type="submit" disabled={state.isSubmitting}>
                {state.isSubmitting ? 'Subscribing…' : submitLabel}
              </Button>
            </div>
            {state.error && (
              <p className="email-capture-error" role="alert">{state.error}</p>
            )}
            <p className="email-capture-disclaimer">{microcopy}</p>
          </form>
        )}
      </div>
    </section>
  );
}
