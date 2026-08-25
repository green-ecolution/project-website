import { getEntry } from 'astro:content'
import type { ArticleEntry } from './blogSelectors'
import type { ReleaseEntry } from './releaseSelectors'

export async function getAuthor(entry: ArticleEntry | ReleaseEntry) {
  const author = await getEntry(entry.data.author)

  // getEntry is typed as possibly undefined, but reference() already failed the
  // build if the key were wrong. Throwing here beats rendering a blank byline.
  if (!author) {
    throw new Error(`Unbekannter Autor ${entry.data.author.id} in ${entry.id}`)
  }

  return author
}
