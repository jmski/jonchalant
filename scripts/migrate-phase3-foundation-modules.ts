// Canonical content lives in design/canonical-content.json.
// Edit content there, then run this script to push to Sanity.
// Do NOT hardcode canonical strings in this file.

/**
 * Phase 3 module migration: patch Foundation module titles + descriptions,
 * then wire foundationPage.modules to reference all 8 modules in order.
 *
 * Module documents already exist with deterministic IDs (foundation-module-1 … 8).
 * Course document already exists: foundation-course.
 *
 * Safe to re-run — only patches fields that differ from the canonical.
 *
 * Run:
 *   npm run migrate:phase3-foundation-modules
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import canonicalContent from '../design/canonical-content.json' with { type: 'json' }

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!token) throw new Error('Missing SANITY_API_TOKEN')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const { modules: canonicalModules } = canonicalContent.foundationPage.curriculum

/** IDs are deterministic: foundation-module-{moduleNumber} */
function moduleId(moduleNumber: number) {
  return `foundation-module-${moduleNumber}`
}

async function patchModuleDocuments() {
  console.log('── Patching module documents ─────────────────────────────')

  const existingModules = await client.fetch<Array<{
    _id: string
    moduleNumber: number
    title: string
    description: string
  }>>(
    `*[_type == "module" && _id in $ids]{ _id, moduleNumber, title, description }`,
    { ids: canonicalModules.map((m) => moduleId(m.moduleNumber)) }
  )

  const existingMap = new Map(existingModules.map((m) => [m.moduleNumber, m]))

  for (const canonical of canonicalModules) {
    const existing = existingMap.get(canonical.moduleNumber)
    const id = moduleId(canonical.moduleNumber)

    if (!existing) {
      console.log(`  ${id}: NOT FOUND in Sanity — skipping (create not in scope for this script)`)
      continue
    }

    const patches: Record<string, string> = {}
    if (existing.title !== canonical.title) {
      console.log(`  ${id}: title "${existing.title}" → "${canonical.title}"`)
      patches.title = canonical.title
    }
    if (existing.description !== canonical.description) {
      console.log(`  ${id}: description updating`)
      patches.description = canonical.description
    }

    if (Object.keys(patches).length === 0) {
      console.log(`  ${id}: already canonical, skipping.`)
      continue
    }

    await client.patch(id).set(patches).commit()
    console.log(`  ${id}: patched.`)
  }
}

async function wireFoundationPageModules() {
  console.log('── Wiring foundationPage.modules references ──────────────')

  const foundationPage = await client.fetch<{
    _id: string
    modules?: Array<{ _ref: string }>
  }>(
    `*[_type == "foundationPage"][0]{ _id, modules[]{ _ref } }`
  )

  if (!foundationPage) {
    console.error('No foundationPage document found. Run migrate:phase3-foundation-hero first.')
    process.exit(1)
  }

  const canonicalRefs = canonicalModules.map((m) => ({
    _type: 'reference' as const,
    _ref: moduleId(m.moduleNumber),
  }))

  const currentRefs = foundationPage.modules?.map((r) => r._ref) ?? []
  const canonicalRefIds = canonicalRefs.map((r) => r._ref)

  if (JSON.stringify(currentRefs) === JSON.stringify(canonicalRefIds)) {
    console.log(`  ${foundationPage._id}: modules already wired, skipping.`)
    return
  }

  console.log(`  ${foundationPage._id}: setting modules (${canonicalRefs.length} references)`)
  await client.patch(foundationPage._id).set({ modules: canonicalRefs }).commit()
  console.log(`  ${foundationPage._id}: patched.`)
}

async function migrate() {
  await patchModuleDocuments()
  await wireFoundationPageModules()
  console.log('Foundation modules migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
