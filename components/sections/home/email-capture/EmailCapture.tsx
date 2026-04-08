'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useFormSubmission } from '@/lib/hooks';

interface EmailCaptureProps {
  heading?: string;
  subheading?: string;
}

export function EmailCapture({
  heading = 'Weekly insights on quiet leadership',
  subheading = 'Practical tools for introverts who lead — delivered to your inbox every week.',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');

  const { state, submit } = useFormSubmission({
    endpoint: '/api/subscribe',
    onSuccess: () => setEmail(''),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ email });
  }

  return (
    <section className="email-capture-section">
      <div className="email-capture-inner">
        <div className="email-capture-copy">
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
                className="email-capture-submit"
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? 'Subscribing…' : 'Subscribe'}
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
