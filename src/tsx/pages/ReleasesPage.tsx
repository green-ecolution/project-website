import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getAllReleases } from '../../content/releases'
import FeaturedRelease from '../components/releases/FeaturedRelease'
import ReleaseTimeline from '../components/releases/ReleaseTimeline'
import { applyDocumentMeta } from '../helper/documentMeta'

function ReleasesPage() {
  const { t } = useTranslation('releases')
  const releases = getAllReleases()
  const latestRelease = releases[0]
  const olderReleases = releases.slice(1)

  useEffect(() => {
    applyDocumentMeta({
      title: t('overview.meta.title'),
      description: t('overview.meta.description'),
      url: `${window.location.origin}/releases`,
    })
  }, [t])

  return (
    <main
      id="main-content"
      className="relative overflow-hidden flex-grow before:bg-cover before:bg-background-yellow-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain"
    >
      <section className="px-4 max-w-208 mx-auto mt-28 pb-16 md:px-6 lg:mt-36 lg:pb-24 lg:max-w-screen-lg xl:mt-52 xl:max-w-screen-xl">
        <header className="lg:text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4 lg:mx-auto">
            <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
              {t('overview.eyebrow')}
            </span>
            <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
          </div>

          <h1 className="font-lato font-bold text-3xl mb-4 text-grey-900 leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
            {t('overview.title')}
          </h1>

          <p className="text-grey-600 leading-relaxed max-w-2xl lg:mx-auto lg:text-lg">
            {t('overview.description')}
          </p>
        </header>

        {latestRelease && (
          <div className="mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-green-dark-900">
                {t('overview.currentReleaseLabel')}
              </span>
            </div>
            <FeaturedRelease release={latestRelease} />
          </div>
        )}

        {olderReleases.length > 0 && <ReleaseTimeline releases={olderReleases} />}
      </section>
    </main>
  )
}

export default ReleasesPage
