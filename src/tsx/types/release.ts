export interface ChangelogEntry {
  type: 'feat' | 'fix' | 'refactor' | 'docs' | 'style' | 'test' | 'chore' | 'perf' | 'ci'
  scope?: string
  description: string
  pr?: number
  commit?: string
}

export interface ReleaseFrontmatter {
  version: string
  date: string
  title: string
  summary?: string
  highlights?: string[]
  changelog?: ChangelogEntry[]
  repository?: string
}

export interface Release {
  frontmatter: ReleaseFrontmatter
  content: string
  slug: string
}
