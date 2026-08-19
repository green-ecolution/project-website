import { useEffect, useState } from 'react'
import type { TocEntry } from '../../helper/releaseSections'

interface ReleaseTocProps {
  entries: TocEntry[]
}

const ReleaseToc: React.FC<ReleaseTocProps> = ({ entries }) => {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null)

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-120px 0px -70% 0px' },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [entries])

  return (
    <nav aria-label="Abschnitte dieser Release Note" className="sticky top-28">
      <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
        Inhalt
      </span>
      <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1 mb-4" />

      <ul className="space-y-1 border-l border-grey-900/10">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={activeId === entry.id ? 'true' : undefined}
              className={`block -ml-px border-l-2 pl-3 py-1 text-sm transition-colors ${
                activeId === entry.id
                  ? 'border-green-dark-900 text-green-dark-900 font-semibold'
                  : 'border-transparent text-grey-900/60 hover:text-green-dark-900'
              }`}
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ReleaseToc
