// ─────────────────────────────────────────────────────────────────────────────
// lib/auditData.ts
//
// Static data for the Presence Audit quiz. Questions and scoring thresholds
// live here (not in Sanity) because the scoring bands are tightly coupled to
// the number of questions and option values. Changing questions without
// updating thresholds would silently break scoring.
//
// All page copy (headlines, body text, result band copy) is managed in Sanity
// via the auditPage schema. Only the quiz mechanics live here.
// ─────────────────────────────────────────────────────────────────────────────

export interface AuditQuestion {
  id: number
  text: string
  options: { label: string; value: number }[]
}

export const QUESTIONS: AuditQuestion[] = [
  {
    id: 1,
    text: "When you walk into a room, do people notice you've arrived?",
    options: [
      { label: 'Rarely', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Usually', value: 3 },
      { label: 'Always', value: 4 },
    ],
  },
  {
    id: 2,
    text: "How often do you speak up in meetings even when your point isn't fully formed?",
    options: [
      { label: 'Rarely', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Usually', value: 3 },
      { label: 'Always', value: 4 },
    ],
  },
  {
    id: 3,
    text: 'When you disagree with someone senior, how do you handle it?',
    options: [
      { label: 'I usually stay quiet', value: 1 },
      { label: 'I hint at it', value: 2 },
      { label: 'I say something diplomatically', value: 3 },
      { label: 'I say it directly', value: 4 },
    ],
  },
  {
    id: 4,
    text: 'How would you describe your physical presence — posture, eye contact, how you hold yourself?',
    options: [
      { label: 'I shrink', value: 1 },
      { label: "I'm neutral", value: 2 },
      { label: "I'm grounded", value: 3 },
      { label: 'I command the room', value: 4 },
    ],
  },
  {
    id: 5,
    text: 'After a conversation, do people remember what you said?',
    options: [
      { label: 'Rarely', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Usually', value: 3 },
      { label: 'Almost always', value: 4 },
    ],
  },
  {
    id: 6,
    text: 'How comfortable are you with silence — pausing before you respond, holding space?',
    options: [
      { label: 'Very uncomfortable', value: 1 },
      { label: 'A bit awkward', value: 2 },
      { label: 'Fairly comfortable', value: 3 },
      { label: "It's a tool I use", value: 4 },
    ],
  },
  {
    id: 7,
    text: 'How aligned do you feel between how you see yourself and how others perceive you?',
    options: [
      { label: 'Big gap', value: 1 },
      { label: 'Some gap', value: 2 },
      { label: 'Pretty close', value: 3 },
      { label: 'Fully aligned', value: 4 },
    ],
  },
]

/** Max possible score: 7 questions × 4 max = 28 */
export const MAX_SCORE = 28

/** Score thresholds — must stay in sync with resultBands in Sanity */
export const SCORE_THRESHOLDS = {
  foundation: 14,  // score ≤ 14
  developing: 21,  // score ≤ 21
  // refining: score > 21
} as const

export type AuditBand = 'foundation' | 'developing' | 'refining'

export function getBand(score: number): AuditBand {
  if (score <= SCORE_THRESHOLDS.foundation) return 'foundation'
  if (score <= SCORE_THRESHOLDS.developing) return 'developing'
  return 'refining'
}
