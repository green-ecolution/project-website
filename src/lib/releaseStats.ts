import type { ReleaseEntry } from './releaseSelectors'

export type ReleaseKind = 'feature' | 'maintenance'

export interface ReleaseStats {
  features: number
  fixes: number
  kind: ReleaseKind | null
}

type StatKey = 'stats.features' | 'stats.fixes'
type Translate = (key: StatKey, vars?: { count: number }) => string

export function getReleaseStats(entry: ReleaseEntry): ReleaseStats {
  const changelog = entry.data.changelog

  const features = changelog.filter((item) => item.type === 'feat').length
  const fixes = changelog.filter((item) => item.type === 'fix').length

  if (changelog.length === 0) {
    return { features, fixes, kind: null }
  }

  return {
    features,
    fixes,
    kind: features === 0 && fixes > 0 ? 'maintenance' : 'feature',
  }
}

export function formatReleaseStats(stats: ReleaseStats, t: Translate): string[] {
  const parts: string[] = []

  if (stats.features > 0) {
    parts.push(t('stats.features', { count: stats.features }))
  }
  if (stats.fixes > 0) {
    parts.push(t('stats.fixes', { count: stats.fixes }))
  }

  return parts
}
