import { Splide, SplideSlide } from '@splidejs/react-splide'
import { i18nTranslated } from '../../helper/sliderTranslations'
import '@splidejs/react-splide/css'
import StakeholderCard from '../cards/StakeholderCard'

interface StakeholderProps {
  hasDesktopList?: boolean
}

const Stakeholder: React.FC<StakeholderProps> = ({ hasDesktopList = false }) => {
  const stakeholder = [
    {
      label: 'PROGEEK GmbH',
      url: 'https://progeek.de/',
      image: '/assets/images/logo/progeek.svg',
      description:
        'PROGEEK steht für innovative IT-Lösungen, individuelle Softwareentwicklung und digitale Beratung – mit dem Ziel, Unternehmen auf ihrem Weg in die Zukunft der Digitalisierung zu begleiten.',
    },
    {
      label: 'Smarte Grenzregion',
      url: 'https://smarte-grenzregion.de/',
      image: '/assets/images/logo/smarte-grenzregion.png',
      description:
        'Das Projekt „Smarte Grenzregion zwischen den Meeren“ will die digitale Transformation in der Region vorantreiben, um eine integrierte und nachhaltige Stadt- und Regionalentwicklung zu gestalten und das Gemeinwohl zu stärken.',
    },
    {
      label: 'Hochschule Flensburg',
      url: 'https://hs-flensburg.de/',
      image: '/assets/images/logo/hochschule-flensburg.png',
      description:
        'Die Hochschule Flensburg bietet praxisnahe Studiengänge mit Fokus auf angewandte Forschung und enge Zusammenarbeit mit der Industrie an.',
    },
    {
      label: 'TBZ Flensburg',
      url: 'https://www.tbz-flensburg.de/',
      image: '/assets/images/logo/tbz.png',
      description:
        'Das Technische Betriebszentrum (TBZ) ist der zentrale Dienstleister für die Stadt Flensburg und u.a. für die Pflege öffnetlicher Grünflächen, Straßenreinigung sowie Abfallwirtschaft zuständig.',
    },
  ]

  const breakpoints = {
    1024: {
      destroy: true,
    },
  }

  return (
    <section
      className={`max-w-208 mx-auto pt-28 mb-28 lg:pt-36 lg:mb-36 xl:pt-52 xl:mb-52 ${
        hasDesktopList ? 'lg:max-w-screen-lg' : ''
      }`}
    >
      <article className={`px-4 mb-8 md:px-6 lg:mb-14 ${hasDesktopList ? 'lg:text-center' : ''}`}>
        <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">Wer sind die Beteiligten?</h2>
        <p>
          In Zusammenarbeit zwischen PROGEEK, der Smarten-Grenzregion, der Stadt Flensburg und der
          Hochschule Flensburg soll eine bedarfsgerechte und datenbasierte Bewässerung für Bäume
          aufgebaut werden.
        </p>
      </article>

      <Splide
        options={{
          rewind: true,
          arrows: false,
          i18n: i18nTranslated,
          mediaQuery: 'min',
          ...(hasDesktopList && { breakpoints: breakpoints }),
          reducedMotion: { speed: 0, rewindSpeed: 0 },
        }}
        aria-label="Beteiligten am Projekt"
      >
        {stakeholder.map((company) => (
          <SplideSlide key={company.label} className="pb-10 px-4 md:px-6">
            <StakeholderCard
              label={company.label}
              url={company.url}
              image={company.image}
              hasDesktopList
            >
              <p className="my-4 md:my-5">{company.description}</p>
            </StakeholderCard>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  )
}

export default Stakeholder
