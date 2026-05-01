import type { StringRule, CustomValidator } from 'sanity'

const ITALIC_ANCHOR_PATTERN = /\{\{[^}]+\}\}/

const italicAnchorCheck: CustomValidator<string | undefined> = (value) => {
  if (!value) return true
  if (!ITALIC_ANCHOR_PATTERN.test(value)) {
    return 'Consider wrapping one anchor word in {{double braces}} for italic emphasis.'
  }
  return true
}

export const headlineValidation = (Rule: StringRule) => [
  Rule.required(),
  Rule.max(80).warning('Headlines over 80 characters may wrap awkwardly.'),
  Rule.custom(italicAnchorCheck).warning(),
]
