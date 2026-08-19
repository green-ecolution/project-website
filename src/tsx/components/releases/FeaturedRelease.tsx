import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { Release } from '../../types/release'
import { formatReleaseDate } from '../../helper/formatDate'

interface FeaturedReleaseProps {
  release: Release
}

const FeaturedRelease: React.FC<FeaturedReleaseProps> = ({ release }) => {
  const { frontmatter, slug } = release

  return (
    <Link
      to="/releases/$slug"
      params={{ slug }}
      className="group block bg-gradient-to-br from-green-dark-900 to-green-middle-900 rounded-2xl lg:rounded-3xl p-6 lg:p-10 shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center bg-white/15 text-white px-4 py-1.5 rounded-full text-sm font-lato font-bold ring-1 ring-white/20">
          v{frontmatter.version}
        </span>
        <span className="inline-flex items-center bg-green-light-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Aktuell
        </span>
        <time dateTime={frontmatter.date} className="text-white/60 text-sm font-medium">
          {formatReleaseDate(frontmatter.date)}
        </time>
      </div>

      <h2 className="font-lato font-bold text-2xl lg:text-4xl text-white mb-3 lg:mb-4 max-w-2xl">
        {frontmatter.title}
      </h2>

      {frontmatter.summary && (
        <p className="text-white/75 leading-relaxed text-base lg:text-lg max-w-2xl mb-6">
          {frontmatter.summary}
        </p>
      )}

      {frontmatter.highlights && frontmatter.highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
          {frontmatter.highlights.map((highlight) => (
            <span
              key={highlight}
              className="bg-white/10 text-white/90 px-3 py-1.5 rounded-lg text-sm font-medium ring-1 ring-white/10"
            >
              {highlight}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 text-white/80 transition-colors group-hover:text-white">
        <span className="text-sm font-semibold">Details ansehen</span>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 transition-all duration-300 group-hover:bg-white/20 group-hover:translate-x-1">
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

export default FeaturedRelease
