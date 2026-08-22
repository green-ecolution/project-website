import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import BreadcrumbSchema from '../components/BreadcrumbSchema'
import { DEFAULT_LANGUAGE } from '../../i18n/languages'
import { useLanguage } from '../../i18n/useLanguage'

function ImpressumPage() {
  const { t } = useTranslation('legal')
  const language = useLanguage()

  useEffect(() => {
    document.title = t('impressum.meta.title')
  }, [t])

  return (
    <main
      id="main-content"
      className="relative overflow-hidden before:bg-cover before:bg-background-dark-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain"
    >
      <BreadcrumbSchema
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Impressum', path: '/impressum' },
        ]}
      />
      <Hero
        headline={t('impressum.hero.headline')}
        description={t('impressum.hero.description')}
        label={t('impressum.hero.label')}
      />

      <section className="px-4 max-w-208 mx-auto md:px-6 lg:max-w-screen-lg xl:max-w-screen-xl mt-16 mb-28 lg:mb-36 xl:mb-52">
        <div className="space-y-12">
          {language !== DEFAULT_LANGUAGE && (
            <p className="text-sm text-grey-900/70 bg-grey-100/50 border border-grey-200/50 rounded-xl p-4">
              {t('translationNotice')}
            </p>
          )}

          {/* Kontakt */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              {t('impressum.sections.contact.title')}
            </h2>
            <address className="not-italic space-y-1 bg-grey-100/50 rounded-xl p-6 border border-grey-200/50">
              <p className="font-bold">PROGEEK GmbH</p>
              <p>Lise-Meitner-Str. 2</p>
              <p>24941 Flensburg</p>
              <p className="mt-4">
                {t('impressum.sections.contact.phoneLabel')}{' '}
                <a
                  href="tel:+494617933068"
                  className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                >
                  +49 461 793 306 80
                </a>
              </p>
              <p>
                {t('impressum.sections.contact.emailLabel')}{' '}
                <a
                  href="mailto:info@progeek.de"
                  className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                >
                  info@progeek.de
                </a>
              </p>
            </address>
          </div>

          {/* Handelsregister */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              {t('impressum.sections.commercialRegister.title')}
            </h2>
            <ul className="space-y-1">
              <li>
                <span className="font-bold">
                  {t('impressum.sections.commercialRegister.registryCourtLabel')}
                </span>{' '}
                Amtsgericht Flensburg
              </li>
              <li>
                <span className="font-bold">
                  {t('impressum.sections.commercialRegister.registryNumberLabel')}
                </span>{' '}
                HRB 15596 FL
              </li>
              <li>
                <span className="font-bold">
                  {t('impressum.sections.commercialRegister.taxNumberLabel')}
                </span>{' '}
                15/295/02186
              </li>
              <li>
                <span className="font-bold">
                  {t('impressum.sections.commercialRegister.vatIdLabel')}
                </span>{' '}
                DE351061751
              </li>
              <li>
                <span className="font-bold">
                  {t('impressum.sections.commercialRegister.managingDirectorsLabel')}
                </span>{' '}
                {t('impressum.sections.commercialRegister.managingDirectors')}
              </li>
            </ul>
          </div>

          {/* Haftung für Inhalte */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              {t('impressum.sections.liabilityContent.title')}
            </h2>
            <p className="mb-4">{t('impressum.sections.liabilityContent.paragraph1')}</p>
            <p>{t('impressum.sections.liabilityContent.paragraph2')}</p>
          </div>

          {/* Haftung für Links */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              {t('impressum.sections.liabilityLinks.title')}
            </h2>
            <p className="mb-4">{t('impressum.sections.liabilityLinks.paragraph1')}</p>
            <p>{t('impressum.sections.liabilityLinks.paragraph2')}</p>
          </div>

          {/* Urheberrecht */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              {t('impressum.sections.copyright.title')}
            </h2>
            <p className="mb-4">{t('impressum.sections.copyright.paragraph1')}</p>
            <p>{t('impressum.sections.copyright.paragraph2')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ImpressumPage
