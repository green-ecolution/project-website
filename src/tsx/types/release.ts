export interface ReleaseFrontmatter {
  version: string
  date: string
  title: string
  highlights?: string[]
}

export interface Release {
  frontmatter: ReleaseFrontmatter
  content: string
  slug: string
}
