import { describe, expect, test } from 'vitest'
import { siteOrigin } from './site'

describe('siteOrigin', () => {
  test('returns the origin without a trailing slash', () => {
    expect(siteOrigin(new URL('https://green-ecolution.de/'))).toBe('https://green-ecolution.de')
  })

  test('throws when the site is not configured', () => {
    expect(() => siteOrigin(undefined)).toThrow('site')
  })
})
