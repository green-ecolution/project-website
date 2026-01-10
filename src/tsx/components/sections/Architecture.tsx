import { architectureSteps } from '../../../data/architectureSteps'
import { ChevronRight, ChevronDown } from 'lucide-react'

const iconBgClasses = {
  'green-light': 'bg-green-light-900 text-white',
  'green-dark': 'bg-green-dark-900 text-white',
  'green-middle': 'bg-green-middle-900 text-white',
}

function Architecture() {
  return (
    <section className="max-w-208 mx-auto my-28 px-4 md:px-6 lg:my-36 lg:max-w-screen-lg xl:my-52 xl:max-w-screen-xl">
      <article className="mb-8 lg:mb-12 lg:text-center">
        <h2 className="font-lato font-bold text-2xl mb-3 lg:text-3xl">Die Architektur</h2>
        <p className="text-grey-600 max-w-2xl mx-auto">
          So fließen die Daten durch das Green Ecolution System – vom Sensor bis zur optimierten
          Bewässerungsroute.
        </p>
      </article>

      {/* Desktop Flowchart (horizontal) */}
      <div className="hidden md:block">
        <div className="flex items-start justify-center gap-2 lg:gap-4">
          {architectureSteps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === architectureSteps.length - 1

            return (
              <div key={step.label} className="flex items-start">
                {/* Step Box */}
                <div className="flex flex-col items-center w-36 lg:w-44">
                  <div
                    className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-3 ${iconBgClasses[step.color]}`}
                  >
                    <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
                  </div>
                  <h3 className="font-lato font-bold text-base lg:text-lg mb-1">{step.label}</h3>
                  <p className="text-grey-600 text-xs lg:text-sm text-center">{step.description}</p>
                </div>

                {/* Arrow */}
                {!isLast && (
                  <div className="flex items-center h-14 lg:h-16 px-2 lg:px-4">
                    <ChevronRight className="w-6 h-6 text-green-dark-900/40" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Flowchart (vertical) */}
      <div className="md:hidden">
        <div className="flex flex-col items-center gap-2 max-w-sm mx-auto">
          {architectureSteps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === architectureSteps.length - 1

            return (
              <div key={step.label} className="flex flex-col items-center w-full">
                {/* Step Box */}
                <div className="flex items-center gap-4 w-full bg-white rounded-xl p-4 shadow-md border border-grey-100">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgClasses[step.color]}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-lato font-bold text-base">{step.label}</h3>
                    <p className="text-grey-600 text-sm">{step.description}</p>
                  </div>
                </div>

                {/* Arrow */}
                {!isLast && (
                  <div className="py-2">
                    <ChevronDown className="w-6 h-6 text-green-dark-900/40" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Architecture
