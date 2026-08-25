import Lottie from 'lottie-react'
import logoAnimation from '../../json/logoAnimation.json'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// An island because lottie-react is a runtime library and the animation has to
// respect the visitor's motion preference.
export default function HeaderLogo() {
  const reducedMotion = useReducedMotion()

  return <Lottie animationData={logoAnimation} autoplay={!reducedMotion} />
}
