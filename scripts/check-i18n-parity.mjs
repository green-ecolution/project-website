import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const NAMESPACES = ['common', 'home', 'project', 'streamlet', 'contact', 'releases', 'legal']
const LANGUAGES = ['de', 'en']
const REFERENCE = 'de'

const localesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n', 'locales')

function flatten(value, prefix = '') {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return [prefix]
  }

  return Object.entries(value).flatMap(([key, nested]) =>
    flatten(nested, prefix ? `${prefix}.${key}` : key),
  )
}

function keysOf(language, namespace) {
  const path = join(localesDir, language, `${namespace}.json`)
  return new Set(flatten(JSON.parse(readFileSync(path, 'utf8'))).filter(Boolean))
}

const problems = []

for (const namespace of NAMESPACES) {
  const reference = keysOf(REFERENCE, namespace)

  for (const language of LANGUAGES.filter((entry) => entry !== REFERENCE)) {
    const target = keysOf(language, namespace)

    for (const key of reference) {
      if (!target.has(key)) {
        problems.push(`${language}/${namespace}.json: fehlender Key "${key}"`)
      }
    }

    for (const key of target) {
      if (!reference.has(key)) {
        problems.push(`${language}/${namespace}.json: Key "${key}" existiert nicht in ${REFERENCE}`)
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`i18n-Parity fehlgeschlagen, ${problems.length} Abweichung(en):`)
  for (const problem of problems) {
    console.error(`  ${problem}`)
  }
  process.exit(1)
}

console.log('i18n-Parity in Ordnung.')
