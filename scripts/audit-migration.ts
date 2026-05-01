/**
 * Migration script audit.
 *
 * Produces design/migration-script-audit.md with two sections:
 *   1. Schema field name diff — programmatically extracted schema field paths
 *      vs. paths the migration script writes. Per-doc, three-bucket diff:
 *      missing-in-script / extra-in-script / matched.
 *   2. Canonical text drift — for each migration doc, dumps the script's
 *      output values alongside the canonical-copy.md line ranges to read.
 *      Manual side-by-side review.
 *
 * Usage: npx tsx scripts/audit-migration.ts
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

import { pageDocumentTypes } from '../sanity/schemas/documents/pages/index'
import { sharedDocumentTypes } from '../sanity/schemas/documents/shared/index'
import { objectTypes } from '../sanity/schemas/objects/index'

import { MIGRATIONS, createLogger, type SanityDoc, type Logger } from './migrate-content'

// ===========================================================================
// SCHEMA WALKER
// ===========================================================================

interface SchemaField {
  name: string
  type: string
  fields?: SchemaField[]
  of?: SchemaField[]
  to?: Array<{ type: string }>
}

interface SchemaType {
  name: string
  type: string
  fields?: SchemaField[]
}

const objectByName = new Map<string, SchemaType>()
for (const obj of objectTypes as unknown as SchemaType[]) {
  objectByName.set(obj.name, obj)
}

function flattenSchemaFields(
  fields: SchemaField[] | undefined,
  prefix: string,
  visited: Set<string>
): string[] {
  if (!fields) return []
  const out: string[] = []
  for (const f of fields) {
    const path = prefix ? `${prefix}.${f.name}` : f.name

    // Reference field: emit `${path}._ref` leaf.
    if (f.type === 'reference') {
      out.push(`${path}._ref`)
      continue
    }

    // Array field: walk first member's shape.
    if (f.type === 'array') {
      const member = f.of?.[0]
      if (!member) {
        out.push(`${path}[]`)
        continue
      }
      const itemPath = `${path}[]`
      // Inline object array member
      if (member.type === 'object' && member.fields) {
        out.push(...flattenSchemaFields(member.fields, itemPath, visited))
        continue
      }
      // Reference to a registered object type
      const obj = objectByName.get(member.type)
      if (obj && !visited.has(obj.name)) {
        const nextVisited = new Set(visited).add(obj.name)
        out.push(...flattenSchemaFields(obj.fields, itemPath, nextVisited))
        continue
      }
      // Primitive array member (e.g. text, string)
      out.push(itemPath)
      continue
    }

    // Inline object with fields (rare)
    if (f.type === 'object' && f.fields) {
      out.push(...flattenSchemaFields(f.fields, path, visited))
      continue
    }

    // Custom object type referenced by name
    const obj = objectByName.get(f.type)
    if (obj && !visited.has(obj.name)) {
      const nextVisited = new Set(visited).add(obj.name)
      out.push(...flattenSchemaFields(obj.fields, path, nextVisited))
      continue
    }

    // Primitive leaf
    out.push(path)
  }
  return out
}

function flattenSchema(doc: SchemaType): string[] {
  return flattenSchemaFields(doc.fields, '', new Set())
}

// ===========================================================================
// DOC OUTPUT WALKER
// ===========================================================================

const SKIP_KEYS = new Set(['_id', '_type', '_key'])

function flattenDoc(value: unknown, prefix: string): string[] {
  if (value === null || value === undefined) return []

  if (Array.isArray(value)) {
    const out: string[] = []
    const itemPath = `${prefix}[]`
    if (value.length === 0) {
      // Empty arrays in dry-run cannot reveal member shape. Omit so the audit
      // surfaces them as "missing" (which is correct semantics) rather than
      // "extra" with a bare `[]` path.
      return out
    }
    // Walk only the first item's shape (representative)
    const first = value[0]
    if (first !== null && typeof first === 'object' && !Array.isArray(first)) {
      out.push(...flattenDoc(first, itemPath))
    } else {
      out.push(itemPath)
    }
    return out
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>
    // Reference shape: emit ._ref
    if (obj._type === 'reference' && typeof obj._ref === 'string') {
      return [`${prefix}._ref`]
    }
    // Image asset: treat as leaf (don't recurse into asset internals)
    if (obj._type === 'image' || (obj.asset !== undefined && obj._type === undefined && Object.keys(obj).length <= 3)) {
      return [prefix]
    }
    const out: string[] = []
    for (const [k, v] of Object.entries(obj)) {
      if (SKIP_KEYS.has(k)) continue
      const childPath = prefix ? `${prefix}.${k}` : k
      if (v === null || v === undefined) {
        // null fields: still emit the path so the diff sees it
        out.push(childPath)
        continue
      }
      out.push(...flattenDoc(v, childPath))
    }
    return out
  }

  // Primitive
  return [prefix]
}

// ===========================================================================
// SILENT LOGGER
// ===========================================================================

function silentLogger(): Logger {
  return {
    note() {},
    warn() {},
    doc() {},
  }
}

// ===========================================================================
// CANONICAL SECTION INDEX
// ===========================================================================

// Mapping from migration doc _type → canonical line ranges to read for review.
// Line numbers are from design/canonical-copy.md (1396 lines total).
const CANONICAL_SECTIONS: Record<string, string> = {
  pageHome: '§1 L72; §3 L92; §4 L114; §5 L140; §6 L156; §7 L168; §8 L182; §9 L200; §10 L214',
  pageAbout: '§1 L240; §2 L252; §3 L262; §4 L272; §5 L289; §6 L301',
  pageIkigai: '§1 L325; §2 L339; §3 L365; §6 L385',
  pageFoundation: '§1 L409; §2 L425; §3 L440; §4 L456; §5 L514; §6 L534; §7 L574; §8 L604',
  pagePrograms: '§1 L632; §2 L651; §3 L663; §4 L726; §5 L756',
  pageLessons: '§1 L786; §2 L796; §3 L838',
  pageBlog: '§1 L874; §2 L884; §3 L899; §4 L911; §5 L919; §6 L929; §7 L937',
  pageContact: '§1 L959; §2 L978; §3 L1002; §4 L1026; §5 L1050',
  pageAudit: '§1 L1066; §2 L1080; §3 L1088',
  siteConfig: 'Globals: Navbar L1156; Footer L1178; Universal microcopy L1208; CTA labels L1242; 404 L1272; Sign-in/up L1287',
  newsletterCapture: 'Home §8 L182; Universal microcopy L1208',
  auditCta: 'Home §9 L200',
  starterGuideCapture: 'Home §10 L214',
  pillarSet: 'Home §4 L114',
  fourCirclesSet: 'Ikigai §2 L339',
}

// ===========================================================================
// MAIN
// ===========================================================================

function truncate(v: unknown, max = 160): string {
  const s = typeof v === 'string' ? v : JSON.stringify(v)
  if (s == null) return 'null'
  if (s.length <= max) return s
  return s.slice(0, max) + '…'
}

function dumpDocValues(doc: SanityDoc, indent = '  '): string {
  const lines: string[] = []
  function walk(value: unknown, prefix: string) {
    if (value === null || value === undefined) {
      lines.push(`${indent}${prefix}: null`)
      return
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${indent}${prefix}: [] (empty)`)
        return
      }
      // For arrays of strings, show all
      if (value.every((v) => typeof v === 'string')) {
        value.forEach((s, i) => lines.push(`${indent}${prefix}[${i}]: ${truncate(s)}`))
        return
      }
      // Arrays of objects: walk each
      value.forEach((item, i) => {
        if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
          walk(item, `${prefix}[${i}]`)
        } else {
          lines.push(`${indent}${prefix}[${i}]: ${truncate(item)}`)
        }
      })
      return
    }
    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>
      if (obj._type === 'reference' && typeof obj._ref === 'string') {
        lines.push(`${indent}${prefix}: → ref(${obj._ref})`)
        return
      }
      for (const [k, v] of Object.entries(obj)) {
        if (SKIP_KEYS.has(k)) continue
        walk(v, prefix ? `${prefix}.${k}` : k)
      }
      return
    }
    lines.push(`${indent}${prefix}: ${truncate(value)}`)
  }
  for (const [k, v] of Object.entries(doc)) {
    if (SKIP_KEYS.has(k)) continue
    walk(v, k)
  }
  return lines.join('\n')
}

interface DiffResult {
  type: string
  schemaPaths: string[]
  scriptPaths: string[]
  missingInScript: string[]
  extraInScript: string[]
}

async function main() {
  // Build schemaPaths registry
  const allDocs: SchemaType[] = [
    ...(pageDocumentTypes as unknown as SchemaType[]),
    ...(sharedDocumentTypes as unknown as SchemaType[]),
  ]
  const schemaPaths = new Map<string, string[]>()
  for (const d of allDocs) {
    schemaPaths.set(d.name, flattenSchema(d).sort())
  }

  // Build scriptPaths + capture each builder's output
  const log = silentLogger()
  // We pass a fake client; builders only use it when applyMode=true.
  const fakeClient = {
    fetch: async () => null,
    createOrReplace: async () => null,
    config: () => ({}),
  } as unknown as import('@sanity/client').SanityClient

  const builtDocs = new Map<string, SanityDoc>()
  for (const [name, builder] of MIGRATIONS) {
    const doc = await builder(fakeClient, log, false)
    builtDocs.set(name, doc)
  }
  const scriptPaths = new Map<string, string[]>()
  for (const [name, doc] of builtDocs.entries()) {
    scriptPaths.set(name, flattenDoc(doc, '').sort())
  }

  // Diff per doc
  const diffs: DiffResult[] = []
  for (const [name, schema] of schemaPaths.entries()) {
    const script = scriptPaths.get(name) ?? []
    const schemaSet = new Set(schema)
    const scriptSet = new Set(script)
    const missingInScript = schema.filter((p) => !scriptSet.has(p))
    const extraInScript = script.filter((p) => !schemaSet.has(p))
    diffs.push({ type: name, schemaPaths: schema, scriptPaths: script, missingInScript, extraInScript })
  }

  // Render markdown
  const lines: string[] = []
  lines.push('# Migration script audit')
  lines.push('')
  lines.push('Mechanical comparison of `scripts/migrate-content.ts` against:')
  lines.push('1. New page/shared singleton schemas in `sanity/schemas/documents/`')
  lines.push('2. Canonical copy in `design/canonical-copy.md`')
  lines.push('')
  lines.push('Generated by `scripts/audit-migration.ts`. Re-run after script edits.')
  lines.push('')

  // ──────────────────────────────────────────────────────────────────────
  // SECTION 1 — SCHEMA FIELD NAME DIFF
  // ──────────────────────────────────────────────────────────────────────
  lines.push('## 1. Schema field name diff')
  lines.push('')
  lines.push('Each doc shows two buckets:')
  lines.push('- **Missing in script** — schema declares the field; script omits it. Acceptable for optional fields, **bug if required**.')
  lines.push('- **Extra in script** — script writes a field the schema does not declare. Sanity will accept silently as unknown attribute and the field will be invisible in Studio. **Always a bug.**')
  lines.push('')
  lines.push('Reference paths (`*._ref`) are normalized for both sides. Image fields are flat leaves. Array shapes use `[]` (representative member).')
  lines.push('')

  let totalMissing = 0
  let totalExtra = 0
  for (const d of diffs) {
    const docOk = d.missingInScript.length === 0 && d.extraInScript.length === 0
    const status = docOk ? '✅ clean' : `⚠️ ${d.missingInScript.length} missing, ${d.extraInScript.length} extra`
    lines.push(`### \`${d.type}\` — ${status}`)
    lines.push('')

    if (d.extraInScript.length > 0) {
      totalExtra += d.extraInScript.length
      lines.push('**Extra in script (will be silently dropped by Sanity):**')
      for (const p of d.extraInScript) lines.push(`- \`${p}\` — ❌ fix in \`build${capitalize(d.type)}()\``)
      lines.push('')
    }
    if (d.missingInScript.length > 0) {
      totalMissing += d.missingInScript.length
      lines.push('**Missing in script (schema declares; script omits):**')
      for (const p of d.missingInScript) lines.push(`- \`${p}\` — review whether required; if so, add to \`build${capitalize(d.type)}()\``)
      lines.push('')
    }
    if (docOk) {
      lines.push('All script field paths align with schema field paths.')
      lines.push('')
    }
  }

  lines.push('### Section 1 summary')
  lines.push('')
  lines.push(`- Docs audited: **${diffs.length}**`)
  lines.push(`- Total fields **extra in script**: **${totalExtra}** (silently dropped — must fix)`)
  lines.push(`- Total fields **missing in script**: **${totalMissing}** (review case-by-case)`)
  lines.push('')

  // ──────────────────────────────────────────────────────────────────────
  // SECTION 2 — CANONICAL TEXT DRIFT
  // ──────────────────────────────────────────────────────────────────────
  lines.push('## 2. Canonical text drift')
  lines.push('')
  lines.push('For each migration doc, the script\'s **literal output values** are dumped below. Read top-to-bottom against the canonical line ranges noted under each header. Mark drift with ❌ + a fix annotation in this document, then update `scripts/migrate-content.ts`.')
  lines.push('')
  lines.push('Italics convention: `{{word}}` denotes intentional kinetic-typography emphasis. Schema validators expect the braces; do not strip.')
  lines.push('')

  for (const [name, doc] of builtDocs.entries()) {
    const sections = CANONICAL_SECTIONS[name] ?? '(unmapped)'
    lines.push(`### \`${name}\``)
    lines.push('')
    lines.push(`**Read against:** \`design/canonical-copy.md\` ${sections}`)
    lines.push('')
    lines.push('```')
    lines.push(dumpDocValues(doc))
    lines.push('```')
    lines.push('')
  }

  // ──────────────────────────────────────────────────────────────────────
  // FINAL CHECKLIST
  // ──────────────────────────────────────────────────────────────────────
  lines.push('## Resolution path')
  lines.push('')
  lines.push('1. Walk Section 1. For every "extra in script" entry, rename or remove the field in the corresponding `buildXxx()` function.')
  lines.push('2. Walk Section 1 missing-in-script. Add fields where schema requires them; leave others null if optional.')
  lines.push('3. Walk Section 2 top-to-bottom against canonical. Annotate drift inline with `// ← was canonical X, now drifted to Y` style notes for any rewrites.')
  lines.push('4. Re-run `npx tsx scripts/audit-migration.ts`. Confirm Section 1 is fully clean (no missing, no extra).')
  lines.push('5. Re-run `npx tsx scripts/migrate-content.ts --dry-run` and confirm output unchanged in shape.')
  lines.push('6. Run `npx tsx scripts/migrate-content.ts --apply` only after explicit user confirmation.')
  lines.push('')

  const outPath = path.join(process.cwd(), 'design', 'migration-script-audit.md')
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8')
  console.log(`Wrote ${outPath}`)
  console.log(`  ${diffs.length} docs audited`)
  console.log(`  ${totalExtra} fields extra in script (must fix)`)
  console.log(`  ${totalMissing} fields missing in script (review)`)
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

main().catch((err) => {
  console.error('FATAL:', err)
  process.exit(1)
})
