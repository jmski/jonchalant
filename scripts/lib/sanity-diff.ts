/**
 * Pre-run diff utility for Sanity seed and migrate scripts.
 *
 * Call diffAndConfirm before any .set() / .createOrReplace() write.
 * If all fields are unchanged it returns true silently.
 * If any field would change it prints a diff and prompts for confirmation.
 * If stdin is not a TTY (e.g. CI) it defaults to N (safe).
 */

import type { SanityClient } from '@sanity/client'
import * as readline from 'readline'

// Truncate long values in diff output to keep it readable.
function summarize(value: unknown, maxLen = 120): string {
  if (value === null || value === undefined) return String(value)
  const s = JSON.stringify(value)
  return s.length > maxLen ? s.slice(0, maxLen) + '…' : s
}

function confirm(question: string): Promise<boolean> {
  if (!process.stdin.isTTY) {
    console.log('  (non-interactive stdin — defaulting to N)')
    return Promise.resolve(false)
  }
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim().toLowerCase() === 'y')
    })
  })
}

/**
 * Diff `intended` values against what is currently in Sanity for `docId`.
 *
 * @param client     Sanity client (already configured with token + dataset)
 * @param docId      Document _id to check
 * @param fields     Fields to compare (must be keys of `intended`)
 * @param intended   Values the script is about to write
 * @param current    Optional: pass the already-fetched doc to skip a second
 *                   fetch. If omitted, the function fetches `fields` from Sanity.
 * @returns          true if all unchanged OR user confirmed; false to abort
 */
export async function diffAndConfirm(
  client: SanityClient,
  docId: string,
  fields: string[],
  intended: Record<string, unknown>,
  current?: Record<string, unknown>
): Promise<boolean> {
  let existing = current
  if (!existing) {
    const projection = `{ ${fields.join(', ')} }`
    existing =
      (await client.fetch<Record<string, unknown>>(
        `*[_id == $id][0]${projection}`,
        { id: docId }
      )) ?? {}
  }

  const changed: string[] = []

  for (const field of fields) {
    const cur = existing[field]
    const next = intended[field]
    if (JSON.stringify(cur) === JSON.stringify(next)) {
      console.log(`    ${field}: UNCHANGED`)
    } else {
      console.log(`    ${field}:`)
      console.log(`      current:  ${summarize(cur)}`)
      console.log(`      intended: ${summarize(next)}`)
      changed.push(field)
    }
  }

  if (changed.length === 0) return true

  console.log(
    `\n  ⚠️  ${changed.length} field(s) will change on ${docId}: ${changed.join(', ')}`
  )
  return confirm('  Proceed with write? (y/N) ')
}
