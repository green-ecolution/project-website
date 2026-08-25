import { describe, expect, it } from 'vitest'
import { formatReleaseStats, getReleaseStats } from './releaseStats'
import type { ReleaseEntry } from './releaseSelectors'

function withChangelog(types: string[]): ReleaseEntry {
  return {
    id: 'de/v1.0.0',
    data: { version: '1.0.0', changelog: types.map((type) => ({ type, description: 'x' })) },
  } as unknown as ReleaseEntry
}

describe('getReleaseStats', () => {
  it('zählt Features und Fixes getrennt', () => {
    const stats = getReleaseStats(withChangelog(['feat', 'feat', 'fix', 'docs']))
    expect(stats.features).toBe(2)
    expect(stats.fixes).toBe(1)
  })

  it('nennt ein Release mit Fixes und ohne Features Wartung', () => {
    expect(getReleaseStats(withChangelog(['fix', 'fix'])).kind).toBe('maintenance')
  })

  it('nennt ein Release mit mindestens einem Feature ein Feature-Release', () => {
    expect(getReleaseStats(withChangelog(['feat', 'fix'])).kind).toBe('feature')
  })

  it('lässt die Art offen, wenn es keinen Changelog gibt', () => {
    const stats = getReleaseStats(withChangelog([]))
    expect(stats.kind).toBeNull()
    expect(stats.features).toBe(0)
  })

  it('nennt ein Release nur mit refactor-Einträgen ein Feature-Release, nicht Wartung', () => {
    // Deliberate: kind is maintenance only when there are fixes and no features.
    expect(getReleaseStats(withChangelog(['refactor'])).kind).toBe('feature')
  })
})

describe('formatReleaseStats', () => {
  const t = (key: string, vars?: { count: number }) => `${key}:${vars?.count ?? 0}`

  it('lässt eine Null-Zahl weg', () => {
    const labels = formatReleaseStats({ features: 0, fixes: 2, kind: 'maintenance' }, t)
    expect(labels).toEqual(['stats.fixes:2'])
  })

  it('nennt Features vor Fixes', () => {
    const labels = formatReleaseStats({ features: 1, fixes: 1, kind: 'feature' }, t)
    expect(labels).toEqual(['stats.features:1', 'stats.fixes:1'])
  })

  it('gibt eine leere Liste, wenn beides null ist', () => {
    expect(formatReleaseStats({ features: 0, fixes: 0, kind: null }, t)).toEqual([])
  })
})
