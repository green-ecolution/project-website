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

// Drives the `sections.<id>` catalog keys, so it must stay a literal union
// rather than widen to string.
export type SectionId =
  | 'highlights'
  | 'important'
  | 'limitations'
  | 'outlook'
  | 'fixes'
  | 'security'
  | 'improvements'
  | 'features'
  | 'refactor'
  | 'configuration'
  | 'documentation'
  | 'technical'
  | 'demo'
  | 'about'
  | 'core'
  | 'general'

interface SectionRule {
  id: SectionId
  keywords: string[]
  icon: LucideIcon
  tone: SectionTone
}

// First match wins, so put narrow keyword groups before broad ones. Keywords
// match against the release note's own markdown headings, in German or English.
const SECTION_RULES: SectionRule[] = [
  { id: 'highlights', keywords: ['highlight'], icon: Sparkles, tone: 'brand' },
  {
    id: 'important',
    keywords: ['breaking', 'wichtig', 'important'],
    icon: TriangleAlert,
    tone: 'muted',
  },
  {
    id: 'limitations',
    keywords: ['einschränkung', 'limitation', 'known issue'],
    icon: Construction,
    tone: 'muted',
  },
  { id: 'outlook', keywords: ['ausblick', 'outlook', 'zukunft'], icon: Telescope, tone: 'muted' },
  { id: 'fixes', keywords: ['fehler', 'bug', 'fix'], icon: Bug, tone: 'brand' },
  { id: 'security', keywords: ['sicher', 'security'], icon: ShieldCheck, tone: 'brand' },
  {
    id: 'improvements',
    keywords: ['verbesser', 'improv', 'optimier', 'optimiz'],
    icon: SlidersHorizontal,
    tone: 'brand',
  },
  { id: 'features', keywords: ['neu', 'new', 'feature', 'funktion'], icon: Plus, tone: 'brand' },
  { id: 'refactor', keywords: ['refactor'], icon: Wrench, tone: 'brand' },
  {
    id: 'configuration',
    keywords: ['konfiguration', 'configuration', 'config'],
    icon: Settings,
    tone: 'brand',
  },
  {
    id: 'documentation',
    keywords: ['dokumentation', 'documentation', 'docs'],
    icon: BookOpen,
    tone: 'brand',
  },
  {
    id: 'technical',
    keywords: ['technisch', 'technical', 'basis', 'architektur', 'architecture'],
    icon: Settings,
    tone: 'brand',
  },
  { id: 'demo', keywords: ['demo', 'preview', 'ausprobieren'], icon: CirclePlay, tone: 'brand' },
  {
    id: 'about',
    keywords: ['was ist', 'what is', 'about', 'über'],
    icon: Lightbulb,
    tone: 'brand',
  },
  { id: 'core', keywords: ['kern', 'core', 'haupt'], icon: Target, tone: 'brand' },
]

const FALLBACK: SectionRule = { id: 'general', keywords: [], icon: ListChecks, tone: 'brand' }

export function getSectionRule(heading: string): {
  id: SectionId
  icon: LucideIcon
  tone: SectionTone
} {
  const normalized = heading.toLowerCase()
  const match = SECTION_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  )
  const { id, icon, tone } = match ?? FALLBACK

  return { id, icon, tone }
}

// Astro derives heading ids from the text, so the keywords can be matched
// against the id. Hyphens have to become spaces first, otherwise multi-word
// keywords such as 'was ist' never match.
export function headingFromId(id: string): string {
  return id.replace(/-/g, ' ')
}
