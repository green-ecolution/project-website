import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { roadmapItems } from '../../../data/roadmapItems'

const statusStyles = {
  completed: {
    dot: 'bg-green-dark-900',
    labelColor: 'text-green-dark-900',
  },
  'in-progress': {
    dot: 'bg-green-light-900 animate-pulse',
    labelColor: 'text-green-light-900',
  },
  planned: {
    dot: 'bg-grey-900/30',
    labelColor: 'text-grey-600',
  },
}

const statusLabelKeys = {
  completed: 'completed',
  'in-progress': 'inProgress',
  planned: 'planned',
} as const

function VisionRoadmap() {
  const reducedMotion = useReducedMotion()
  const { t } = useTranslation('project')

  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="relative bg-green-light-100/50 rounded-2xl lg:rounded-3xl p-6 md:p-10 lg:p-12 xl:p-16 overflow-hidden">
        {/* Decorative organic shape */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-light-900/8 rounded-full blur-2xl" />
        <div className="lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-12 xl:gap-16">
          {/* Vision Text */}
          <div className="mb-10 lg:mb-0">
            {/* Section Label */}
            <div className="inline-block mb-6">
              <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
                {t('vision.sectionLabel')}
              </span>
              <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
            </div>

            <h2 className="font-lato font-bold text-2xl mb-6 text-grey-900 lg:text-3xl xl:text-4xl">
              {t('vision.title')}
            </h2>

            <div className="space-y-4">
              <p className="text-grey-900/70 leading-relaxed">{t('vision.descriptionPart1')}</p>
              <p className="text-grey-900/70 leading-relaxed">{t('vision.descriptionPart2')}</p>
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div>
            <h3 className="font-lato font-semibold text-sm tracking-wider uppercase text-grey-600 mb-6">
              {t('roadmap.title')}
            </h3>

            <div className="space-y-0">
              {roadmapItems.map((item) => {
                const style = statusStyles[item.status]

                return (
                  <div key={item.id} className="group relative flex gap-4">
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex-shrink-0 mt-1.5 ring-4 ring-white/60 transition-transform duration-300 group-hover:scale-125 ${style.dot} ${
                          reducedMotion && item.status === 'in-progress' ? '!animate-none' : ''
                        }`}
                      />
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-green-light-900/30 to-grey-900/10 my-1" />
                    </div>

                    {/* Content */}
                    <div className="pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-lato font-semibold text-grey-900 group-hover:text-green-dark-900 transition-colors">
                          {t(`roadmap.items.${item.id}.title`)}
                        </h4>
                        <span
                          className={`text-[10px] font-semibold tracking-wider uppercase ${style.labelColor}`}
                        >
                          {t(`roadmap.status.${statusLabelKeys[item.status]}`)}
                        </span>
                      </div>
                      <p className="text-sm text-grey-600 leading-relaxed">
                        {t(`roadmap.items.${item.id}.description`)}
                      </p>
                    </div>
                  </div>
                )
              })}

              {/* Timeline dissolving into the future */}
              <div className="relative flex gap-4" aria-label={t('roadmap.moreIdeasAriaLabel')}>
                {/* Diminishing dots along a fading timeline — continuation metaphor */}
                <div
                  className="flex flex-col items-center"
                  style={{ width: '0.875rem' }}
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 rounded-full bg-green-light-900/35 mt-1" />
                  <div className="w-px h-2.5 bg-gradient-to-b from-green-light-900/25 to-green-light-900/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-light-900/20" />
                  <div className="w-px h-2 bg-gradient-to-b from-green-light-900/15 to-transparent" />
                  <div
                    className={`w-1 h-1 rounded-full bg-green-light-900/15 ${
                      reducedMotion ? '' : 'animate-pulse'
                    }`}
                  />
                </div>

                {/* Whisper-soft label with refined spacing */}
                <p className="font-lato italic text-[13px] text-grey-600/60 leading-relaxed tracking-wide pt-0.5 self-center">
                  <span className="mr-1 text-green-light-900/50 not-italic tracking-widest">
                    ···
                  </span>
                  {t('roadmap.moreInPlanningLabel')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionRoadmap
