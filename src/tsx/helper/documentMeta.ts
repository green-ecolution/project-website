import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, type Language } from '../../i18n/languages'

const BASE_URL = 'https://green-ecolution.de'

const OG_LOCALES: Record<Language, string> = {
  de: 'de_DE',
  en: 'en_GB',
}

interface DocumentMeta {
  title: string
  description?: string
  language: Language
  // Path without the language prefix. Omit it for pages that have no canonical
  // address, such as the 404 page: a self-referencing canonical there would tell
  // crawlers the URL is a real page.
  path?: string
}

function setMetaTag(selector: string, attribute: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', value)
}

function setLinkTag(selector: string, rel: string, href: string, hreflang?: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(selector)

  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    if (hreflang) {
      tag.setAttribute('hreflang', hreflang)
    }
    document.head.appendChild(tag)
  }

  tag.setAttribute('href', href)
}

export function applyDocumentMeta({ title, description, language, path }: DocumentMeta) {
  document.title = title
  document.documentElement.lang = language

  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', OG_LOCALES[language])

  if (description) {
    setMetaTag('meta[name="description"]', 'name', 'description', description)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  }

  if (path === undefined) {
    // Client-side navigation reuses the same document, so tags from the previous
    // page would otherwise linger and claim this one has a canonical address.
    document.head
      .querySelectorAll('link[rel="canonical"], link[rel="alternate"]')
      .forEach((tag) => tag.remove())
    return
  }

  const canonicalUrl = `${BASE_URL}/${language}${path}`
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
  setLinkTag('link[rel="canonical"]', 'canonical', canonicalUrl)

  for (const lang of SUPPORTED_LANGUAGES) {
    setLinkTag(
      `link[rel="alternate"][hreflang="${lang}"]`,
      'alternate',
      `${BASE_URL}/${lang}${path}`,
      lang,
    )
  }

  // x-default points at German because that's the site's source language, not a geo-targeted fallback.
  setLinkTag(
    'link[rel="alternate"][hreflang="x-default"]',
    'alternate',
    `${BASE_URL}/${DEFAULT_LANGUAGE}${path}`,
    'x-default',
  )
}
