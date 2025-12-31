import { useEffect } from 'react'
import { getAllReleases } from '../../content/releases'
import ReleaseTimeline from '../components/releases/ReleaseTimeline'

function ReleasesPage() {
  const releases = getAllReleases()

  useEffect(() => {
    document.title = 'Releases | Green Ecolution | Smartes Grünflächenmanagement'
  }, [])

  return (
    <main className="relative overflow-hidden flex-grow before:bg-cover before:bg-background-yellow-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain">
      <section className="px-4 max-w-208 mx-auto mt-28 pb-16 md:px-6 lg:mt-36 lg:pb-24 lg:max-w-screen-lg xl:mt-52 xl:max-w-screen-xl">
        <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl lg:text-center xl:text-6xl">
          Releases
        </h1>
        <p className="mb-12 lg:text-center">
          Entdecke die neuesten Funktionen, Verbesserungen und Bugfixes - wir arbeiten
          kontinuierlich daran, Green Ecolution noch besser zu machen.
        </p>
        <ReleaseTimeline releases={releases} />
      </section>
    </main>
  )
}

export default ReleasesPage
