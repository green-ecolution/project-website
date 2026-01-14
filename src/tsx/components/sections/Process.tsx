import React, { useEffect, useRef, useState, useCallback } from 'react'
import { steps } from '../../../data/processSteps'
import Lottie from 'lottie-react'
import dashboardAnimation from '../../../json/dashboardAnimation.json'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface IllustrationProps {
  reducedMotion: boolean
  isVisible: boolean
}

function useIntersectionObserver(threshold = 0.2) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const observe = useCallback(
    (element: HTMLElement | null, index: number) => {
      if (!element) return

      observerRef.current ??= new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = Number(entry.target.getAttribute('data-index'))
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, idx]))
            }
          })
        },
        { threshold, rootMargin: '0px 0px -50px 0px' },
      )

      element.setAttribute('data-index', String(index))
      observerRef.current.observe(element)
    },
    [threshold],
  )

  useEffect(() => {
    return () => observerRef.current?.disconnect()
  }, [])

  return { visibleItems, observe }
}

function SensorIllustration({ reducedMotion, isVisible }: IllustrationProps) {
  return (
    <div className="relative w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center">
      <svg
        className={`w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B7653" />
            <stop offset="100%" stopColor="#6B4423" />
          </linearGradient>
          <linearGradient id="crownGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5A8A4E" />
            <stop offset="100%" stopColor="#3D5F35" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="100" cy="178" rx="65" ry="10" fill="rgba(255,255,255,0.08)" />
        <rect x="92" y="108" width="16" height="70" rx="4" fill="url(#trunkGradient)" />
        <ellipse cx="100" cy="72" rx="52" ry="58" fill="#4C7741" />
        <ellipse cx="82" cy="60" rx="38" ry="42" fill="#3D5F35" />
        <ellipse cx="118" cy="68" rx="32" ry="38" fill="#5A8A4E" />
        <ellipse cx="100" cy="50" rx="28" ry="32" fill="url(#crownGradient1)" />
        <path d="M82 108 Q65 95 60 78" stroke="#6B4423" strokeWidth="2.5" fill="none" />
        <path d="M118 108 Q135 95 140 78" stroke="#6B4423" strokeWidth="2.5" fill="none" />

        <g filter="url(#softGlow)">
          <rect x="106" y="122" width="20" height="28" rx="4" fill="#3a3a3a" />
          <rect x="108" y="124" width="16" height="10" rx="2" fill="#252525" />
          <circle cx="116" cy="140" r="4" fill="#ACB63B">
            {!reducedMotion && (
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            )}
          </circle>
        </g>

        <path d="M116 150 L116 168 Q116 178 106 178" stroke="#4a4a4a" strokeWidth="2" fill="none" />
        <circle cx="106" cy="178" r="3" fill="#5a5a5a" />
      </svg>

      <div
        className={`absolute transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ top: '18%', right: '20%' }}
      >
        <div className="relative">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-green-light-900 to-green-middle-900 flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 20v-6M6 20V10M18 20V4" />
            </svg>
          </div>
          {!reducedMotion && (
            <>
              <div className="absolute inset-0 rounded-full bg-green-light-900 animate-ping opacity-25" />
              <div
                className="absolute inset-0 rounded-full bg-green-light-900 animate-ping opacity-15"
                style={{ animationDelay: '0.7s' }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function DataFlowIllustration({ reducedMotion, isVisible }: IllustrationProps) {
  return (
    <div
      className={`relative w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <svg className="w-full h-full max-w-xs" viewBox="0 0 300 200">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M-20 100 Q60 40 150 100 T320 100"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M-20 125 Q60 65 150 125 T320 125"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M-20 75 Q60 135 150 75 T320 75"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          fill="none"
        />

        {reducedMotion ? (
          <>
            <circle cx="150" cy="100" r="7" fill="white" />
            <circle cx="210" cy="115" r="5" fill="rgba(255,255,255,0.8)" />
            <circle cx="90" cy="90" r="6" fill="rgba(255,255,255,0.9)" />
          </>
        ) : (
          <>
            <circle r="7" fill="white">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M-20 100 Q60 40 150 100 T320 100"
              />
            </circle>
            <circle r="5" fill="rgba(255,255,255,0.8)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M-20 125 Q60 65 150 125 T320 125"
                begin="0.8s"
              />
            </circle>
            <circle r="6" fill="rgba(255,255,255,0.9)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M-20 75 Q60 135 150 75 T320 75"
                begin="1.6s"
              />
            </circle>
          </>
        )}
      </svg>

      <div
        className={`absolute transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 lg:w-10 lg:h-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function DashboardIllustration({ reducedMotion, isVisible }: IllustrationProps) {
  return (
    <div
      className={`relative w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="w-full max-w-[200px] lg:max-w-[240px] rounded-2xl overflow-hidden">
        <Lottie
          animationData={dashboardAnimation}
          loop={!reducedMotion}
          autoplay={!reducedMotion}
          className="w-full"
        />
      </div>
    </div>
  )
}

function RouteIllustration({ reducedMotion, isVisible }: IllustrationProps) {
  return (
    <div
      className={`relative w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <svg className="w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ACB63B" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="170" height="170" rx="16" fill="url(#mapGradient)" />
        <path
          d="M15 75 H185 M15 125 H185 M75 15 V185 M125 15 V185"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        <path
          d="M35 165 Q50 130 65 120 T105 140 T145 75 L165 35"
          stroke="url(#routeGradient)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={reducedMotion ? 'none' : '220'}
          strokeDashoffset={reducedMotion ? '0' : '220'}
        >
          {!reducedMotion && (
            <animate
              attributeName="stroke-dashoffset"
              from="220"
              to="0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          )}
        </path>

        <circle cx="35" cy="165" r="10" fill="#ACB63B" />
        <circle cx="35" cy="165" r="5" fill="white" />
        <circle cx="65" cy="120" r="6" fill="white" opacity="0.7" />
        <circle cx="105" cy="140" r="6" fill="white" opacity="0.7" />
        <circle cx="145" cy="75" r="6" fill="white" opacity="0.7" />
        <circle cx="165" cy="35" r="10" fill="#4C7741" />
        <circle cx="165" cy="35" r="5" fill="white" />

        {reducedMotion ? (
          <g transform="translate(105, 140)">
            <rect x="-10" y="-6" width="20" height="12" rx="3" fill="white" />
            <circle cx="-5" cy="6" r="2" fill="#333" />
            <circle cx="5" cy="6" r="2" fill="#333" />
          </g>
        ) : (
          <g>
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M35 165 Q50 130 65 120 T105 140 T145 75 L165 35"
            />
            <rect x="-10" y="-6" width="20" height="12" rx="3" fill="white" />
            <circle cx="-5" cy="6" r="2" fill="#333" />
            <circle cx="5" cy="6" r="2" fill="#333" />
          </g>
        )}
      </svg>
    </div>
  )
}

function WateringIllustration({ reducedMotion, isVisible }: IllustrationProps) {
  return (
    <div
      className={`relative w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
    >
      <div className="relative">
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-green-light-900/20 to-green-middle-900/10 flex items-center justify-center">
          <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-green-light-900 to-green-middle-900 flex items-center justify-center shadow-xl">
            <svg
              className={`w-8 h-8 lg:w-12 lg:h-12 text-white transition-transform duration-500 ${!reducedMotion && isVisible ? 'scale-100' : 'scale-90'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {[
          { top: '-8px', left: '-16px', size: 'w-7 h-7', delay: '0s' },
          { top: '-14px', right: '4px', size: 'w-5 h-5', delay: '0.4s' },
          { bottom: '4px', right: '-20px', size: 'w-6 h-6', delay: '0.8s' },
        ].map((drop, i) => (
          <svg
            key={i}
            className={`absolute ${drop.size} text-cyan-400/80 ${!reducedMotion ? 'animate-bounce' : ''}`}
            style={{
              top: drop.top,
              left: drop.left,
              right: drop.right,
              bottom: drop.bottom,
              animationDelay: drop.delay,
              animationDuration: '2s',
            }}
            viewBox="0 0 24 32"
            fill="currentColor"
          >
            <path d="M12 0C12 0 4 10 4 18C4 24 8 28 12 28C16 28 20 24 20 18C20 10 12 0 12 0Z" />
          </svg>
        ))}
      </div>
    </div>
  )
}

const illustrations: React.FC<IllustrationProps>[] = [
  SensorIllustration,
  DataFlowIllustration,
  DashboardIllustration,
  RouteIllustration,
  WateringIllustration,
]

const cardConfigs = [
  {
    bg: 'from-green-dark-900 via-green-dark-900 to-green-middle-900',
    numberBg: 'bg-white',
    numberText: 'text-green-dark-900',
    mutedText: 'text-white/60',
  },
  {
    bg: 'from-green-light-900 via-green-middle-900 to-green-dark-900',
    numberBg: 'bg-white',
    numberText: 'text-green-dark-900',
    mutedText: 'text-white/70',
  },
  {
    bg: 'from-green-middle-900 via-green-dark-900 to-green-dark-900',
    numberBg: 'bg-white',
    numberText: 'text-green-dark-900',
    mutedText: 'text-white/60',
  },
  {
    bg: 'from-green-dark-900 via-green-middle-900 to-green-light-900/80',
    numberBg: 'bg-white',
    numberText: 'text-green-dark-900',
    mutedText: 'text-white/70',
  },
  {
    bg: 'from-green-middle-900 via-green-dark-900 to-green-dark-900',
    numberBg: 'bg-white',
    numberText: 'text-green-dark-900',
    mutedText: 'text-white/60',
  },
]

function Process() {
  const reducedMotion = useReducedMotion()
  const { visibleItems, observe } = useIntersectionObserver(0.15)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    cardRefs.current.forEach((ref, index) => {
      if (ref) observe(ref, index)
    })
  }, [observe])

  return (
    <section id="process" className="relative overflow-hidden py-16 lg:py-20 xl:py-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-light-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-green-middle-900/5 rounded-full blur-3xl" />
      </div>

      <article className="relative px-4 mb-12 max-w-208 mx-auto md:px-6 lg:mb-16 lg:text-center xl:max-w-screen-lg">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-light-100 text-green-dark-900 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-green-light-900 animate-pulse" />
          In 5 Schritten zum Ziel
        </div>
        <h2 className="font-lato font-bold text-3xl mb-5 lg:text-4xl xl:text-5xl text-grey-900">
          So funktioniert Green Ecolution
        </h2>
        <p className="text-grey-900/70 max-w-2xl mx-auto text-lg lg:text-xl leading-relaxed">
          Bewässerung wird zur Teamarbeit zwischen Mensch und Technik. Datenbasiert entscheiden,
          Zeit sparen, Bäume optimal versorgen.
        </p>
      </article>

      <div className="relative max-w-screen-lg mx-auto px-4 md:px-6 xl:max-w-screen-xl">
        <div className="space-y-6 lg:space-y-8">
          {steps.map((step, index) => {
            const Illustration = illustrations[index]
            const config = cardConfigs[index]
            const isEven = index % 2 === 0
            const number = String(index + 1).padStart(2, '0')
            const isVisible = visibleItems.has(index)

            return (
              <div
                key={step.label}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`relative transition-all duration-700 ${
                  reducedMotion
                    ? 'opacity-100 translate-y-0'
                    : isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: reducedMotion ? '0ms' : `${index * 80}ms` }}
              >
                <div
                  className={`group relative rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br ${config.bg} text-white transition-all duration-500 hover:shadow-xl ring-1 ring-white/10`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent pointer-events-none" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/[0.03] rounded-full blur-2xl pointer-events-none" />

                  <div className="relative grid grid-cols-1 lg:grid-cols-2">
                    <div
                      className={`p-5 sm:p-6 lg:p-8 flex items-center justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                    >
                      <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                        <Illustration reducedMotion={reducedMotion} isVisible={isVisible} />
                      </div>
                    </div>

                    <div
                      className={`p-5 sm:p-6 lg:p-10 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-11 h-11 lg:w-12 lg:h-12 rounded-full ${config.numberBg} flex items-center justify-center shadow-md transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}
                        >
                          <span
                            className={`font-lato font-bold text-base lg:text-lg ${config.numberText}`}
                          >
                            {number}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-medium uppercase tracking-widest ${config.mutedText}`}
                        >
                          Schritt {index + 1} von 5
                        </span>
                      </div>

                      <h3 className="font-lato font-bold text-xl sm:text-2xl lg:text-[1.7rem] mb-3 leading-tight">
                        {step.label}
                      </h3>

                      <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                        {step.description}
                      </p>

                      <div className={`mt-5 flex items-center gap-2 ${config.mutedText}`}>
                        <step.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{step.shortName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`hidden lg:flex flex-col items-center py-3 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="w-px h-6 bg-gradient-to-b from-green-middle-900/50 to-green-middle-900/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-light-900 my-1 shadow-sm" />
                    <div className="w-px h-6 bg-gradient-to-b from-green-middle-900/20 to-green-middle-900/50" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Process
