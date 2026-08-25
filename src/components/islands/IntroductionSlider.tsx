import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export interface IntroductionFact {
  id: string
  label: string
  icon: string
  description: string
}

interface Props {
  facts: IntroductionFact[]
  ariaLabel: string
  sliderTranslations: Record<string, string>
}

// An island because splide is a runtime library. The cards arrive already
// translated, so no provider and no catalog travel with it.
export default function IntroductionSlider({ facts, ariaLabel, sliderTranslations }: Props) {
  return (
    <Splide
      options={{
        rewind: true,
        arrows: false,
        i18n: sliderTranslations,
        mediaQuery: 'min',
        // Two cards from 640px, and from 1024px splide destroys itself, so the
        // desktop view is a plain grid rather than a carousel.
        breakpoints: { 640: { perPage: 2 }, 1024: { destroy: true } },
        reducedMotion: { speed: 0, rewindSpeed: 0 },
      }}
      aria-label={ariaLabel}
      className="splide--grid md:px-2"
    >
      {facts.map((fact) => (
        <SplideSlide key={fact.id} className="pb-10 px-4 lg:px-2 lg:pb-2">
          <div className="group h-full bg-white shadow-md hover:shadow-lg rounded-2xl p-6 border border-grey-100 hover:border-green-light-900/30 transition-all duration-300 cursor-default hover:-translate-y-0.5">
            <figure className="bg-green-light-900/20 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-green-light-900/30 group-hover:scale-105">
              <img src={fact.icon} className="object-contain w-6 h-6" alt={fact.label} />
            </figure>
            <h3 className="my-4 font-lato font-bold text-lg text-grey-900 md:my-5">{fact.label}</h3>
            <p className="text-grey-900/80 leading-relaxed">{fact.description}</p>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  )
}
