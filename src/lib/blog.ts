import { getCollection, getEntry } from 'astro:content'
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

export async function getAuthor(entry: ArticleEntry) {
  const author = await getEntry(entry.data.author)

  // getEntry is typed as possibly undefined, but reference() already failed the
  // build if the key were wrong. Throwing here beats rendering a blank byline.
  if (!author) {
    throw new Error(`Unbekannter Autor ${entry.data.author.id} in ${entry.id}`)
  }

  return author
}
