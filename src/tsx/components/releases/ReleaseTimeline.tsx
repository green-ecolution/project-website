import { PackageOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Release } from '../../types/release'
import ReleaseCard from './ReleaseCard'

interface ReleaseTimelineProps {
  releases: Release[]
}

function groupByYear(releases: Release[]): { year: string; releases: Release[] }[] {
  const groups: { year: string; releases: Release[] }[] = []

  for (const release of releases) {
    const year = release.frontmatter.date.slice(0, 4)
    const current = groups[groups.length - 1]

    if (current?.year === year) {
      current.releases.push(release)
    } else {
      groups.push({ year, releases: [release] })
    }
  }

  return groups
}

const ReleaseTimeline: React.FC<ReleaseTimelineProps> = ({ releases }) => {
  const { t } = useTranslation('releases')

  if (releases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-grey-900/5 mb-4">
          <PackageOpen className="w-6 h-6 text-grey-900/30" aria-hidden="true" />
        </div>
        <p className="text-grey-900/50 text-sm">{t('timeline.empty')}</p>
      </div>
    )
  }

  return (
    <div>
      {groupByYear(releases).map(({ year, releases: yearReleases }) => (
        <section key={year} aria-label={t('timeline.yearAriaLabel', { year })}>
          <div className="flex items-center gap-4 mb-5 mt-10 first:mt-0">
            <span className="font-lato font-bold text-sm text-grey-900/45">{year}</span>
            <div className="flex-1 h-px bg-grey-900/10" />
          </div>

          {/* The axis is drawn once per group so it runs through without gaps. */}
          <div className="relative lg:pl-8 lg:before:absolute lg:before:left-[15px] lg:before:top-2 lg:before:bottom-2 lg:before:w-0.5 lg:before:bg-grey-900/10">
            <div className="space-y-4 lg:space-y-5">
              {yearReleases.map((release) => (
                <ReleaseCard key={release.slug} release={release} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default ReleaseTimeline
