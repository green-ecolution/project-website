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

export function formatReleaseStats(stats: ReleaseStats): string[] {
  const parts: string[] = []

  if (stats.features > 0) {
    parts.push(`${stats.features} ${stats.features === 1 ? 'neue Funktion' : 'neue Funktionen'}`)
  }
  if (stats.fixes > 0) {
    parts.push(`${stats.fixes} ${stats.fixes === 1 ? 'Behebung' : 'Behebungen'}`)
  }

  return parts
}
