import { describe, expect, it } from 'vitest'
import { renderSlots, splitSlot } from './slotText'

describe('splitSlot', () => {
  it('zerlegt Text mit einem Marker in drei Teile', () => {
    const parts = splitSlot('Vorher <issue>Mitte</issue> nachher', 'issue')
    expect(parts).toEqual({ before: 'Vorher ', inner: 'Mitte', after: ' nachher' })
  })

  it('behandelt einen Marker am Ende', () => {
    const parts = splitSlot('Frage? <issue>Issue erstellen →</issue>', 'issue')
    expect(parts.before).toBe('Frage? ')
    expect(parts.inner).toBe('Issue erstellen →')
    expect(parts.after).toBe('')
  })

  it('gibt den ganzen Text als before zurück, wenn der Marker fehlt', () => {
    const parts = splitSlot('Kein Marker hier', 'issue')
    expect(parts).toEqual({ before: 'Kein Marker hier', inner: '', after: '' })
  })

  it('verwechselt keinen anderen Marker', () => {
    expect(splitSlot('a <link>b</link> c', 'issue').before).toBe('a <link>b</link> c')
  })
})

describe('renderSlots', () => {
  const tags = {
    p1: { open: '<p class="mb-4">', close: '</p>' },
    link: { open: '<a href="https://example.org">', close: '</a>' },
  }

  it('ersetzt bekannte Marker durch ihr HTML', () => {
    expect(renderSlots('<p1>Text</p1>', tags)).toBe('<p class="mb-4">Text</p>')
  })

  it('verschachtelt Marker korrekt', () => {
    expect(renderSlots('<p1>vor <link>Ziel</link> nach</p1>', tags)).toBe(
      '<p class="mb-4">vor <a href="https://example.org">Ziel</a> nach</p>',
    )
  })

  it('maskiert Text ausserhalb der Marker', () => {
    expect(renderSlots('5 < 6 & 7 > 3', tags)).toBe('5 &lt; 6 &amp; 7 &gt; 3')
  })

  it('maskiert einen unbekannten Marker, statt ihn zu rendern', () => {
    expect(renderSlots('<script>alert(1)</script>', tags)).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    )
  })

  it('lässt Text ohne Marker unverändert', () => {
    expect(renderSlots('Nur Text', tags)).toBe('Nur Text')
  })
})
