import { describe, expect, test } from 'vitest'
import { currentLanguage } from './languages'

describe('currentLanguage', () => {
  test('returns a supported language unchanged', () => {
    expect(currentLanguage('de')).toBe('de')
    expect(currentLanguage('en')).toBe('en')
  })

  test('throws for anything else', () => {
    expect(() => currentLanguage('fr')).toThrow('fr')
    expect(() => currentLanguage(undefined)).toThrow()
  })
})
