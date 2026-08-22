import { Link } from '@tanstack/react-router'
import { CircleDot } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import Button from '../Button'
import Github from '../../icons/Github'
import Arrow from '../../icons/Arrow'
import { streamletLimitations, streamletLinks } from '../../../data/streamlet'
import { useLanguage } from '../../../i18n/useLanguage'

function StreamletStatus() {
  const { t } = useTranslation('streamlet')
  const lang = useLanguage()

  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="mb-10 lg:mb-14">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            {t('status.sectionLabel')}
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>

        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          {t('status.title')}
        </h2>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl">{t('status.description')}</p>
      </div>

      <ul className="space-y-3 mb-12">
        {streamletLimitations.map((limitation) => (
          <li key={limitation} className="flex items-start gap-3">
            <CircleDot
              className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-light-900"
              aria-hidden="true"
            />
            <span className="text-grey-900/70 leading-relaxed">
              {t(`status.limitations.${limitation}`)}
            </span>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl bg-green-light-100/70 border border-green-light-900/20 p-6 lg:p-10">
        <h3 className="font-lato font-bold text-xl text-grey-900 mb-3 lg:text-2xl">
          {t('status.cta.title')}
        </h3>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl mb-8">
          <Trans
            i18nKey="status.cta.descriptionRich"
            ns="streamlet"
            components={{
              release: (
                <Link
                  to="/$lang/releases/$slug"
                  params={{ lang, slug: 'v0.4.0' }}
                  className="font-semibold text-green-dark-900 underline decoration-green-dark-900 decoration-2 underline-offset-2 transition-all hover:decoration-4"
                />
              ),
            }}
          />
        </p>

        <div className="flex flex-wrap gap-4">
          <Button
            href={streamletLinks.repo}
            ariaLabel={t('status.cta.repoAriaLabel')}
            isExternalLink
            isDark
          >
            <Github classes="w-5" />
            <span className="whitespace-nowrap">{t('status.cta.repo')}</span>
            <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2" />
          </Button>

          <a
            href={streamletLinks.issues}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('status.cta.issuesAriaLabel')}
            className="flex items-center justify-center gap-x-3 rounded-2xl w-max font-semibold px-5 py-2 cursor-pointer transition-all ease-in-out duration-300 text-green-dark-900 border border-green-dark-900/30 hover:border-green-dark-900 hover:bg-white/70"
          >
            <span className="whitespace-nowrap">{t('status.cta.issues')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default StreamletStatus
