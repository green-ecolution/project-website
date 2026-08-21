const stops = [
  { x: 40, label: 'D' },
  { x: 100, label: '1' },
  { x: 160, label: '2' },
  { x: 220, label: 'R' },
  { x: 280, label: '3' },
  { x: 340, label: 'D' },
]

const levelPoints = '40,150 100,150 100,168 160,168 160,186 220,186 220,150 280,150 280,168 340,168'

function TourDiagram() {
  return (
    <svg
      viewBox="0 0 380 210"
      className="w-full"
      role="img"
      aria-label="Diagramm einer Tour: Der Füllstand des Fahrzeugs sinkt an jedem Halt und wird an einer Nachfüllstation mitten in der Tour wieder aufgefüllt."
    >
      <line x1="40" y1="60" x2="340" y2="60" stroke="#4C7741" strokeWidth="2" opacity="0.35" />

      {stops.map((stop) => {
        const isDepot = stop.label === 'D'
        const isRefill = stop.label === 'R'
        return (
          <g key={`${stop.label}-${stop.x}`}>
            {isDepot ? (
              <rect x={stop.x - 9} y="51" width="18" height="18" rx="4" fill="#3D5F35" />
            ) : (
              <circle cx={stop.x} cy="60" r="9" fill={isRefill ? '#ACB63B' : '#658A58'} />
            )}
            <text
              x={stop.x}
              y="64"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
              fontFamily="Lato"
              fontWeight="700"
            >
              {stop.label}
            </text>
          </g>
        )
      })}

      <text x="40" y="38" textAnchor="middle" fill="#3D5F35" fontSize="9" fontFamily="Lato">
        Depot
      </text>
      <text x="220" y="38" textAnchor="middle" fill="#4C7741" fontSize="9" fontFamily="Lato">
        Nachfüllstation
      </text>

      <line x1="40" y1="110" x2="340" y2="110" stroke="#8B7355" strokeWidth="0.5" opacity="0.3" />
      <text x="40" y="104" fill="#8B7355" fontSize="8" fontFamily="Lato" opacity="0.7">
        Tank voll
      </text>
      <line
        x1="40"
        y1="196"
        x2="340"
        y2="196"
        stroke="#8B7355"
        strokeWidth="0.5"
        strokeDasharray="4 3"
        opacity="0.4"
      />
      <text x="40" y="207" fill="#8B7355" fontSize="8" fontFamily="Lato" opacity="0.7">
        leer
      </text>

      <polyline
        points={levelPoints}
        fill="none"
        stroke="#4C7741"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="220" cy="168" r="3" fill="#ACB63B" />
      <circle cx="220" cy="150" r="3" fill="#ACB63B" />
      <text x="228" y="146" fill="#4C7741" fontSize="8" fontFamily="Lato" fontWeight="600">
        nachgefüllt
      </text>
    </svg>
  )
}

function StreamletProblem() {
  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 lg:items-center">
        <div>
          <div className="inline-block mb-6">
            <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
              Das Problem
            </span>
            <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
          </div>

          <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
            Wenn die Ladung nicht für die ganze Tour reicht
          </h2>

          <p className="text-grey-900/70 leading-relaxed mb-4">
            Sobald ein Fahrzeug unterwegs nachfüllen muss, hängt die beste Reihenfolge der Halte
            davon ab, wann und wo nachgefüllt wird. Beides zugleich zu entscheiden, ist der Kern des
            Problems.
          </p>

          <p className="text-grey-900/70 leading-relaxed mb-4">
            Wer das dem Solver nicht mitgeben kann, hat zwei Möglichkeiten, und beide kosten. Die
            Tour ohne Nachfüllstopp planen und ein unzulässiges Ergebnis erhalten, oder die Tour von
            Hand in Teilstücke schneiden und damit die Optimierung über das Ganze aufgeben.
          </p>

          <p className="text-grey-900/70 leading-relaxed">
            Genau hier setzt Streamlet an. Nachfüllstationen sind Teil des Problems, nicht eine
            Sache, die hinterher hineingerechnet wird. Bei Green Ecolution lief diese Stufe vorher
            auf Vroom, das mehrere Nachfüllpunkte mitten in der Tour nicht modellieren kann.
          </p>
        </div>

        <div className="mt-10 lg:mt-0">
          <div className="relative bg-gradient-to-b from-green-light-100/60 to-white rounded-2xl p-4 lg:p-6 border border-green-dark-900/5 shadow-sm">
            <TourDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}

export default StreamletProblem
