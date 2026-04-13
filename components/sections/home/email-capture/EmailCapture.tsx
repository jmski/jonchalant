'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { useFormSubmission } from '@/lib/hooks';

interface EmailCaptureProps {
  heading?: string;
  subheading?: string;
}

export function EmailCapture({
  heading = 'One idea every Tuesday. No noise.',
  subheading = 'Body-led leadership for people who read slowly and think carefully.',
}: EmailCaptureProps) {
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

  return (
    <section className="email-capture-section email-capture-wipe" ref={sectionRef}>
      <div className="email-capture-inner">
        <div className="email-capture-copy">
          <span className="email-capture-eyebrow">The Weekly</span>
          <h2 className="email-capture-heading">{heading}</h2>
          <p className="email-capture-subheading">{subheading}</p>
        </div>

        {state.submitted ? (
          <div className="email-capture-success">
            <p className="email-capture-success-message">
              You&rsquo;re in. First issue arrives soon.
            </p>
          </div>
        ) : (
          <form className="email-capture-form" onSubmit={handleSubmit} noValidate>
            <div className="email-capture-field-group">
              <input
                type="email"
                className="email-capture-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label="Email address"
                disabled={state.isSubmitting}
              />
              <Button
                type="submit"
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? 'Subscribing…' : "I'm in"}
              </Button>
            </div>
            {state.error && (
              <p className="email-capture-error" role="alert">{state.error}</p>
            )}
            <p className="email-capture-disclaimer">No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
