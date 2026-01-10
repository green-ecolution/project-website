import { Link } from '@tanstack/react-router'
import { steps } from '../../../data/processSteps'
import Arrow from '../../icons/Arrow'

const iconBgClasses = {
  'green-light': 'bg-green-light-900 text-white',
  'green-dark': 'bg-green-dark-900 text-white',
  'green-middle': 'bg-green-middle-900 text-white',
}

function ProcessCompact() {
  return (
    <section className="max-w-208 mx-auto my-28 px-4 md:px-6 lg:my-36 lg:max-w-screen-lg xl:my-52 xl:max-w-screen-xl">
      <article className="mb-8 lg:mb-12 lg:text-center">
        <h2 className="font-lato font-bold text-2xl mb-3 lg:text-3xl">
          So funktioniert Green Ecolution
        </h2>
        <p className="text-grey-600 max-w-2xl mx-auto">
          In fünf Schritten zur datenbasierten Bewässerung – von der Sensorinstallation bis zur
          optimierten Tour.
        </p>
      </article>

      {/* Desktop Timeline (horizontal) */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-green-dark-900/30" />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="flex flex-col items-center w-1/5">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${iconBgClasses[step.color]}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-lato font-semibold text-sm text-center mt-4 px-1">
                    {step.label}
                  </h3>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Timeline (vertical) */}
      <div className="md:hidden">
        <div className="relative pl-12">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-green-dark-900/30" />

          {/* Steps */}
          <div className="space-y-10">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="relative flex items-center gap-4">
                  <div
                    className={`absolute -left-12 w-10 h-10 rounded-full flex items-center justify-center z-10 ${iconBgClasses[step.color]}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-lato font-semibold text-base">{step.label}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 lg:mt-10">
        <Link
          to="/project"
          hash="process"
          aria-label="Mehr über den Prozess erfahren"
          className="group flex items-center gap-x-2 font-semibold text-green-dark-900 hover:text-green-light-900 transition-colors duration-300"
        >
          Mehr erfahren
          <Arrow classes="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}

export default ProcessCompact
