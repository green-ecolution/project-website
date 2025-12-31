import { useState } from 'react'
import Markdown from 'react-markdown'
import type { Release } from '../../types/release'

interface ReleaseCardProps {
  release: Release
  defaultExpanded?: boolean
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const { frontmatter, content } = release

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="rounded-2xl shadow-md p-6 bg-green-light-100 lg:p-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-green-dark-900 text-white px-3 py-1 rounded-full text-sm font-lato font-bold">
          v{frontmatter.version}
        </span>
        <time className="text-grey-900/60 text-sm">{formattedDate}</time>
      </div>

      <h2 className="font-lato font-bold text-xl mb-3 lg:text-2xl">
        {frontmatter.title}
      </h2>

      {frontmatter.highlights && frontmatter.highlights.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-4">
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

      {expanded && (
        <div className="mt-6 pt-6 border-t border-green-dark-900/20">
          <Markdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-xl font-lato font-bold mt-6 mb-3 text-grey-900">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-lato font-semibold mt-4 mb-2 text-grey-900">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="my-2 text-grey-900/80">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside my-3 space-y-1 text-grey-900/80">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-grey-900/80">{children}</li>
              ),
            }}
          >
            {content}
          </Markdown>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="text-green-dark-900 font-semibold mt-4 hover:underline flex items-center gap-2"
      >
        {expanded ? '↑ Weniger anzeigen' : '↓ Details anzeigen'}
      </button>
    </article>
  )
}

export default ReleaseCard
