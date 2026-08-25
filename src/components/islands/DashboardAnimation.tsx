import dashboardAnimation from '../../json/dashboardAnimation.json'
import LottiePlayer from './LottiePlayer'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Only the overlay is an island; the section around it is static markup.
export default function DashboardAnimation() {
  const reducedMotion = useReducedMotion()

  return <LottiePlayer animationData={dashboardAnimation} autoplay={!reducedMotion} loop />
}
