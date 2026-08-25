import { getCollection } from 'astro:content'
import type { Language } from '../i18n/languages'
import {
  selectAdjacentArticles,
  selectArticle,
  selectArticles,
  type ArticleEntry,
} from './blogSelectors'

export { articleSlug, type ArticleEntry } from './blogSelectors'

export async function getArticles(language: Language): Promise<ArticleEntry[]> {
  return selectArticles(await getCollection('blog'), language)
}

export async function getArticle(
  language: Language,
  slug: string,
): Promise<ArticleEntry | undefined> {
  return selectArticle(await getCollection('blog'), language, slug)
}

export async function getAdjacentArticles(
  language: Language,
  slug: string,
): Promise<{ newer?: ArticleEntry; older?: ArticleEntry }> {
  return selectAdjacentArticles(await getCollection('blog'), language, slug)
}
