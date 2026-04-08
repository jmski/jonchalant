'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface EmailCaptureProps {
  heading?: string;
  subheading?: string;
}

export function EmailCapture({
  heading = 'Weekly insights on quiet leadership',
  subheading = 'Practical tools for introverts who lead — delivered to your inbox every week.',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section className="email-capture-section">
      <div className="email-capture-inner">
        <div className="email-capture-copy">
          <h2 className="email-capture-heading">{heading}</h2>
          <p className="email-capture-subheading">{subheading}</p>
        </div>

        {status === 'success' ? (
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
                disabled={status === 'loading'}
              />
              <Button
                type="submit"
                className="email-capture-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </Button>
            </div>
            {status === 'error' && (
              <p className="email-capture-error" role="alert">{errorMsg}</p>
            )}
            <p className="email-capture-disclaimer">No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
