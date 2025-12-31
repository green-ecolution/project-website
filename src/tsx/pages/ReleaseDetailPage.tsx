import { useEffect, type ReactNode } from 'react'
import { Link, redirect } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { getReleaseBySlug, getAdjacentReleases } from '../../content/releases'
import { Route } from '../../routes/releases_.$slug'

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return getTextContent((node as { props: { children?: ReactNode } }).props.children)
  }
  return ''
}

function ReleaseDetailPage() {
  const { slug } = Route.useParams()
  const release = getReleaseBySlug(slug)
  const { prev, next } = getAdjacentReleases(slug)

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

  const getSectionIcon = (text: string): string => {
    const lowerText = text.toLowerCase()
    if (
      lowerText.includes('neu') ||
      lowerText.includes('feature') ||
      lowerText.includes('funktion')
    ) {
      return '🚀'
    }
    if (
      lowerText.includes('verbesser') ||
      lowerText.includes('improv') ||
      lowerText.includes('optimier')
    ) {
      return '✨'
    }
    if (lowerText.includes('fehler') || lowerText.includes('bug') || lowerText.includes('fix')) {
      return '🐛'
    }
    if (lowerText.includes('breaking') || lowerText.includes('wichtig')) {
      return '⚠️'
    }
    if (lowerText.includes('sicher') || lowerText.includes('security')) {
      return '🔒'
    }
    return '📋'
  }

  const getSectionColor = (text: string): string => {
    const lowerText = text.toLowerCase()
    if (
      lowerText.includes('neu') ||
      lowerText.includes('feature') ||
      lowerText.includes('funktion')
    ) {
      return 'bg-green-dark-900/10 text-green-dark-900 border-green-dark-900/20'
    }
    if (
      lowerText.includes('verbesser') ||
      lowerText.includes('improv') ||
      lowerText.includes('optimier')
    ) {
      return 'bg-green-light-900/20 text-green-light-900 border-green-light-900/30'
    }
    if (lowerText.includes('fehler') || lowerText.includes('bug') || lowerText.includes('fix')) {
      return 'bg-green-middle-900/10 text-green-middle-900 border-green-middle-900/20'
    }
    if (lowerText.includes('breaking') || lowerText.includes('wichtig')) {
      return 'bg-grey-900/10 text-grey-900 border-grey-900/20'
    }
    return 'bg-grey-100 text-grey-900 border-grey-100'
  }

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
            <span className="bg-green-dark-900 text-white px-4 py-1.5 rounded-full text-sm font-lato font-bold shadow-sm">
              v{frontmatter.version}
            </span>
            <time className="text-grey-900/60 text-sm">{formattedDate}</time>
          </div>

          <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl xl:text-6xl">
            {frontmatter.title}
          </h1>

          {frontmatter.highlights && frontmatter.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-green-dark-900/10 text-green-dark-900 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="bg-green-light-100 rounded-2xl shadow-md border border-grey-100 p-6 lg:p-8">
          <Markdown
            components={{
              h2: ({ children }) => {
                const text = getTextContent(children)
                const icon = getSectionIcon(text)
                const colorClasses = getSectionColor(text)
                return (
                  <div className="mt-10 mb-4 first:mt-0">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${colorClasses}`}
                    >
                      <span className="text-lg">{icon}</span>
                      <h2 className="text-lg font-lato font-bold">{children}</h2>
                    </div>
                  </div>
                )
              },
              h3: ({ children }) => (
                <h3 className="text-base font-lato font-semibold mt-5 mb-2 text-grey-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-dark-900 flex-shrink-0" />
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="my-2 text-grey-900/80 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => <ul className="my-3 space-y-2 text-grey-900/80">{children}</ul>,
              li: ({ children }) => (
                <li className="flex items-center gap-3 text-grey-900/80">
                  <span className="text-green-dark-900 flex-shrink-0">→</span>
                  <span>{children}</span>
                </li>
              ),
            }}
          >
            {content}
          </Markdown>
        </div>

        {/* Prev/Next Navigation */}
        <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              to="/releases/$slug"
              params={{ slug: prev.slug }}
              className="group p-4 rounded-xl border border-grey-200 bg-white hover:border-green-dark-900 hover:shadow-md transition-all"
            >
              <span className="text-xs text-grey-500 uppercase tracking-wide">Neuere Version</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-grey-400 group-hover:text-green-dark-900 transition-colors">
                  ←
                </span>
                <div>
                  <span className="font-lato font-bold text-grey-900 group-hover:text-green-dark-900 transition-colors">
                    v{prev.frontmatter.version}
                  </span>
                  <p className="text-sm text-grey-600 line-clamp-1">{prev.frontmatter.title}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/releases/$slug"
              params={{ slug: next.slug }}
              className="group p-4 rounded-xl border border-grey-200 bg-white hover:border-green-dark-900 hover:shadow-md transition-all sm:text-right"
            >
              <span className="text-xs text-grey-500 uppercase tracking-wide">Ältere Version</span>
              <div className="flex items-center gap-2 mt-1 sm:justify-end">
                <div>
                  <span className="font-lato font-bold text-grey-900 group-hover:text-green-dark-900 transition-colors">
                    v{next.frontmatter.version}
                  </span>
                  <p className="text-sm text-grey-600 line-clamp-1">{next.frontmatter.title}</p>
                </div>
                <span className="text-grey-400 group-hover:text-green-dark-900 transition-colors">
                  →
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </main>
  )
}

export default ReleaseDetailPage
