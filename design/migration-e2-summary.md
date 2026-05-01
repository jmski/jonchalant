# E-2 Migration Summary — Sanity Content Consolidation

**Status:** ✅ Complete  
**Branch:** `phase-2-clean`  
**Workstream:** Phase 2 → Phase 4 (workstream 2 closed)

---

## Outcome

The Jonchalant Sanity dataset has been consolidated from a sprawl of 21+ legacy schema types — many overlapping, many partially populated, several with stale or contradictory copy — into a clean set of singletons that mirror the page render order in `design/canonical-copy.md`. App code, Studio, and CMS data are now aligned to a single source of truth.

- **15 singleton documents** written to production (1 site config + 4 shared captures/sets + 9 page singletons + 1 ikigai page).
- **12 legacy schema files** deleted from the repo. Studio's "Legacy (to be removed)" group removed from `sanity/structure.ts`.
- **2 canonical-vs-legacy drifts** caught and resolved during apply (see [Drift principle](#drift-principle)).
- **1 side fix** along the way: removed deprecated `__experimental_actions` from all 14 new singleton schemas (typecheck/build had been failing on this pre-existing issue).
- **9 marketing routes verified** rendering HTTP 200 against the new dataset.

---

## What got migrated (15 documents)

Sources are labeled as:
- **canonical** — populated from `design/canonical-copy.md` only
- **legacy** — pulled from a pre-existing Sanity doc (e.g. `contactInfo`, `blogConfig`)
- **canonical + legacy (canonical wins)** — see drift principle below

| # | Document `_id` | Type | Source |
|---|---|---|---|
| 1 | `siteConfig` | shared singleton | canonical (globals §L1156–L1287) + legacy `contactInfo` for socials only; `contactEmail` is canonical |
| 2 | `newsletterCapture` | shared singleton | canonical (Home §8 L182, microcopy L1208) |
| 3 | `auditCta` | shared singleton | canonical (Home §9 L200) |
| 4 | `starterGuideCapture` | shared singleton | canonical (Home §10 L214) |
| 5 | `pillarSet` | shared singleton | canonical (Home §4 L114 — Grounding/Energy/Flow/Command) |
| 6 | `fourCirclesSet` | shared singleton | canonical (Ikigai §2 L339 — Passion/Mission/Vocation/Profession) |
| 7 | `pageHome` | page singleton | canonical (Home §1, §3–§7) |
| 8 | `pageAbout` | page singleton | canonical (About §1–§6, including 3 storyBeats with bodyParagraph2 + payoffLine on beat 3) |
| 9 | `pageIkigai` | page singleton | canonical (Ikigai §1, §2, §3, §6) |
| 10 | `pageFoundation` | page singleton | canonical (Foundation §1–§9) |
| 11 | `pagePrograms` | page singleton | canonical (Programs §1–§5) |
| 12 | `pageLessons` | page singleton | canonical (Lessons §1–§3); `courses[]` references resolved at apply time (see [Known gaps](#known-gaps)) |
| 13 | `pageBlog` | page singleton | canonical (Blog §1–§2) — series banner fields hard-canonical; only `seriesCurrentPhase` accepts a legacy override |
| 14 | `pageContact` | page singleton | canonical (Contact §1–§5) |
| 15 | `pageAudit` | page singleton | canonical (Audit §1–§3, including resultBands as `{low, mid, high}` object) |

The migration script ([scripts/migrate-content.ts](../scripts/migrate-content.ts)) is idempotent (`createOrReplace`), default-dry-run, supports `--apply` and `--only=<docType>`, and reads `SANITY_API_TOKEN` from `.env.local`.

---

## Drift principle

Two fields were silently being overwritten by stale legacy values during the first `--apply`:

| Field | Legacy value | Canonical value | Resolution |
|---|---|---|---|
| `siteConfig.contactEmail` | `help@jonchalant.com` | `hello@jonchalant.com` (canonical L1238) | Removed legacy override — `contactEmail` is now hard-canonical |
| `pageBlog.seriesStatus` (etc.) | `SERIES · ONGOING` (and other series fields) | `THE LAB · ONGOING` (canonical L901) | Removed legacy overrides for `seriesName`, `seriesSlug`, `seriesStatus`, `seriesDescription`, `seriesCtaLabel` — only `seriesCurrentPhase` (which canonical marks dynamic) is still pulled from legacy `blogConfig` |

**Principle codified for any future migration:**

> **Canonical wins for canonical-specified fields. Legacy is only a source for fields canonical doesn't specify.**

If a field appears in `design/canonical-copy.md`, the migration script must ignore any legacy value for it. Legacy data is only consulted for fields canonical leaves unspecified (e.g. dynamic phase counters, social URLs that aren't part of the brand voice, etc.). This was caught because we ran a programmatic Sanity-side verify after `--apply`; both drifts had passed dry-run because they matched the schema shape.

---

## Audit harness

`scripts/audit-migration.ts` was written as a programmatic gate ahead of `--apply`. It walks every Sanity schema referenced by `MIGRATIONS`, compares it to the script's planned output (mechanical diff), and emits the canonical text dump. It writes `design/migration-script-audit.md`.

This caught:
- 6 builder shape mismatches (rewritten before `--apply`)
- 3 subagent-reported canonical drift findings (verified manually before fix)
- 2 additional drifts the subagent missed (caught on manual canonical pass)

The audit harness should be re-run any time the script or the canonical doc changes materially.

---

## Phase 4 — schema decommissioning

### Files deleted from `sanity/schemas/`

12 files removed:

```
aboutPage.ts          contactInfo.ts        homePageContent.ts    programsPageContent.ts
auditPage.ts          contactPage.ts        ikigaiQuiz.ts         service.ts
blogConfig.ts         emailOptIn.ts         pressMention.ts
foundationPage.ts
```

### Registries cleaned

- [sanity/schemas/index.ts](../sanity/schemas/index.ts) — 12 imports removed; only content-list types kept (`testimonial`, `caseStudy`, `lesson`, `course`, `courseLesson`, `blogPost`, `module`)
- [sanity/schemaTypes/index.ts](../sanity/schemaTypes/index.ts) — same cleanup applied to the duplicate Studio registry
- [sanity/structure.ts](../sanity/structure.ts) — entire "Legacy (to be removed)" list group + preceding divider removed

### Side fix: `__experimental_actions`

All 14 new singleton schemas (added pre-this-session) had `__experimental_actions: ['update', 'publish']` declared. This field is no longer in Sanity v3's `DocumentDefinition` type and was producing 14 type errors on every `tsc` and `next build`. The errors were latent until phase 4 because they didn't block the Studio dev server.

Removed from all 14 files via `sed`. Singleton-only behavior is already enforced via [sanity/structure.ts](../sanity/structure.ts) — each singleton uses `S.documentTypeListItem(...)` so create/delete actions don't appear in the UI. Net behavior is identical, types are now clean.

### Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean (15 pre-existing errors fixed via the `__experimental_actions` removal) |
| `npm run build` | ✅ compiled in 6.0s |
| `npm run dev` + curl all 9 marketing routes | ✅ HTTP 200 |
| Sanity Studio singletons resolve refs (verified programmatically) | ✅ `pageHome`, `pageIkigai`, `pageBlog`, `pageFoundation` all resolve to live shared singletons |

---

## Orphan documents in production

The 12 legacy doc instances (one per deleted schema, plus a few stragglers) still exist in the production dataset under their original `_id`s. They are:

- **schema-less** — Studio doesn't render them, app code doesn't query them
- **safely orphaned** — they cost nothing in Sanity quota and don't affect query performance
- **intentional** — they serve as a recovery checkpoint if any field is later discovered to have been mis-migrated

This is a deliberate choice, not garbage. If a hard purge is ever wanted it's a one-shot `client.delete(_id)` script, but there's no operational reason to hurry. The `production.tar.gz` snapshot and `.migration/legacy/export/data.ndjson` (both gitignored) provide a second layer of recovery if the dataset itself is ever lost.

---

## Known gaps (for follow-up workstreams)

1. **Italic-anchor rendering bug.** `{{...}}` markers in canonical copy are rendering as **literal braces** in the DOM on every page that uses the new singletons. Root cause: section components consume `{header.headline}` raw instead of piping through `lib/render-headline.tsx`. `MeetJon` even has a hardcoded `/lesson/i` matcher that emits `{{<em>lesson</em>}}` (worst of both worlds). Affects: home §3, §4, §5, §7, §8; about §2, §3, §5, §6; foundation, ikigai, programs, lessons, blog, contact, audit headlines. Component-side fix, not a script bug. **Owner: workstream 3.**

2. **Course references on `pageLessons`.** During `--apply`, two warnings surfaced: `course "four-circles" not found` and `course "foundation" not found`. The `course` document type exists but no documents have been created for either slug. `pageLessons.courses[]` is empty as a result. Will resolve once the course content is authored.

3. **Lint OOM.** `npm run lint` runs out of heap because eslint walks `sanity/dist/`. Pre-existing, unrelated to this migration. Either add `sanity/dist/` to `.eslintignore` or bump `NODE_OPTIONS=--max-old-space-size`.

---

## Workstream status

- ✅ **Workstream 1** (canonical copy doc) — locked in phase 2
- ✅ **Workstream 2** (CMS schema reorganization + content migration) — closed by this summary
- ⏭ **Workstream 3** (content + render polish) — open. Scope: italic-anchor rendering bug, course content authoring, end-to-end visual QA of all 9 marketing pages against `design-notes/baseline/desktop` and `design-notes/baseline/mobile` screenshots, then replace those baselines with the new ones.

---

## Artifacts

- Migration script: [scripts/migrate-content.ts](../scripts/migrate-content.ts)
- Audit harness: [scripts/audit-migration.ts](../scripts/audit-migration.ts)
- Audit report: [design/migration-script-audit.md](./migration-script-audit.md)
- Canonical source of truth: [design/canonical-copy.md](./canonical-copy.md) (1396 lines, do not modify)
- Legacy snapshot (gitignored): `.migration/legacy/export/data.ndjson`, `production.tar.gz`
