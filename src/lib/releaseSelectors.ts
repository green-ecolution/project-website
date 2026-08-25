import type { CollectionEntry } from 'astro:content'
import type { Language } from '../i18n/languages'
import { entrySlug, selectByLanguage } from './contentLanguage'

export type ReleaseEntry = CollectionEntry<'releases'>

// Type-only import above on purpose: getCollection needs Astro's content layer,
// which a bare vitest process does not have. Keeping the selectors free of it is
// what makes the language and sorting rules unit-testable.

export function releaseSlug(entry: ReleaseEntry): string {
  return entrySlug(entry)
}

export function selectReleases(all: ReleaseEntry[], language: Language): ReleaseEntry[] {
  return selectByLanguage(all, language, (a, b) =>
    b.data.version.localeCompare(a.data.version, undefined, { numeric: true }),
  )
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
