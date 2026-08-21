import { fitCriteria } from '../../../data/streamlet'

function StreamletFit() {
  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="mb-10 lg:mb-14 lg:text-center">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            Einsatzfeld
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>

        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          Passt Streamlet zu deinem Problem?
        </h2>

        <p className="text-grey-900/70 leading-relaxed lg:max-w-2xl lg:mx-auto">
          Streamlet löst ein Muster, nicht eine Branche. Je mehr dieser Merkmale auf deine Touren
          zutreffen, desto eher ist es das richtige Werkzeug.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {fitCriteria.map((criterion) => {
          const Icon = criterion.icon
          return (
            <li
              key={criterion.label}
              className="flex items-start gap-4 rounded-2xl border border-green-dark-900/10 bg-white p-5 transition-colors duration-300 hover:border-green-light-900/60"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-light-900/15 flex items-center justify-center">
                <Icon className="w-5 h-5 text-green-dark-900" aria-hidden="true" />
              </span>
              <span className="text-grey-900/80 leading-relaxed">{criterion.label}</span>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 rounded-2xl bg-green-light-100/70 border border-green-light-900/20 p-6 lg:p-8">
        <h3 className="font-lato font-semibold text-grey-900 mb-2">Unabhängig vom Transportgut</h3>
        <p className="text-grey-900/70 leading-relaxed">
          Streamlet kennt Tankkapazität und Bedarf, nicht Bewässerung. Was transportiert wird,
          bleibt offen; Wasser ist der erste Fall, nicht der einzige. Der erste Konsument ist Green
          Ecolution, und die API setzt davon nichts voraus.
        </p>
      </div>
    </section>
  )
}

export default StreamletFit
