import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getTranslations } from '../../../i18n/t'
import { languagePaths } from '../../../lib/languagePaths'
import { getReleases, releaseSlug } from '../../../lib/releases'
import { siteOrigin } from '../../../lib/site'
import { currentLanguage } from '../../../i18n/languages'

export const getStaticPaths = languagePaths

export async function GET(context: APIContext) {
  const language = currentLanguage(context.params.lang)
  const t = getTranslations(language, 'releases')
  const releases = await getReleases(language)

  return rss({
    title: t('feed.title'),
    description: t('feed.description'),
    site: siteOrigin(context.site),
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
