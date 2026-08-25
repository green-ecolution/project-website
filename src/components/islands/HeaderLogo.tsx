import { useEffect, useState, type ComponentType } from 'react'
import logoAnimation from '../../json/logoAnimation.json'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface LottieProps {
  animationData: unknown
  autoplay?: boolean
}

// lottie-web touches document while its module body runs, which crashes the
// server render. Importing it inside the effect keeps the island renderable on
// the server, and the static logo covers visitors without javascript as well as
// those who asked for reduced motion.
export default function HeaderLogo() {
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
    return <img src="/assets/svg/logo/logo-large-color.svg" alt="" />
  }

  return <Lottie animationData={logoAnimation} autoplay />
}
