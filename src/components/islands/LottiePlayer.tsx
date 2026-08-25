import {
  useEffect,
  useState,
  type ReactNode,
  type AriaAttributes,
  type ComponentType,
  type CSSProperties,
} from 'react'

interface Props {
  animationData: unknown
  autoplay?: boolean
  loop?: boolean
  className?: string
  style?: CSSProperties
  'aria-hidden'?: AriaAttributes['aria-hidden']
  /** Shown until the animation is loaded, and to visitors without javascript. */
  fallback?: ReactNode
}

// lottie-web touches document while its module body runs, which crashes the
// server render of any island that imports it at module scope. Loading it inside
// an effect keeps the island renderable on the server. Until it arrives this
// renders nothing.
export default function LottiePlayer({ fallback = null, ...props }: Props) {
  const [Lottie, setLottie] = useState<ComponentType<Props> | null>(null)

  useEffect(() => {
    let cancelled = false

    void import('lottie-react').then((module) => {
      if (!cancelled) {
        setLottie(() => module.default as ComponentType<Props>)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (!Lottie) {
    return <>{fallback}</>
  }

  return <Lottie {...props} />
}
