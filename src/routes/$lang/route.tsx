import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { isSupportedLanguage } from '../../i18n/languages'
import { resolveLegacyRedirect } from '../../i18n/legacyPaths'
import { loadLanguage } from '../../i18n'
import NotFoundPage from '../../tsx/pages/NotFoundPage'

export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params, location }) => {
    if (isSupportedLanguage(params.lang)) {
      return
    }

    const target = resolveLegacyRedirect(location.pathname, location.searchStr, location.hash)
    if (target) {
      throw redirect({ href: target, replace: true })
    }

    throw notFound()
  },
  loader: async ({ params }) => {
    if (isSupportedLanguage(params.lang)) {
      await loadLanguage(params.lang)
    }
  },
  notFoundComponent: NotFoundPage,
})
