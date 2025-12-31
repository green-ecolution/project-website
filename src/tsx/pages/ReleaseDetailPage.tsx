import { useEffect } from 'react'
import { Link, redirect } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { getReleaseBySlug } from '../../content/releases'
import { Route } from '../../routes/releases_.$slug'

function ReleaseDetailPage() {
  const { slug } = Route.useParams()
  const release = getReleaseBySlug(slug)

  useEffect(() => {
    if (release) {
      document.title = `v${release.frontmatter.version} - ${release.frontmatter.title} | Green Ecolution`
    }
  }, [release])

  if (!release) {
    throw redirect({ to: '/releases' })
  }

  const { frontmatter, content } = release

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="relative overflow-hidden flex-grow before:bg-cover before:bg-background-yellow-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain">
      <article className="px-4 max-w-208 mx-auto mt-20 pb-16 md:px-6 lg:mt-24 lg:pb-24 lg:max-w-screen-lg xl:mt-32 xl:max-w-screen-xl">
        <Link
          to="/releases"
          className="inline-flex items-center gap-2 text-green-dark-900 font-semibold hover:underline mb-8"
        >
          <span aria-hidden="true">←</span>
          Alle Releases
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-green-dark-900 text-white px-3 py-1 rounded-full text-sm font-lato font-bold">
              v{frontmatter.version}
            </span>
            <time className="text-grey-900/60 text-sm">{formattedDate}</time>
          </div>

          <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl xl:text-6xl">
            {frontmatter.title}
          </h1>

          {frontmatter.highlights && frontmatter.highlights.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {frontmatter.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="bg-green-dark-900/10 text-green-dark-900 px-3 py-1 rounded-full text-sm"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="bg-green-light-100 rounded-2xl shadow-md border border-grey-100 p-6 lg:p-8">
          <Markdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-xl font-lato font-bold mt-8 mb-3 text-grey-900 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-lato font-semibold mt-5 mb-2 text-grey-900">
                  {children}
                </h3>
              ),
              p: ({ children }) => <p className="my-2 text-grey-900/80">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside my-3 space-y-1 text-grey-900/80">
                  {children}
                </ul>
              ),
              li: ({ children }) => <li className="text-grey-900/80">{children}</li>,
            }}
          >
            {content}
          </Markdown>
        </div>
      </article>
    </main>
  )
}

export default ReleaseDetailPage
