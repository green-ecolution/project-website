import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useTranslation } from 'react-i18next'
import { useSliderTranslations } from '../../hooks/useSliderTranslations'
import '@splidejs/react-splide/css'
import IntroductionCard from '../cards/IntroductionCard'

type IntroductionFactId = 'sensor' | 'evaluation' | 'youngTrees' | 'monitoring'

interface IntroductionFact {
  id: IntroductionFactId
  icon: string
}

const facts: IntroductionFact[] = [
  { id: 'sensor', icon: '/assets/svg/general/sensor.svg' },
  { id: 'evaluation', icon: '/assets/svg/general/statistics.svg' },
  { id: 'youngTrees', icon: '/assets/svg/general/tree.svg' },
  { id: 'monitoring', icon: '/assets/svg/general/location.svg' },
]

function Introduction() {
  const { t } = useTranslation('home')
  const sliderTranslations = useSliderTranslations()

  const breakpoints = {
    640: {
      perPage: 2,
    },
    1024: {
      destroy: true,
    },
  }

  return (
    <section className="max-w-208 mx-auto mt-36 mb-20 md:mt-40 lg:mt-16 lg:mb-0 lg:max-w-screen-lg lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-x-10 lg:items-center xl:grid-cols-2 xl:max-w-screen-xl">
      <article className="px-4 mb-8 md:px-6 lg:mb-14">
        {/* Section Label */}
        <div className="mb-6 lg:mb-8">
          <div className="inline-block">
            <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
              {t('introduction.sectionLabel')}
            </span>
            <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
          </div>
        </div>

        <h2 className="font-lato font-bold text-2xl mb-6 text-grey-900 lg:text-3xl">
          {t('introduction.title')}
        </h2>
        <p className="text-grey-900/80 leading-relaxed">{t('introduction.description')}</p>
      </article>

      <div>
        <Splide
          options={{
            rewind: true,
            arrows: false,
            i18n: sliderTranslations,
            mediaQuery: 'min',
            breakpoints: breakpoints,
            reducedMotion: { speed: 0, rewindSpeed: 0 },
          }}
          aria-label={t('introduction.sliderAriaLabel')}
          className="splide--grid md:px-2"
        >
          {facts.map((fact) => (
            <SplideSlide key={fact.id} className="pb-10 px-4 lg:px-2 lg:pb-2">
              <IntroductionCard
                label={t(`introduction.facts.${fact.id}.label`)}
                icon={fact.icon}
                description={t(`introduction.facts.${fact.id}.description`)}
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  )
}

export default Introduction
