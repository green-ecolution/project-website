import { useEffect } from 'react'
import BreadcrumbSchema from '../components/BreadcrumbSchema'
import StreamletFit from '../components/streamlet/StreamletFit'
import StreamletHero from '../components/streamlet/StreamletHero'
import StreamletProblem from '../components/streamlet/StreamletProblem'
import { applyDocumentMeta } from '../helper/documentMeta'

function StreamletPage() {
  useEffect(() => {
    applyDocumentMeta({
      title: 'Streamlet | Tourenplanung mit Nachfüllstopps | Green Ecolution',
      description:
        'Streamlet ist ein eigenständiger Open-Source-Dienst für Tourenplanung mit Zeitfenstern und mehreren Nachfüllstationen. Zustandslose HTTP-API, deterministischer Solver, AGPL-3.0.',
      url: `${window.location.origin}/streamlet`,
    })
  }, [])

  return (
    <main id="main-content">
      <BreadcrumbSchema
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Streamlet', path: '/streamlet' },
        ]}
      />
      <StreamletHero />
      <StreamletProblem />
      <StreamletFit />
    </main>
  )
}

export default StreamletPage
