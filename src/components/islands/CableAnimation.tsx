import cableAnimation from '../../json/cableAnimation.json'
import LottiePlayer from './LottiePlayer'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function CableAnimation() {
  const reducedMotion = useReducedMotion()

  return (
    <LottiePlayer className="h-[50vh]" animationData={cableAnimation} autoplay={!reducedMotion} />
  )
}
