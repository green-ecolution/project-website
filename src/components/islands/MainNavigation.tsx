import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import { TranslationProvider } from '../../i18n/TranslationProvider'
import { useT } from '../../i18n/useT'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { ARROW_PATH } from '../../lib/iconPaths'

interface NavLink {
  label: string
  href: string
}

interface Props {
  links: NavLink[]
  imprintHref: string
  privacyHref: string
  demoHref: string
  strings: Record<string, string>
  children?: ReactNode
}

const SWIPE_CLOSE_PX = 50

function Arrow({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={ARROW_PATH} />
    </svg>
  )
}

function NavItem({ label, href, onClick }: NavLink & { onClick: () => void }) {
  return (
    <li className="mb-4 lg:mb-0">
      <a
        href={href}
        onClick={onClick}
        className="text-lg md:text-2xl font-bold flex justify-between items-center group cursor-pointer lg:text-base xl:text-lg lg:leading-none lg:my-1"
      >
        <p className="whitespace-nowrap transition-color ease-in-out duration-300 group-hover:text-green-light-900 group-active:text-green-light-900 lg:group-hover:text-green-middle-900 lg:group-active:text-green-middle-900">
          {label}
        </p>
        <Arrow className="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2 group-hover:text-green-light-900 group-active:translate-x-2 group-active:text-green-light-900 lg:hidden" />
      </a>
    </li>
  )
}

function Navigation({
  links,
  imprintHref,
  privacyHref,
  demoHref,
  children,
}: Omit<Props, 'strings'>) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const close = () => setOpen(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(!window.matchMedia('(min-width: 1024px)').matches)
    const handleResize = () => {
      checkMobile()
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open)
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus()
      previousActiveElement.current = null
    }
  }, [open])

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
    touchStartY.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return

    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    const deltaY = Math.abs(event.changedTouches[0].clientY - touchStartY.current)

    // Swipe right to close: far enough and more horizontal than vertical.
    if (deltaX > SWIPE_CLOSE_PX && deltaX > deltaY) {
      close()
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  const ref = useOutsideClick((event: MouseEvent) => {
    const toggle = document.getElementById('main-navigation-toggle')
    if (toggle && (event.target === toggle || toggle.contains(event.target as Node))) {
      return
    }
    close()
  })

  const navContent = (
    <>
      <div
        className={`fixed inset-0 bg-grey-900 z-[55] transition-opacity ease-in-out duration-300 lg:hidden ${open ? 'opacity-60 visible' : 'opacity-0 invisible'}`}
        onClick={close}
        aria-hidden="true"
      />
      <nav
        id="main-navigation"
        ref={ref}
        aria-label={t('nav.ariaLabel')}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed inset-y-2 px-4 w-[70vw] z-[60] bg-grey-900 max-w-100 rounded-tl-2xl rounded-bl-2xl transition-all ease-in-out duration-300 shadow-mainNav md:px-6 lg:visible lg:relative lg:inset-y-auto lg:block lg:right-auto lg:bg-transparent lg:shadow-none lg:transition-none lg:w-auto lg:max-w-none lg:z-auto ${open ? 'visible block right-0' : 'invisible -right-full'}`}
      >
        <p className="pt-[20vh] text-white/80 mb-6 md:text-lg lg:hidden">{t('nav.heading')}</p>
        <ul className="text-white lg:text-grey-900 lg:flex lg:gap-x-6 xl:gap-x-10 lg:justify-center lg:items-center">
          {links.map((link) => (
            <NavItem key={link.href} label={link.label} href={link.href} onClick={close} />
          ))}
          <a
            href={demoHref}
            aria-label="demo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-x-4 rounded-2xl w-max font-semibold px-5 py-2 group cursor-pointer transition-all ease-in-out duration-300 text-white bg-green-dark-900 hover:bg-green-light-900 hover:shadow-lg hover:shadow-green-light-900/40 hover:-translate-y-0.5"
          >
            <span className="whitespace-nowrap">{t('nav.tryNow')}</span>
            <Arrow className="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2" />
          </a>
          <li className="mt-6 lg:mt-0 lg:ml-2" onClick={close}>
            {children}
          </li>
        </ul>

        <ul className="absolute bottom-6 text-white lg:text-grey-900 flex flex-wrap gap-x-5 items-center text-sm md:bottom-10 md:text-base lg:hidden">
          <li>
            <a
              href={imprintHref}
              onClick={close}
              className="transition-color ease-in-out duration-300 hover:opacity-75"
            >
              {t('nav.imprint')}
            </a>
          </li>
          <li>
            <a
              href={privacyHref}
              onClick={close}
              className="transition-color ease-in-out duration-300 hover:opacity-75"
            >
              {t('nav.privacy')}
            </a>
          </li>
        </ul>
      </nav>
    </>
  )

  return (
    <>
      <button
        type="button"
        id="main-navigation-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-haspopup="menu"
        aria-label={t('header.openNavigation')}
        className="relative w-10 h-10 p-2 z-50 group cursor-pointer lg:hidden"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`block w-6 h-0.5 transition-all ease-in-out duration-300 ${open ? 'bg-white rotate-45 absolute' : 'bg-grey-900 mb-1'}`}
        />
        <span
          className={`block w-6 h-0.5 transition-all ease-in-out duration-300 ${open ? 'bg-white -rotate-45 absolute' : 'bg-grey-900 mb-1'}`}
        />
      </button>
      {isMobile ? createPortal(navContent, document.body) : navContent}
    </>
  )
}

export default function MainNavigation({ strings, ...props }: Props) {
  return (
    <TranslationProvider strings={strings}>
      <Navigation {...props} />
    </TranslationProvider>
  )
}
