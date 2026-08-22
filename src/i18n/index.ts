import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, type Language } from './languages'

export const NAMESPACES = ['common', 'home', 'project', 'contact', 'releases', 'legal'] as const

type Catalog = Record<string, Record<string, unknown>>

const catalogLoaders: Record<Language, () => Promise<{ default: Catalog }>> = {
  de: () => import('./locales/de'),
  en: () => import('./locales/en'),
}

const loadedLanguages = new Set<Language>()

async function addCatalog(language: Language) {
  if (loadedLanguages.has(language)) {
    return
  }

  const { default: catalog } = await catalogLoaders[language]()
  for (const namespace of NAMESPACES) {
    i18next.addResourceBundle(language, namespace, catalog[namespace], true, true)
  }

  loadedLanguages.add(language)
}

export async function loadLanguage(language: Language) {
  await addCatalog(language)

  // The fallback catalog has to be present too, otherwise a key that only exists
  // in German would render as the raw key instead of falling back.
  if (language !== DEFAULT_LANGUAGE) {
    await addCatalog(DEFAULT_LANGUAGE)
  }

  if (i18next.language !== language) {
    await i18next.changeLanguage(language)
  }
}

export async function initI18n(language: Language) {
  await i18next.use(initReactI18next).init({
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    ns: NAMESPACES,
    defaultNS: 'common',
    resources: {},
    interpolation: { escapeValue: false },
    // Without this a missing key renders silently as the key itself. The parity
    // script catches gaps between the catalogs, this catches keys that exist in
    // neither.
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (languages, namespace, key) => {
      console.warn(`i18next missing key: ${namespace}:${key} (${languages.join(', ')})`)
    },
  })

  await loadLanguage(language)
}

export default i18next
