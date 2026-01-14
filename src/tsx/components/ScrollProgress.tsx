import { useEffect, useRef } from 'react'

function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) return

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      progressRef.current.style.transform = `scaleX(${scrollPercent / 100})`
    }

    const onScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
      <div
        ref={progressRef}
        className="h-full w-full origin-left bg-gradient-to-r from-green-dark-900 via-green-middle-900 to-green-light-900"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  )
}

export default ScrollProgress
