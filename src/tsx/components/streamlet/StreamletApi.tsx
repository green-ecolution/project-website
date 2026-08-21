import { apiEndpoints, solveFlowSteps, solveRequestExample } from '../../../data/streamlet'

function StreamletApi() {
  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="mb-10 lg:mb-14">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            Schnittstelle
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>

        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          Ein Aufruf, eine Lösung
        </h2>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl">
          Streamlet arbeitet synchron. Kein Job, kein Polling, keine Datenbank dazwischen: Das
          Problem geht rein, die Routen kommen zurück.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3 lg:gap-8">
        {solveFlowSteps.map((step) => (
          <li key={step.step}>
            <span className="font-lato font-bold text-2xl text-green-light-900">{step.step}</span>
            <h3 className="font-lato font-semibold text-grey-900 mt-2 mb-1">{step.label}</h3>
            <p className="text-sm text-grey-900/70 leading-relaxed">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="bg-grey-900 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl mb-10">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-grey-100/10">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-grey-100/60 text-sm font-mono">POST /v1/solve</span>
        </div>

        <div
          className="overflow-x-auto p-4"
          tabIndex={0}
          role="region"
          aria-label="Beispielhafte Anfrage an POST /v1/solve"
        >
          <pre className="font-mono text-xs lg:text-sm text-grey-100/90 leading-relaxed">
            <code>{solveRequestExample}</code>
          </pre>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3">
        {apiEndpoints.map((endpoint) => (
          <li
            key={endpoint.path}
            className="flex flex-col gap-1 rounded-xl border border-green-dark-900/10 p-4 sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="font-mono text-xs font-bold text-green-dark-900 sm:w-12">
              {endpoint.method}
            </span>
            <span className="font-mono text-sm text-grey-900 sm:w-72">{endpoint.path}</span>
            <span className="text-sm text-grey-900/70">{endpoint.description}</span>
          </li>
        ))}
      </ul>

      <p className="text-sm text-grey-900/60 leading-relaxed mt-6">
        Geprüft wird bereits beim Einlesen: Ein Problem mit überfülltem Tank, verdrehtem Zeitfenster
        oder ohne Fahrzeug wird mit 422 abgelehnt, statt später im Solver aufzulaufen.
        Fehlerantworten geben keine internen Details preis, weder Engine-URLs noch fremde
        Response-Bodies.
      </p>
    </section>
  )
}

export default StreamletApi
