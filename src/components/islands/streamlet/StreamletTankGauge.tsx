import type { RefObject } from 'react'
import { useT } from '../../../i18n/useT'

interface StreamletTankGaugeProps {
  levelRef: RefObject<HTMLDivElement | null>
  level: number
}

function StreamletTankGauge({ levelRef, level }: StreamletTankGaugeProps) {
  const t = useT()

  return (
    <div className="flex w-8 shrink-0 flex-col items-center justify-center gap-2 lg:w-10">
      <span className="text-xxs font-semibold uppercase tracking-wide text-grey-900/45">
        {t('hero.tank')}
      </span>

      <div className="relative h-1/2 max-h-64 w-3.5 overflow-hidden rounded-full bg-green-dark-900/10">
        <div
          ref={levelRef}
          className="absolute inset-x-0 bottom-0 h-full origin-bottom rounded-full bg-green-light-900"
          style={{ transform: `scaleY(${level})` }}
        />
      </div>
    </div>
  )
}

export default StreamletTankGauge
