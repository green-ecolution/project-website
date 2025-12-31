import { Link } from '@tanstack/react-router'
import type { Release } from '../../types/release'

interface ReleaseCardProps {
  release: Release
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release }) => {
  const { frontmatter, slug } = release

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="rounded-2xl shadow-md border border-grey-100 p-6 bg-green-light-100 lg:p-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-green-dark-900 text-white px-3 py-1 rounded-full text-sm font-lato font-bold">
          v{frontmatter.version}
        </span>
        <time className="text-grey-900/60 text-sm">{formattedDate}</time>
      </div>

      <h2 className="font-lato font-bold text-xl mb-3 lg:text-2xl">{frontmatter.title}</h2>

      {frontmatter.summary && <p className="text-grey-900/80 mb-4">{frontmatter.summary}</p>}

      {frontmatter.highlights && frontmatter.highlights.length > 0 && (
        <div className="mb-6">
          <h3 className="font-lato font-semibold text-sm text-grey-900/60 uppercase tracking-wide mb-2">
            TL;DR
          </h3>
          <ul className="space-y-1">
            {frontmatter.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2 text-grey-900/80">
                <span className="text-green-dark-900">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/releases/$slug"
        params={{ slug }}
        className="inline-flex items-center gap-2 text-green-dark-900 font-semibold hover:underline"
      >
        Mehr lesen
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export default ReleaseCard
