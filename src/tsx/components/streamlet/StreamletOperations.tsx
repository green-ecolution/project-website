import { envVars, operationsFacts } from '../../../data/streamlet'

function StreamletOperations() {
  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="mb-10 lg:mb-14">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            Betrieb
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>

        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          Einbauen und betreiben
        </h2>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl">
          Streamlet ist ein einzelner Dienst neben der eigenen Anwendung. Ein Container-Image wird
          aus dem Release-Tag gebaut, konfiguriert wird über Umgebungsvariablen. Dazu gehört eine
          erreichbare Routing-Engine.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:gap-8">
        {operationsFacts.map((fact) => {
          const Icon = fact.icon
          return (
            <article key={fact.label} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-light-900/15 flex items-center justify-center">
                <Icon className="w-5 h-5 text-green-dark-900" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-lato font-semibold text-grey-900 mb-1">{fact.label}</h3>
                <p className="text-sm text-grey-900/70 leading-relaxed">{fact.description}</p>
              </div>
            </article>
          )
        })}
      </div>

      <div className="rounded-2xl border border-green-dark-900/10 overflow-hidden">
        <div className="bg-green-light-100/60 px-5 py-3 border-b border-green-dark-900/10">
          <h3 id="streamlet-config" className="font-lato font-semibold text-grey-900 text-sm">
            Konfiguration
          </h3>
        </div>
        <div
          className="overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Konfiguration über Umgebungsvariablen"
        >
          <table aria-labelledby="streamlet-config" className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-green-dark-900/10">
                <th scope="col" className="px-5 py-3 font-semibold text-grey-900">
                  Variable
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-grey-900">
                  Standard
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-grey-900">
                  Bedeutung
                </th>
              </tr>
            </thead>
            <tbody>
              {envVars.map((envVar) => (
                <tr key={envVar.name} className="border-b border-green-dark-900/5 last:border-b-0">
                  <td className="px-5 py-3 font-mono text-xs text-green-dark-900 whitespace-nowrap">
                    {envVar.name}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-grey-900/60 whitespace-nowrap">
                    {envVar.fallback}
                  </td>
                  <td className="px-5 py-3 text-grey-900/70">{envVar.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default StreamletOperations
