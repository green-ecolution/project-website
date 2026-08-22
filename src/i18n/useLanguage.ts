import { useParams, useRouterState } from '@tanstack/react-router'
import { languageFromPathname } from './detectLanguage'
import { DEFAULT_LANGUAGE, isSupportedLanguage, type Language } from './languages'

export function useLanguage(): Language {
  const lang = useParams({ strict: false, select: (params) => params.lang })
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  if (isSupportedLanguage(lang)) {
    return lang
  }

  // The catch-all 404 route sits outside /$lang and carries no param, so read the
  // prefix off the path instead. Without this the switcher and every link on that
  // page would claim German while i18next already rendered English.
  return languageFromPathname(pathname) ?? DEFAULT_LANGUAGE
}
