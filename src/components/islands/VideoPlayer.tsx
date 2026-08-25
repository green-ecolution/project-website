import { useState } from 'react'
import ReactPlayer from 'react-player'
import { videoBaseUrl } from '../../lib/runtimeEnv'

interface Props {
  /** Path below the video base, e.g. /project-video/short/green-ecolution-short.m3u8 */
  path: string
  thumbnailPath: string
}

function Thumbnail({ src }: { src: string }) {
  const [isLoaded, setIsLoaded] = useState(false)

  // The img is already in the ssr markup, so the browser usually finishes
  // loading it before hydration attaches onLoad; the ref catches that case.
  const markLoadedIfComplete = (img: HTMLImageElement | null) => {
    if (img?.complete) {
      setIsLoaded(true)
    }
  }

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-grey-100 via-white to-grey-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
      )}
      <img
        ref={markLoadedIfComplete}
        src={src}
        alt=""
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

// The base url is resolved here rather than in astro: nginx injects it into
// window._env_ at serve time, so resolving it at build time would freeze the
// default into every page.
export default function VideoPlayer({ path, thumbnailPath }: Props) {
  const base = videoBaseUrl()

  return (
    <ReactPlayer
      playing
      controls
      src={`${base}${path}`}
      width="100%"
      height="auto"
      style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
      light={<Thumbnail src={`${base}${thumbnailPath}`} />}
    />
  )
}
