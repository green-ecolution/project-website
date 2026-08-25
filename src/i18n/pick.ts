import { getTranslations, type Namespace, type TranslationKey } from './t'
import type { Language } from './languages'

export function pickStrings<N extends Namespace>(
  language: Language,
  namespace: N,
  keys: readonly TranslationKey<N>[],
): Record<string, string> {
  const t = getTranslations(language, namespace)
  const strings: Record<string, string> = {}

  for (const key of keys) {
    // Placeholders stay intact here; the island fills them at render time.
    strings[key as string] = t(key)
  }

  return strings
}
