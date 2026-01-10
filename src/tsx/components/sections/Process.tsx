import React from 'react'
import { steps } from '../../../data/processSteps'
import Lottie from 'lottie-react'
import dashboardAnimation from '../../../json/dashboardAnimation.json'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface IllustrationProps {
  reducedMotion: boolean
}

// Step illustrations as components
function SensorIllustration({ reducedMotion }: IllustrationProps) {
  return (
    <div className="relative w-full h-48 lg:h-64 flex items-center justify-center">
      <svg className="w-48 h-48 lg:w-64 lg:h-64" viewBox="0 0 200 200">
        {/* Ground */}
        <ellipse cx="100" cy="175" rx="70" ry="12" fill="rgba(255,255,255,0.15)" />

        {/* Tree trunk */}
        <rect x="92" y="110" width="16" height="65" rx="3" fill="#8B5A2B" />
        <rect x="95" y="115" width="4" height="55" rx="2" fill="#6B4423" opacity="0.5" />

        {/* Tree crown layers */}
        <ellipse cx="100" cy="75" rx="50" ry="55" fill="#4C7741" />
        <ellipse cx="85" cy="65" rx="35" ry="40" fill="#3D5F35" />
        <ellipse cx="115" cy="70" rx="30" ry="35" fill="#5A8A4E" />
        <ellipse cx="100" cy="55" rx="25" ry="30" fill="#4C7741" />

        {/* Small branches visible */}
        <path d="M85 110 Q70 100 65 85" stroke="#6B4423" strokeWidth="3" fill="none" />
        <path d="M115 110 Q130 100 135 85" stroke="#6B4423" strokeWidth="3" fill="none" />

        {/* Sensor device on trunk */}
        <rect x="105" y="125" width="18" height="24" rx="3" fill="#555" />
        <rect x="107" y="127" width="14" height="8" rx="1" fill="#333" />
        <circle cx="114" cy="140" r="3" fill="#ACB63B" />

        {/* Sensor cable going into ground */}
        <path d="M114 149 L114 165 Q114 175 105 175" stroke="#555" strokeWidth="2" fill="none" />
        <circle cx="105" cy="175" r="3" fill="#666" />
      </svg>

      {/* Sensor pulse overlay */}
      <div className="absolute" style={{ top: '28%', right: '28%' }}>
        <div className="relative">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-green-light-900 flex items-center justify-center">
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
              <div className="absolute inset-0 rounded-full bg-green-light-900 animate-ping opacity-30" />
              <div
                className="absolute inset-0 rounded-full bg-green-light-900 animate-ping opacity-20"
                style={{ animationDelay: '0.5s' }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function DataFlowIllustration({ reducedMotion }: IllustrationProps) {
  return (
    <div className="relative w-full h-48 lg:h-64 flex items-center justify-center overflow-hidden">
      {/* Animated data lines */}
      <svg className="w-full h-full" viewBox="0 0 300 200">
        {/* Flowing lines */}
        <path
          d="M0 100 Q75 50 150 100 T300 100"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 120 Q75 70 150 120 T300 120"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 80 Q75 130 150 80 T300 80"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          fill="none"
        />

        {/* Animated dots - static positions when reduced motion */}
        {reducedMotion ? (
          <>
            <circle cx="150" cy="100" r="6" fill="white" />
            <circle cx="200" cy="110" r="4" fill="rgba(255,255,255,0.7)" />
            <circle cx="100" cy="95" r="5" fill="rgba(255,255,255,0.8)" />
          </>
        ) : (
          <>
            <circle r="6" fill="white">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M0 100 Q75 50 150 100 T300 100"
              />
            </circle>
            <circle r="4" fill="rgba(255,255,255,0.7)">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M0 120 Q75 70 150 120 T300 120"
                begin="0.5s"
              />
            </circle>
            <circle r="5" fill="rgba(255,255,255,0.8)">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M0 80 Q75 130 150 80 T300 80"
                begin="1s"
              />
            </circle>
          </>
        )}
      </svg>

      {/* Data icon */}
      <div className="absolute">
        <svg
          className="w-16 h-16 lg:w-20 lg:h-20 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </div>
    </div>
  )
}

function DashboardIllustration({ reducedMotion }: IllustrationProps) {
  return (
    <div className="relative w-full h-48 lg:h-64 flex items-center justify-center">
      <div className="w-full max-w-xs lg:max-w-sm rounded-xl p-3 lg:p-4">
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

function RouteIllustration({ reducedMotion }: IllustrationProps) {
  return (
    <div className="relative w-full h-48 lg:h-64 flex items-center justify-center">
      <svg className="w-48 h-48 lg:w-56 lg:h-56" viewBox="0 0 200 200">
        {/* Map background */}
        <rect x="20" y="20" width="160" height="160" rx="12" fill="rgba(255,255,255,0.1)" />

        {/* Grid lines */}
        <path
          d="M20 80 H180 M20 120 H180 M80 20 V180 M120 20 V180"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* Route path */}
        <path
          d="M40 160 L60 120 L100 140 L140 80 L160 40"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={reducedMotion ? 'none' : '200'}
          strokeDashoffset={reducedMotion ? '0' : '200'}
        >
          {!reducedMotion && (
            <animate
              attributeName="stroke-dashoffset"
              from="200"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Location points */}
        <circle cx="40" cy="160" r="8" fill="#ACB63B" />
        <circle cx="60" cy="120" r="6" fill="white" opacity="0.8" />
        <circle cx="100" cy="140" r="6" fill="white" opacity="0.8" />
        <circle cx="140" cy="80" r="6" fill="white" opacity="0.8" />
        <circle cx="160" cy="40" r="8" fill="#4C7741" />

        {/* Moving truck - static position when reduced motion */}
        {reducedMotion ? (
          <g transform="translate(100, 140)">
            <rect x="-8" y="-5" width="16" height="10" rx="2" fill="white" />
          </g>
        ) : (
          <g>
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M40 160 L60 120 L100 140 L140 80 L160 40"
            />
            <rect x="-8" y="-5" width="16" height="10" rx="2" fill="white" />
          </g>
        )}
      </svg>
    </div>
  )
}

function WateringIllustration({ reducedMotion }: IllustrationProps) {
  return (
    <div className="relative w-full h-48 lg:h-64 flex items-center justify-center">
      {/* Checkmark circle */}
      <div className="relative">
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-green-light-900/30 flex items-center justify-center">
          <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-green-light-900 flex items-center justify-center">
            <svg
              className="w-8 h-8 lg:w-12 lg:h-12 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Water drops around */}
        <svg
          className={`absolute -top-2 -left-4 w-8 h-8 text-blue-300 ${reducedMotion ? '' : 'animate-bounce'}`}
          style={{ animationDelay: '0s' }}
          viewBox="0 0 24 32"
          fill="currentColor"
        >
          <path d="M12 0C12 0 4 10 4 18C4 24 8 28 12 28C16 28 20 24 20 18C20 10 12 0 12 0Z" />
        </svg>
        <svg
          className={`absolute -top-4 right-0 w-6 h-6 text-blue-400 ${reducedMotion ? '' : 'animate-bounce'}`}
          style={{ animationDelay: '0.3s' }}
          viewBox="0 0 24 32"
          fill="currentColor"
        >
          <path d="M12 0C12 0 4 10 4 18C4 24 8 28 12 28C16 28 20 24 20 18C20 10 12 0 12 0Z" />
        </svg>
        <svg
          className={`absolute bottom-0 -right-6 w-7 h-7 text-blue-300 ${reducedMotion ? '' : 'animate-bounce'}`}
          style={{ animationDelay: '0.6s' }}
          viewBox="0 0 24 32"
          fill="currentColor"
        >
          <path d="M12 0C12 0 4 10 4 18C4 24 8 28 12 28C16 28 20 24 20 18C20 10 12 0 12 0Z" />
        </svg>
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

const cardStyles = [
  'bg-gradient-to-br from-green-dark-900 to-green-dark-900/80 text-white',
  'bg-gradient-to-br from-green-light-900 to-green-light-900/80 text-white',
  'bg-gradient-to-br from-green-middle-900 to-green-middle-900/80 text-white',
  'bg-gradient-to-br from-green-light-900 to-green-light-900/80 text-white',
  'bg-gradient-to-br from-green-dark-900 to-green-dark-900/80 text-white',
]

function Process() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="process" className="relative overflow-hidden py-28 lg:py-36 xl:py-52">
      {/* Header */}
      <article className="px-4 mb-12 max-w-208 mx-auto md:px-6 lg:mb-20 lg:text-center xl:max-w-screen-lg">
        <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl">
          So funktioniert Green Ecolution
        </h2>
        <p className="text-grey-600 max-w-2xl mx-auto">
          Mit Green Ecolution wird Bewässerung zur Teamarbeit zwischen Mensch und Technik. In fünf
          Schritten zeigen wir dir, wie du datenbasiert entscheidest, Zeit sparst und deine Bäume
          optimal versorgst.
        </p>
      </article>

      {/* Steps */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 xl:max-w-screen-xl space-y-6 lg:space-y-8">
        {steps.map((step, index) => {
          const Illustration = illustrations[index]
          const isEven = index % 2 === 0
          const number = String(index + 1).padStart(2, '0')

          return (
            <div
              key={step.label}
              className={`group rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${cardStyles[index]}`}
            >
              <div className={`grid lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                {/* Illustration */}
                <div className={`p-6 lg:p-8 ${isEven ? '' : 'lg:col-start-2'}`}>
                  <div className="transition-transform duration-500 group-hover:scale-105">
                    <Illustration reducedMotion={reducedMotion} />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-6 lg:p-10 xl:p-12 flex flex-col justify-center ${isEven ? '' : 'lg:col-start-1'}`}
                >
                  <span className="text-5xl lg:text-7xl font-bold font-lato opacity-20 mb-4">
                    {number}
                  </span>
                  <h3 className="font-lato font-bold text-xl lg:text-2xl mb-3">{step.label}</h3>
                  <p className="text-white/80 lg:text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Process
