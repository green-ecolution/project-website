import { describe, expect, it } from 'vitest'
import { splitSlot } from './slotText'

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
