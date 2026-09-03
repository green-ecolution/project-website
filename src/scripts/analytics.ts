const LOADER_SRC = 'https://analytics.progeek.de/a.js?id=O04QUGhRUjN3'

// Only the public site is counted. localhost and preview deployments ship the
// same build, so nothing but the runtime hostname can tell them apart.
const TRACKED_HOST = /(^|\.)green-ecolution\.[a-z]{2,}$/

export function isTrackedHost(hostname: string): boolean {
  return TRACKED_HOST.test(hostname)
}

let missedPageView = false

// Guarded: a.js is a third-party script, so an ad blocker or a slow CDN leaves
// window.a undefined and must not take the page down with it.
export function trackPageView() {
  if (!window.a) {
    missedPageView = true
    return
  }
  window.a.pageView()
}

function loadTracker() {
  const script = document.createElement('script')
  script.src = LOADER_SRC
  // a.js only defines window.a, it counts nothing by itself. Injected scripts
  // load async, so the first astro:page-load usually beats it and its page view
  // has to be replayed here.
  script.addEventListener('load', () => {
    if (!missedPageView) return
    missedPageView = false
    trackPageView()
  })
  document.head.append(script)
}

if (isTrackedHost(window.location.hostname)) {
  loadTracker()
}

// astro:page-load, not DOMContentLoaded: the ClientRouter swaps the document
// without a full navigation, so DOMContentLoaded would only ever count the
// first page of a visit.
document.addEventListener('astro:page-load', trackPageView)
