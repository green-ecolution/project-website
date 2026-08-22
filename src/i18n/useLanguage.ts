import { useParams } from '@tanstack/react-router'
import { DEFAULT_LANGUAGE, isSupportedLanguage, type Language } from './languages'

export function useLanguage(): Language {
  const lang = useParams({ strict: false, select: (params) => params.lang })
  return isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE
}
