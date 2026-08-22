import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button'
import { useLanguage } from '../../i18n/useLanguage'

function Footer() {
  const { t } = useTranslation('common')
  const lang = useLanguage()

  return (
    <footer className="py-10 bg-background-footer-mobile bg-no-repeat bg-cover text-white md:pt-16 lg:bg-background-footer-desktop lg:bg-[35%] xl:bg-[55%] 3xl:bg-contain 3xl:bg-center hyphens-auto">
      <div className="px-4 max-w-screen-lg mx-auto md:px-6 md:flex md:items-end md:justify-between md:gap-x-6 xl:max-w-screen-xl">
        <div className="pb-10 border-b border-b-white/20 md:border-none md:pb-0">
          <Link
            to="/$lang"
            params={{ lang }}
            aria-label={t('footer.logoAriaLabel')}
            className="group"
          >
            <img
              src="/assets/svg/logo/logo-icon-white.svg"
              className="w-12 h-12 mb-6 transition-all ease-in-out duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(172,182,59,0.5)]"
              alt={t('footer.logoAlt')}
              loading="lazy"
            />
          </Link>
          <p className="max-w-sm">{t('footer.description')}</p>
          <div className="flex flex-wrap gap-6 mt-8">
            <Button href="mailto:info@green-ecolution.de" ariaLabel={t('footer.contactAriaLabel')}>
              <img src="/assets/svg/socials/mail.svg" className="w-6 h-6" alt="" loading="lazy" />
              <span>{t('footer.contact')}</span>
            </Button>
            <Button
              href="https://github.com/green-ecolution"
              ariaLabel={t('footer.githubAriaLabel')}
              isExternalLink
            >
              <img src="/assets/svg/socials/github.svg" className="w-6 h-6" alt="" loading="lazy" />
              <span>{t('footer.github')}</span>
            </Button>
          </div>
        </div>

        <div className="mt-10 md:justify-self-end md:mt-0">
          <nav aria-label={t('footer.metaNavAriaLabel')}>
            <ul className="flex items-center justify-center gap-x-6 sm:justify-start md:justify-end">
              <li>
                <Link
                  to="/$lang/impressum"
                  params={{ lang }}
                  className="relative font-bold transition-all ease-in-out duration-300 hover:text-green-light-900 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-light-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {t('footer.imprint')}
                </Link>
              </li>
              <li>
                <Link
                  to="/$lang/datenschutz"
                  params={{ lang }}
                  className="relative font-bold transition-all ease-in-out duration-300 hover:text-green-light-900 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-light-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-xs text-center mt-3 text-white/60 sm:text-left md:text-right">
            © {new Date().getFullYear()} Green Ecolution
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            <span className="text-white/40">{import.meta.env.VITE_APP_VERSION}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
