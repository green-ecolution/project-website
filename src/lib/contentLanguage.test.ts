import { describe, expect, it } from 'vitest'
import { entrySlug, languageOf, selectByLanguage } from './contentLanguage'

interface Post {
  id: string
  title: string
  date: string
}

function post(id: string, date: string, title = id): Post {
  return { id, title, date }
}

const byDateDesc = (a: Post, b: Post) => b.date.localeCompare(a.date)

const catalog = [
  post('de/erster-artikel', '2026-01-10', 'Erster Artikel'),
  post('de/zweiter-artikel', '2026-03-01', 'Zweiter Artikel'),
  post('de/dritter-artikel', '2026-02-14', 'Dritter Artikel'),
  post('en/erster-artikel', '2026-01-10', 'First article'),
  post('en/dritter-artikel', '2026-02-14', 'Third article'),
]

describe('languageOf', () => {
  it('liest die Sprache aus dem Pfadanfang', () => {
    expect(languageOf({ id: 'en/mein-artikel' })).toBe('en')
  })
})

describe('entrySlug', () => {
  it('schneidet die Sprache ab', () => {
    expect(entrySlug({ id: 'de/mein-artikel' })).toBe('mein-artikel')
  })

  it('behält Punkte, wie sie Release-Versionen brauchen', () => {
    expect(entrySlug({ id: 'de/v0.5.1' })).toBe('v0.5.1')
  })

  it('behält weitere Pfadebenen', () => {
    expect(entrySlug({ id: 'de/2026/mein-artikel' })).toBe('2026/mein-artikel')
  })
})

describe('selectByLanguage', () => {
  it('nimmt die deutschen Dateien als kanonische Menge', () => {
    expect(selectByLanguage(catalog, 'de', byDateDesc).map(entrySlug)).toEqual([
      'zweiter-artikel',
      'dritter-artikel',
      'erster-artikel',
    ])
  })

  it('sortiert mit dem übergebenen Vergleich, nicht nach Pfad', () => {
    const ascending = selectByLanguage(catalog, 'de', (a, b) => a.date.localeCompare(b.date))
    expect(ascending.map(entrySlug)).toEqual([
      'erster-artikel',
      'dritter-artikel',
      'zweiter-artikel',
    ])
  })

  it('ersetzt einen Eintrag durch die Übersetzung, wenn es sie gibt', () => {
    const titles = selectByLanguage(catalog, 'en', byDateDesc).map((entry) => entry.title)
    expect(titles).toContain('First article')
    expect(titles).toContain('Third article')
  })

  it('lässt die deutsche Fassung stehen, wo die Übersetzung fehlt', () => {
    const english = selectByLanguage(catalog, 'en', byDateDesc)
    const second = english.find((entry) => entrySlug(entry) === 'zweiter-artikel')
    expect(second?.title).toBe('Zweiter Artikel')
  })

  it('gibt für Englisch genauso viele Einträge wie für Deutsch', () => {
    expect(selectByLanguage(catalog, 'en', byDateDesc)).toHaveLength(
      selectByLanguage(catalog, 'de', byDateDesc).length,
    )
  })

  it('ignoriert eine englische Datei ohne deutsches Gegenstück', () => {
    const orphan = [...catalog, post('en/nur-englisch', '2026-04-01', 'Orphan')]
    expect(selectByLanguage(orphan, 'en', byDateDesc).map(entrySlug)).not.toContain('nur-englisch')
  })

  it('gibt eine leere Liste, wenn es noch keine Einträge gibt', () => {
    expect(selectByLanguage([], 'de', byDateDesc)).toEqual([])
  })

  it('verändert die übergebene Liste nicht', () => {
    const input = [...catalog]
    selectByLanguage(input, 'de', byDateDesc)
    expect(input).toEqual(catalog)
  })
})
