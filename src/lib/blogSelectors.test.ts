import { describe, expect, it } from 'vitest'
import {
  articleSlug,
  selectAdjacentArticles,
  selectArticle,
  selectArticles,
  type ArticleEntry,
} from './blogSelectors'

function article(id: string, date: string, title = id): ArticleEntry {
  return { id, data: { date: new Date(date), title } } as unknown as ArticleEntry
}

const catalog = [
  article('de/alt', '2026-01-10', 'Alt'),
  article('de/neu', '2026-03-01', 'Neu'),
  article('de/mittel', '2026-02-14', 'Mittel'),
  article('en/alt', '2026-01-10', 'Old'),
  article('en/mittel', '2026-02-14', 'Middle'),
]

describe('selectArticles', () => {
  it('sortiert nach Datum, das neueste zuerst', () => {
    expect(selectArticles(catalog, 'de').map(articleSlug)).toEqual(['neu', 'mittel', 'alt'])
  })

  it('nutzt die Übersetzung, wo es sie gibt', () => {
    const titles = selectArticles(catalog, 'en').map((entry) => entry.data.title)
    expect(titles).toContain('Old')
    expect(titles).toContain('Middle')
  })

  it('lässt die deutsche Fassung stehen, wo die Übersetzung fehlt', () => {
    const english = selectArticles(catalog, 'en')
    expect(english.find((entry) => articleSlug(entry) === 'neu')?.data.title).toBe('Neu')
  })

  it('behält die Reihenfolge auch dann, wenn die Übersetzung einspringt', () => {
    expect(selectArticles(catalog, 'en').map(articleSlug)).toEqual(['neu', 'mittel', 'alt'])
  })
})

describe('selectArticle', () => {
  it('findet einen Artikel über seinen Slug', () => {
    expect(selectArticle(catalog, 'de', 'mittel')?.data.title).toBe('Mittel')
  })

  it('gibt undefined für einen unbekannten Slug', () => {
    expect(selectArticle(catalog, 'de', 'gibtsnicht')).toBeUndefined()
  })
})

describe('selectAdjacentArticles', () => {
  it('hat für den neuesten Artikel keinen neueren Nachbarn', () => {
    const { newer, older } = selectAdjacentArticles(catalog, 'de', 'neu')
    expect(newer).toBeUndefined()
    expect(older && articleSlug(older)).toBe('mittel')
  })

  it('hat für den ältesten Artikel keinen älteren Nachbarn', () => {
    const { newer, older } = selectAdjacentArticles(catalog, 'de', 'alt')
    expect(older).toBeUndefined()
    expect(newer && articleSlug(newer)).toBe('mittel')
  })

  it('gibt für einen unbekannten Slug beide Nachbarn als undefined', () => {
    expect(selectAdjacentArticles(catalog, 'de', 'gibtsnicht')).toEqual({})
  })
})
