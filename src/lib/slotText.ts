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
