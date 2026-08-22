import { BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../Button'
import Github from '../../icons/Github'
import Arrow from '../../icons/Arrow'
import { streamletLinks } from '../../../data/streamlet'

function StreamletHero() {
  const { t } = useTranslation('streamlet')

  return (
    <section className="px-4 max-w-208 mx-auto pt-28 pb-14 md:px-6 lg:pt-36 lg:pb-20 lg:max-w-screen-lg xl:pt-44 xl:max-w-screen-xl">
      <div className="inline-block mb-6">
        <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
          {t('hero.sectionLabel')}
        </span>
        <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
      </div>

      <h1 className="font-lato font-bold text-3xl mb-6 text-grey-900 lg:text-5xl xl:text-6xl">
        {t('hero.title')}
      </h1>

      <p className="text-lg text-grey-900/80 leading-relaxed max-w-3xl mb-6 lg:text-xl">
        {t('hero.lead')}
      </p>

      <p className="text-grey-900/60 leading-relaxed max-w-3xl mb-8">{t('hero.origin')}</p>

      <div className="flex flex-wrap gap-4">
        <Button
          href={streamletLinks.repo}
          ariaLabel={t('hero.repoAriaLabel')}
          isExternalLink
          isDark
        >
          <Github classes="w-5" />
          <span className="whitespace-nowrap">{t('hero.repo')}</span>
          <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2" />
        </Button>

        <a
          href={streamletLinks.readme}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('hero.docsAriaLabel')}
          className="flex items-center justify-center gap-x-3 rounded-2xl w-max font-semibold px-5 py-2 cursor-pointer transition-all ease-in-out duration-300 text-green-dark-900 border border-green-dark-900/30 hover:border-green-dark-900 hover:bg-green-light-100/60"
        >
          <BookOpen className="w-5 h-5" aria-hidden="true" />
          <span className="whitespace-nowrap">{t('hero.docs')}</span>
        </a>
      </div>
    </section>
  )
}

export default StreamletHero
