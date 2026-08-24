import { SUPPORTED_LANGUAGES, type Language } from '../i18n/languages'

export function languagePaths(): { params: { lang: Language } }[] {
  return SUPPORTED_LANGUAGES.map((lang) => ({ params: { lang } }))
}
