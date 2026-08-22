import { Link } from '@tanstack/react-router'
import { CircleDot } from 'lucide-react'
import Button from '../Button'
import Github from '../../icons/Github'
import Arrow from '../../icons/Arrow'
import { streamletLimitations, streamletLinks } from '../../../data/streamlet'

function StreamletStatus() {
  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="mb-10 lg:mb-14">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            Stand
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>

        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          Was heute geht und was nicht
        </h2>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl">
          Streamlet steht am Anfang und läuft bei Green Ecolution in der Einsatzplanung. Diese
          Punkte stehen hier, damit niemand sie erst beim Einbauen entdeckt.
        </p>
      </div>

      <ul className="space-y-3 mb-12">
        {streamletLimitations.map((limitation) => (
          <li key={limitation} className="flex items-start gap-3">
            <CircleDot
              className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-light-900"
              aria-hidden="true"
            />
            <span className="text-grey-900/70 leading-relaxed">{limitation}</span>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl bg-green-light-100/70 border border-green-light-900/20 p-6 lg:p-10">
        <h3 className="font-lato font-bold text-xl text-grey-900 mb-3 lg:text-2xl">
          Mitmachen oder übernehmen
        </h3>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl mb-8">
          Streamlet lässt sich unabhängig von Green Ecolution einsetzen. Fragen, Fehlerberichte und
          Erfahrungen aus anderen Anwendungsfällen sind im Repository willkommen. Wie der Dienst in
          einem echten Betrieb läuft, zeigt das{' '}
          <Link
            to="/releases/$slug"
            params={{ slug: 'v0.4.0' }}
            className="font-semibold text-green-dark-900 underline decoration-green-dark-900 decoration-2 underline-offset-2 transition-all hover:decoration-4"
          >
            Release 0.4.0 von Green Ecolution
          </Link>
          .
        </p>

        <div className="flex flex-wrap gap-4">
          <Button
            href={streamletLinks.repo}
            ariaLabel="Streamlet-Repository auf GitHub öffnen"
            isExternalLink
            isDark
          >
            <Github classes="w-5" />
            <span className="whitespace-nowrap">Zum Repository</span>
            <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2" />
          </Button>

          <a
            href={streamletLinks.issues}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Issues von Streamlet auf GitHub öffnen"
            className="flex items-center justify-center gap-x-3 rounded-2xl w-max font-semibold px-5 py-2 cursor-pointer transition-all ease-in-out duration-300 text-green-dark-900 border border-green-dark-900/30 hover:border-green-dark-900 hover:bg-white/70"
          >
            <span className="whitespace-nowrap">Issues</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default StreamletStatus
