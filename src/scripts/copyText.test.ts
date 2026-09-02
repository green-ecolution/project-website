// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

function mountCopyButton() {
  document.body.innerHTML = [
    '<p id="boilerplate-short">  Green Ecolution misst die Bodenfeuchte.  </p>',
    '<button data-copy="boilerplate-short" data-copied-label="Kopiert">',
    '<span data-copy-label>Kopieren</span>',
    '</button>',
  ].join('')
  return document.querySelector('button')!
}

function clipboardStub(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  })
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('copyText', () => {
  test('writes the trimmed source text and confirms on the button', async () => {
    const button = mountCopyButton()
    const writeText = vi.fn().mockResolvedValue(undefined)
    clipboardStub(writeText)

    const { setup } = await import('./copyText')
    setup()
    button.click()
    await vi.waitFor(() => expect(writeText).toHaveBeenCalled())

    expect(writeText).toHaveBeenCalledWith('Green Ecolution misst die Bodenfeuchte.')
    expect(button.textContent).toBe('Kopiert')

    vi.advanceTimersByTime(2000)
    expect(button.textContent).toBe('Kopieren')
  })

  test('keeps the idle label when the clipboard refuses', async () => {
    const button = mountCopyButton()
    clipboardStub(vi.fn().mockRejectedValue(new Error('denied')))

    const { setup } = await import('./copyText')
    setup()
    button.click()
    await vi.advanceTimersByTimeAsync(0)

    expect(button.textContent).toBe('Kopieren')
  })

  test('binds the buttons of the current page only', async () => {
    const first = mountCopyButton()
    const writeText = vi.fn().mockResolvedValue(undefined)
    clipboardStub(writeText)

    const { setup } = await import('./copyText')
    setup()
    setup()

    first.click()
    await vi.waitFor(() => expect(writeText).toHaveBeenCalled())
    expect(writeText).toHaveBeenCalledTimes(1)
  })
})
