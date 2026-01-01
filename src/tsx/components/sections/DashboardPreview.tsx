import Lottie from 'lottie-react'
import dashboardAnimation from '../../../json/dashboardAnimation.json'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function DashboardPreview() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="my-28 px-4 max-w-208 mx-auto md:px-6 lg:my-36 xl:max-w-screen-lg xl:my-52">
      <article className="mb-8 g:mb-14 md:text-center">
        <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
          Fundierte Handlungsempfehlungen
          <br />
          zur Bewässerung auf einen Blick
        </h2>
        <p>
          Unser System liefert anhand wissenschaftlicher Datenauswertung fundierte
          Handlungsempfehlungen, zu welchem Zeitpunkt eine Bewässerung notwendig ist. Die Daten
          werden dahingehend aufbereitet, dass diese einfach zu interpretieren sind und in die
          Einsatzplanung eingebunden werden können.
        </p>
      </article>

      <figure className="translate-x-4 xl:translate-x-16">
        <Lottie animationData={dashboardAnimation} autoplay={!reducedMotion} />
      </figure>
    </section>
  )
}

export default DashboardPreview
