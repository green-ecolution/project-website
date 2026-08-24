import { describe, expect, it } from 'vitest'
import {
  releaseSlug,
  selectAdjacent,
  selectRelease,
  selectReleases,
  type ReleaseEntry,
} from './releaseSelectors'

function entry(id: string, version: string, title = id): ReleaseEntry {
  return { id, data: { version, title } } as unknown as ReleaseEntry
}

const catalog = [
  entry('de/v0.1.0', '0.1.0', 'Erste Fassung'),
  entry('de/v0.9.0', '0.9.0', 'Neun deutsch'),
  entry('de/v0.10.0', '0.10.0', 'Zehn deutsch'),
  entry('en/v0.1.0', '0.1.0', 'First release'),
  entry('en/v0.10.0', '0.10.0', 'Ten english'),
]

describe('releaseSlug', () => {
  it('schneidet das Sprachpräfix ab und behält die Punkte', () => {
    expect(releaseSlug(entry('de/v0.5.1', '0.5.1'))).toBe('v0.5.1')
  })
})

describe('selectReleases', () => {
  it('nimmt die deutschen Dateien als kanonische Menge', () => {
    expect(selectReleases(catalog, 'de').map(releaseSlug)).toEqual(['v0.10.0', 'v0.9.0', 'v0.1.0'])
  })

  it('sortiert numerisch, also 0.10.0 vor 0.9.0', () => {
    const versions = selectReleases(catalog, 'de').map((release) => release.data.version)
    expect(versions).toEqual(['0.10.0', '0.9.0', '0.1.0'])
  })

  it('ersetzt einen Eintrag durch die Übersetzung, wenn es sie gibt', () => {
    const english = selectReleases(catalog, 'en')
    expect(english.map((release) => release.data.title)).toContain('Ten english')
    expect(english.map((release) => release.data.title)).toContain('First release')
  })

  it('lässt die deutsche Fassung stehen, wo die Übersetzung fehlt', () => {
    const english = selectReleases(catalog, 'en')
    const nine = english.find((release) => releaseSlug(release) === 'v0.9.0')
    expect(nine?.data.title).toBe('Neun deutsch')
  })

  it('gibt für Englisch genauso viele Einträge wie für Deutsch', () => {
    expect(selectReleases(catalog, 'en')).toHaveLength(selectReleases(catalog, 'de').length)
  })

  it('ignoriert eine englische Datei ohne deutsches Gegenstück', () => {
    const orphan = [...catalog, entry('en/v0.99.0', '0.99.0', 'Orphan')]
    expect(selectReleases(orphan, 'en').map(releaseSlug)).not.toContain('v0.99.0')
  })
})

describe('selectRelease', () => {
  it('findet ein Release über seinen Slug', () => {
    expect(selectRelease(catalog, 'de', 'v0.9.0')?.data.version).toBe('0.9.0')
  })

  it('gibt undefined für einen unbekannten Slug', () => {
    expect(selectRelease(catalog, 'de', 'v9.9.9')).toBeUndefined()
  })
})

describe('selectAdjacent', () => {
  it('hat für das neueste Release keinen neueren Nachbarn', () => {
    const { prev, next } = selectAdjacent(catalog, 'de', 'v0.10.0')
    expect(prev).toBeUndefined()
    expect(next && releaseSlug(next)).toBe('v0.9.0')
  })

  it('hat für das älteste Release keinen älteren Nachbarn', () => {
    const { prev, next } = selectAdjacent(catalog, 'de', 'v0.1.0')
    expect(next).toBeUndefined()
    expect(prev && releaseSlug(prev)).toBe('v0.9.0')
  })

  it('gibt für einen unbekannten Slug beide Nachbarn als undefined', () => {
    expect(selectAdjacent(catalog, 'de', 'v9.9.9')).toEqual({})
  })
})
