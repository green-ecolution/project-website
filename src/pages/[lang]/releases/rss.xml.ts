import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getTranslations } from '../../../i18n/t'
import { languagePaths } from '../../../lib/languagePaths'
import { getReleases, releaseSlug } from '../../../lib/releases'
import type { Language } from '../../../i18n/languages'

export const getStaticPaths = languagePaths

export async function GET(context: APIContext) {
  const language = context.params.lang as Language
  const t = getTranslations(language, 'releases')
  const releases = await getReleases(language)

  return rss({
    title: t('feed.title'),
    description: t('feed.description'),
    site: context.site ?? 'https://green-ecolution.de',
    // The site is built with trailingSlash 'never'. Without this the feed would
    // append one, and nginx answers /de/blog/some-post/ with a 404.
    trailingSlash: false,
    customData: `<language>${language}</language>`,
    items: releases.map((entry) => ({
      title: `v${entry.data.version} ${entry.data.title}`,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: `/${language}/releases/${releaseSlug(entry)}`,
    })),
  })
}
