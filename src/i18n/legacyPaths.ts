import { DEFAULT_LANGUAGE, isSupportedLanguage } from './languages'

// Paths that existed before the language prefix was introduced. nginx rewrites these
// with a real 301 in production; this only covers dev and preview, where no nginx
// sits in front.
const LEGACY_SEGMENTS = new Set(['project', 'contact', 'releases', 'impressum', 'datenschutz'])

export function resolveLegacyRedirect(
  pathname: string,
  search: string,
  hash: string,
): string | null {
  const [firstSegment] = pathname.split('/').filter(Boolean)

  if (!firstSegment || isSupportedLanguage(firstSegment) || !LEGACY_SEGMENTS.has(firstSegment)) {
    return null
  }

  const hashSuffix = hash ? `#${hash}` : ''
  return `/${DEFAULT_LANGUAGE}${pathname}${search}${hashSuffix}`
}
