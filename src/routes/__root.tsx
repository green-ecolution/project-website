import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../tsx/layout/Header'
import Footer from '../tsx/layout/Footer'
import { ErrorBoundary } from '../tsx/components/ErrorBoundary'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  ),
})
