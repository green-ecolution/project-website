import { Link } from 'react-router-dom'
import { getAllReleases } from '../../../content/releases'
import Button from '../Button'
import Arrow from '../../icons/Arrow'

function LatestRelease() {
  const releases = getAllReleases()
  const latestRelease = releases[0]

  if (!latestRelease) return null

  const formattedDate = new Date(latestRelease.frontmatter.date).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="px-4 max-w-screen-lg mx-auto mt-28 lg:mt-36 xl:mt-52 md:px-6 xl:max-w-screen-xl">
      <div className="md:grid md:grid-cols-2 md:gap-x-10 md:items-center">
        <div className="mb-8 md:mb-0">
          <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">Was gibt's Neues?</h2>
          <p className="mb-6">
            Wir entwickeln Green Ecolution kontinuierlich weiter. Schau dir die neuesten Funktionen,
            Verbesserungen und Bugfixes an – und erfahre, woran wir gerade arbeiten.
          </p>
          <Button href="/releases" ariaLabel="Alle Releases ansehen" isDark>
            <span>Alle Releases</span>
            <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2" />
          </Button>
        </div>

        <Link
          to={`/releases/${latestRelease.slug}`}
          className="group block bg-gradient-to-br from-green-dark-900 to-green-middle-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
              v{latestRelease.frontmatter.version}
            </span>
            <span className="bg-green-light-900/30 text-white px-3 py-1 rounded-full text-sm font-bold">
              Aktuell
            </span>
          </div>
          <time className="text-white/60 text-sm block mb-2">{formattedDate}</time>
          <h3 className="font-lato font-bold text-xl text-white mb-2 group-hover:underline">
            {latestRelease.frontmatter.title}
          </h3>
          {latestRelease.frontmatter.summary && (
            <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
              {latestRelease.frontmatter.summary}
            </p>
          )}
          <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors mt-4">
            <span className="text-sm font-medium">Details ansehen</span>
            <span>→</span>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default LatestRelease
