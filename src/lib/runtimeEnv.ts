// Runtime configuration. Values can be injected at serve time via a
// `window._env_` object (nginx sub_filter does that in the image), overridden at
// build time via the vite env, or fall back to a compile-time default.

// Virtual-hosted-style: OVH's S3 endpoint rejects anonymous path-style requests.
const DEFAULT_VIDEO_BASE_URL = 'https://green-ecolution-public-videos.s3.de.io.cloud.ovh.net'

function runtimeEnv(): { VITE_VIDEO_BASE_URL?: string } {
  // Guarded because islands render on the server too, where there is no window.
  if (typeof window === 'undefined') {
    return {}
  }
  return window._env_ ?? {}
}

export function videoBaseUrl(): string {
  return (
    runtimeEnv().VITE_VIDEO_BASE_URL ??
    import.meta.env.VITE_VIDEO_BASE_URL ??
    DEFAULT_VIDEO_BASE_URL
  )
}
