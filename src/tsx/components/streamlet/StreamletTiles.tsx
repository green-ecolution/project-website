import { tileChangesets, type TileChangeset } from '../../../data/streamlet'

const statusConfig: Record<TileChangeset['status'], { label: string; badge: string }> = {
  available: { label: 'Verfügbar', badge: 'bg-green-light-900/20 text-green-dark-900' },
  'in-progress': { label: 'In Entwicklung', badge: 'bg-yellow-400/20 text-grey-900/70' },
}

function StreamletTiles() {
  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="mb-10 lg:mb-14">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            Tile-Pipeline
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>

        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          Das Straßennetz an die eigene Flotte anpassen
        </h2>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl mb-4">
          Eine gute Route hilft nichts, wenn das Straßennetz nicht zur Flotte passt. Ein
          Betriebsfahrzeug darf über Wirtschafts- und Dienstwege fahren, die für den allgemeinen
          Verkehr gesperrt sind. Eine Standardkarte weiß das nicht und lässt Ziele unerreichbar
          aussehen, die es nicht sind.
        </p>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl">
          Die Routing-Engine rechnet auf Tiles, die aus einem OSM-Extrakt gebaut werden. Zum
          Streamlet-Repository gehört ein CLI, das dieses Extrakt vor dem Tile-Build über
          OSC-Changesets verändert. Damit lässt sich abbilden, was für die eigenen Fahrzeuge
          tatsächlich befahrbar ist.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {tileChangesets.map((changeset) => {
          const status = statusConfig[changeset.status]
          return (
            <article
              key={changeset.name}
              className="rounded-2xl border border-green-dark-900/10 p-6 lg:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="font-mono text-sm font-bold text-grey-900">{changeset.name}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}>
                  {status.label}
                </span>
              </div>
              <p className="text-grey-900/70 leading-relaxed">{changeset.description}</p>
            </article>
          )
        })}
      </div>

      <p className="text-sm text-grey-900/60 leading-relaxed mt-8 max-w-2xl">
        Gepatcht wird das eigene Extrakt für die eigene Routing-Instanz. Das verändert, was die
        Engine für die eigene Flotte als befahrbar ansieht, und erteilt keine Befahrungserlaubnis.
        Wer den Patcher einbindet, braucht dafür eine eigene Tile-Pipeline.
      </p>
    </section>
  )
}

export default StreamletTiles
