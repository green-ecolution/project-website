import { createFileRoute, redirect } from '@tanstack/react-router'
import { resolveLegacyRedirect } from '../i18n/legacyPaths'
import NotFoundPage from '../tsx/pages/NotFoundPage'

export const Route = createFileRoute('/$')({
  // Legacy paths with more than one segment (e.g. /releases/v0.5.0) never reach
  // $lang's beforeLoad: TanStack Router only matches /$lang when a leaf route
  // consumes every remaining segment, so these fall through to this catch-all instead.
  beforeLoad: ({ location }) => {
    const target = resolveLegacyRedirect(location.pathname, location.searchStr, location.hash)
    if (target) {
      throw redirect({ href: target, replace: true })
    }
  },
  component: NotFoundPage,
})
