// Injected by the analytics.progeek.de client script (a.js), see BaseLayout.astro.
interface Analytics {
  pageView(): void
  trackEvent(eventName: string, data?: Record<string, unknown>): void
}

interface Window {
  a?: Analytics
  // Written by nginx at serve time, see the Dockerfile.
  _env_?: { VITE_VIDEO_BASE_URL?: string }
}
