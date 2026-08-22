import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useTranslation } from 'react-i18next'
import { useSliderTranslations } from '../../hooks/useSliderTranslations'
import '@splidejs/react-splide/css'
import StakeholderCard from '../cards/StakeholderCard'

interface StakeholderProps {
  hasDesktopList?: boolean
}

type StakeholderId = 'progeek' | 'smarteGrenzregion' | 'hsFlensburg' | 'tbz'

interface StakeholderEntry {
  id: StakeholderId
  label: string
  url: string
  image: string
}

const stakeholderEntries: StakeholderEntry[] = [
  {
    id: 'progeek',
    label: 'PROGEEK GmbH',
    url: 'https://progeek.de/',
    image: '/assets/images/logo/progeek.svg',
  },
  {
    id: 'smarteGrenzregion',
    label: 'Smarte Grenzregion',
    url: 'https://smarte-grenzregion.de/',
    image: '/assets/images/logo/smarte-grenzregion.png',
  },
  {
    id: 'hsFlensburg',
    label: 'Hochschule Flensburg',
    url: 'https://hs-flensburg.de/',
    image: '/assets/images/logo/hochschule-flensburg.png',
  },
  {
    id: 'tbz',
    label: 'TBZ Flensburg',
    url: 'https://www.tbz-flensburg.de/',
    image: '/assets/images/logo/tbz.png',
  },
]

const Stakeholder: React.FC<StakeholderProps> = ({ hasDesktopList = false }) => {
  const { t } = useTranslation('home')
  const sliderTranslations = useSliderTranslations()

  const breakpoints = {
    1024: {
      destroy: true,
    },
  }

  return (
    <section
      className={`max-w-208 mx-auto pt-20 mb-28 lg:pt-28 lg:mb-36 xl:pt-36 xl:mb-52 ${
        hasDesktopList ? 'lg:max-w-screen-lg xl:max-w-screen-xl' : ''
      }`}
    >
      {/* Section Label */}
      <div className={`px-4 md:px-6 mb-6 lg:mb-8 ${hasDesktopList ? 'lg:text-center' : ''}`}>
        <div className={`inline-block ${hasDesktopList ? 'lg:mx-auto' : ''}`}>
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            {t('stakeholder.sectionLabel')}
          </span>
          <div
            className={`h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1 ${hasDesktopList ? 'lg:mx-auto' : ''}`}
          />
        </div>
      </div>

      {/* Header */}
      <article className={`px-4 mb-10 md:px-6 lg:mb-14 ${hasDesktopList ? 'lg:text-center' : ''}`}>
        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          {t('stakeholder.title')}
        </h2>
        <p
          className={`text-grey-900/70 leading-relaxed max-w-3xl ${hasDesktopList ? 'lg:mx-auto' : ''}`}
        >
          {t('stakeholder.description')}
        </p>
      </article>

      {/* Carousel/Grid */}
      <div>
        <Splide
          options={{
            rewind: true,
            arrows: false,
            i18n: sliderTranslations,
            mediaQuery: 'min',
            ...(hasDesktopList && { breakpoints: breakpoints }),
            reducedMotion: { speed: 0, rewindSpeed: 0 },
          }}
          aria-label={t('stakeholder.sliderAriaLabel')}
        >
          {stakeholderEntries.map((company) => (
            <SplideSlide key={company.id} className="pb-10 px-4 md:px-6">
              <StakeholderCard
                label={company.label}
                role={t(`stakeholder.items.${company.id}.role`)}
                url={company.url}
                image={company.image}
                hasDesktopList={hasDesktopList}
              >
                <p className="my-4 md:my-5 text-grey-900/80 leading-relaxed">
                  {t(`stakeholder.items.${company.id}.description`)}
                </p>
              </StakeholderCard>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  )
}

export default Stakeholder
