import { useTranslation } from 'react-i18next'
import type { ChangelogEntry } from '../../types/release'

interface ReleaseChangelogProps {
  version: string
  entries: ChangelogEntry[]
  repository: string
}

const TYPE_COLORS: Record<string, string> = {
  feat: 'text-green-light-900',
  fix: 'text-green-middle-900',
  refactor: 'text-blue-400',
  docs: 'text-purple-400',
  style: 'text-pink-400',
  test: 'text-yellow-400',
  chore: 'text-grey-100/60',
  perf: 'text-orange-400',
  ci: 'text-cyan-400',
}

const ReleaseChangelog: React.FC<ReleaseChangelogProps> = ({ version, entries, repository }) => {
  const { t } = useTranslation('releases')

  return (
    <div className="bg-grey-900 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
      <div className="bg-grey-900 px-4 py-3 flex items-center gap-2 border-b border-grey-100/10">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-grey-100/60 text-sm font-mono">
          {t('changelog.fileHeader', { version })}
        </span>
      </div>

      <div className="p-3 lg:p-4 font-mono text-xs lg:text-sm">
        <div className="text-grey-100/40 mb-4 hidden lg:block">
          {t('changelog.comment', { version })}
        </div>

        {entries.map((entry) => (
          <div
            key={`${entry.type}-${entry.description.slice(0, 20)}`}
            className="mb-3 lg:mb-2 text-grey-100/90"
          >
            <div className="flex items-start gap-2">
              <span className="text-grey-100/40 select-none">$</span>
              <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-4">
                <div className="min-w-0">
                  <span className={`${TYPE_COLORS[entry.type] ?? 'text-grey-100/60'} font-bold`}>
                    {entry.type}
                    {entry.scope && <span className="text-grey-100/40">({entry.scope})</span>}
                    <span className="text-grey-100/40">:</span>
                  </span>{' '}
                  <span className="break-words">{entry.description}</span>
                </div>
                {(entry.pr ?? entry.commit) && (
                  <span className="flex items-center gap-2 text-grey-100/40 text-xs mt-1 lg:mt-0 lg:flex-shrink-0">
                    {entry.pr && (
                      <a
                        href={`${repository}/pull/${entry.pr}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-light-900 transition-colors"
                      >
                        #{entry.pr}
                      </a>
                    )}
                    {entry.commit && (
                      <a
                        href={`${repository}/commit/${entry.commit}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-light-900 transition-colors"
                      >
                        {entry.commit.slice(0, 7)}
                      </a>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReleaseChangelog
