'use client';

import { useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { FormMessage } from '@/components/ui/FormMessage';
import { useMultiStep, useFormSubmission } from '@/lib/hooks';

type ChallengeId =
  | 'freeze'
  | 'quiet'
  | 'groups'
  | 'command'
  | 'prep'
  | 'authentic';

interface Challenge {
  id: ChallengeId;
  text: string;
}

const CHALLENGES: Challenge[] = [
  { id: 'freeze',    text: 'I freeze or go blank in high-stakes moments' },
  { id: 'quiet',    text: `I'm seen as quiet or reserved — not "leadership material"` },
  { id: 'groups',   text: 'I speak clearly in 1:1s but lose it in groups or large meetings' },
  { id: 'command',  text: 'I know my stuff, but I can\'t seem to command a room' },
  { id: 'prep',     text: 'I overprepare and still feel shaky when it counts' },
  { id: 'authentic',text: 'I want to project confidence without changing who I am' },
];

interface Fields {
  name: string;
  email: string;
  linkedin: string;
}

export function PresenceAuditFlow() {
  const { currentStep, goTo } = useMultiStep({
    steps: ['challenge', 'details', 'confirmation'],
  });
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeId | null>(null);
  const [fields, setFields] = useState<Fields>({ name: '', email: '', linkedin: '' });

  const { state, submit } = useFormSubmission<Fields>({
    endpoint: '/api/inquiries',
    onSuccess: () => goTo('confirmation'),
    transform: () => {
      const challenge = CHALLENGES.find(c => c.id === selectedChallenge);
      const messageParts = [
        'Presence Audit Request',
        '',
        `Biggest challenge: ${challenge?.text ?? selectedChallenge}`,
      ];
      if (fields.linkedin.trim()) {
        messageParts.push(`LinkedIn: ${fields.linkedin.trim()}`);
      }
      return {
        name: fields.name.trim(),
        email: fields.email.trim(),
        inquiry_type: 'coaching',
        message: messageParts.join('\n'),
        company: fields.linkedin.trim() || undefined,
      };
    },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name.trim() || !fields.email.trim() || !selectedChallenge) return;
    submit(fields);
  };

  const step = currentStep === 'challenge' ? 1 : currentStep === 'details' ? 2 : 3;

  return (
    <div className="presence-audit-flow">

      {/* Step indicator — only on steps 1 and 2 */}
      {step !== 3 && (
        <div className="presence-audit-steps" aria-label="Progress">
          <div className="presence-audit-step">
            <div
              className={`presence-audit-step-dot${step === 1 ? ' active' : ''}${step > 1 ? ' done' : ''}`}
              aria-current={step === 1 ? 'step' : undefined}
            >
              <span>{step > 1 ? '✓' : '1'}</span>
            </div>
            <span className={`presence-audit-step-label${step === 1 ? ' active' : ''}`}>Your challenge</span>
          </div>
          <div className={`presence-audit-step-connector${step > 1 ? ' done' : ''}`} aria-hidden="true" />
          <div className="presence-audit-step">
            <div
              className={`presence-audit-step-dot${step === 2 ? ' active' : ''}`}
              aria-current={step === 2 ? 'step' : undefined}
            >
              <span>2</span>
            </div>
            <span className={`presence-audit-step-label${step === 2 ? ' active' : ''}`}>Your details</span>
          </div>
        </div>
      )}

      {/* ── Step 1: Challenge selection ── */}
      {currentStep === 'challenge' && (
        <div className="presence-audit-panel">
          <span className="presence-audit-panel-context">Step 1 of 2 — Honest recognition</span>
          <h2 className="presence-audit-panel-title">
            What's your biggest challenge right now?
          </h2>
          <p className="presence-audit-panel-subtitle">
            Choose the one that hits closest to home.
          </p>

          <div className="presence-audit-choices">
            {CHALLENGES.map(challenge => (
              <button
                key={challenge.id}
                type="button"
                onClick={() => setSelectedChallenge(challenge.id)}
                className={`presence-audit-choice${selectedChallenge === challenge.id ? ' selected' : ''}`}
                aria-pressed={selectedChallenge === challenge.id}
              >
                {challenge.text}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo('details')}
            disabled={!selectedChallenge}
            className="presence-audit-cta"
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 2: Contact details ── */}
      {currentStep === 'details' && (
        <div className="presence-audit-panel">
          <button
            type="button"
            onClick={() => goTo('challenge')}
            className="presence-audit-back"
          >
            ← Back
          </button>

          <span className="presence-audit-panel-context">Step 2 of 2 — Where to find you</span>
          <h2 className="presence-audit-panel-title">
            Where should Jon send your audit?
          </h2>
          <p className="presence-audit-panel-subtitle">
            He reviews each one personally and responds within 48 hours.
          </p>

          <form onSubmit={handleSubmit} className="presence-audit-form" noValidate>
            <FormField label="Your name" id="audit-name" required>
              <input
                id="audit-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={fields.name}
                onChange={handleFieldChange}
                className="form-input"
                placeholder="First and last name"
              />
            </FormField>

            <FormField label="Email address" id="audit-email" required>
              <input
                id="audit-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={fields.email}
                onChange={handleFieldChange}
                className="form-input"
                placeholder="you@example.com"
              />
            </FormField>

            <FormField
              label="LinkedIn profile"
              id="audit-linkedin"
              hint="Helps Jon personalize your audit to your actual context."
            >
              <input
                id="audit-linkedin"
                name="linkedin"
                type="url"
                autoComplete="url"
                value={fields.linkedin}
                onChange={handleFieldChange}
                className="form-input"
                placeholder="https://linkedin.com/in/yourname"
              />
            </FormField>

            {state.error && (
              <FormMessage variant="error">{state.error}</FormMessage>
            )}

            <button
              type="submit"
              disabled={state.isSubmitting || !fields.name.trim() || !fields.email.trim()}
              className="presence-audit-cta"
            >
              {state.isSubmitting ? 'Sending…' : 'Send My Audit Request'}
            </button>
          </form>
        </div>
      )}

      {/* ── Step 3: Confirmation ── */}
      {currentStep === 'confirmation' && (
        <div className="presence-audit-confirmation">
          <div className="presence-audit-confirm-icon" aria-hidden="true">✓</div>
          <h2 className="presence-audit-confirm-title">You're in. Audit incoming.</h2>
          <p className="presence-audit-confirm-body">
            Jon will review your challenge and send a personalized presence
            audit to <strong>{fields.email}</strong> within 48 hours.
          </p>

          <ol className="presence-audit-next-steps">
            <li className="presence-audit-next-step">
              <span className="presence-audit-next-step-num" aria-hidden="true">1</span>
              <div>
                <strong>Check your inbox</strong>
                <p>Your audit arrives within 48 hours — often sooner.</p>
              </div>
            </li>
            <li className="presence-audit-next-step">
              <span className="presence-audit-next-step-num" aria-hidden="true">2</span>
              <div>
                <strong>Read your personalized breakdown</strong>
                <p>
                  Jon addresses your specific challenge and the root cause he
                  sees most in clients like you.
                </p>
              </div>
            </li>
            <li className="presence-audit-next-step">
              <span className="presence-audit-next-step-num" aria-hidden="true">3</span>
              <div>
                <strong>Decide if you want to go deeper</strong>
                <p>
                  If it resonates, Jon will include an invitation to a
                  20-minute discovery call — no pressure, no pitch.
                </p>
              </div>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
