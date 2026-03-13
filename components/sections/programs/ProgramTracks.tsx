import { ScrollFade } from "@/components/animations";
import type { ProgramTrackItem } from "@/lib/sanity";

interface ProgramTracksProps {
  tracks?: ProgramTrackItem[];
}

// Fallback data used when Sanity returns nothing
const FALLBACK_TRACKS: ProgramTrackItem[] = [
  {
    id: "leadership-programs",
    eyebrow: "01 / Signature Offering",
    title: "8-Week Leadership Program",
    description:
      "Deep-dive 1-on-1 coaching that closes the gap between your competence and your presence. Over eight weeks, you'll develop the quiet command that makes rooms notice you — without performing or pretending to be someone you're not.",
    includes: [
      { text: "8 × 60-minute private coaching calls (weekly)" },
      { text: "Custom executive presence roadmap in week one" },
      { text: "Recorded body language audit with written feedback" },
      { text: "Weekly embodied practice assignments" },
      { text: "Unlimited async messaging between sessions" },
      { text: "Post-program follow-up call at week twelve" },
    ],
    audience: [
      { text: "Introverted professionals in leadership roles or actively pursuing them" },
      { text: "Leaders who feel invisible in high-stakes meetings and presentations" },
      { text: "Professionals passed over for promotion despite strong results" },
      { text: "Anyone who wants to lead with substance — not performance" },
    ],
    ctaText: "Book a Discovery Call",
    ctaHref: "/contact",
  },
  {
    id: "movement-coaching",
    eyebrow: "02 / Body-Aware Coaching",
    title: "Movement Coaching",
    description:
      "Your body communicates before you say a word. Movement Coaching teaches you to occupy space with intention, channel nervous energy into calm authority, and project the kind of presence that earns trust — all at a physical level that words alone can't reach.",
    includes: [
      { text: "6 × 45-minute 1-on-1 movement and presence sessions" },
      { text: "Posture, breath, and groundedness techniques for high-stakes moments" },
      { text: "Video analysis with timestamped written feedback" },
      { text: "Personalized drill cards for between-session practice" },
      { text: "Entrance and exit coaching for rooms, stages, and cameras" },
      { text: "Optional integration with the 8-Week Leadership Program" },
    ],
    audience: [
      { text: "Leaders whose mindset is strong but whose body betrays them under pressure" },
      { text: "Professionals preparing for a keynote, board presentation, or media appearance" },
      { text: "Executives who want physical presence to match their professional credibility" },
      { text: "Anyone who shrinks, rushes, or over-gestures when the stakes are high" },
    ],
    ctaText: "Enquire About Movement Coaching",
    ctaHref: "/contact",
  },
  {
    id: "brand-collaboration",
    eyebrow: "03 / Partnerships",
    title: "Brand Collaboration",
    description:
      "Strategic partnerships for thought leaders, organizations, and brands who want to reach ambitious professionals building their executive presence. From sponsored campaigns to team workshops, every collaboration is purpose-built — not templated.",
    includes: [
      { text: "Sponsored content and social media campaigns" },
      { text: "Workshop facilitation for leadership and L&D teams" },
      { text: "Keynote and panel appearances" },
      { text: "Podcast and media feature placements" },
      { text: "Content licensing and co-creation projects" },
      { text: "Custom audience research and campaign strategy" },
    ],
    audience: [
      { text: "Brands targeting introvert-identifying professionals and leaders" },
      { text: "HR and L&D teams seeking credible, body-aware leadership training" },
      { text: "Media and editorial teams building content around leadership presence" },
      { text: "Organisations running leadership retreats or offsites" },
    ],
    ctaText: "View Media Kit",
    ctaHref: "/media-kit",
  },
] as unknown as ProgramTrackItem[];

export function ProgramTracks({ tracks: propTracks }: ProgramTracksProps) {
  const tracks = propTracks && propTracks.length > 0 ? propTracks : FALLBACK_TRACKS;
  return (
    <section className="program-tracks-section" aria-label="Coaching program tracks">
      <ScrollFade>
        <div className="program-tracks-header">
          <p className="program-tracks-eyebrow">Three Ways to Work Together</p>
          <h2 className="program-tracks-title">Choose Your Track</h2>
          <p className="program-tracks-subtitle">
            Every track is built on the same foundation — body-aware leadership for professionals who lead quietly and well. Choose the format that matches where you are right now.
          </p>
        </div>
      </ScrollFade>

      <div className="program-tracks-list">
        {tracks.map((track, idx) => (
          <ScrollFade key={track._id} delay={idx * 80}>
            <article
              id={track._id}
              className={`program-track${idx % 2 === 1 ? " program-track--reverse" : ""}`}
              aria-labelledby={`track-title-${track._id}`}
            >
              <div className="program-track-inner">
                {/* — Left: narrative content — */}
                <div className="program-track-content">
                  <p className="program-track-eyebrow">{track.eyebrow}</p>
                  <h3
                    id={`track-title-${track._id}`}
                    className="program-track-title"
                  >
                    {track.title}
                  </h3>
                  <p className="program-track-description">{track.description}</p>

                  <a
                    href={track.ctaHref}
                    className="program-track-cta btn btn-primary"
                  >
                    {track.ctaText}
                  </a>
                </div>

                {/* — Right: structured detail — */}
                <div className="program-track-details">
                  <div className="program-track-block">
                    <h4 className="program-track-block-title">What's included</h4>
                    <ul className="program-track-list">
                      {track.includes.map((item, i) => (
                        <li key={i} className="program-track-list-item">
                          <span className="program-track-check" aria-hidden="true">✓</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="program-track-block">
                    <h4 className="program-track-block-title">Who it's for</h4>
                    <ul className="program-track-list">
                      {track.audience.map((item, i) => (
                        <li key={i} className="program-track-list-item">
                          <span className="program-track-bullet" aria-hidden="true">→</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </ScrollFade>
        ))}
      </div>
    </section>
  );
}
