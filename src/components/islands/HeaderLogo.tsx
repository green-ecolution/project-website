import logoAnimation from '../../json/logoAnimation.json'
import LottiePlayer from './LottiePlayer'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// The static logo shows until the animation is loaded, which also covers
// visitors without javascript and those who asked for reduced motion.
export default function HeaderLogo() {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <img src="/assets/svg/logo/logo-large-color.svg" alt="" />
  }

  return (
    <LottiePlayer
      animationData={logoAnimation}
      autoplay
      fallback={<img src="/assets/svg/logo/logo-large-color.svg" alt="" />}
    />
  )
}
