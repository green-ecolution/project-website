import { describe, expect, it } from 'vitest'
import { pickStrings } from './pick'

describe('pickStrings', () => {
  it('gibt genau die angefragten Schlüssel zurück', () => {
    const strings = pickStrings('de', 'releases', ['overview.title', 'badge.current'])
    expect(Object.keys(strings).sort()).toEqual(['badge.current', 'overview.title'])
    expect(strings['overview.title']).toBe('Release Notes')
  })

  it('reicht keinen ganzen Namespace durch', () => {
    const strings = pickStrings('de', 'releases', ['overview.title'])
    expect(Object.keys(strings)).toHaveLength(1)
  })

  it('behält Platzhalter, damit der Provider sie zur Laufzeit füllen kann', () => {
    const strings = pickStrings('de', 'releases', ['timeline.yearAriaLabel'])
    expect(strings['timeline.yearAriaLabel']).toContain('{{year}}')
  })

  it('kann einen Plural-Schlüssel nicht auflösen, weil die Anzahl erst im Island bekannt ist', () => {
    const strings = pickStrings('de', 'releases', ['stats.features'])
    expect(strings['stats.features']).toBe('??stats.features')
  })
})
