export const SUPPORTED_LANGUAGES = ['de', 'en'] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'de'

export function isSupportedLanguage(value: unknown): value is Language {
  return typeof value === 'string' && SUPPORTED_LANGUAGES.includes(value as Language)
}

export function currentLanguage(value: unknown): Language {
  if (isSupportedLanguage(value)) {
    return value
  }
  throw new Error(`Unbekannte Sprache: ${String(value)}`)
}
