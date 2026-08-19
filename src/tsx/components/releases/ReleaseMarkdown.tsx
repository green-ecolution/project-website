import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getSectionRule, type TocEntry } from '../../helper/releaseSections'

interface ReleaseMarkdownProps {
  content: string
  sections: TocEntry[]
}

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return getTextContent((node as { props: { children?: ReactNode } }).props.children)
  }
  return ''
}

const ReleaseMarkdown: React.FC<ReleaseMarkdownProps> = ({ content, sections }) => {
  // Headings render in document order, so consuming `sections` sequentially keeps
  // the anchor ids identical to the ones the table of contents links to.
  const cursor = { index: 0 }

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => {
          const text = getTextContent(children)
          const { icon: Icon, tone } = getSectionRule(text)
          const entry = sections[cursor.index++]

          return (
            <div
              className="flex items-center gap-3 mt-10 mb-4 scroll-mt-28 first:mt-0"
              id={entry?.id}
            >
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${
                  tone === 'brand'
                    ? 'bg-green-dark-900 text-white'
                    : 'bg-grey-900/10 text-grey-900/60'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-lato font-bold text-grey-900">{children}</h2>
            </div>
          )
        },
        h3: ({ children }) => (
          <h3 className="text-base font-lato font-semibold mt-5 mb-2 text-grey-900 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-dark-900 flex-shrink-0" />
            {children}
          </h3>
        ),
        p: ({ node, children }) => {
          const paragraphChildren = node?.children ?? []
          const imageCount = paragraphChildren.filter(
            (child) => child.type === 'element' && child.tagName === 'img',
          ).length
          const onlyImages = paragraphChildren.every(
            (child) =>
              child.type === 'text' ||
              (child.type === 'element' && (child.tagName === 'img' || child.tagName === 'br')),
          )

          // A figure must never end up inside a paragraph, so any image-only
          // paragraph becomes a container instead.
          if (imageCount > 1 && onlyImages) {
            return (
              <div className="my-6 flex flex-col gap-4 sm:flex-row sm:items-start [&>figure]:my-0 sm:[&>figure]:flex-1 sm:[&>figure]:min-w-0">
                {children}
              </div>
            )
          }
          if (imageCount === 1 && onlyImages) {
            return <div>{children}</div>
          }

          return <p className="my-2 text-grey-900/80 leading-relaxed">{children}</p>
        },
        ul: ({ children }) => <ul className="my-3 space-y-2 text-grey-900/80">{children}</ul>,
        li: ({ children }) => (
          <li className="flex items-start gap-3 text-grey-900/80 leading-relaxed">
            <span className="text-green-dark-900 flex-shrink-0 h-[1.625em] flex items-center">
              →
            </span>
            <span>{children}</span>
          </li>
        ),
        a: ({ href, children }) => {
          if (href?.startsWith('/')) {
            return (
              <Link to={href} className="text-green-dark-900 font-medium hover:underline">
                {children}
              </Link>
            )
          }

          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-medium hover:underline"
            >
              {children}
            </a>
          )
        },
        img: ({ src, alt }) => (
          <figure className="my-6">
            <img
              src={src}
              alt={alt ?? ''}
              className="mx-auto h-auto max-w-full rounded-xl shadow-lg border border-grey-100"
            />
            {alt && (
              <figcaption className="text-center text-sm text-grey-900/60 mt-2">{alt}</figcaption>
            )}
          </figure>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-grey-900">{children}</strong>
        ),
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border-b border-grey-900/15 px-3 py-2 font-lato font-bold text-grey-900">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-grey-900/10 px-3 py-2 text-grey-900/80 align-top">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </Markdown>
  )
}

export default ReleaseMarkdown
