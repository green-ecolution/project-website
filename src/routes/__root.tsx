import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../tsx/layout/Header'
import Footer from '../tsx/layout/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ),
})
