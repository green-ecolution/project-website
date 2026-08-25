import { VIDEO_BASE_URL } from 'astro:env/client'

// nginx injects window._env_ at serve time so one image can point at different
// buckets. The astro:env value is only the build-time fallback.

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
  // Same-origin in dev: the vite proxy forwards /project-video to the bucket,
  // which answers CORS only for the production origin.
  if (import.meta.env.DEV) {
    return ''
  }
  return runtimeEnv().VITE_VIDEO_BASE_URL ?? VIDEO_BASE_URL ?? DEFAULT_VIDEO_BASE_URL
}
