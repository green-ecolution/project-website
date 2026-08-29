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
