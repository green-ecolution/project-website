import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
import { useLanguage } from '../../i18n/useLanguage'

function StreamletPage() {
  const { t } = useTranslation('streamlet')
  const language = useLanguage()

  useEffect(() => {
    applyDocumentMeta({
      title: t('meta.title'),
      description: t('meta.description'),
      language,
      path: '/streamlet',
    })
  }, [t, language])

  return (
    <main id="main-content">
      <BreadcrumbSchema
        items={[
          { nameKey: 'breadcrumb.home', path: '/' },
          { nameKey: 'breadcrumb.streamlet', path: '/streamlet' },
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
