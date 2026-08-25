import { DEFAULT_LANGUAGE, type Language } from '../i18n/languages'

// The glob loader carries the language in the id, so de/v0.5.0 and de/mein-artikel
// both split the same way. Every content collection that is written per language
// shares this rule.
export interface LanguagedEntry {
  id: string
}

export function languageOf(entry: LanguagedEntry): string {
  return entry.id.split('/')[0]
}

export function entrySlug(entry: LanguagedEntry): string {
  return entry.id.split('/').slice(1).join('/')
}

// German is canonical, so its files define which entries exist at all. An entry
// without a translation still has to appear on /en, with the German text
// standing in until the translation is written.
export function selectByLanguage<E extends LanguagedEntry>(
  all: E[],
  language: Language,
  compare: (a: E, b: E) => number,
): E[] {
  const canonical = all.filter((entry) => languageOf(entry) === DEFAULT_LANGUAGE)
  const translated = new Map(
    all.filter((entry) => languageOf(entry) === language).map((entry) => [entrySlug(entry), entry]),
  )

  return canonical.map((entry) => translated.get(entrySlug(entry)) ?? entry).sort(compare)
}
