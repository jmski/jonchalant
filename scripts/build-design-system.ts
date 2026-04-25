/**
 * Build design-notes/design-system.html from:
 *   - design-notes/design-system.template.html  (structure + CSS — edit this)
 *   - design/canonical-content.json             (content strings — edit this)
 *
 * Closes the drift surface where design-system.html could silently diverge
 * from the canonical content strings used by Sanity seed scripts.
 *
 * Inject points in the template:
 *   <!-- INJECT:pillars-grid -->      → §05 Four Pillars cards
 *   <!-- INJECT:hero-demo-content --> → §10 Hero specimen
 *
 * Run:
 *   npm run build:design-system
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ── Load inputs ───────────────────────────────────────────────────────────────

const templatePath = resolve(root, 'design-notes/design-system.template.html')
const canonicalPath = resolve(root, 'design/canonical-content.json')
const outputPath = resolve(root, 'design-notes/design-system.html')

const template = readFileSync(templatePath, 'utf8')
const canonical = JSON.parse(readFileSync(canonicalPath, 'utf8'))

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Convert `{{word}} rest of sentence.` notation to `<em>word</em> rest of sentence.`
 * Used for canonical headline strings that mark an italic anchor word with {{…}}.
 */
function renderInline(text: string): string {
  return text.replace(/\{\{(.+?)\}\}/g, '<em>$1</em>')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ── Generate: §05 Pillars grid ────────────────────────────────────────────────

function buildPillarsGrid(): string {
  const { items } = canonical.homePage.pillars as {
    headline: string
    items: Array<{
      number: string
      name: string
      definition: string
      applications: Array<{ who: string; body: string }>
    }>
  }

  const cards = items
    .map((pillar) => {
      const apps = pillar.applications
        .map(
          (app) =>
            `            <li><span class="who">${escapeHtml(app.who)}</span> ${escapeHtml(app.body)}</li>`
        )
        .join('\n')

      return `        <div class="pillar-card">
          <div class="pillar-label">${escapeHtml(pillar.number)}</div>
          <h3 class="pillar-name">${escapeHtml(pillar.name)}</h3>
          <p class="pillar-def">${escapeHtml(pillar.definition)}</p>
          <ul class="pillar-apps">
${apps}
          </ul>
        </div>`
    })
    .join('\n')

  return `      <div class="pillar-grid">
${cards}
      </div>`
}

// ── Generate: §10 Hero demo content ──────────────────────────────────────────

function buildHeroDemoContent(): string {
  const { eyebrow, headline, subhead, primaryCtaLabel } =
    canonical.homePage.hero as {
      eyebrow: string
      headline: string
      subhead: string
      primaryCtaLabel: string
      primaryCtaHref: string
    }

  return `          <p class="hero-demo-eyebrow">${escapeHtml(eyebrow)}</p>
          <h2 class="hero-demo-headline">${renderInline(escapeHtml(headline))}</h2>
          <p class="hero-demo-sub">${escapeHtml(subhead)}</p>
          <div style="display:flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
            <a class="btn" href="#">${escapeHtml(primaryCtaLabel)}</a>
          </div>`
}

// ── Inject and write ──────────────────────────────────────────────────────────

let output = template

output = output.replace('<!-- INJECT:pillars-grid -->', buildPillarsGrid())
output = output.replace(
  '<!-- INJECT:hero-demo-content -->',
  buildHeroDemoContent()
)

if (output.includes('<!-- INJECT:')) {
  const remaining = output.match(/<!-- INJECT:[^>]+ -->/g) ?? []
  console.error(`Error: unresolved inject points: ${remaining.join(', ')}`)
  process.exit(1)
}

writeFileSync(outputPath, output, 'utf8')
console.log(`✓ design-system.html written (${output.length.toLocaleString()} chars)`)
console.log(`  Template: design-notes/design-system.template.html`)
console.log(`  Content:  design/canonical-content.json`)
