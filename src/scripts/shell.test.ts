// @vitest-environment jsdom
import { describe, expect, test, vi } from 'vitest'

function mountShell() {
  document.body.innerHTML = [
    '<div id="scroll-progress"></div>',
    '<header id="site-header" class="bg-transparent"></header>',
    '<button id="back-to-top"></button>',
    '<a data-lang-switch="en" href="/en"></a>',
  ].join('')
}

describe('shell', () => {
  test('does not bind before astro:page-load fires', async () => {
    mountShell()
    const add = vi.spyOn(window, 'addEventListener')

    await import('./shell')

    expect(add.mock.calls.filter(([type]) => type === 'scroll')).toHaveLength(0)
  })

  test('binds window listeners once per page and releases the previous page', async () => {
    mountShell()
    const add = vi.spyOn(window, 'addEventListener')

    await import('./shell')
    document.dispatchEvent(new Event('astro:page-load'))
    document.dispatchEvent(new Event('astro:page-load'))

    const scrollBindings = add.mock.calls.filter(([type]) => type === 'scroll')
    expect(scrollBindings).toHaveLength(2)

    const [first, second] = scrollBindings.map(
      ([, , options]) => (options as AddEventListenerOptions).signal,
    )
    expect(first?.aborted).toBe(true)
    expect(second?.aborted).toBe(false)
  })
})
