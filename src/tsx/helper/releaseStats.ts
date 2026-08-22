import type { TFunction } from 'i18next'
import type { Release } from '../types/release'

export type ReleaseKind = 'feature' | 'maintenance'

export interface ReleaseStats {
  features: number
  fixes: number
  kind: ReleaseKind | null
}

export function getReleaseStats(release: Release): ReleaseStats {
  const changelog = release.frontmatter.changelog ?? []

  const features = changelog.filter((entry) => entry.type === 'feat').length
  const fixes = changelog.filter((entry) => entry.type === 'fix').length

  if (changelog.length === 0) {
    return { features, fixes, kind: null }
  }

  return {
    features,
    fixes,
    kind: features === 0 && fixes > 0 ? 'maintenance' : 'feature',
  }
}

export function formatReleaseStats(stats: ReleaseStats, t: TFunction<'releases'>): string[] {
  const parts: string[] = []

  if (stats.features > 0) {
    parts.push(t('stats.features', { count: stats.features }))
  }
  if (stats.fixes > 0) {
    parts.push(t('stats.fixes', { count: stats.fixes }))
  }

  return parts
}
