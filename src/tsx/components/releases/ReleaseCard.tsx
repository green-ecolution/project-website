import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Release } from '../../types/release'
import { formatReleaseDate } from '../../helper/formatDate'
import { formatReleaseStats, getReleaseStats } from '../../helper/releaseStats'
import { useLanguage } from '../../../i18n/useLanguage'

interface ReleaseCardProps {
  release: Release
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release }) => {
  const lang = useLanguage()
  const { t } = useTranslation('releases')
  const { frontmatter, slug } = release
  const stats = getReleaseStats(release)
  const statLabels = formatReleaseStats(stats, t)

  return (
    <article className="group relative">
      <span
        aria-hidden="true"
        className="absolute lg:-left-[1.375rem] top-7 w-3 h-3 rounded-full bg-white border-2 border-grey-900/20 transition-colors duration-300 group-hover:border-green-dark-900 hidden lg:block"
      />

      <Link to="/$lang/releases/$slug" params={{ lang, slug }} className="block">
        <div className="bg-white rounded-xl lg:rounded-2xl p-5 lg:p-6 border border-grey-900/10 shadow-xs transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5 group-hover:border-green-dark-900/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-lato font-bold text-green-dark-900 bg-green-dark-900/10 ring-1 ring-green-dark-900/20">
                v{frontmatter.version}
              </span>
              {stats.kind === 'maintenance' && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-grey-900/55 bg-grey-900/10">
                  {t('card.maintenanceBadge')}
                </span>
              )}
              <time dateTime={frontmatter.date} className="text-grey-900/50 text-sm">
                {formatReleaseDate(frontmatter.date, lang)}
              </time>
            </div>

            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-grey-900/5 text-grey-900/40 transition-all duration-300 group-hover:bg-green-dark-900 group-hover:text-white">
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">{t('card.readMore')}</span>
            </span>
          </div>

          <h2 className="font-lato font-bold text-lg lg:text-xl text-grey-900 transition-colors group-hover:text-green-dark-900">
            {frontmatter.title}
          </h2>

          {statLabels.length > 0 && (
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-grey-900/50">
              {statLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

export default ReleaseCard
