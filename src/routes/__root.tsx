import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../tsx/layout/Header'
import Footer from '../tsx/layout/Footer'
import { ErrorBoundary } from '../tsx/components/ErrorBoundary'
import ScrollProgress from '../tsx/components/ScrollProgress'
import BackToTop from '../tsx/components/BackToTop'

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollProgress />
      <BackToTop />
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  ),
})
