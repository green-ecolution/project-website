import { useEffect } from 'react'
import BreadcrumbSchema from '../components/BreadcrumbSchema'
import StreamletApi from '../components/streamlet/StreamletApi'
import StreamletFit from '../components/streamlet/StreamletFit'
import StreamletHero from '../components/streamlet/StreamletHero'
import StreamletOperations from '../components/streamlet/StreamletOperations'
import StreamletProblem from '../components/streamlet/StreamletProblem'
import StreamletSolver from '../components/streamlet/StreamletSolver'
import StreamletStatus from '../components/streamlet/StreamletStatus'
import StreamletTiles from '../components/streamlet/StreamletTiles'
import { applyDocumentMeta } from '../helper/documentMeta'

function StreamletPage() {
  useEffect(() => {
    applyDocumentMeta({
      title: 'Streamlet | Tourenplanung mit Nachfüllstationen | Green Ecolution',
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
      <StreamletApi />
      <StreamletSolver />
      <StreamletTiles />
      <StreamletOperations />
      <StreamletStatus />
    </main>
  )
}

export default StreamletPage
