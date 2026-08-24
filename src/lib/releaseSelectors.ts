import type { CollectionEntry } from 'astro:content'
import { DEFAULT_LANGUAGE, type Language } from '../i18n/languages'

export type ReleaseEntry = CollectionEntry<'releases'>

// Type-only import above on purpose: getCollection needs Astro's content layer,
// which a bare vitest process does not have. Keeping the selectors free of it is
// what makes the language and sorting rules unit-testable.

export function releaseSlug(entry: ReleaseEntry): string {
  return entry.id.split('/').slice(1).join('/')
}

function languageOf(entry: ReleaseEntry): string {
  return entry.id.split('/')[0]
}

// German is the canonical language, so its files define which releases exist. A
// release without an English translation still has to appear on /en, with the
// German text standing in until the translation is written.
export function selectReleases(all: ReleaseEntry[], language: Language): ReleaseEntry[] {
  const canonical = all.filter((entry) => languageOf(entry) === DEFAULT_LANGUAGE)
  const translated = new Map(
    all
      .filter((entry) => languageOf(entry) === language)
      .map((entry) => [releaseSlug(entry), entry]),
  )

  return canonical
    .map((entry) => translated.get(releaseSlug(entry)) ?? entry)
    .sort((a, b) => b.data.version.localeCompare(a.data.version, undefined, { numeric: true }))
}

export function selectRelease(
  all: ReleaseEntry[],
  language: Language,
  slug: string,
): ReleaseEntry | undefined {
  return selectReleases(all, language).find((entry) => releaseSlug(entry) === slug)
}

export function selectAdjacent(
  all: ReleaseEntry[],
  language: Language,
  slug: string,
): { prev?: ReleaseEntry; next?: ReleaseEntry } {
  const releases = selectReleases(all, language)
  const index = releases.findIndex((entry) => releaseSlug(entry) === slug)

  if (index === -1) {
    return {}
  }

  return {
    prev: index > 0 ? releases[index - 1] : undefined,
    next: index < releases.length - 1 ? releases[index + 1] : undefined,
  }
}
