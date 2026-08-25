import { TranslationProvider } from '../../../i18n/TranslationProvider'
import HomepageHero from './HomepageHero'

interface Props {
  language: string
  strings: Record<string, string>
}

// One island for the whole cluster: astro cannot nest islands, the trees sit
// inside the hero's own markup, and the hero text shares isOverlayVisible with
// the overlay. Splitting it would mean a shared store across islands, which is a
// redesign rather than a migration.
export default function HeroCluster({ language, strings }: Props) {
  return (
    <TranslationProvider strings={strings}>
      <HomepageHero language={language} />
    </TranslationProvider>
  )
}
