const DATE_LOCALES: Record<string, string> = {
  de: 'de-DE',
  // en-GB over en-US: day-month-year order stays closer to the German original.
  en: 'en-GB',
}

export function formatReleaseDate(dateString: string, language: string): string {
  return new Date(dateString).toLocaleDateString(DATE_LOCALES[language] ?? 'de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
