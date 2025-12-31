import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { getAllReleases } from '../../content/releases'
import ReleaseTimeline from '../components/releases/ReleaseTimeline'

function ReleasesPage() {
  const releases = getAllReleases()
  const latestRelease = releases[0]
  const olderReleases = releases.slice(1)

  useEffect(() => {
    document.title = 'Releases | Green Ecolution | Smartes Grünflächenmanagement'
  }, [])

  const formattedDate = latestRelease
    ? new Date(latestRelease.frontmatter.date).toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <main className="relative overflow-hidden flex-grow before:bg-cover before:bg-background-yellow-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain">
      <section className="px-4 max-w-208 mx-auto mt-28 pb-16 md:px-6 lg:mt-36 lg:pb-24 lg:max-w-screen-lg xl:mt-52 xl:max-w-screen-xl">
        <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl lg:text-center xl:text-6xl">
          Release Notes
        </h1>
        <p className="mb-12 lg:text-center">
          Entdecke die neuesten Funktionen, Verbesserungen und Bugfixes - wir arbeiten
          kontinuierlich daran, Green Ecolution noch besser zu machen.
        </p>

        {latestRelease && (
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-green-dark-900 mb-3 block">
              Aktuelles Release
            </span>
            <Link
              to="/releases/$slug"
              params={{ slug: latestRelease.slug }}
              className="group block bg-gradient-to-br from-green-dark-900 to-green-middle-900 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                      v{latestRelease.frontmatter.version}
                    </span>
                    <time className="text-white/70 text-sm">{formattedDate}</time>
                  </div>
                  <h2 className="font-lato font-bold text-2xl text-white mb-2 group-hover:underline lg:text-3xl">
                    {latestRelease.frontmatter.title}
                  </h2>
                  {latestRelease.frontmatter.summary && (
                    <p className="text-white/80 leading-relaxed">
                      {latestRelease.frontmatter.summary}
                    </p>
                  )}
                  {latestRelease.frontmatter.highlights &&
                    latestRelease.frontmatter.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {latestRelease.frontmatter.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="bg-white/10 text-white/90 px-2.5 py-1 rounded-full text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
                <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors lg:flex-shrink-0">
                  <span className="text-sm font-medium">Details ansehen</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {olderReleases.length > 0 && (
          <>
            <span className="text-xs font-bold uppercase tracking-wider text-grey-900/60 mb-3 block">
              Ältere Releases
            </span>
            <ReleaseTimeline releases={olderReleases} />
          </>
        )}
      </section>
    </main>
  )
}

export default ReleasesPage
