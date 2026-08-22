import { Link, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type Language } from '../../i18n/languages'
import { useLanguage } from '../../i18n/useLanguage'
import { setStoredLanguage } from '../helper/storage'

interface LanguageSwitcherProps {
  onNavigate?: () => void
}

// Explicit `string` return type widens the template literal, which the router's
// `to` prop otherwise rejects in favor of its registered route literals.
function withLanguagePrefix(restOfPath: string): string {
  return restOfPath ? `/$lang/${restOfPath}` : '/$lang'
}

function LanguageSwitcher({ onNavigate }: LanguageSwitcherProps) {
  const { t } = useTranslation('common')
  const activeLanguage = useLanguage()
  const location = useLocation()

  // Same route, other prefix: everything after the language segment is reused as-is.
  const restOfPath = location.pathname.split('/').slice(2).join('/')

  return (
    <nav aria-label={t('language.switchTo')}>
      <ul className="flex items-center gap-x-2">
        {SUPPORTED_LANGUAGES.map((language: Language) => {
          const isActive = language === activeLanguage

          return (
            <li key={language}>
              <Link
                to={withLanguagePrefix(restOfPath)}
                params={{ lang: language }}
                hrefLang={language}
                lang={language}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  setStoredLanguage(language)
                  onNavigate?.()
                }}
                className={`px-2 py-1 text-sm font-semibold rounded transition-colors ease-in-out duration-300 ${
                  isActive
                    ? 'text-white underline underline-offset-4 lg:text-green-dark-900'
                    : 'text-white/60 hover:text-green-light-900 lg:text-grey-900/60 lg:hover:text-green-middle-900'
                }`}
              >
                <span className="sr-only">{t(`language.${language}`)}</span>
                <span aria-hidden="true">{t(`language.${language}Short`)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default LanguageSwitcher
