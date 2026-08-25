import type { Language } from '../i18n/languages'

const DATE_LOCALES: Record<Language, string> = {
  de: 'de-DE',
  // en-GB over en-US: day-month-year order stays closer to the German original.
  en: 'en-GB',
}

export function formatLongDate(date: Date, language: Language): string {
  return date.toLocaleDateString(DATE_LOCALES[language], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// The datetime attribute needs the machine-readable form, not the localised one.
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}
