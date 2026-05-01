/**
 * Jonchalant Sanity Content Migration Script
 *
 * Migrates legacy Sanity documents to new Phase 2 schema.
 *
 * Usage:
 *   npx tsx scripts/migrate-content.ts --dry-run [--only=<docType>]
 *   npx tsx scripts/migrate-content.ts --apply [--only=<docType>]
 */

import { createClient, type SanityClient } from '@sanity/client'
import * as fs from 'node:fs'
import * as path from 'node:path'

// ============================================================================
// TYPES
// ============================================================================

interface SanityDoc {
  _id: string
  _type: string
  [key: string]: unknown
}

interface CliArgs {
  dryRun: boolean
  apply: boolean
  only?: string
}

interface Logger {
  note(msg: string, source?: string): void
  warn(msg: string): void
  doc(type: string, id: string, dryRun: boolean): void
}

// ============================================================================
// CLI PARSING
// ============================================================================

function parseArgs(): CliArgs {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const apply = args.includes('--apply')
  const onlyArg = args.find((a) => a.startsWith('--only='))
  const only = onlyArg ? onlyArg.split('=')[1] : undefined

  if (apply && dryRun) {
    console.error('FATAL: cannot use --apply and --dry-run together')
    process.exit(1)
  }

  if (!apply && !dryRun) {
    return { dryRun: true, apply: false, only }
  }

  return { dryRun, apply, only }
}

// ============================================================================
// LOGGER
// ============================================================================

function createLogger(dryRun: boolean): Logger {
  return {
    note(msg: string, source?: string) {
      const line = source ? `${msg} ← ${source}` : msg
      console.log(`  ${line}`)
    },
    warn(msg: string) {
      console.error(`WARN: ${msg}`)
    },
    doc(type: string, id: string, isDryRun: boolean) {
      const prefix = isDryRun ? '[DRY-RUN] Would write' : '[APPLY] Wrote'
      console.log(`\n${prefix} ${type} (_id=${id})`)
    },
  }
}

// ============================================================================
// LEGACY DOCUMENT IDs
// ============================================================================

const LEGACY_IDS = {
  homePageContent: 'ePEVvMvkyl8gyt7htYCe2u',
  aboutPage: 'vUtXQu8a70VAwbByiw10Sn',
  foundationPage: '8jr94e1DJodVfCKbo9fTbx',
  contactInfo: 'vUtXQu8a70VAwbByiw10Oj',
  blogConfig: 'blogConfig',
  emailOptIn: '93a764c7-e640-4cb9-a23a-e3f3eaf41483',
  siteSettings: 'siteSettings',
}

// ============================================================================
// IMAGE RESOLUTION HELPER
// ============================================================================

async function resolveLegacyImage(
  client: SanityClient,
  legacyId: string,
  fieldPath: string,
  log: Logger,
  applyMode: boolean
): Promise<unknown | null> {
  if (!applyMode) {
    log.note(`image: <will copy from ${legacyId}.${fieldPath} at apply time>`)
    return null
  }

  try {
    const doc = (await client.fetch(`*[_id == $id][0]`, { id: legacyId })) as Record<string, unknown> | null
    if (!doc) {
      log.warn(`legacy doc ${legacyId} not found`)
      return null
    }

    const parts = fieldPath.split('.')
    let value: unknown = doc
    for (const part of parts) {
      if (value == null) break
      if (Number.isFinite(Number(part))) {
        value = (value as unknown[])[Number(part)]
      } else {
        value = (value as Record<string, unknown>)[part]
      }
    }

    if (!value) {
      log.warn(`legacy field ${legacyId}.${fieldPath} empty or missing`)
      return null
    }

    return value
  } catch (err) {
    log.warn(`error fetching legacy image from ${legacyId}.${fieldPath}: ${String(err)}`)
    return null
  }
}

// ============================================================================
// MIGRATION FUNCTIONS
// ============================================================================

async function buildSiteConfig(
  client: SanityClient,
  log: Logger,
  applyMode: boolean
): Promise<SanityDoc> {
  let contactEmail = 'hello@jonchalant.com'
  const socialLinks: Array<{ platform: string; url: string; label?: string }> = []

  if (applyMode) {
    try {
      const contactInfoDoc = (await client.fetch(`*[_id == $id][0]`, {
        id: LEGACY_IDS.contactInfo,
      })) as { contactMethods?: Array<{ label?: string; value?: string; href?: string; description?: string }> } | null

      if (contactInfoDoc?.contactMethods) {
        // Canonical L1238: contactEmail is always 'hello@jonchalant.com' — do not pull from legacy.
        for (const method of contactInfoDoc.contactMethods) {
          const label = method.label?.toLowerCase()
          if (label && ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin'].includes(label)) {
            socialLinks.push({
              platform: label,
              url: method.href ?? '',
              label: method.description,
            })
          } else if (label === 'other') {
            log.warn(`unsupported social platform "Other" in contactInfo — skipped`)
          }
        }
      }
    } catch (err) {
      log.warn(`could not fetch legacy contactInfo: ${String(err)}`)
    }
  }

  const doc: SanityDoc = {
    _id: 'siteConfig',
    _type: 'siteConfig',
    contactEmail,
    wordmark: 'JONCHALANT',
    desktopLinks: [
      { label: 'Start Here', href: '/' },
      { label: 'Programs', href: '/programs' },
      { label: 'Lessons', href: '/lessons' },
      { label: 'About', href: '/about' },
    ],
    rightSideLinks: [{ label: 'Sign In', href: '/sign-in' }],
    mobileLinks: [
      { label: 'Start Here', href: '/' },
      { label: 'Programs', href: '/programs' },
      { label: 'Lessons', href: '/lessons' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Sign In', href: '/sign-in' },
    ],
    mobilePersistentCta: {
      label: 'Discover Your Ikigai',
      href: '/ikigai',
    },
    brandLine: 'Find the work you were meant for — then learn to inhabit it.',
    columns: [
      {
        header: 'ESSENTIALS',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        header: 'COACHING',
        links: [
          { label: 'Programs', href: '/programs' },
          { label: 'The Foundation', href: '/foundation' },
          { label: 'Ikigai', href: '/ikigai' },
        ],
      },
      {
        header: 'LEARN',
        links: [
          { label: 'The Blueprint', href: '/lessons' },
          { label: 'The Archives', href: '/blog' },
          { label: 'Presence Audit', href: '/audit' },
        ],
      },
    ],
    accountSection: {
      header: 'Account',
      links: [{ label: 'Sign In', href: '/sign-in' }],
    },
    copyright: '© 2026 Jonchalant. All rights reserved.',
    privacyLink: { label: 'Privacy', href: '/privacy' },
    socialLinks,
    successStates: [
      { key: 'general', message: 'Got it. Check your inbox.' },
      { key: 'newsletter', message: "You're in. First Tuesday lands soon." },
      { key: 'starterGuide', message: 'Sent. Check your inbox in the next minute.' },
      { key: 'contact', message: "Got it. I'll be in touch within 2–3 business days." },
    ],
    submitError: 'Something went sideways. Try again, or email me directly: hello@jonchalant.com',
    validation: {
      required: 'Required.',
      invalidEmail: "That doesn't look like an email.",
      tooShort: 'A bit more.',
      tooLong: 'Less, please.',
    },
    loadingLabel: 'Sending...',
    notFoundHeadline: "That page doesn't exist.",
    notFoundBody:
      "Either the link's broken, or you typed something I haven't built yet. Either way — here are the places you probably wanted.",
    notFoundLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'The Archives', href: '/blog' },
    ],
    notFoundMicrocopy:
      'If you got here from a link on this site, let me know — hello@jonchalant.com.',
    signIn: {
      headline: 'Welcome back.',
      subhead: 'Pick up where you left off.',
      primaryLabel: 'Sign in',
      magicLinkLabel: 'Email me a sign-in link',
      forgotPasswordLabel: 'Forgot password?',
    },
    signUp: {
      headline: 'Make a free account.',
      subhead:
        'Saves your audit results, lesson progress, and starter guide. No marketing emails — you control what you get.',
      submitLabel: 'Create account',
    },
  }

  log.note(`contactEmail: "${contactEmail}"`, applyMode ? 'legacy contactInfo' : 'fallback (dry-run)')
  log.note(`socialLinks: ${socialLinks.length} entries`, applyMode ? 'legacy contactInfo' : 'empty (dry-run)')
  log.note(`wordmark, nav, footer, microcopy`, 'canonical Globals (L1156–L1287)')

  return doc
}

async function buildNewsletterCapture(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`headline, subhead, submitLabel, microcopy`, 'canonical Home §8 L182 + microcopy L1208')
  return {
    _id: 'newsletterCapture',
    _type: 'newsletterCapture',
    headline: 'One idea every Tuesday. {{No}} noise.',
    subhead:
      'Practice, presence, and the work you were meant for — one short essay every Tuesday.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@yourwork.com',
    submitLabel: 'Send me Tuesdays',
    microcopy: 'Unsubscribe in one click. No tricks.',
  }
}

async function buildAuditCta(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`eyebrow, headline, body, primaryCta`, 'canonical Home §9 L200')
  return {
    _id: 'auditCta',
    _type: 'auditCta',
    eyebrow: 'NOT READY YET?',
    headline: "You don't have to {{commit}} to anything.",
    body:
      "Start with the assessment. It's free. It takes five minutes. If it tells you something useful, keep going. If it doesn't, you keep your Tuesday.",
    primaryCta: { label: 'Take the Ikigai Assessment', href: '/ikigai' },
    microcopy: 'No account needed. No email required.',
  }
}

async function buildStarterGuideCapture(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`eyebrow, headline, body, submitLabel`, 'canonical Home §10 L214')
  return {
    _id: 'starterGuideCapture',
    _type: 'starterGuideCapture',
    eyebrow: 'FREE GUIDE',
    headline: 'The {{Foundation}} Starter Guide.',
    body:
      "Five body-aware habits you can practice this week. Not posture tips. Not breath tricks. The actual fundamentals — distilled from the Foundation curriculum, rewritten for people who don't have eight weeks right now.",
    firstNamePlaceholder: 'First name',
    emailPlaceholder: 'you@email.com',
    submitLabel: 'Send me the guide',
  }
}

async function buildPillarSet(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`4 pillars: Grounding, Energy, Flow, Command`, 'canonical Home §4 L114')
  return {
    _id: 'pillarSet',
    _type: 'pillarSet',
    pillars: [
      {
        title: 'Grounding',
        body:
          'The capacity to find your centre before you move. A dancer sets her weight into the floor before the first phrase. A leader pauses for a full breath before answering the hostile question. A writer names the argument in one sentence before the paragraph that contains it. Same skill.',
      },
      {
        title: 'Energy',
        body:
          'Calibrating your presence to the room. Speakers know this — the same talk lands differently to twelve people than to two hundred. So does showing up to a 1:1 versus a board. The room tells you what it needs. You learn to read it, then meet it.',
      },
      {
        title: 'Flow',
        body:
          'Moving between rigid structure and live response. The choreography says one thing — the music does another. A leader has the talking points and then someone interrupts with the question that matters more. Flow is the skill that holds the structure loose enough for the room to actually shape it.',
      },
      {
        title: 'Command',
        body:
          'Presence that carries authority without force. A dancer holds the final position for one extra count. A leader delivers the decision in one sentence. A writer ends the paragraph where it ends. No volume required. The pause does the work.',
      },
    ],
  }
}

async function buildFourCirclesSet(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`4 circles: Passion, Mission, Vocation, Profession`, 'canonical Ikigai §2 L339')
  return {
    _id: 'fourCirclesSet',
    _type: 'fourCirclesSet',
    circles: [
      {
        title: 'Passion',
        definition: 'What you love doing.',
        missingLine: "You're competent and quietly bored. The work is fine. You are not.",
      },
      {
        title: 'Mission',
        definition: 'What the world actually needs from you.',
        missingLine:
          "You're useful and you can't feel why it matters. The output ships. The meaning doesn't.",
      },
      {
        title: 'Vocation',
        definition: 'What you can be paid to do.',
        missingLine:
          "You love the work and the world hasn't figured out how to pay you for it yet.",
      },
      {
        title: 'Profession',
        definition: "What you're trained for and good at.",
        missingLine:
          "You're passionate and you keep getting outmatched by people who actually know how.",
      },
    ],
  }
}

async function buildPageHome(
  client: SanityClient,
  log: Logger,
  applyMode: boolean
): Promise<SanityDoc> {
  const meetJonImage = await resolveLegacyImage(
    client,
    LEGACY_IDS.homePageContent,
    'meetJonImage',
    log,
    applyMode
  )

  log.note(`hero, methodHeader+steps, pillarsHeader+ref, meetJon, blogPreview`, 'canonical Home §1, §3, §4, §5, §6, §7')

  return {
    _id: 'pageHome',
    _type: 'pageHome',
    hero: {
      eyebrow: 'Ikigai · The entry point',
      headline: 'Find the work you were {{meant}} for.',
      subhead:
        'Dance is my medium. Yours will be different. Eight honest questions to read what actually fits — then a practice to learn to inhabit it.',
      primaryCta: { label: 'Discover Your Ikigai', href: '/ikigai' },
      secondaryCta: { label: 'Read the essay', href: '/about' },
    },
    methodHeader: {
      eyebrow: 'THE METHOD',
      headline: 'Three steps. {{Any}} medium.',
      subhead:
        "Most coaching gives you frameworks and asks you to apply them later. This works the other way around. You find what fits, you learn what it means, then you live in it. Not in that order on a Tuesday — over months.",
    },
    methodSteps: [
      {
        title: 'Discover',
        body:
          "Eight questions, three minutes. The Ikigai Assessment names which of the four circles — Passion, Mission, Vocation, Profession — you're already in, and which one is missing. Most people are missing one. They've been calling it something else for years.",
      },
      {
        title: 'Understand',
        body:
          "The Four Circles is a free 12-lesson course. Each lesson takes about fifteen minutes. By the end you know what your assessment results actually mean — not as a personality type, but as a diagnosis you can do something about.",
      },
      {
        title: 'Embody',
        body:
          "The Foundation is eight weeks of practice. Grounding, energy, flow, command — one pillar at a time, in the body first, on the page second. Taught through dance because dance can't be faked. Transferable to any room, because the fundamentals are the same.",
      },
    ],
    pillarsHeader: {
      eyebrow: 'THE PILLARS',
      headline: 'Four fundamentals. {{Any}} medium.',
      subhead:
        "These are the four things presence is actually made of. Whether you're walking into a corporate review, a creative session, a hard conversation with someone who matters — the difference between commanding the room and managing your nerves comes down to these four. The Foundation teaches them.",
    },
    pillarSet: { _type: 'reference', _ref: 'pillarSet' },
    meetJonHeader: {
      eyebrow: "WHO YOU'RE WORKING WITH",
      headline: "Twenty years in dance. The {{lesson}} wasn't the choreography.",
    },
    meetJonImage,
    meetJonBodyParagraphs: [
      "Jon Young teaches embodied presence to professionals whose medium isn't dance. His students lead engineering teams, run product orgs, write for a living, and stand in front of rooms — none of them are dancers, all of them learn to inhabit their work the same way a dancer learns to inhabit a phrase.",
      'The Foundation distills twenty years of performing, teaching, and choreographing into eight weeks of practice that transfer to whatever room you actually have to walk into.',
    ],
    meetJonPrimaryLink: { label: "Read Jon's story →", href: '/about' },
    testimonialsHeader: { eyebrow: 'WHAT CLIENTS ACTUALLY SAY' },
    blogPreviewHeader: {
      eyebrow: 'READ',
      headline: 'From the {{Lab}}.',
      subhead:
        'Practical writing on presence, movement, and what it actually takes to stop disappearing in rooms. New essays as I figure things out. Some of them will probably be wrong.',
    },
    blogPreviewPerCardCtaLabel: 'Read the essay →',
    blogPreviewSectionCta: { label: 'See all essays', href: '/blog' },
    newsletter: { _type: 'reference', _ref: 'newsletterCapture' },
    auditCta: { _type: 'reference', _ref: 'auditCta' },
    starterGuide: { _type: 'reference', _ref: 'starterGuideCapture' },
  }
}

async function buildPageAbout(
  client: SanityClient,
  log: Logger,
  applyMode: boolean
): Promise<SanityDoc> {
  const originImage = await resolveLegacyImage(
    client,
    LEGACY_IDS.aboutPage,
    'originPhases.0.image',
    log,
    applyMode
  )
  const turningPointImage = await resolveLegacyImage(
    client,
    LEGACY_IDS.aboutPage,
    'introvertImage',
    log,
    applyMode
  )
  const methodologyImage = await resolveLegacyImage(
    client,
    LEGACY_IDS.aboutPage,
    'philosophyImage',
    log,
    applyMode
  )

  log.note(`hero, 3 storyBeats, whoFor, cta`, 'canonical About §1, §2, §3, §4, §5, §6')

  return {
    _id: 'pageAbout',
    _type: 'pageAbout',
    hero: {
      eyebrow: 'THE STORY',
      headline: "I learned this in a {{room}} that wasn't a boardroom.",
      subhead:
        "Twenty years of dance taught me what presence is actually made of. None of my students dance. All of them learn the same fundamentals — because the room doesn't care what your medium is. It only knows whether you're actually there.",
    },
    storyBeats: [
      {
        image: originImage,
        headline: "We weren't just a group of {{kids}}.",
        body:
          "The first dance club at our high school. Nobody knew what they were doing. Neither did I. But on stage, the room did something the classroom never had — and I've been trying to understand it ever since.",
      },
      {
        image: turningPointImage,
        headline: "I hadn't just learned to dance. I had learned to {{lead}}.",
        body:
          "A school performance. The fear. The planning. It was wrong all the way through. Then it wasn't. I stopped managing and started listening. That was the first thing I'd ever done that felt like leading.",
      },
      {
        image: methodologyImage,
        headline: 'Not moves. Not routines.\nThe {{fundamentals}}.',
        body:
          'I spent the next decade reverse-engineering what happened. Not the choreography. Not the performance. The fundamentals.',
        bodyParagraph2:
          'Then I started seeing them in the leaders, writers, and speakers who actually held a room. None of them danced. All of them had it.',
        payoffLine:
          "How to find your centre. How to read a room. How to move with what's happening. How to hold authority without force.",
      },
    ],
    whoFor: {
      headline: 'None of these people are {{broken}}.',
      body:
        'They just never had anyone show them that the way you naturally are — quiet, observant, internal — is already enough to build something powerful on.',
    },
    cta: {
      headline: "That's the {{story}}. Here's the offer.",
      body:
        'If any of this landed — if any of this sounded like you — the next step is the assessment. Eight questions. Three minutes. It tells you which of the four circles you\'re already in, and which one is missing. Free. No account.',
      primaryCta: { label: 'Discover Your Ikigai', href: '/ikigai' },
    },
  }
}

async function buildPageIkigai(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`hero, fourCirclesHeader+ref, quizBridge, cta`, 'canonical Ikigai §1, §2, §3, §6')
  return {
    _id: 'pageIkigai',
    _type: 'pageIkigai',
    hero: {
      eyebrow: 'THE ASSESSMENT',
      headline:
        "Most people are missing {{one}} circle. They've been calling it something else for years.",
      subhead:
        "Passion, Mission, Vocation, Profession — most people are already in three. The work you were meant for sits where all four overlap. Eight honest questions, three minutes, and you'll know which one isn't there yet.",
      primaryCta: { label: 'Start the Assessment', href: '#quiz' },
    },
    fourCirclesHeader: { eyebrow: 'IKIGAI' },
    fourCirclesSet: { _type: 'reference', _ref: 'fourCirclesSet' },
    quizBridge: {
      line: 'Eight honest questions. No right or wrong answers — only clarity.',
    },
    starterGuide: { _type: 'reference', _ref: 'starterGuideCapture' },
    cta: {
      eyebrow: 'ENOUGH READING',
      headline: "You don't need more {{information}}. You need to actually try.",
      body:
        "You've read the page. You know what the assessment does. The only thing left is to take it. Eight questions. Three minutes. No account.",
      primaryCta: { label: 'Take the Assessment', href: '#quiz' },
    },
  }
}

async function buildPageFoundation(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`hero, whoFor, whyDance, 8 modules, howItWorks, enrollment, faq, softCta`, 'canonical Foundation §1–§9')
  return {
    _id: 'pageFoundation',
    _type: 'pageFoundation',
    hero: {
      eyebrow: 'THE FOUNDATION · 8-WEEK COURSE',
      headline: 'Learn to inhabit the {{work}}.',
      subhead:
        "An eight-week embodiment practice taught through dance — because the body learns what the head can't argue with. The pillars transfer to whatever your medium actually is: a meeting, a stage, a page, a room.",
      primaryCta: { label: 'Enroll — Starting at $197', href: '#enrollment' },
      secondaryCta: { label: "See What's Inside", href: '#curriculum' },
      microcopy: 'No prerequisites. Self-paced unlocks weekly.',
    },
    whoForHeader: 'Who this is for',
    whoForLede: "You already have the substance. This is about the signal.",
    whoForBullets: [
      'You know your material but lose it when the room is watching.',
      'You\'ve been called "quiet" or "reserved." Both were code for "not leadership material."',
      'You\'re sharp in a 1:1. Something different happens when the room gets bigger.',
      'You over-prepare. You still feel shaky when it counts.',
      'You want to walk in as yourself and have it be enough.',
    ],
    whyDanceHeader: {
      eyebrow: 'WHY DANCE',
      headline: "Dance can't be {{faked}}.",
    },
    whyDanceBodyParagraphs: [
      'I get the question constantly: why dance, if your students are leaders and writers and engineers? The honest answer is that dance is the most precise medium I know for training what every other medium needs. You can\'t bluff your way through a phrase. You can\'t talk faster to cover the gap. The body is either there or it isn\'t, and the room can see which one.',
      "That's the whole reason it transfers. The pillars — Grounding, Energy, Flow, Command — exist in any room where you have to show up. A meeting, a stage, a page, a hard conversation with someone who matters. Dance is just where they're hardest to fake, and therefore easiest to actually learn.",
      "You won't be doing pirouettes. You'll be learning to find your weight before you speak. To calibrate to a room without performing. To hold a position without bracing. The medium is dance. The work is presence.",
    ],
    curriculumHeader: {
      eyebrow: 'THE CURRICULUM',
      headline: 'Sequential on purpose.',
      subhead:
        "Each module builds on the last — grounding before energy, energy before flow, flow before command. You can go faster. Most people shouldn't.",
    },
    curriculumModules: [
      {
        number: 1,
        title: 'Why Practice Outlasts Performance',
        duration: '12 lessons · 15–20 hours',
        blurb:
          "The argument for the whole approach. Why frameworks and pep talks don't survive the moment that matters, and why physical practice does. By the end of this module you'll know exactly what you're training and why it can't be done from the neck up.",
      },
      {
        number: 2,
        title: 'The Body as Instrument',
        duration: '17 lessons · 25–30 hours',
        blurb:
          "Grounding. The first pillar. How you stand, how you take up space, what you do with your hands when you're not doing anything with your hands. Most professionals have never been taught this. They've been told to \"have presence.\" This is where presence is actually built.",
      },
      {
        number: 3,
        title: 'Active Listening & Attunement',
        duration: '18 lessons · 25–30 hours',
        blurb:
          'Energy. Reading the room with your whole body, not just your ears. How dancers track each other without looking. How leaders walk into a meeting and know within thirty seconds what kind of room they\'re in. The practice that turns "good intuition" into something you can train.',
      },
      {
        number: 4,
        title: 'Improvisation & Adaptability',
        duration: '18 lessons · 25–30 hours',
        blurb:
          "Flow. The skill of having a plan and being willing to abandon it. Improvisers don't make things up — they respond. By the end of this module you'll be able to do the same thing in any room: hold the structure loose enough for what's actually happening to shape it.",
      },
      {
        number: 5,
        title: 'Reading the Exchange',
        duration: '18 lessons · 25–30 hours',
        blurb:
          "The bridge module. Where listening and improvisation become one thing — a real-time conversation between you and the room. You'll learn to match and diverge on purpose. To hold your ground without bracing. To stop performing connection and start actually doing it.",
      },
      {
        number: 6,
        title: 'Tonality & Vocal Presence',
        duration: '19 lessons · 25–30 hours',
        blurb:
          "Command, in sound. What your voice does when you're confident. What it does when you're managing. How to tell the difference, in yourself, in real time. Pacing, weight, the strategic use of silence. Most leadership voices fail not because they're too quiet, but because they fill every gap.",
      },
      {
        number: 7,
        title: 'Presence in Practice',
        duration: '18 lessons · 25–30 hours',
        blurb:
          'All four pillars, under pressure. High-stakes simulations — the presentation, the difficult conversation, the moment when the room turns. You\'ll do them, you\'ll watch yourself do them, you\'ll do them again. This is the module where the work goes from "I understand it" to "I can do it when it counts."',
      },
      {
        number: 8,
        title: 'The Work, Embodied',
        duration: '14 lessons · 20–25 hours',
        blurb:
          "What happens after eight weeks. How to keep practicing when nobody's watching, when there's no module to complete, when the only feedback is the room. You'll leave with a personal practice — not a routine, not a checklist. A way of moving through your work that doesn't dissolve the moment the course ends.",
      },
    ],
    howItWorksHeader: {
      eyebrow: 'HOW IT WORKS',
      headline: 'Not a lecture series. A movement practice.',
    },
    howItWorksColumns: [
      {
        title: 'Self-paced video lessons',
        body:
          'Watch at your own pace. Every lesson is a short concept — no fluff, no filler. Lifetime access.',
      },
      {
        title: 'Movement-grounded principles',
        body:
          'Each week draws from professional dance training and translates it into leadership behaviour you can practice immediately.',
      },
      {
        title: 'Personal follow-up from Jon',
        body:
          'Jon reads what you write and writes back. Sometimes a paragraph, sometimes a short video. Always within 48 hours.',
      },
    ],
    enrollmentHeader: { eyebrow: 'ENROLLMENT', headline: 'Two ways in.' },
    enrollmentCards: [
      {
        eyebrow: 'SELF-PACED',
        title: 'The Foundation',
        priceLine: '$197 · once · lifetime access',
        description: "For people who'll show up to the work without a calendar holding them to it.",
        inclusions: [
          '8 weeks of lessons, 134 lessons total',
          'Movement-to-leadership frameworks',
          'Lifetime access',
          'Personal follow-up from Jon',
        ],
        primaryCta: { label: 'Enroll — $197', href: 'https://buy.stripe.com/...' },
      },
      {
        eyebrow: 'MOST CHOSEN',
        title: 'The Foundation + Weekly Check-ins',
        priceLine: '$497 · once · lifetime access',
        description:
          "Everything in self-paced. Plus eight thirty-minute calls with me, one a week, for whatever the work is bringing up.",
        inclusions: [
          'Everything in Self-Paced',
          '8 weekly 30-minute calls with Jon',
          'Real-time feedback on your specific situations',
          'Prioritized scheduling',
        ],
        primaryCta: { label: 'Enroll — $497', href: 'https://buy.stripe.com/...' },
        badge: 'MOST CHOSEN',
      },
    ],
    enrollmentFootnote:
      "I keep the with-check-ins tier small on purpose. If you're considering it, the audit will tell you whether it's right.",
    faqHeader: 'Common questions',
    faqItems: [
      {
        question: "Is this right for me if I'm not a dancer?",
        answer:
          "Yes. Most people who take this aren't. Dance is the medium I teach in because it can't be faked — but the pillars transfer to any room where you have to show up as yourself in front of people.",
      },
      {
        question: 'How much time does each week require?',
        answer:
          'About 90 minutes of lesson time, plus 15–20 minutes a day of practice. Less than a gym habit. More than a podcast.',
      },
      {
        question: 'What makes this different from other confidence or leadership courses?',
        answer:
          'Most of them work from the neck up — frameworks, scripts, mindset. The gap between "I know what to do" and "I can do it when it counts" doesn\'t close from there.',
      },
      {
        question: 'What does "personal follow-up from Jon" mean in practice?',
        answer:
          "You write a few sentences after each module about what's landing and what isn't. Jon reads it and writes back — usually within 48 hours, sometimes with a short video. It's not a coaching call. It's a check-in that keeps you honest.",
      },
      {
        question: 'Is there a refund policy?',
        answer:
          "Yes. If the first two modules don't deliver, full refund within 14 days. No questions, no exit interview.",
      },
      {
        question: "What's the difference between the self-paced and with-check-ins tiers?",
        answer:
          'Self-paced is the curriculum. With-check-ins is the curriculum plus a weekly 30-minute call with Jon for the eight weeks. Same content. The check-ins are for people who know they\'ll move faster with someone in the room.',
      },
    ],
    softCta: {
      headline: 'Not sure yet? Start with the audit.',
      body:
        "Seven questions, three minutes. I'll review your answers and tell you exactly where your presence stands — and whether the Foundation is the right next step for you.",
      primaryCta: { label: 'Take the Presence Audit', href: '/audit' },
      microcopy: 'Free. No email required.',
    },
    starterGuide: { _type: 'reference', _ref: 'starterGuideCapture' },
  }
}

async function buildPagePrograms(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`hero+whoFor, caseStudiesHeader, 3 programCards, faq, closingCta`, 'canonical Programs §1–§5')
  return {
    _id: 'pagePrograms',
    _type: 'pagePrograms',
    hero: {
      eyebrow: 'THE WORK',
      headline: 'This is where it gets {{physical}}.',
      subhead:
        "Knowing what to do isn't the problem. Doing it when it counts is. These programs train the body to hold what the head already understands — through dance, because dance can't be faked, and into whatever room you actually have to walk into.",
    },
    heroWhoForColumn: {
      header: 'Who this is built for',
      bullets: [
        "You're good at your job. The room just doesn't feel it yet.",
        'You\'ve been told you\'re "too quiet" — or too much. Neither felt accurate.',
        'You want to stop managing how you come across and start actually showing up.',
        "You're already good enough. You just never learned to inhabit it.",
      ],
    },
    caseStudiesHeader: {
      eyebrow: 'BEFORE & AFTER',
      headline: 'Real shifts. Actual situations.',
      subhead:
        'The names and some details have been changed. The challenges and outcomes are accurate.',
    },
    programCards: [
      {
        eyebrow: 'SELF-PACED COURSE',
        title: 'The Foundation',
        priceLine: '$197 · once · lifetime access',
        description:
          "Eight weeks of practice, on your schedule. Same curriculum as the cohort tier — the videos, the modules, the movement-to-leadership frameworks. No calls, no live check-ins, just the work itself. For people who'll show up to the practice without a calendar holding them to it.",
        inclusions: [
          '8 modules · 134 lessons total',
          'Lifetime access — go at your pace',
          'Movement-to-leadership frameworks',
          'Personal follow-up from Jon (async)',
          'Foundation Starter Guide included',
        ],
        primaryCta: { label: 'Get Started — $197', href: 'https://buy.stripe.com/...' },
      },
      {
        eyebrow: 'MOST CHOSEN',
        title: 'The Foundation + Weekly Check-ins',
        priceLine: '$497 · once · lifetime access',
        description:
          "Same curriculum as self-paced. Plus eight thirty-minute calls with me, one a week, for whatever the work is bringing up. The check-ins are why most people choose this tier — not because they need permission, but because they know they'll move faster with someone in the room.",
        inclusions: [
          'Everything in self-paced',
          '8 weekly 30-minute calls with Jon',
          'Real-time feedback on your specific situations',
          'Prioritized scheduling',
        ],
        primaryCta: { label: 'Book a Discovery Call', href: '/contact' },
        badge: 'MOST CHOSEN',
      },
      {
        eyebrow: '1:1 COACHING',
        title: 'Work With Jon Directly',
        priceLine: 'Custom · starting at $3,500',
        description:
          "For people whose situation is specific enough that a course can't quite reach it. A board presence problem. A creative session that keeps stalling. A role you're about to step into. We build it around what you're actually walking into — not a curriculum, a custom plan.",
        inclusions: [
          'Intake assessment — full presence audit',
          'Custom coaching plan',
          'Flexible session frequency (typically biweekly)',
          'Direct access between sessions',
        ],
        primaryCta: { label: 'Book a Discovery Call', href: '/contact' },
      },
    ],
    faqHeader: 'Common questions',
    faqItems: [
      {
        question: 'How is this different from a typical leadership course?',
        answer:
          'Most leadership courses work from the neck up — frameworks, scripts, case studies. The gap between "I know what to do" and "I can do it when it counts" doesn\'t close from there. These programs start in the body, because the body is where the gap actually lives.',
      },
      {
        question: "Is this coaching for me if I'm not a dancer?",
        answer:
          "Yes. Most people who work with me aren't. Dance is the medium I teach in because it can't be faked. The pillars — Grounding, Energy, Flow, Command — transfer to any room where you have to show up as yourself in front of people.",
      },
      {
        question: 'What results should I expect, and by when?',
        answer:
          "Different for everyone. Most people notice a shift in week two — usually in how they hold themselves before they speak. By week six, the change is visible to others before it's visible to them. By week eight, the practice is yours.",
      },
      {
        question: 'Can I do this remotely?',
        answer:
          'Yes — both the self-paced course and the weekly check-ins are remote-first. 1:1 coaching can be remote or in-person depending on where you are and what you\'re working on.',
      },
      {
        question: 'What if I need to pause or reschedule?',
        answer:
          'For self-paced: you can pause anytime, lifetime access. For check-ins: I keep two flex weeks in every cohort for life happening. For 1:1: rescheduling is built into the rhythm, no penalty.',
      },
      {
        question: 'Is there a refund policy?',
        answer:
          "Yes. For self-paced and check-ins: full refund within 14 days if the first two modules don't deliver. For 1:1: a no-fault exit after the first session if it isn't the right fit — full refund minus the intake.",
      },
    ],
    closingCta: {
      eyebrow: 'STILL DECIDING',
      headline: 'Not sure which one is {{right}}?',
      body:
        "We'll talk through where you are, what you're working toward, and which format actually makes sense for you. If none of them do, I'll tell you that too.",
      primaryCta: { label: 'Book a Free Call', href: '/contact' },
      microcopy: 'No pressure, no pitch, no commitment.',
    },
    starterGuide: { _type: 'reference', _ref: 'starterGuideCapture' },
  }
}

async function buildPageLessons(
  client: SanityClient,
  log: Logger,
  applyMode: boolean
): Promise<SanityDoc> {
  let courses: Array<{ _type: 'reference'; _ref: string; _key: string }> = []

  if (applyMode) {
    try {
      const fourCircles = (await client.fetch(
        `*[_type == "course" && slug.current == "four-circles"][0]._id`
      )) as string | null
      const foundation = (await client.fetch(
        `*[_type == "course" && slug.current == "foundation"][0]._id`
      )) as string | null

      if (fourCircles) {
        courses.push({ _type: 'reference', _ref: fourCircles, _key: 'course-four-circles' })
        log.note(`courses[0]._ref: "${fourCircles}"`, 'Sanity course query (four-circles)')
      } else {
        log.warn('course "four-circles" not found in apply mode')
      }
      if (foundation) {
        courses.push({ _type: 'reference', _ref: foundation, _key: 'course-foundation' })
        log.note(`courses[1]._ref: "${foundation}"`, 'Sanity course query (foundation)')
      } else {
        log.warn('course "foundation" not found in apply mode')
      }
    } catch (err) {
      log.warn(`error querying courses: ${String(err)}`)
    }
  } else {
    log.note(`courses[0]: <will resolve four-circles slug at apply time>`, 'placeholder (dry-run)')
    log.note(`courses[1]: <will resolve foundation slug at apply time>`, 'placeholder (dry-run)')
  }

  log.note(`hero, courses[2], closingCta`, 'canonical Lessons §1–§3')

  return {
    _id: 'pageLessons',
    _type: 'pageLessons',
    hero: {
      eyebrow: 'STRUCTURED LEARNING',
      headline: 'The {{Blueprint}}.',
      subhead:
        "Two courses, in order. The free one tells you what's missing. The paid one builds it back. Both are self-paced, both are honest about what they can and can't do.",
    },
    courses,
    closingCta: {
      eyebrow: 'WANT MORE?',
      headline: 'Courses teach the {{frameworks}}. Coaching applies them.',
      body:
        "These courses are the curriculum. They give you the language and the practice. If you want someone in the room with you while you do the work — feedback in real time, accountability, a shape to your week — that's what coaching is for.",
      primaryCta: { label: 'Explore Coaching Programs', href: '/programs' },
    },
    starterGuide: { _type: 'reference', _ref: 'starterGuideCapture' },
  }
}

async function buildPageBlog(
  client: SanityClient,
  log: Logger,
  applyMode: boolean
): Promise<SanityDoc> {
  const seriesInfo: {
    seriesBannerEnabled: boolean
    seriesName: string
    seriesSlug: string
    seriesStatus: string
    seriesDescription: string
    seriesCtaLabel: string
    seriesCurrentPhase?: string
  } = {
    seriesBannerEnabled: true,
    seriesName: 'The Lab',
    seriesSlug: 'the-lab',
    seriesStatus: 'THE LAB · ONGOING',
    seriesDescription:
      "I'm running myself through the Foundation curriculum, week by week, and writing what's actually happening. What's working. What isn't. What I keep getting wrong. Updated as I go — no schedule, no script, no neat conclusions.",
    seriesCtaLabel: 'Follow The Lab',
  }

  if (applyMode) {
    try {
      const blogConfigDoc = (await client.fetch(`*[_id == $id][0]`, {
        id: LEGACY_IDS.blogConfig,
      })) as Record<string, unknown> | null
      if (blogConfigDoc) {
        // Canonical L901: seriesStatus is always 'THE LAB · ONGOING'.
        // Canonical L893+: seriesName is 'The Lab', seriesSlug 'the-lab'.
        // Canonical Blog §3 has fixed seriesDescription + seriesCtaLabel.
        // Only legacy override allowed: seriesCurrentPhase (canonical specifies it's optional/dynamic).
        if (typeof blogConfigDoc.seriesCurrentPhase === 'string')
          seriesInfo.seriesCurrentPhase = blogConfigDoc.seriesCurrentPhase
        log.note(`featuredSeries from canonical (seriesCurrentPhase from legacy if set)`, 'canonical-first')
      }
    } catch (err) {
      log.warn(`could not fetch legacy blogConfig: ${String(err)}`)
    }
  } else {
    log.note(`featuredSeries: <will merge legacy blogConfig at apply time>`, 'fallback (dry-run)')
  }

  log.note(`hero + featuredSeries`, 'canonical Blog §1–§2')

  return {
    _id: 'pageBlog',
    _type: 'pageBlog',
    hero: {
      eyebrow: 'THE ARCHIVES',
      headline: 'Practical writing on what it actually takes to {{stop}} disappearing in rooms.',
      subhead:
        "Essays on presence, movement, and the gap between what you know and what you can do when it counts. New ones as I figure things out. Some of them will probably be wrong.",
    },
    seriesBannerEnabled: seriesInfo.seriesBannerEnabled,
    seriesName: seriesInfo.seriesName,
    seriesSlug: seriesInfo.seriesSlug,
    seriesStatus: seriesInfo.seriesStatus,
    seriesDescription: seriesInfo.seriesDescription,
    seriesCurrentPhase: seriesInfo.seriesCurrentPhase ?? null,
    seriesCtaLabel: seriesInfo.seriesCtaLabel,
    filterPillsNote:
      'Filter pill labels are derived from post tags. To change a pill label, rename the corresponding tag on posts.',
    postsListNote:
      'Blog posts come from the post document type. To add or edit posts, use the Posts section in the sidebar.',
    newsletter: { _type: 'reference', _ref: 'newsletterCapture' },
    auditCta: { _type: 'reference', _ref: 'auditCta' },
    emptyState: {
      headline: 'No essays match.',
      body: 'Try a different filter, or browse The Lab.',
    },
  }
}

async function buildPageContact(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`hero+stats, inquiryCards, whatHappensNext, thingsWorthKnowing, emailFallback`, 'canonical Contact §1–§5')
  return {
    _id: 'pageContact',
    _type: 'pageContact',
    hero: {
      eyebrow: 'START HERE',
      headline: 'Not sure where to start?',
      subhead:
        "Take the Presence Audit first. Seven questions, three minutes. I'll review your answers and follow up personally with something actually useful — not a generic drip sequence.",
      primaryCta: { label: 'Take the Presence Audit', href: '/audit' },
      microcopy: 'No account needed. Free.',
    },
    heroStats: [
      { value: '7', label: 'questions' },
      { value: '3', label: 'minutes' },
      { value: '1', label: 'honest reply from Jon' },
    ],
    inquiryCards: [
      {
        eyebrow: '1-ON-1 COACHING',
        body: 'I want to work with Jon directly.',
        inquiryType: 'oneOnOne',
      },
      {
        eyebrow: 'GENERAL QUESTION',
        body: 'I have something else on my mind.',
        inquiryType: 'general',
      },
    ],
    whatHappensNextHeader: 'What happens next',
    whatHappensNextSteps: [
      { title: 'Submit your inquiry', body: 'Takes 2 minutes. No prep needed.' },
      {
        title: 'We schedule a 15-min call',
        body: "I'll reach out within 2–3 business days to find a time.",
      },
      {
        title: 'We build your custom plan',
        body: 'Together we map out the right path forward for you.',
      },
    ],
    thingsWorthKnowingHeader: 'A few things worth knowing',
    thingsWorthKnowingItems: [
      {
        title: "I don't do pressure.",
        body: "If you reach out, I'm not going to chase you down. Take your time.",
      },
      {
        title: 'I work with individuals, not committees.',
        body:
          "If you're the one who wants to change, this is for you — not your boss who thinks you need coaching.",
      },
      {
        title: 'Spots are limited.',
        body:
          "I keep my 1-on-1 client load intentionally small. If you're on the fence, sooner is better.",
      },
    ],
    emailFallback: {
      bodyLine:
        "Prefer email? hello@jonchalant.com — I check it daily, minus weekends when I'm wrangling three kids and pretending to relax.",
    },
  }
}

async function buildPageAudit(_client: SanityClient, log: Logger): Promise<SanityDoc> {
  log.note(`hero, heroMicrocopy, midQuizEncouragement, resultBands {low, mid, high}`, 'canonical Audit §1–§3')
  return {
    _id: 'pageAudit',
    _type: 'pageAudit',
    hero: {
      eyebrow: 'THE PRESENCE AUDIT',
      headline: 'Seven questions. {{Three}} minutes. One honest read.',
      subhead:
        "This is the quick one. Where the Ikigai Assessment tells you which circle is missing, the Presence Audit tells you where you are with what you already have. Built for people who already know their work but want to know where the gap actually is.",
      primaryCta: { label: 'Start the Audit', href: '#audit-quiz' },
    },
    heroMicrocopy: 'Free. No account. No email required to see your result.',
    midQuizEncouragement: { line: 'Halfway. Keep going.' },
    resultBands: {
      low: {
        headline: "You've got the substance. The {{signal}} isn't there yet.",
        body:
          "Most of your answers point to a real gap between what you know and how the room reads you. That's not bad news — it's the most fixable kind of presence problem there is, because the work isn't to become someone else. It's to learn what you already know how to do, in your body. Most people who score in this band see a noticeable shift in week two of the Foundation.",
        primaryCta: { label: 'See the Foundation', href: '/foundation' },
        secondaryCta: {
          label: 'Tuesday newsletter — one idea a week to start',
          href: '#newsletter',
        },
      },
      mid: {
        headline: "You show up well. Sometimes. The pattern isn't reliable yet.",
        body:
          "Your answers say the skills are there — at least sometimes — but they aren't dependable across contexts. You probably already know which rooms feel right and which ones don't. The Foundation is built for exactly this gap: the skills exist, the practice that locks them in does not.",
        primaryCta: { label: 'See the Foundation', href: '/foundation' },
        secondaryCta: { label: 'Book a free 15-minute call', href: '/contact' },
      },
      high: {
        headline: 'You already have it. Most of the time. {{Most}} isn\'t all of it.',
        body:
          "Your answers say presence isn't your bottleneck — but you wouldn't have taken this audit if nothing was missing. The gap is probably specific, not general: a room where it slips, a kind of conversation that loses you, a transition you haven't figured out yet. That's 1:1 territory, not curriculum territory.",
        primaryCta: { label: 'Book a Discovery Call', href: '/contact' },
        secondaryCta: { label: 'Read the essays — The Lab', href: '/blog' },
      },
    },
    starterGuide: { _type: 'reference', _ref: 'starterGuideCapture' },
  }
}

// ============================================================================
// MIGRATIONS MAP
// ============================================================================

type MigrationBuilder = (
  client: SanityClient,
  log: Logger,
  applyMode: boolean
) => Promise<SanityDoc>

export const MIGRATIONS: Array<[string, MigrationBuilder]> = [
  ['siteConfig', buildSiteConfig],
  ['newsletterCapture', buildNewsletterCapture],
  ['auditCta', buildAuditCta],
  ['starterGuideCapture', buildStarterGuideCapture],
  ['pillarSet', buildPillarSet],
  ['fourCirclesSet', buildFourCirclesSet],
  ['pageHome', buildPageHome],
  ['pageAbout', buildPageAbout],
  ['pageIkigai', buildPageIkigai],
  ['pageFoundation', buildPageFoundation],
  ['pagePrograms', buildPagePrograms],
  ['pageLessons', buildPageLessons],
  ['pageBlog', buildPageBlog],
  ['pageContact', buildPageContact],
  ['pageAudit', buildPageAudit],
]

// ============================================================================
// MAIN
// ============================================================================

// Try to load .env.local for local runs (best-effort, no dependency required).
function loadEnvLocal() {
  try {
    const envPath = path.join(process.cwd(), '.env.local')
    if (!fs.existsSync(envPath)) return
    const content = fs.readFileSync(envPath, 'utf8')
    for (const line of content.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i)
      if (!m) continue
      const key = m[1]
      let val = m[2]
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      if (process.env[key] === undefined) process.env[key] = val
    }
  } catch (err) {
    console.error('WARN: failed to load .env.local:', String(err))
  }
}

async function main() {
  loadEnvLocal()
  const args = parseArgs()

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  if (!projectId) {
    console.error(
      'FATAL: NEXT_PUBLIC_SANITY_PROJECT_ID not set. Add it to .env.local or export it before running.'
    )
    process.exit(1)
  }

  if (args.apply && !process.env.SANITY_API_TOKEN) {
    console.error('FATAL: --apply requires SANITY_API_TOKEN environment variable')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  })

  const log = createLogger(args.dryRun)
  const docs: SanityDoc[] = []
  let written = 0

  console.log(`\n[${args.dryRun ? 'DRY-RUN' : 'APPLY'}] Jonchalant Sanity Content Migration`)
  console.log(`Project: ${projectId} | Dataset: ${dataset}`)
  if (args.only) console.log(`Filter: --only=${args.only}`)

  for (const [type, builder] of MIGRATIONS) {
    if (args.only && args.only !== type) continue

    try {
      const doc = await builder(client, log, args.apply)
      log.doc(doc._type, doc._id, args.dryRun)
      docs.push(doc)

      if (args.apply) {
        await client.createOrReplace(doc)
        written++
      }
    } catch (err) {
      console.error(`\nERROR building ${type}: ${String(err)}`)
      if (err instanceof Error && err.stack) console.error(err.stack)
      process.exit(1)
    }
  }

  console.log(
    `\nSummary: ${docs.length} documents ${args.dryRun ? 'planned' : `written (${written})`} (${
      args.dryRun ? 'dry-run mode' : 'apply mode'
    })`
  )
}

// Only run main() when invoked directly (not when imported by audit script)
const invokedDirectly =
  process.argv[1] !== undefined && /migrate-content\.[mc]?[jt]s$/.test(process.argv[1])

if (invokedDirectly) {
  main().catch((err) => {
    console.error('FATAL:', err)
    process.exit(1)
  })
}

export { main, createLogger, type SanityDoc, type Logger }
