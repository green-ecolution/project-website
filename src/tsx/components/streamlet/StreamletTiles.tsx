import { useTranslation } from 'react-i18next'
import { tileChangesets, type TileChangeset } from '../../../data/streamlet'

const statusBadges: Record<TileChangeset['status'], string> = {
  available: 'bg-green-light-900/20 text-green-dark-900',
  inProgress: 'bg-yellow-400/20 text-grey-900/70',
}

function StreamletTiles() {
  const { t } = useTranslation('streamlet')

  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      <div className="mb-10 lg:mb-14">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            {t('tiles.sectionLabel')}
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>

        <h2 className="font-lato font-bold text-2xl mb-4 text-grey-900 lg:text-3xl xl:text-4xl">
          {t('tiles.title')}
        </h2>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl mb-4">
          {t('tiles.fleetMismatch')}
        </p>

        <p className="text-grey-900/70 leading-relaxed max-w-2xl">{t('tiles.patcher')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {tileChangesets.map((changeset) => (
          <article
            key={changeset.id}
            className="rounded-2xl border border-green-dark-900/10 p-6 lg:p-8"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="font-mono text-sm font-bold text-grey-900">{changeset.name}</h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadges[changeset.status]}`}
              >
                {t(`tiles.status.${changeset.status}`)}
              </span>
            </div>
            <p className="text-grey-900/70 leading-relaxed">
              {t(`tiles.changesets.${changeset.id}`)}
            </p>
          </article>
        ))}
      </div>

      <p className="text-sm text-grey-900/60 leading-relaxed mt-8 max-w-2xl">
        {t('tiles.disclaimer')}
      </p>
    </section>
  )
}

export default StreamletTiles
