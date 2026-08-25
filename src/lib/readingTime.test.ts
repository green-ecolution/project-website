import { describe, expect, it } from 'vitest'
import { readingTimeInMinutes } from './readingTime'

const words = (count: number) => Array.from({ length: count }, () => 'Wort').join(' ')

describe('readingTimeInMinutes', () => {
  it('gibt nie weniger als eine Minute zurück', () => {
    expect(readingTimeInMinutes('Ein kurzer Satz.')).toBe(1)
  })

  it('gibt für einen leeren Text eine Minute zurück', () => {
    expect(readingTimeInMinutes('')).toBe(1)
  })

  it('rechnet mit 200 Wörtern je Minute', () => {
    expect(readingTimeInMinutes(words(600))).toBe(3)
  })

  it('zählt mdx-Importe nicht mit', () => {
    const withImport = `import Foo from '../Foo.astro'\n\n${words(200)}`
    expect(readingTimeInMinutes(withImport)).toBe(1)
  })

  it('zählt jsx-Tags nicht mit, den Text darin aber doch', () => {
    expect(readingTimeInMinutes(`<Foo bar="baz">${words(400)}</Foo>`)).toBe(2)
  })

  it('zählt das Ziel eines Links nicht mit, seine Beschriftung aber doch', () => {
    const link = `[${words(400)}](https://example.com/ein/sehr/langer/pfad)`
    expect(readingTimeInMinutes(link)).toBe(2)
  })

  it('zählt den Alternativtext eines Bildes, nicht seinen Pfad', () => {
    expect(readingTimeInMinutes(`![${words(200)}](/assets/bild.png)`)).toBe(1)
  })
})
