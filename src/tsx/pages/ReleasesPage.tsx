import { useEffect } from 'react'
import { getAllReleases } from '../../content/releases'
import ReleaseTimeline from '../components/releases/ReleaseTimeline'

function ReleasesPage() {
  const releases = getAllReleases()

  useEffect(() => {
    document.title = 'Releases | Green Ecolution | Smartes Grünflächenmanagement'
  }, [])

  return (
    <main className="relative overflow-hidden before:bg-cover before:bg-background-light-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain">
      <section className="px-4 max-w-208 mx-auto pt-8 pb-16 md:px-6 lg:pt-16 lg:pb-24 lg:max-w-screen-lg xl:max-w-screen-xl">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl">
          Releases
        </h1>
        <p className="text-lg text-grey-900/70 mb-12 max-w-2xl">
          Alle Neuerungen und Verbesserungen von Green Ecolution im Überblick.
        </p>
        <ReleaseTimeline releases={releases} />
      </section>
    </main>
  )
}

export default ReleasesPage
