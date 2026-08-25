import type { CollectionEntry } from 'astro:content'
import type { Language } from '../i18n/languages'
import { entrySlug, selectByLanguage } from './contentLanguage'

export type ArticleEntry = CollectionEntry<'blog'>

// Type-only import above on purpose, same as the release selectors: it keeps
// these rules testable without Astro's content layer.

export function articleSlug(entry: ArticleEntry): string {
  return entrySlug(entry)
}

export function selectArticles(all: ArticleEntry[], language: Language): ArticleEntry[] {
  return selectByLanguage(all, language, (a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export function selectArticle(
  all: ArticleEntry[],
  language: Language,
  slug: string,
): ArticleEntry | undefined {
  return selectArticles(all, language).find((entry) => articleSlug(entry) === slug)
}

export function selectAdjacentArticles(
  all: ArticleEntry[],
  language: Language,
  slug: string,
): { newer?: ArticleEntry; older?: ArticleEntry } {
  const articles = selectArticles(all, language)
  const index = articles.findIndex((entry) => articleSlug(entry) === slug)

  if (index === -1) {
    return {}
  }

  return {
    newer: index > 0 ? articles[index - 1] : undefined,
    older: index < articles.length - 1 ? articles[index + 1] : undefined,
  }
}
