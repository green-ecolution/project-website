import * as React from 'react'
import { createPortal } from 'react-dom'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import NavItem from './NavItem'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Button from '../Button'
import Arrow from '../../icons/Arrow'
import LanguageSwitcher from '../LanguageSwitcher'
import { useLanguage } from '../../../i18n/useLanguage'

interface MainNavigationProps {
  isOpen: boolean
  onClose: () => void
}

const MainNavigation: React.FC<MainNavigationProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common')
  const lang = useLanguage()
  const [isMobile, setIsMobile] = React.useState(false)
  const previousActiveElement = React.useRef<HTMLElement | null>(null)
  const touchStartX = React.useRef<number | null>(null)
  const touchStartY = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus()
      previousActiveElement.current = null
    }
  }, [isOpen])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return

    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const deltaX = touchEndX - touchStartX.current
    const deltaY = Math.abs(touchEndY - touchStartY.current)

    // Swipe right to close: deltaX > 50px and horizontal swipe (deltaX > deltaY)
    if (deltaX > 50 && deltaX > deltaY) {
      onClose()
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(!window.matchMedia('(min-width: 1024px)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const ref = useOutsideClick((event: MouseEvent) => {
    const toggleElement = document.getElementById('main-navigation-toggle')
    if (
      toggleElement &&
      (event.target === toggleElement || toggleElement.contains(event.target as Node))
    ) {
      return
    }
    onClose()
  })

  const navContent = (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-grey-900 z-[55] transition-opacity ease-in-out duration-300 lg:hidden ${isOpen ? 'opacity-60 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        id="main-navigation"
        ref={ref}
        aria-label={t('nav.ariaLabel')}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed inset-y-2 px-4 w-[70vw] z-[60] bg-grey-900 max-w-100 rounded-tl-2xl rounded-bl-2xl transition-all ease-in-out duration-300 shadow-mainNav md:px-6 lg:visible lg:relative lg:inset-y-auto lg:block lg:right-auto lg:bg-transparent lg:shadow-none lg:transition-none lg:w-auto lg:max-w-none lg:z-auto ${isOpen ? 'visible block right-0' : 'invisible -right-full'}`}
      >
        <p className="pt-[20vh] text-white/80 mb-6 md:text-lg lg:hidden">{t('nav.heading')}</p>
        <ul className="text-white lg:text-grey-900 lg:flex lg:gap-x-6 xl:gap-x-10 lg:justify-center lg:items-center">
          <NavItem label={t('nav.project')} url="/$lang/project" onClick={onClose} />
          <NavItem label={t('nav.releases')} url="/$lang/releases" onClick={onClose} />
          <NavItem label={t('nav.contact')} url="/$lang/contact" onClick={onClose} />
          <NavItem
            label={t('nav.github')}
            url="https://github.com/green-ecolution"
            isExternalLink
          />
          <Button ariaLabel="demo" href="https://demo.green-ecolution.de" isExternalLink isDark>
            <span className="whitespace-nowrap">{t('nav.tryNow')}</span>
            <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2" />
          </Button>
          <li className="mt-6 lg:mt-0 lg:ml-2">
            <LanguageSwitcher onNavigate={onClose} />
          </li>
        </ul>

        <ul className="absolute bottom-6 text-white lg:text-grey-900 flex flex-wrap gap-x-5 items-center text-sm md:bottom-10 md:text-base lg:hidden">
          <li>
            <Link
              to="/$lang/impressum"
              params={{ lang }}
              onClick={onClose}
              className="transition-color ease-in-out duration-300 hover:opacity-75"
            >
              {t('nav.imprint')}
            </Link>
          </li>
          <li>
            <Link
              to="/$lang/datenschutz"
              params={{ lang }}
              onClick={onClose}
              className="transition-color ease-in-out duration-300 hover:opacity-75"
            >
              {t('nav.privacy')}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )

  return isMobile ? createPortal(navContent, document.body) : navContent
}

export default MainNavigation
