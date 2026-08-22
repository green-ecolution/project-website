import type { Release, ReleaseFrontmatter, ChangelogEntry } from '../../tsx/types/release'
import { DEFAULT_LANGUAGE, isSupportedLanguage, type Language } from '../../i18n/languages'

const releaseFiles = import.meta.glob<string>('./*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

type ObjectEntry = Record<string, string | number>

function parseFrontmatter(raw: string): { data: ReleaseFrontmatter; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
  const match = frontmatterRegex.exec(raw)

  if (!match) {
    return {
      data: { version: '', date: '', title: '' },
      content: raw,
    }
  }

  const [, frontmatterStr, content] = match
  const data: Record<string, string | string[] | ObjectEntry[]> = {}

  let currentKey = ''
  let inArray = false
  let inObjectArray = false
  let currentObject: ObjectEntry = {}

  const lines = frontmatterStr.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const indent = line.search(/\S/)

    // Array item starting with "- "
    if (inArray && trimmed.startsWith('- ')) {
      const afterDash = trimmed.slice(2)

      // Check if it's an object (has a colon)
      if (afterDash.includes(':')) {
        // Save previous object if exists
        if (inObjectArray && Object.keys(currentObject).length > 0) {
          const arr = data[currentKey]
          if (Array.isArray(arr)) {
            ;(arr as ObjectEntry[]).push({ ...currentObject })
          }
        }

        inObjectArray = true
        currentObject = {}

        // Parse the first key-value of the object
        const colonIdx = afterDash.indexOf(':')
        const key = afterDash.slice(0, colonIdx).trim()
        const value = afterDash
          .slice(colonIdx + 1)
          .trim()
          .replace(/^["']|["']$/g, '')
        currentObject[key] = isNaN(Number(value)) ? value : Number(value)
      } else {
        // Simple string array
        const value = afterDash.replace(/^["']|["']$/g, '')
        const arr = data[currentKey]
        if (Array.isArray(arr)) {
          ;(arr as string[]).push(value)
        }
      }
      continue
    }

    // Object property (indented, no dash)
    if (inObjectArray && indent >= 4 && !trimmed.startsWith('-')) {
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx !== -1) {
        const key = trimmed.slice(0, colonIdx).trim()
        const value = trimmed
          .slice(colonIdx + 1)
          .trim()
          .replace(/^["']|["']$/g, '')
        currentObject[key] = isNaN(Number(value)) ? value : Number(value)
        continue
      }
    }

    // New top-level key
    if (indent === 0) {
      // Save any pending object
      if (inObjectArray && Object.keys(currentObject).length > 0) {
        const arr = data[currentKey]
        if (Array.isArray(arr)) {
          ;(arr as ObjectEntry[]).push({ ...currentObject })
        }
        currentObject = {}
      }

      inArray = false
      inObjectArray = false

      const colonIndex = line.indexOf(':')
      if (colonIndex === -1) continue

      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim()

      if (!value) {
        data[key] = []
        currentKey = key
        inArray = true
      } else {
        data[key] = value.replace(/^["']|["']$/g, '')
      }
    }
  }

  // Save last object if exists
  if (inObjectArray && Object.keys(currentObject).length > 0) {
    const arr = data[currentKey]
    if (Array.isArray(arr)) {
      ;(arr as ObjectEntry[]).push({ ...currentObject })
    }
  }

  return {
    data: {
      ...data,
      changelog: data.changelog as unknown as ChangelogEntry[],
    } as unknown as ReleaseFrontmatter,
    content: content.trim(),
  }
}

const PATH_PATTERN = /^\.\/([^/]+)\/([^/]+)\.md$/

const releasesByLanguage = new Map<Language, Map<string, Release>>()

for (const [path, raw] of Object.entries(releaseFiles)) {
  const match = PATH_PATTERN.exec(path)
  if (!match) continue

  const [, language, slug] = match
  const { data, content } = parseFrontmatter(raw)

  const bucket = releasesByLanguage.get(language as Language) ?? new Map<string, Release>()
  bucket.set(slug, { frontmatter: data, content, slug })
  releasesByLanguage.set(language as Language, bucket)
}

function sortByVersionDesc(releases: Release[]): Release[] {
  return releases.sort((a, b) =>
    b.frontmatter.version.localeCompare(a.frontmatter.version, undefined, {
      numeric: true,
    }),
  )
}

// German is the canonical language, so its slugs define which releases exist.
// A release without an English file yet still has to appear on /en, with the
// German content standing in until the translation is written.
export function getAllReleases(language: string = DEFAULT_LANGUAGE): Release[] {
  const normalizedLanguage: Language = isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE
  const canonical = releasesByLanguage.get(DEFAULT_LANGUAGE) ?? new Map<string, Release>()
  const translated = releasesByLanguage.get(normalizedLanguage)

  const releases = Array.from(canonical.keys()).map(
    (slug) => translated?.get(slug) ?? canonical.get(slug)!,
  )

  return sortByVersionDesc(releases)
}

export function getReleaseBySlug(
  slug: string,
  language: string = DEFAULT_LANGUAGE,
): Release | undefined {
  return getAllReleases(language).find((release) => release.slug === slug)
}

export function getAdjacentReleases(
  slug: string,
  language: string = DEFAULT_LANGUAGE,
): {
  prev: Release | undefined
  next: Release | undefined
} {
  const releases = getAllReleases(language)
  const currentIndex = releases.findIndex((r) => r.slug === slug)

  return {
    prev: currentIndex > 0 ? releases[currentIndex - 1] : undefined,
    next: currentIndex < releases.length - 1 ? releases[currentIndex + 1] : undefined,
  }
}
