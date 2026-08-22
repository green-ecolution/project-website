import { useTranslation } from 'react-i18next'
import { solverBenchmarks, solverMoveEvaluationIcon, solverStages } from '../../../data/streamlet'
import { useLanguage } from '../../../i18n/useLanguage'

const MoveEvaluationIcon = solverMoveEvaluationIcon

function StreamletSolver() {
  const { t } = useTranslation('streamlet')
  const language = useLanguage()

  return (
    <section className="relative overflow-hidden bg-[#1a2a16]">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="absolute top-0 right-1/4 w-[40rem] h-[20rem] bg-green-dark-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[25rem] h-[15rem] bg-green-middle-900/10 rounded-full blur-3xl translate-y-1/3" />

      <div className="relative z-10 max-w-208 mx-auto px-4 py-20 md:px-6 lg:py-28 lg:max-w-screen-lg xl:py-36 xl:max-w-screen-xl">
        <div className="mb-10 lg:mb-14">
          <div className="inline-block mb-6">
            <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
              {t('solver.sectionLabel')}
            </span>
            <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
          </div>

          <h2 className="font-lato font-bold text-2xl mb-4 text-white lg:text-3xl xl:text-4xl">
            {t('solver.title')}
          </h2>

          <p className="text-white/60 leading-relaxed max-w-2xl">{t('solver.description')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2 lg:gap-8">
          {solverStages.map((stage) => {
            const Icon = stage.icon
            return (
              <article key={stage.id}>
                <div className="mb-4 w-10 h-10 rounded-lg bg-green-dark-900/60 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-green-light-900" aria-hidden="true" />
                </div>
                <h3 className="font-lato font-semibold text-white mb-2">
                  {t(`solver.stages.${stage.id}.label`)}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {t(`solver.stages.${stage.id}.description`)}
                </p>
              </article>
            )
          })}
        </div>

        <div className="flex items-start gap-4 mb-12 border-l-2 border-green-light-900/40 pl-5">
          <MoveEvaluationIcon
            className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-light-900"
            aria-hidden="true"
          />
          <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
            <span className="font-semibold text-white">{t('solver.moveEvaluation.label')}.</span>{' '}
            {t('solver.moveEvaluation.description')}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-6 lg:p-8">
          <h3 className="font-lato font-semibold text-white mb-2">
            {t('solver.benchmarks.title')}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
            {t('solver.benchmarks.description')}
          </p>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {solverBenchmarks.map((benchmark) => (
              <div key={benchmark.instance} className="rounded-xl bg-white/[0.04] p-4">
                <dt className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">
                  {benchmark.instance}
                </dt>
                <dd className="font-lato font-bold text-2xl text-green-light-900">
                  {t('solver.benchmarks.gap', { value: benchmark.gap.toLocaleString(language) })}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-xs text-white/50 mt-3">{t('solver.benchmarks.footnote')}</p>
        </div>
      </div>
    </section>
  )
}

export default StreamletSolver
