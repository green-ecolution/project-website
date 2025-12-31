import type { Release, ReleaseFrontmatter } from '../../tsx/types/release'

const releaseFiles = import.meta.glob<string>('./*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

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
  const data: Record<string, string | string[]> = {}

  let currentKey = ''
  let inArray = false

  for (const line of frontmatterStr.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (inArray && trimmed.startsWith('- ')) {
      const value = trimmed.slice(2).replace(/^["']|["']$/g, '')
      const arr = data[currentKey]
      if (Array.isArray(arr)) {
        arr.push(value)
      }
      continue
    }

    inArray = false
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

  return {
    data: data as unknown as ReleaseFrontmatter,
    content: content.trim(),
  }
}

export function getAllReleases(): Release[] {
  return Object.entries(releaseFiles)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw)
      return {
        frontmatter: data,
        content,
        slug: path.replace('./', '').replace('.md', ''),
      }
    })
    .sort((a, b) =>
      b.frontmatter.version.localeCompare(a.frontmatter.version, undefined, {
        numeric: true,
      }),
    )
}

export function getReleaseBySlug(slug: string): Release | undefined {
  return getAllReleases().find((release) => release.slug === slug)
}

export function getAdjacentReleases(slug: string): {
  prev: Release | undefined
  next: Release | undefined
} {
  const releases = getAllReleases()
  const currentIndex = releases.findIndex((r) => r.slug === slug)

  return {
    prev: currentIndex > 0 ? releases[currentIndex - 1] : undefined,
    next: currentIndex < releases.length - 1 ? releases[currentIndex + 1] : undefined,
  }
}
