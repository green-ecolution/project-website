// Guarded: a.js is a third-party script, so an ad blocker or a slow CDN leaves
// window.a undefined and must not take the page down with it.
export function trackPageView() {
  window.a?.pageView()
}

// astro:page-load, not DOMContentLoaded: the ClientRouter swaps the document
// without a full navigation, so DOMContentLoaded would only ever count the
// first page of a visit.
document.addEventListener('astro:page-load', trackPageView)
