import { describe, expect, test } from 'vitest'
import {
  LOGO_VARIANTS,
  LOGO_ZIP_PATH,
  PITCH_DECK_PATH,
  PNG_WIDTHS,
  pressAssetUrl,
} from './pressKit'

describe('pressAssetUrl', () => {
  test('joins base and path', () => {
    expect(pressAssetUrl('https://bucket.example', 'press/logos/a.svg')).toBe(
      'https://bucket.example/press/logos/a.svg',
    )
  })

  test('tolerates a trailing slash on the base', () => {
    expect(pressAssetUrl('https://bucket.example//', 'press/logos/a.svg')).toBe(
      'https://bucket.example/press/logos/a.svg',
    )
  })
})

describe('LOGO_VARIANTS', () => {
  test('offers an SVG and one PNG per configured width for every variant', () => {
    for (const variant of LOGO_VARIANTS) {
      const formats = variant.downloads.map((download) => download.format)
      expect(formats.filter((format) => format === 'svg')).toHaveLength(1)
      expect(formats.filter((format) => format === 'png')).toHaveLength(PNG_WIDTHS.length)
    }
  })

  test('has unique ids and source files', () => {
    expect(new Set(LOGO_VARIANTS.map((variant) => variant.id)).size).toBe(LOGO_VARIANTS.length)
    expect(new Set(LOGO_VARIANTS.map((variant) => variant.file)).size).toBe(LOGO_VARIANTS.length)
  })

  test('keeps every download under the press prefix', () => {
    const paths = [
      ...LOGO_VARIANTS.flatMap((variant) => variant.downloads.map((download) => download.path)),
      LOGO_ZIP_PATH,
      PITCH_DECK_PATH,
    ]
    for (const path of paths) {
      expect(path.startsWith('press/')).toBe(true)
    }
  })
})
