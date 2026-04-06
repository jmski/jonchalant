'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout';

// ─── Types ────────────────────────────────────────────────────────────────────

type Quadrant = 'passion' | 'mission' | 'vocation' | 'profession';
type QuestionState = 'visible' | 'exiting' | 'entering';

interface Question {
  quadrant: Quadrant;
  text: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

// COPYWRITER: Review and refine every question for brand voice, specificity,
// and resonance with the executive-presence coaching audience.
const QUESTIONS: Question[] = [
  {
    quadrant: 'passion',
    text: 'I feel genuinely energised by certain types of work — not just satisfied, but alive.',
  },
  {
    quadrant: 'passion',
    text: 'There are topics or projects I would explore for hours even without external recognition or reward.',
  },
  {
    quadrant: 'mission',
    text: 'The work I do — or aspire to do — contributes something meaningful to the people around me or to the world.',
  },
  {
    quadrant: 'mission',
    text: 'I feel a clear pull toward solving a specific problem or serving a particular need in my field or community.',
  },
  {
    quadrant: 'vocation',
    text: 'The core skills I have developed are in real demand — others regularly seek out my knowledge or capability.',
  },
  {
    quadrant: 'vocation',
    text: 'I can envision building a sustainable livelihood from the abilities I currently have or am actively developing.',
  },
  {
    quadrant: 'profession',
    text: 'I have built recognisable depth in at least one domain — not just competence, but genuine mastery.',
  },
  {
    quadrant: 'profession',
    text: 'Others acknowledge or defer to my expertise; I am seen as someone at the front of my field.',
  },
];

const ANSWER_OPTIONS = [
  { value: 1, label: 'Not at all' },
  { value: 2, label: 'Rarely true' },
  { value: 3, label: 'Often true' },
  { value: 4, label: 'Strongly agree' },
];

const QUADRANT_META: Record<
  Quadrant,
  { name: string; description: string; color: string; barClass: string }
> = {
  passion: {
    name: 'Passion',
    description: 'What you love',
    color: '#4a3a5c',
    barClass: 'ikigai-bar-fill--passion',
  },
  mission: {
    name: 'Mission',
    description: 'What the world needs',
    color: '#6b8e63',
    barClass: 'ikigai-bar-fill--mission',
  },
  vocation: {
    name: 'Vocation',
    description: 'What you can be paid for',
    color: '#b89a5f',
    barClass: 'ikigai-bar-fill--vocation',
  },
  profession: {
    name: 'Profession',
    description: "What you're good at",
    color: '#6a8aaa',
    barClass: 'ikigai-bar-fill--profession',
  },
};

// COPYWRITER: Expand each of these from a 2–3 sentence excerpt to a full
// insightful paragraph. Keep them affirming but honest — this is executive
// presence coaching, not generic motivation.
const DOMINANT_DESCRIPTIONS: Record<Quadrant, { title: string; body: string }> = {
  passion: {
    title: 'Your strongest signal: Passion',
    body: 'You are most energised by what you love. Your Ikigai journey begins here — you already know what lights you up. The work ahead is channelling that energy into a mission that serves others, skills that command respect, and an offering the world will recognise and pay for.',
  },
  mission: {
    title: 'Your strongest signal: Mission',
    body: "You feel most alive when your work is in service of something larger than yourself. That calling is rare and powerful. The invitation now is to make your mission concrete — build the craft and create the conditions that turn your sense of purpose into a career others can see and support.",
  },
  vocation: {
    title: 'Your strongest signal: Vocation',
    body: "Your work is commercially viable and in real demand. That foundation matters. What's next is infusing it with deeper meaning — discovering what you genuinely love about it, the impact it creates, and the mastery that makes it distinctly yours.",
  },
  profession: {
    title: 'Your strongest signal: Profession',
    body: 'You have real mastery. Others see it, and you have earned it. Your Ikigai challenge is allowing that expertise to be guided by something personal — a cause that moves you, a love that sustains you — so your competence becomes a true calling rather than just a credential.',
  },
};

// ─── SVG Ikigai Diagram ───────────────────────────────────────────────────────

function IkigaiDiagram() {
  const [hovered, setHovered] = useState<Quadrant | null>(null);

  const circles: Array<{
    id: Quadrant;
    cx: number;
    cy: number;
    r: number;
    color: string;
    // label anchor point (inside circle, away from center)
    lx: number;
    ly: number;
    dl: number; // desc y offset
  }> = [
    { id: 'passion',    cx: 140, cy: 150, r: 100, color: '#4a3a5c', lx: 88,  ly: 100, dl: 115 },
    { id: 'mission',    cx: 260, cy: 150, r: 100, color: '#6b8e63', lx: 312, ly: 100, dl: 115 },
    { id: 'vocation',   cx: 260, cy: 270, r: 100, color: '#b89a5f', lx: 312, ly: 308, dl: 323 },
    { id: 'profession', cx: 140, cy: 270, r: 100, color: '#6a8aaa', lx: 88,  ly: 308, dl: 323 },
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      className="ikigai-svg"
      aria-label="Ikigai diagram: four overlapping circles representing Passion, Mission, Vocation, and Profession converging at the centre (Ikigai — your purpose)"
      role="img"
    >
      {/* ── Circles ── */}
      {circles.map((c) => {
        const isHov = hovered === c.id;
        const anyHov = hovered !== null;
        return (
          <circle
            key={c.id}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={c.color}
            stroke={c.color}
            strokeWidth={isHov ? 2 : 1}
            fillOpacity={isHov ? 0.38 : anyHov ? 0.08 : 0.18}
            strokeOpacity={isHov ? 0.75 : anyHov ? 0.2 : 0.4}
            style={{ cursor: 'pointer', transition: 'fill-opacity 0.22s ease, stroke-opacity 0.22s ease, stroke-width 0.22s ease' }}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(c.id)}
            onBlur={() => setHovered(null)}
            tabIndex={0}
            aria-label={`${QUADRANT_META[c.id].name}: ${QUADRANT_META[c.id].description}`}
          />
        );
      })}

      {/* ── Circle Labels + descriptions ── */}
      {circles.map((c) => {
        const isHov = hovered === c.id;
        const anyHov = hovered !== null;
        return (
          <g key={`lbl-${c.id}`} style={{ pointerEvents: 'none' }}>
            <text
              x={c.lx}
              y={c.ly}
              textAnchor="middle"
              fill={c.color}
              fontSize="12"
              fontWeight={isHov ? '700' : '600'}
              letterSpacing="0.1em"
              opacity={isHov ? 1 : anyHov ? 0.3 : 0.8}
              style={{ transition: 'opacity 0.22s ease', fontFamily: 'var(--font-body)' }}
            >
              {QUADRANT_META[c.id].name.toUpperCase()}
            </text>
            <text
              x={c.lx}
              y={c.dl}
              textAnchor="middle"
              fill={c.color}
              fontSize="9.5"
              opacity={isHov ? 0.85 : anyHov ? 0.2 : 0.55}
              style={{ transition: 'opacity 0.22s ease', fontFamily: 'var(--font-body)' }}
            >
              {QUADRANT_META[c.id].description}
            </text>
          </g>
        );
      })}

      {/* ── Centre "IKIGAI" badge ── */}
      <g style={{ pointerEvents: 'none' }}>
        <circle cx={200} cy={210} r={30} fill="var(--bg-primary)" fillOpacity={0.82} />
        <text
          x={200}
          y={206}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="0.14em"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          IKIGAI
        </text>
        <text
          x={200}
          y={220}
          textAnchor="middle"
          fill="var(--text-tertiary)"
          fontSize="7.5"
          letterSpacing="0.05em"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          YOUR PURPOSE
        </text>
      </g>
    </svg>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="ikigai-progress">
      <div className="ikigai-progress-header">
        <span className="ikigai-progress-label">Question {current} of {total}</span>
        <span className="ikigai-progress-pct">{pct}%</span>
      </div>
      <div className="ikigai-progress-track">
        <div
          className="ikigai-progress-fill"
          style={{ width: `${pct}%`, transition: 'width 0.4s ease' }}
        />
      </div>
    </div>
  );
}

// ─── Results Bar Chart ────────────────────────────────────────────────────────

function ResultsBars({
  scores,
  dominant,
  animated,
}: {
  scores: Record<Quadrant, number>;
  dominant: Quadrant;
  animated: boolean;
}) {
  const quadrants: Quadrant[] = ['passion', 'mission', 'vocation', 'profession'];
  return (
    <div className="ikigai-bars">
      {quadrants.map((q) => {
        const meta = QUADRANT_META[q];
        const score = scores[q];
        const pct = (score / 8) * 100;
        const isDominant = q === dominant;
        return (
          <div key={q} className={`ikigai-bar-row${isDominant ? ' is-dominant' : ''}`}>
            <div className="ikigai-bar-meta">
              <span className="ikigai-bar-name">{meta.name}</span>
              <span className="ikigai-bar-desc">{meta.description}</span>
            </div>
            <div className="ikigai-bar-track">
              <div
                className={`ikigai-bar-fill ${meta.barClass}${isDominant ? ' is-dominant' : ''}`}
                style={{
                  width: animated ? `${pct}%` : '0%',
                  transition: animated ? 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                  transitionDelay: animated ? `${quadrants.indexOf(q) * 0.12}s` : '0s',
                }}
              />
            </div>
            <span className="ikigai-bar-score">{score}<span className="ikigai-bar-total">/8</span></span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IkigaiClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(8).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questionState, setQuestionState] = useState<QuestionState>('visible');
  const [barAnimated, setBarAnimated] = useState(false);

  // ── Email capture state
  const [captureFirstName, setCaptureFirstName] = useState('');
  const [captureEmail, setCaptureEmail] = useState('');
  const [captureSubmitting, setCaptureSubmitting] = useState(false);
  const [captureSubmitted, setCaptureSubmitted] = useState(false);
  const [captureDismissed, setCaptureDismissed] = useState(false);
  const [captureAlreadySubscribed, setCaptureAlreadySubscribed] = useState(false);

  const quizRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // ── Scroll to results + trigger bar animation after mount
  useEffect(() => {
    if (showResults && resultsRef.current) {
      const t1 = setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      const t2 = setTimeout(() => setBarAnimated(true), 750);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [showResults]);

  // ── Check if already subscribed
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('jonchalant_subscribed') === 'true') {
      setCaptureAlreadySubscribed(true);
    }
  }, []);

  // ── Scores
  const scores: Record<Quadrant, number> = {
    passion:    (answers[0] ?? 0) + (answers[1] ?? 0),
    mission:    (answers[2] ?? 0) + (answers[3] ?? 0),
    vocation:   (answers[4] ?? 0) + (answers[5] ?? 0),
    profession: (answers[6] ?? 0) + (answers[7] ?? 0),
  };

  const dominantQuadrant = (
    Object.entries(scores) as [Quadrant, number][]
  ).sort((a, b) => b[1] - a[1])[0][0];

  // ── Handlers
  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers] as (number | null)[];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    // Exit animation
    setQuestionState('exiting');

    setTimeout(() => {
      if (currentQuestion < 7) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setQuizComplete(true);
      }
      setQuestionState('entering');
      setTimeout(() => setQuestionState('visible'), 350);
    }, 280);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRetake = () => {
    setAnswers(Array(8).fill(null));
    setCurrentQuestion(0);
    setQuizComplete(false);
    setShowResults(false);
    setBarAnimated(false);
    setQuestionState('visible');
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  async function handleCaptureSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCaptureSubmitting(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: captureFirstName, email: captureEmail }),
      });
      if (!res.ok) throw new Error();
      localStorage.setItem('jonchalant_subscribed', 'true');
      setCaptureSubmitted(true);
    } catch {
      setCaptureDismissed(true);
    } finally {
      setCaptureSubmitting(false);
    }
  }

  const currentQ = QUESTIONS[currentQuestion];
  const cardClass = `ikigai-question-card${
    questionState === 'exiting' ? ' is-exiting' : questionState === 'entering' ? ' is-entering' : ''
  }`;

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageTransition animation="fade">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — INTRO (calm, editorial)
        ══════════════════════════════════════════════════════════════════ */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <div className="ikigai-intro">
              <div className="ikigai-intro-content">
                {/* Text column */}
                <div className="ikigai-intro-text">
                  {/* COPYWRITER: Confirm eyebrow label */}
                  <span className="ikigai-intro-eyebrow">Japanese Philosophy</span>

                  {/* COPYWRITER: Finalise headline — currently ~50 chars */}
                  <h1 className="ikigai-intro-headline">
                    Find the Work<br />
                    You Were Meant for
                  </h1>

                  {/* COPYWRITER: This paragraph introduces the Ikigai concept
                      in 2–3 sentences. Expand, tighten, and align with brand voice. */}
                  <p className="ikigai-intro-body">
                    <em>Ikigai</em> (生き甲斐) is a Japanese concept meaning{' '}
                    <strong>reason for being</strong>. It sits at the intersection of
                    four dimensions of a fulfilling life: what you love, what the world
                    needs, what you can be paid for, and what you're good at. Where all
                    four overlap is where extraordinary work — and real presence — emerge.
                  </p>

                  {/* COPYWRITER: Secondary body paragraph — expand on why this
                      matters for executives and introverts specifically */}
                  <p className="ikigai-intro-body">
                    Most professionals are strong in one or two quadrants. The eight
                    questions below will show you where you are — and what to build next.
                  </p>

                  <div className="ikigai-intro-quadrants">
                    {(Object.entries(QUADRANT_META) as [Quadrant, typeof QUADRANT_META[Quadrant]][]).map(
                      ([key, meta]) => (
                        <div key={key} className={`ikigai-intro-quadrant ikigai-intro-quadrant--${key}`}>
                          <span className="ikigai-intro-quadrant-name">{meta.name}</span>
                          <span className="ikigai-intro-quadrant-desc">{meta.description}</span>
                        </div>
                      )
                    )}
                  </div>

                  <button onClick={scrollToQuiz} className="ikigai-intro-cta btn-primary">
                    Discover Your Ikigai
                  </button>
                </div>

                {/* Diagram column */}
                <div className="ikigai-intro-diagram">
                  <IkigaiDiagram />
                </div>
              </div>
            </div>
          </SectionContent>
        </SectionWrapper>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — QUIZ (dynamic, animated)
        ══════════════════════════════════════════════════════════════════ */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <div className="ikigai-quiz" ref={quizRef}>
              <div className="ikigai-quiz-inner">
                {/* Header */}
                <div className="ikigai-quiz-header">
                  {/* COPYWRITER: Confirm section label and lead-in copy */}
                  <span className="ikigai-quiz-eyebrow">Free Quiz</span>
                  <h2 className="ikigai-quiz-title">The Ikigai Assessment</h2>
                  <p className="ikigai-quiz-subtitle">
                    Eight honest questions. No right or wrong answers — only clarity.
                  </p>
                </div>

                {/* Progress */}
                {!quizComplete && (
                  <ProgressBar
                    current={currentQuestion + 1}
                    total={8}
                  />
                )}

                {/* Question card */}
                <div className={cardClass}>
                  {!quizComplete ? (
                    <>
                      <div className="ikigai-question-meta">
                        <span
                          className={`ikigai-quadrant-tag ikigai-quadrant-tag--${currentQ.quadrant}`}
                        >
                          {QUADRANT_META[currentQ.quadrant].name}
                        </span>
                      </div>
                      <p className="ikigai-question-text">{currentQ.text}</p>
                      <div className="ikigai-options">
                        {ANSWER_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            className="ikigai-option"
                            onClick={() => handleAnswer(opt.value)}
                            aria-label={`${opt.label}, score ${opt.value} of 4`}
                          >
                            <span className="ikigai-option-value">{opt.value}</span>
                            <span className="ikigai-option-label">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="ikigai-quiz-complete">
                      {/* COPYWRITER: This is the "all done" state copy shown before submitting */}
                      <p className="ikigai-quiz-complete-head">You've completed all 8 questions.</p>
                      <p className="ikigai-quiz-complete-body">
                        Your results will show you where you're strongest across Passion,
                        Mission, Vocation, and Profession — and what it means for your leadership presence.
                      </p>
                      <button onClick={handleShowResults} className="ikigai-submit-btn btn-primary">
                        See My Ikigai
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionContent>
        </SectionWrapper>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — RESULTS (dynamic, visual)
        ══════════════════════════════════════════════════════════════════ */}
        {showResults && (
          <SectionWrapper variant="tertiary">
            <SectionContent>
              <div className="ikigai-results" ref={resultsRef}>
                {/* COPYWRITER: Results section headline */}
                <div className="ikigai-results-header">
                  <span className="ikigai-results-eyebrow">Your Results</span>
                  <h2 className="ikigai-results-title">Your Ikigai Profile</h2>
                  <p className="ikigai-results-subtitle">
                    Each score is out of 8. The higher the score, the stronger that dimension
                    is in your current work and life.
                  </p>
                </div>

                {/* Bar charts */}
                <ResultsBars
                  scores={scores}
                  dominant={dominantQuadrant}
                  animated={barAnimated}
                />

                {/* Dominant quadrant callout */}
                <div className={`ikigai-dominant-callout ikigai-dominant-callout--${dominantQuadrant}`}>
                  <div className="ikigai-dominant-header">
                    <span className="ikigai-dominant-tag">
                      {QUADRANT_META[dominantQuadrant].name}
                    </span>
                    <h3 className="ikigai-dominant-title">
                      {DOMINANT_DESCRIPTIONS[dominantQuadrant].title}
                    </h3>
                  </div>
                  <p className="ikigai-dominant-body">
                    {DOMINANT_DESCRIPTIONS[dominantQuadrant].body}
                  </p>
                </div>

                {/* Email capture */}
                {!captureAlreadySubscribed && !captureDismissed && (
                  <div className="ikigai-capture">
                    <button
                      className="ikigai-capture-dismiss"
                      onClick={() => setCaptureDismissed(true)}
                      aria-label="Dismiss"
                    >
                      ×
                    </button>
                    {captureSubmitted ? (
                      <div className="ikigai-capture-success">
                        <p className="ikigai-capture-success-title">You&apos;re in.</p>
                        <p className="ikigai-capture-success-body">Your Ikigai profile is on its way.</p>
                      </div>
                    ) : (
                      <>
                        <span className="ikigai-capture-eyebrow">Save your results</span>
                        <h3 className="ikigai-capture-title">Get your Ikigai profile in your inbox</h3>
                        <p className="ikigai-capture-body">
                          Receive a summary of your scores and what they mean — so you can come back to it.
                        </p>
                        <form className="ikigai-capture-form" onSubmit={handleCaptureSubmit}>
                          <div className="ikigai-capture-fields">
                            <input
                              type="text"
                              className="ikigai-capture-input"
                              placeholder="First name"
                              value={captureFirstName}
                              onChange={(e) => setCaptureFirstName(e.target.value)}
                              required
                              autoComplete="given-name"
                            />
                            <input
                              type="email"
                              className="ikigai-capture-input"
                              placeholder="your@email.com"
                              value={captureEmail}
                              onChange={(e) => setCaptureEmail(e.target.value)}
                              required
                              autoComplete="email"
                            />
                            <button
                              type="submit"
                              className="ikigai-capture-submit"
                              disabled={captureSubmitting}
                            >
                              {captureSubmitting ? 'Sending…' : 'Send me my results'}
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="ikigai-results-cta">
                  {/* COPYWRITER: Confirm CTA headline and button label */}
                  <h3 className="ikigai-results-cta-headline">
                    Ready to build on your Ikigai?
                  </h3>
                  <p className="ikigai-results-cta-body">
                    {/* COPYWRITER: Expand this into a compelling 1–2 sentence hook */}
                    Knowing your dominant quadrant is the first step. Jon can help you close the gaps and build a coaching plan that aligns all four.
                  </p>
                  <div className="ikigai-results-cta-actions">
                    <Link href="/contact" className="btn-primary ikigai-cta-btn">
                      Work with Jon
                    </Link>
                    <button onClick={handleRetake} className="ikigai-retake-btn">
                      Retake the quiz
                    </button>
                  </div>
                </div>
              </div>
            </SectionContent>
          </SectionWrapper>
        )}

      </PageTransition>
    </div>
  );
}
