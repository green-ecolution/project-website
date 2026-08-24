import { describe, expect, it } from 'vitest'
import { resolve, MISSING_PREFIX } from './resolve'

const catalogs = {
  de: {
    hero: { title: 'Bäume bewässern' },
    greeting: 'Hallo {{name}}',
    stats: { trees_one: '{{count}} Baum', trees_other: '{{count}} Bäume' },
    onlyGerman: 'Nur auf Deutsch',
  },
  en: {
    hero: { title: 'Watering trees' },
    greeting: 'Hello {{name}}',
    stats: { trees_one: '{{count}} tree', trees_other: '{{count}} trees' },
  },
}

describe('resolve', () => {
  it('löst einen verschachtelten Schlüssel über den Punktpfad auf', () => {
    expect(resolve(catalogs, 'en', 'hero.title')).toBe('Watering trees')
  })

  it('setzt Platzhalter ein', () => {
    expect(resolve(catalogs, 'de', 'greeting', { name: 'Cedrik' })).toBe('Hallo Cedrik')
  })

  it('lässt einen Platzhalter stehen, für den kein Wert übergeben wurde', () => {
    expect(resolve(catalogs, 'de', 'greeting')).toBe('Hallo {{name}}')
  })

  it('wählt die Singularform bei count 1', () => {
    expect(resolve(catalogs, 'de', 'stats.trees', { count: 1 })).toBe('1 Baum')
  })

  it('wählt die Pluralform bei count 5', () => {
    expect(resolve(catalogs, 'de', 'stats.trees', { count: 5 })).toBe('5 Bäume')
  })

  it('wählt die Pluralform bei count 0, weil Deutsch keine Nullform kennt', () => {
    expect(resolve(catalogs, 'de', 'stats.trees', { count: 0 })).toBe('0 Bäume')
  })

  it('fällt auf Deutsch zurück, wenn der Schlüssel in der Zielsprache fehlt', () => {
    expect(resolve(catalogs, 'en', 'onlyGerman')).toBe('Nur auf Deutsch')
  })

  it('markiert einen Schlüssel, den es in keiner Sprache gibt', () => {
    expect(resolve(catalogs, 'de', 'does.not.exist')).toBe(`${MISSING_PREFIX}does.not.exist`)
  })

  it('behandelt einen Zwischenknoten, der kein Objekt ist, als fehlend', () => {
    expect(resolve(catalogs, 'de', 'greeting.deeper')).toBe(`${MISSING_PREFIX}greeting.deeper`)
  })
})
