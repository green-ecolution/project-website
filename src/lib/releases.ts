import { getCollection } from 'astro:content'
import type { Language } from '../i18n/languages'
import {
  selectAdjacent,
  selectRelease,
  selectReleases,
  type ReleaseEntry,
} from './releaseSelectors'

export { releaseSlug, type ReleaseEntry } from './releaseSelectors'

export async function getReleases(language: Language): Promise<ReleaseEntry[]> {
  return selectReleases(await getCollection('releases'), language)
}

export async function getRelease(
  language: Language,
  slug: string,
): Promise<ReleaseEntry | undefined> {
  return selectRelease(await getCollection('releases'), language, slug)
}

export async function getAdjacentReleases(
  language: Language,
  slug: string,
): Promise<{ prev?: ReleaseEntry; next?: ReleaseEntry }> {
  return selectAdjacent(await getCollection('releases'), language, slug)
}
