import { useTranslation } from 'react-i18next'
import AdvantageCard from '../cards/AdvantageCard'

type AdvantageId = 'openSource' | 'optimizedRoutes' | 'water'

interface Advantage {
  id: AdvantageId
  icon: string
  accentColor: 'dark' | 'middle'
}

const advantages: Advantage[] = [
  {
    id: 'openSource',
    icon: '/assets/svg/general/people.svg',
    accentColor: 'dark',
  },
  {
    id: 'optimizedRoutes',
    icon: '/assets/svg/general/map.svg',
    accentColor: 'middle',
  },
  {
    id: 'water',
    icon: '/assets/svg/general/reduce.svg',
    accentColor: 'dark',
  },
]

function Advantages() {
  const { t } = useTranslation('project')

  return (
    <section
      id="vorteile"
      className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl"
    >
      <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
        {/* Header */}
        <article className="mb-8 md:mb-0">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
              {t('advantages.sectionLabel')}
            </span>
            <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
          </div>
          <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900">
            {t('advantages.title')}
          </h2>
          <p className="text-grey-600 leading-relaxed">{t('advantages.description')}</p>
        </article>

        {/* Advantage Cards */}
        {advantages.map((advantage) => (
          <article key={advantage.id} className="mb-4 last:mb-0 md:mb-0">
            <AdvantageCard
              label={t(`advantages.items.${advantage.id}.title`)}
              icon={advantage.icon}
              description={t(`advantages.items.${advantage.id}.description`)}
              accentColor={advantage.accentColor}
            />
          </article>
        ))}
      </div>
    </section>
  )
}

export default Advantages
