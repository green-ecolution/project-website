import type { Release } from '../../types/release'
import ReleaseCard from './ReleaseCard'

interface ReleaseTimelineProps {
  releases: Release[]
}

const ReleaseTimeline: React.FC<ReleaseTimelineProps> = ({ releases }) => {
  if (releases.length === 0) {
    return (
      <div className="text-center py-12 text-grey-900/60">
        <p>Es sind noch keine Release Notes vorhanden.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {releases.map((release) => (
        <ReleaseCard key={release.slug} release={release} />
      ))}
    </div>
  )
}

export default ReleaseTimeline
