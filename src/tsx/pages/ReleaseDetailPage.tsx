import { useEffect, useMemo } from 'react'
import { Link, redirect } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, CodeXml } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { getReleaseBySlug, getAdjacentReleases, getAllReleases } from '../../content/releases'
import { Route } from '../../routes/$lang/releases_.$slug'
import { formatReleaseDate } from '../helper/formatDate'
import { applyDocumentMeta } from '../helper/documentMeta'
import { extractSections } from '../helper/releaseSections'
import { useLanguage } from '../../i18n/useLanguage'
import GithubIcon from '../icons/Github'
import ReleaseMarkdown from '../components/releases/ReleaseMarkdown'
import ReleaseChangelog from '../components/releases/ReleaseChangelog'
import ReleaseToc from '../components/releases/ReleaseToc'

const DEFAULT_REPOSITORY = 'https://github.com/green-ecolution/green-ecolution'

function ReleaseDetailPage() {
  const { lang, slug } = Route.useParams()
  const { t } = useTranslation('releases')
  const language = useLanguage()
  const release = getReleaseBySlug(slug, lang)
  const { prev, next } = getAdjacentReleases(slug, lang)

  const content = release?.content ?? ''
  const sections = useMemo(() => extractSections(content), [content])

  useEffect(() => {
    if (!release) return

    applyDocumentMeta({
      title: t('detail.meta.title', {
        version: release.frontmatter.version,
        title: release.frontmatter.title,
      }),
      description: release.frontmatter.summary,
      language,
      path: `/releases/${release.slug}`,
    })
  }, [release, t, language])

  if (!release) {
    throw redirect({ to: '/$lang/releases', params: { lang } })
  }

  const { frontmatter } = release
  const isLatest = getAllReleases(lang)[0]?.slug === slug
  const repository = frontmatter.repository ?? DEFAULT_REPOSITORY
  const showToc = sections.length >= 3

  return (
    <main
      id="main-content"
      className="relative overflow-x-clip flex-grow before:bg-cover before:bg-background-yellow-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain"
    >
      <article className="px-4 max-w-208 mx-auto mt-20 pb-16 md:px-6 lg:mt-24 lg:pb-24 lg:max-w-screen-lg xl:mt-32 xl:max-w-screen-xl">
        <Link
          to="/$lang/releases"
          params={{ lang }}
          aria-label={t('detail.backToOverviewAriaLabel')}
          className="group inline-flex items-center gap-2 text-green-dark-900 font-semibold hover:gap-3 transition-all mb-8"
        >
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-dark-900/10 group-hover:bg-green-dark-900 group-hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </span>
          <span className="group-hover:underline">{t('detail.backToOverview')}</span>
        </Link>

        <header className="mb-10">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
              {t('detail.eyebrow')}
            </span>
            <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
          </div>

          <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-green-dark-900 text-white px-4 py-1.5 rounded-full text-sm font-lato font-bold shadow-xs">
                v{frontmatter.version}
              </span>
              {isLatest && (
                <span className="inline-flex items-center bg-green-light-900 text-white px-4 py-1.5 rounded-full text-sm font-lato font-bold shadow-xs">
                  {t('badge.current')}
                </span>
              )}
              <time dateTime={frontmatter.date} className="text-grey-900/60 text-sm">
                {formatReleaseDate(frontmatter.date, lang)}
              </time>
            </div>
            <span className="text-grey-900/30 hidden sm:inline">|</span>
            <div className="flex items-center gap-3">
              <a
                href={`${repository}/releases/tag/v${frontmatter.version}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-grey-900/60 hover:text-green-dark-900 transition-colors"
              >
                <GithubIcon classes="w-4 h-4" />
                {t('detail.githubReleaseLabel')}
              </a>
              <a
                href={`${repository}/tree/v${frontmatter.version}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-grey-900/60 hover:text-green-dark-900 transition-colors"
              >
                <CodeXml className="w-4 h-4" aria-hidden="true" />
                {t('detail.sourceLabel')}
              </a>
            </div>
          </div>

          <h1 className="font-lato font-bold text-3xl mb-4 text-grey-900 lg:text-5xl xl:text-6xl">
            {frontmatter.title}
          </h1>

          {frontmatter.highlights && frontmatter.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-green-dark-900/10 text-green-dark-900 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {frontmatter.summary && (
            <p className="mt-4 text-lg text-grey-900/80 leading-relaxed lg:text-xl">
              {frontmatter.summary}
            </p>
          )}
        </header>

        <div className={showToc ? 'xl:grid xl:grid-cols-[1fr_15rem] xl:gap-10' : ''}>
          <div>
            <div className="bg-green-light-100 rounded-2xl lg:rounded-3xl shadow-md border border-grey-100 p-6 lg:p-8">
              <ReleaseMarkdown content={release.content} sections={sections} />
            </div>

            {frontmatter.changelog && frontmatter.changelog.length > 0 && (
              <div className="mt-8">
                <ReleaseChangelog
                  version={frontmatter.version}
                  entries={frontmatter.changelog}
                  repository={repository}
                />
              </div>
            )}
          </div>

          {showToc && (
            <aside className="hidden xl:block">
              <ReleaseToc entries={sections} />
            </aside>
          )}
        </div>

        <nav
          aria-label={t('detail.navAriaLabel')}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prev ? (
            <Link
              to="/$lang/releases/$slug"
              params={{ lang, slug: prev.slug }}
              className="group p-5 rounded-2xl border border-grey-200 bg-white hover:border-green-dark-900/30 hover:shadow-lg transition-all"
            >
              <span className="text-xs text-grey-500 uppercase tracking-wide font-semibold">
                {t('detail.newerVersion')}
              </span>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-grey-100 text-grey-400 group-hover:bg-green-dark-900 group-hover:text-white transition-all flex-shrink-0">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="font-lato font-bold text-grey-900 group-hover:text-green-dark-900 transition-colors">
                    v{prev.frontmatter.version}
                  </span>
                  <p className="text-sm text-grey-600 line-clamp-1">{prev.frontmatter.title}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/$lang/releases/$slug"
              params={{ lang, slug: next.slug }}
              className="group p-5 rounded-2xl border border-grey-200 bg-white hover:border-green-dark-900/30 hover:shadow-lg transition-all sm:text-right"
            >
              <span className="text-xs text-grey-500 uppercase tracking-wide font-semibold">
                {t('detail.olderVersion')}
              </span>
              <div className="flex items-center gap-3 mt-2 sm:justify-end">
                <div className="min-w-0">
                  <span className="font-lato font-bold text-grey-900 group-hover:text-green-dark-900 transition-colors">
                    v{next.frontmatter.version}
                  </span>
                  <p className="text-sm text-grey-600 line-clamp-1">{next.frontmatter.title}</p>
                </div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-grey-100 text-grey-400 group-hover:bg-green-dark-900 group-hover:text-white transition-all flex-shrink-0">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        <div className="mt-10 pt-6 border-t border-grey-100 text-center">
          <p className="text-grey-900/60 text-sm">
            <Trans
              i18nKey="detail.feedback.text"
              ns="releases"
              components={{
                issue: (
                  <a
                    href={`${repository}/issues/new`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-dark-900 hover:underline font-medium"
                  />
                ),
              }}
            />
          </p>
        </div>
      </article>
    </main>
  )
}

export default ReleaseDetailPage
