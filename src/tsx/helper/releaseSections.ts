import {
  BookOpen,
  Bug,
  CirclePlay,
  Construction,
  Lightbulb,
  ListChecks,
  Plus,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Telescope,
  TriangleAlert,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export type SectionTone = 'brand' | 'muted'

interface SectionRule {
  keywords: string[]
  icon: LucideIcon
  tone: SectionTone
}

// First match wins, so put narrow keyword groups before broad ones.
const SECTION_RULES: SectionRule[] = [
  { keywords: ['highlight'], icon: Sparkles, tone: 'brand' },
  { keywords: ['breaking', 'wichtig'], icon: TriangleAlert, tone: 'muted' },
  { keywords: ['einschränkung', 'limitation', 'known issue'], icon: Construction, tone: 'muted' },
  { keywords: ['ausblick', 'outlook', 'zukunft'], icon: Telescope, tone: 'muted' },
  { keywords: ['fehler', 'bug', 'fix'], icon: Bug, tone: 'brand' },
  { keywords: ['sicher', 'security'], icon: ShieldCheck, tone: 'brand' },
  { keywords: ['verbesser', 'improv', 'optimier'], icon: SlidersHorizontal, tone: 'brand' },
  { keywords: ['neu', 'feature', 'funktion'], icon: Plus, tone: 'brand' },
  { keywords: ['refactor'], icon: Wrench, tone: 'brand' },
  { keywords: ['konfiguration', 'configuration', 'config'], icon: Settings, tone: 'brand' },
  { keywords: ['dokumentation', 'documentation', 'docs'], icon: BookOpen, tone: 'brand' },
  { keywords: ['technisch', 'technical', 'basis', 'architektur'], icon: Settings, tone: 'brand' },
  { keywords: ['demo', 'preview', 'ausprobieren'], icon: CirclePlay, tone: 'brand' },
  { keywords: ['was ist', 'about', 'über'], icon: Lightbulb, tone: 'brand' },
  { keywords: ['kern', 'core', 'haupt'], icon: Target, tone: 'brand' },
]

const FALLBACK: SectionRule = { keywords: [], icon: ListChecks, tone: 'brand' }

export function getSectionRule(heading: string): { icon: LucideIcon; tone: SectionTone } {
  const normalized = heading.toLowerCase()
  const match = SECTION_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  )

  return match ?? FALLBACK
}

const UMLAUTS: Record<string, string> = {
  ä: 'ae',
  ö: 'oe',
  ü: 'ue',
  ß: 'ss',
}

export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => UMLAUTS[char])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export interface TocEntry {
  id: string
  label: string
  /** 1-based line in the markdown source; the renderer matches headings on it. */
  line: number
}

export function extractSections(markdown: string): TocEntry[] {
  const entries: TocEntry[] = []
  const seen = new Map<string, number>()

  markdown.split('\n').forEach((text, index) => {
    const match = /^##\s+(.+?)\s*$/.exec(text)
    if (!match) return

    const label = match[1]
    const base = slugifyHeading(label)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)

    entries.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      label,
      line: index + 1,
    })
  })

  return entries
}
