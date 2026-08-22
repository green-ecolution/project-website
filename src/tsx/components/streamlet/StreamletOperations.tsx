import { useTranslation } from 'react-i18next'
import { operationsFacts } from '../../../data/streamlet'

function StreamletOperations() {
  const { t } = useTranslation('streamlet')

  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="mb-10 lg:mb-14">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            {t('operations.sectionLabel')}
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>

        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          {t('operations.title')}
        </h2>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl">{t('operations.description')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {operationsFacts.map((fact) => {
          const Icon = fact.icon
          return (
            <article key={fact.id} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-light-900/15 flex items-center justify-center">
                <Icon className="w-5 h-5 text-green-dark-900" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-lato font-semibold text-grey-900 mb-1">
                  {t(`operations.facts.${fact.id}.label`)}
                </h3>
                <p className="text-sm text-grey-900/70 leading-relaxed">
                  {t(`operations.facts.${fact.id}.description`)}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default StreamletOperations
