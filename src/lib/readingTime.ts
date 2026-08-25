// 200 words per minute is the usual rough figure for prose. The result is only
// ever a hint, so the exact divisor matters less than being stable.
const WORDS_PER_MINUTE = 200

export function readingTimeInMinutes(body: string): number {
  const text = body
    // Strip mdx imports and jsx tags first: they are not read.
    .replace(/^import .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    // Link and image targets are not read either, only their labels.
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>|-]/g, ' ')

  const words = text.split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
