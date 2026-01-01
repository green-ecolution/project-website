import { useState } from 'react'

interface VideoPreviewProps {
  thumbnail: string
}

function VideoPreview({ thumbnail }: VideoPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-grey-100 via-white to-grey-100 bg-[length:200%_100%] animate-shimmer rounded-lg" />
      )}
      <img
        src={thumbnail}
        alt=""
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

export default VideoPreview
