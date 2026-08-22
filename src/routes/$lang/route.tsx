import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../i18n/languages'
import { loadLanguage } from '../../i18n'
import NotFoundPage from '../../tsx/pages/NotFoundPage'

// Paths that existed before the language prefix was introduced. nginx rewrites these
// with a real 301 in production; this branch only covers dev and preview, where no
// nginx sits in front.
const LEGACY_PATHS = new Set(['project', 'contact', 'releases', 'impressum', 'datenschutz'])

export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params, location }) => {
    if (isSupportedLanguage(params.lang)) {
      return
    }

    if (LEGACY_PATHS.has(params.lang)) {
      throw redirect({ href: `/${DEFAULT_LANGUAGE}${location.pathname}`, replace: true })
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
