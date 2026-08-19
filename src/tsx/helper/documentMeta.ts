interface DocumentMeta {
  title: string
  description?: string
  url?: string
}

function setMetaTag(selector: string, attribute: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', value)
}

export function applyDocumentMeta({ title, description, url }: DocumentMeta) {
  document.title = title
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)

  if (description) {
    setMetaTag('meta[name="description"]', 'name', 'description', description)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  }

  if (url) {
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', url)
  }
}
