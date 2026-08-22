import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getAllReleases } from '../../../content/releases'
import Button from '../Button'
import Arrow from '../../icons/Arrow'
import { formatReleaseDate } from '../../helper/formatDate'
import { useLanguage } from '../../../i18n/useLanguage'

function LatestRelease() {
  const lang = useLanguage()
  const { t } = useTranslation('releases')
  const releases = getAllReleases(lang)
  const latestRelease = releases[0]

  if (!latestRelease) return null

  const formattedDate = formatReleaseDate(latestRelease.frontmatter.date, lang)

  return (
    <section className="px-4 max-w-screen-lg mx-auto mt-20 lg:mt-28 xl:mt-36 md:px-6 xl:max-w-screen-xl">
      <div className="md:grid md:grid-cols-2 md:gap-x-10 md:items-center">
        <div className="mb-8 md:mb-0">
          {/* Section Label */}
          <div className="mb-6 lg:mb-8">
            <div className="inline-block">
              <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
                {t('latest.eyebrow')}
              </span>
              <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
            </div>
          </div>

          <h2 className="font-lato font-bold text-2xl mb-6 text-grey-900 lg:text-3xl">
            {t('latest.title')}
          </h2>
          <p className="mb-6 text-grey-900/80 leading-relaxed">{t('latest.description')}</p>
          <div>
            <Button href="/$lang/releases" ariaLabel={t('latest.viewAllAriaLabel')} isDark>
              <span>{t('latest.viewAll')}</span>
              <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2" />
            </Button>
          </div>
        </div>

        <div>
          <Link
            to="/$lang/releases/$slug"
            params={{ lang, slug: latestRelease.slug }}
            className="group block bg-gradient-to-br from-green-dark-900 to-green-middle-900 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                v{latestRelease.frontmatter.version}
              </span>
              <span className="bg-green-light-900/30 text-white px-3 py-1 rounded-full text-sm font-bold">
                {t('badge.current')}
              </span>
            </div>
            <time
              dateTime={latestRelease.frontmatter.date}
              className="text-white/60 text-sm block mb-2"
            >
              {formattedDate}
            </time>
            <h3 className="font-lato font-bold text-xl text-white mb-2 group-hover:underline">
              {latestRelease.frontmatter.title}
            </h3>
            {latestRelease.frontmatter.summary && (
              <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                {latestRelease.frontmatter.summary}
              </p>
            )}
            <div className="flex items-center gap-2 text-white/70 group-hover:text-white group-hover:gap-3 transition-all duration-300 mt-4">
              <span className="text-sm font-medium">{t('latest.viewDetails')}</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestRelease
