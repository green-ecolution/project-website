import { createContext, use } from 'react'
import { MISSING_PREFIX, type Vars } from './resolve'

export const StringsContext = createContext<Record<string, string> | null>(null)

export function useT() {
  const strings = use(StringsContext)

  if (!strings) {
    throw new Error('useT braucht einen TranslationProvider im Baum')
  }

  return (key: string, vars?: Vars): string => {
    const template = strings[key]
    if (template === undefined) {
      return `${MISSING_PREFIX}${key}`
    }
    if (!vars) {
      return template
    }
    return template.replace(/\{\{(\w+)\}\}/g, (match, name: string) =>
      name in vars ? String(vars[name]) : match,
    )
  }
}
