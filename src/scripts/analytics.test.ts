// @vitest-environment jsdom
import { describe, expect, test, vi } from 'vitest'

describe('analytics', () => {
  test('counts a page view per astro:page-load, not on import', async () => {
    const pageView = vi.fn()
    window.a = { pageView, trackEvent: vi.fn() }

    await import('./analytics')
    expect(pageView).not.toHaveBeenCalled()

    document.dispatchEvent(new Event('astro:page-load'))
    document.dispatchEvent(new Event('astro:page-load'))
    expect(pageView).toHaveBeenCalledTimes(2)
  })

  test('survives a blocked or not yet loaded a.js', async () => {
    vi.resetModules()
    window.a = undefined

    await import('./analytics')
    expect(() => document.dispatchEvent(new Event('astro:page-load'))).not.toThrow()
  })
})

describe('isTrackedHost', () => {
  test('accepts the public site and its subdomains', async () => {
    const { isTrackedHost } = await import('./analytics')

    expect(isTrackedHost('green-ecolution.de')).toBe(true)
    expect(isTrackedHost('www.green-ecolution.com')).toBe(true)
    expect(isTrackedHost('green-ecolution.io')).toBe(true)
  })

  test('rejects local and look-alike hosts', async () => {
    const { isTrackedHost } = await import('./analytics')

    expect(isTrackedHost('localhost')).toBe(false)
    expect(isTrackedHost('127.0.0.1')).toBe(false)
    expect(isTrackedHost('green-ecolution.attacker.com')).toBe(false)
    expect(isTrackedHost('notgreen-ecolution.de')).toBe(false)
  })

  test('does not inject the tracker off the public site', async () => {
    vi.resetModules()
    expect(window.location.hostname).not.toMatch(/green-ecolution/)

    await import('./analytics')

    expect(document.querySelector('script[src*="analytics.progeek.de"]')).toBeNull()
  })
})
