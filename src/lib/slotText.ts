export interface SlotParts {
  before: string
  inner: string
  after: string
}

// Replaces react-i18next's <Trans>. The catalog keeps a neutral marker such as
// <issue>…</issue> instead of raw HTML, so a translator cannot break the markup
// and nothing has to be rendered with set:html.
export function splitSlot(text: string, tag: string): SlotParts {
  const pattern = new RegExp(`^([\\s\\S]*?)<${tag}>([\\s\\S]*?)</${tag}>([\\s\\S]*)$`)
  const match = pattern.exec(text)

  if (!match) {
    return { before: text, inner: '', after: '' }
  }

  return { before: match[1], inner: match[2], after: match[3] }
}

export interface SlotTag {
  open: string
  close: string
}

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
}

// The catalog holds neutral markers such as <p1>…</p1> or <hsfl>…</hsfl>, never
// raw HTML. This turns the known markers into markup and escapes everything
// else, so a typo shows up as literal text instead of breaking the page, and
// nothing from the catalog can inject markup of its own.
export function renderSlots(text: string, tags: Record<string, SlotTag>): string {
  const pattern = /<(\/?)(\w+)>/g
  let result = ''
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    const [full, slash, name] = match
    const index = match.index

    result += escapeHtml(text.slice(lastIndex, index))
    lastIndex = index + full.length

    const tag = tags[name]
    result += tag ? (slash ? tag.close : tag.open) : escapeHtml(full)
  }

  return result + escapeHtml(text.slice(lastIndex))
}
