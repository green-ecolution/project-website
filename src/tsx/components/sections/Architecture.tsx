import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { architectureSteps } from '../../../data/architectureSteps'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const cardConfigs = [
  {
    gradient: 'from-green-dark-900 to-green-dark-900/95',
    glow: 'shadow-green-dark-900/30',
    number: '01',
  },
  {
    gradient: 'from-green-middle-900 to-green-middle-900/95',
    glow: 'shadow-green-middle-900/30',
    number: '02',
  },
  {
    gradient: 'from-green-dark-900 to-green-dark-900/95',
    glow: 'shadow-green-dark-900/30',
    number: '03',
  },
  {
    gradient: 'from-green-middle-900 to-green-middle-900/95',
    glow: 'shadow-green-middle-900/30',
    number: '04',
  },
]

function DataParticle({ delay, duration }: { delay: number; duration: number }) {
  return (
    <circle r="3" fill="#ACB63B" opacity="0.9">
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite">
        <mpath href="#flowPath" />
      </animateMotion>
    </circle>
  )
}

function ConnectionLine({ reducedMotion, index }: { reducedMotion: boolean; index: number }) {
  return (
    <div className="hidden lg:flex items-center justify-center w-20 xl:w-28">
      <svg viewBox="0 0 100 40" className="w-full h-10" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`lineGrad${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4C7741" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ACB63B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4C7741" stopOpacity="0.6" />
          </linearGradient>
          <path id="flowPath" d="M 0 20 Q 25 10 50 20 Q 75 30 100 20" />
        </defs>

        {/* Background dashed path */}
        <path
          d="M 0 20 Q 25 10 50 20 Q 75 30 100 20"
          fill="none"
          stroke="rgba(76, 119, 65, 0.2)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Main path */}
        <path
          d="M 0 20 Q 25 10 50 20 Q 75 30 100 20"
          fill="none"
          stroke={`url(#lineGrad${index})`}
          strokeWidth="2"
        />

        {/* Data particles */}
        {!reducedMotion && (
          <>
            <DataParticle delay={0 + index * 0.3} duration={2} />
            <DataParticle delay={0.7 + index * 0.3} duration={2} />
            <DataParticle delay={1.4 + index * 0.3} duration={2} />
          </>
        )}

        {/* Arrow head */}
        <polygon points="92,20 100,17 100,23" fill="#ACB63B" />
      </svg>
    </div>
  )
}

function MobileConnectionLine() {
  return (
    <div className="flex lg:hidden justify-center py-3">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-dark-900/40">
        <path
          d="M6 9 L12 15 L18 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function ArchitectureCard({
  step,
  config,
}: {
  step: (typeof architectureSteps)[0]
  config: (typeof cardConfigs)[0]
}) {
  const { t } = useTranslation('project')
  const Icon = step.icon

  return (
    <div className="group relative">
      {/* Card */}
      <div
        className={`relative bg-gradient-to-br ${config.gradient} rounded-2xl p-5 lg:p-6
          shadow-lg ${config.glow} hover:shadow-xl
          transition-all duration-300 hover:-translate-y-1
          ring-1 ring-white/10 overflow-hidden
          w-full lg:w-40 xl:w-48`}
      >
        {/* Large step number watermark - inside card */}
        <div className="absolute top-3 right-4 text-5xl lg:text-6xl font-lato font-bold text-white/15 select-none pointer-events-none leading-none">
          {config.number}
        </div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          {/* Icon container */}
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/20">
            <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
          </div>

          {/* Content */}
          <h3 className="font-lato font-bold text-lg lg:text-xl text-white mb-1">
            {t(`architecture.steps.${step.id}.label`)}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {t(`architecture.steps.${step.id}.description`)}
          </p>
        </div>
      </div>
    </div>
  )
}

function Architecture() {
  const reducedMotion = useReducedMotion()
  const { t } = useTranslation('project')

  return (
    <section
      id="architecture"
      className="max-w-208 mx-auto my-20 px-4 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl"
    >
      {/* Header */}
      <article className="mb-12 lg:mb-16 lg:text-center">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            {t('architecture.sectionLabel')}
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>
        <h2 className="font-lato font-bold text-2xl lg:text-4xl mb-4 text-grey-900">
          {t('architecture.title')}
        </h2>
        <p className="text-grey-600 max-w-2xl mx-auto text-base lg:text-lg">
          {t('architecture.description')}
        </p>
      </article>

      {/* Desktop Flowchart */}
      <div className="hidden lg:flex items-start justify-center">
        {architectureSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <ArchitectureCard step={step} config={cardConfigs[index]} />
            {index < architectureSteps.length - 1 && (
              <ConnectionLine reducedMotion={reducedMotion} index={index} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Flowchart */}
      <div className="lg:hidden flex flex-col items-center max-w-sm mx-auto">
        {architectureSteps.map((step, index) => (
          <div key={step.id} className="w-full">
            <ArchitectureCard step={step} config={cardConfigs[index]} />
            {index < architectureSteps.length - 1 && <MobileConnectionLine />}
          </div>
        ))}
      </div>

      <p className="text-sm text-grey-900/70 leading-relaxed max-w-2xl mx-auto mt-10 lg:text-center">
        Die Routenoptimierung im Backend übernimmt{' '}
        <Link
          to="/streamlet"
          className="font-semibold text-green-dark-900 underline decoration-green-dark-900 decoration-2 underline-offset-2 transition-all hover:decoration-4"
        >
          Streamlet
        </Link>
        , ein eigenständiges Open-Source-Projekt, das auch außerhalb von Green Ecolution nutzbar
        ist.
      </p>
    </section>
  )
}

export default Architecture
