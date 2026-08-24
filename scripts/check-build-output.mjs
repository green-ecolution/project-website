import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'

// Grows in plan 2 and 3 as pages are ported. A file listed here that is absent
// from dist is a routing regression, not a missing feature.
const REQUIRED = ['index.html', '404.html', 'robots.txt', 'sitemap-index.xml']

// Mirrors MISSING_PREFIX in src/i18n/resolve.ts.
const MISSING_KEY = /\?\?([\w]+(?:\.[\w]+)*)/g

// Script bodies are stripped before scanning: the JS nullish operator ('a ?? b')
// is spelled the same as the marker, and legal:translationNotice proves keys are
// not always dotted, so the pattern alone cannot tell them apart.
const SCRIPT_BLOCK = /<script\b[^>]*>[\s\S]*?<\/script>/gi

const problems = []

for (const file of REQUIRED) {
  try {
    statSync(join(DIST, file))
  } catch {
    problems.push(`fehlende Datei: ${file}`)
  }
}

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return htmlFiles(path)
    return entry.name.endsWith('.html') ? [path] : []
  })
}

const pages = htmlFiles(DIST)

for (const path of pages) {
  const html = readFileSync(path, 'utf8').replace(SCRIPT_BLOCK, '')
  // The resolver emits this marker instead of throwing, so an unresolved key
  // would reach the page silently. This is where it gets caught.
  for (const match of new Set([...html.matchAll(MISSING_KEY)].map((hit) => hit[1]))) {
    problems.push(`${path}: unaufgelöster Schlüssel ??${match}`)
  }
}

if (problems.length > 0) {
  console.error(`Build-Prüfung fehlgeschlagen, ${problems.length} Problem(e):`)
  for (const problem of problems) {
    console.error(`  ${problem}`)
  }
  process.exit(1)
}

console.log(`Build-Prüfung in Ordnung, ${pages.length} HTML-Datei(en) geprüft.`)
