import * as React from 'react'
import { createPortal } from 'react-dom'
import { Link } from '@tanstack/react-router'
import NavItem from './NavItem'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Button from '../Button'
import Arrow from '../../icons/Arrow'

interface MainNavigationProps {
  isOpen: boolean
  onClose: () => void
}

const MainNavigation: React.FC<MainNavigationProps> = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = React.useState(false)

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
    <nav
      id="main-navigation"
      ref={ref}
      aria-label="Hauptnavigation"
      className={`fixed inset-y-2 px-4 w-[70vw] z-[60] bg-grey-900 max-w-100 rounded-tl-2xl rounded-bl-2xl transition-all ease-in-out duration-300 shadow-mainNav md:px-6 lg:visible lg:relative lg:block lg:right-auto lg:bg-transparent lg:shadow-none lg:transition-none lg:w-auto lg:z-auto ${isOpen ? 'visible block right-0' : 'invisible -right-full'}`}
    >
      <p className="pt-[20vh] text-white/80 mb-6 md:text-lg lg:hidden">Hauptnavigation</p>
      <ul className="text-white lg:text-grey-900 lg:flex lg:gap-x-6 xl:gap-x-10 lg:justify-center lg:items-center">
        <NavItem label="Das Projekt" url="/project" onClick={onClose} />
        <NavItem label="Releases" url="/releases" onClick={onClose} />
        <NavItem label="Kontakt" url="/contact" onClick={onClose} />
        <NavItem label="GitHub" url="https://github.com/green-ecolution" isExternalLink />
        <Button ariaLabel="demo" href="https://demo.green-ecolution.de" isExternalLink isDark>
          <span className="whitespace-nowrap">Jetzt ausprobieren</span>
          <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2" />
        </Button>
      </ul>

      <ul className="absolute bottom-6 text-white lg:text-grey-900 flex flex-wrap gap-x-5 items-center text-sm md:bottom-10 md:text-base lg:hidden">
        <li>
          <Link
            to="/impressum"
            onClick={onClose}
            className="transition-color ease-in-out duration-300 hover:opacity-75"
          >
            Impressum
          </Link>
        </li>
        <li>
          <Link
            to="/datenschutz"
            onClick={onClose}
            className="transition-color ease-in-out duration-300 hover:opacity-75"
          >
            Datenschutz
          </Link>
        </li>
      </ul>
    </nav>
  )

  return isMobile ? createPortal(navContent, document.body) : navContent
}

export default MainNavigation
