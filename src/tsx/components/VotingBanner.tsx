import { useEffect, useRef, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { Trophy, X, ArrowRight } from 'lucide-react'
import { dismissVotingBanner, isVotingBannerDismissed } from '../helper/storage'
import { useLanguage } from '../../i18n/useLanguage'

const VOTING_URL = 'https://open-source-wettbewerb.de/voting/green-ecolution/'
const VOTING_DEADLINE = new Date('2026-09-30T23:59:59+02:00').getTime()
const isVotingOpen = Date.now() <= VOTING_DEADLINE

function VotingBanner() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const lang = useLanguage()
  const [isDismissed, setIsDismissed] = useState(() => isVotingBannerDismissed())
  const bannerRef = useRef<HTMLElement>(null)

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`
  const isVisible = !isDismissed && isVotingOpen && isHomePage

  // Header and page content are pushed down by this, so the height must stay in sync
  useEffect(() => {
    const root = document.documentElement
    const banner = bannerRef.current

    if (!banner) {
      root.style.removeProperty('--voting-banner-height')
      return
    }

    const observer = new ResizeObserver(() => {
      root.style.setProperty('--voting-banner-height', `${banner.offsetHeight}px`)
    })
    observer.observe(banner)

    return () => {
      observer.disconnect()
      root.style.removeProperty('--voting-banner-height')
    }
  }, [isVisible])

  const handleDismiss = () => {
    dismissVotingBanner()
    setIsDismissed(true)
  }

  if (!isVisible) return null

  return (
    <aside
      ref={bannerRef}
      aria-label="Aufruf zum Community Voting"
      className="fixed inset-x-0 top-0 z-40 bg-green-dark-900 text-white"
    >
      <div className="relative mx-auto max-w-screen-lg px-4 md:px-6 xl:max-w-screen-xl">
        <a
          href={VOTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-x-3 py-2.5 pr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:justify-center sm:gap-x-4 sm:py-2 md:pr-10"
        >
          <Trophy className="w-4 h-4 shrink-0 text-green-light-900" aria-hidden />

          <span className="text-xs leading-snug sm:text-sm">
            <span className="font-semibold">Community Voting</span>
            <span className="hidden sm:inline">
              : Green Ecolution steht beim Open-Source-Wettbewerb zur Abstimmung. Noch bis zum 30.
              September.
            </span>
            <span className="block text-white/85 sm:hidden">
              Green Ecolution beim Open-Source-Wettbewerb unterstützen, noch bis 30.09.
            </span>
          </span>

          <span className="hidden shrink-0 items-center gap-x-2 rounded-xl bg-green-light-900 px-4 py-1.5 text-sm font-semibold text-grey-900 transition-colors ease-in-out duration-300 group-hover:bg-white sm:inline-flex">
            Jetzt abstimmen
            <ArrowRight className="w-4 h-4 transition-transform ease-in-out duration-300 group-hover:translate-x-1" />
          </span>

          <ArrowRight className="ml-auto w-4 h-4 shrink-0 sm:hidden" aria-hidden />
        </a>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Hinweis zum Community Voting schließen"
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg p-1 text-white/70 transition-colors ease-in-out duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-4"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  )
}

export default VotingBanner
