import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../tsx/layout/Header'
import Footer from '../tsx/layout/Footer'
import { ErrorBoundary } from '../tsx/components/ErrorBoundary'
import ScrollProgress from '../tsx/components/ScrollProgress'
import BackToTop from '../tsx/components/BackToTop'
import VotingBanner from '../tsx/components/VotingBanner'

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollProgress />
      <BackToTop />
      <VotingBanner />
      <Header />
      <div className="pt-[var(--voting-banner-height,0px)]">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  ),
})
