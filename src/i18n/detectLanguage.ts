import { getStoredLanguage } from '../tsx/helper/storage'
import { DEFAULT_LANGUAGE, isSupportedLanguage, type Language } from './languages'

export function languageFromPathname(pathname: string): Language | null {
  const segment = pathname.split('/')[1]
  return isSupportedLanguage(segment) ? segment : null
}

export function detectLanguage(): Language {
  const stored = getStoredLanguage()
  if (isSupportedLanguage(stored)) {
    return stored
  }

  const candidates = navigator.languages.length ? navigator.languages : [navigator.language]
  for (const candidate of candidates) {
    const base = candidate.split('-')[0].toLowerCase()
    if (isSupportedLanguage(base)) {
      return base
    }
  }

  return DEFAULT_LANGUAGE
}
