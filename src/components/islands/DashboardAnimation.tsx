import { useEffect, useState, type ComponentType } from 'react'
import dashboardAnimation from '../../json/dashboardAnimation.json'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface LottieProps {
  animationData: unknown
  autoplay?: boolean
  loop?: boolean
}

// Only the overlay is an island; the section around it is static markup.
// lottie-web touches document while its module body runs, so the import has to
// happen inside the effect or the server render of this island crashes.
export default function DashboardAnimation() {
  const reducedMotion = useReducedMotion()
  const [Lottie, setLottie] = useState<ComponentType<LottieProps> | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    let cancelled = false

    void import('lottie-react').then((module) => {
      if (!cancelled) {
        setLottie(() => module.default as ComponentType<LottieProps>)
      }
    })

    return () => {
      cancelled = true
    }
  }, [reducedMotion])

  if (!Lottie) {
    return null
  }

  return <Lottie animationData={dashboardAnimation} autoplay loop />
}
