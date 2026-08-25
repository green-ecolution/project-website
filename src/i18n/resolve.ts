import { DEFAULT_LANGUAGE, type Language } from './languages'

export const MISSING_PREFIX = '??'

export type Vars = Record<string, string | number>
export type Catalog = Record<string, unknown>

function lookup(catalog: Catalog, path: string): unknown {
  return path.split('.').reduce<unknown>((node, segment) => {
    if (node !== null && typeof node === 'object' && !Array.isArray(node) && segment in node) {
      return (node as Catalog)[segment]
    }
    return undefined
  }, catalog)
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) {
    return template
  }

  return template.replace(/\{\{(\w+)\}\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  )
}

function candidatesFor(key: string, language: Language, vars?: Vars): string[] {
  const count = vars?.count
  if (typeof count !== 'number') {
    return [key]
  }

  const category = new Intl.PluralRules(language).select(count)
  // 'other' is the last resort: a catalog may omit a category the locale allows.
  return [`${key}_${category}`, `${key}_other`, key]
}

export function resolve(
  catalogs: Record<Language, Catalog>,
  language: Language,
  key: string,
  vars?: Vars,
): string {
  const languages: Language[] =
    language === DEFAULT_LANGUAGE ? [language] : [language, DEFAULT_LANGUAGE]

  for (const candidateLanguage of languages) {
    for (const candidate of candidatesFor(key, candidateLanguage, vars)) {
      const value = lookup(catalogs[candidateLanguage], candidate)
      if (typeof value === 'string') {
        return interpolate(value, vars)
      }
    }
  }

  return `${MISSING_PREFIX}${key}`
}
