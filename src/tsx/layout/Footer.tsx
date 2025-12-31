import Button from '../components/Button'

function Footer() {
  return (
    <footer className="py-10 bg-background-footer-mobile bg-no-repeat bg-cover text-white md:pt-16 lg:bg-background-footer-desktop lg:bg-[35%] xl:bg-[55%] 3xl:bg-contain 3xl:bg-center hyphens-auto">
      <div className="px-4 max-w-screen-lg mx-auto md:px-6 md:flex md:items-end md:justify-between md:gap-x-6 xl:max-w-screen-xl">
        <div className="pb-10 border-b border-b-white md:border-none md:pb-0">
          <a href="/" aria-label="Zur Startseite navigieren" className="group">
            <img
              src="/assets/svg/logo/logo-icon-white.svg"
              className="w-12 h-12 mb-6 transition-all ease-in-out duration-300 group-hover:opacity-70"
              alt="Logo Green Ecolution"
              loading="lazy"
            />
          </a>
          <p className="max-w-sm">
            Green Ecolution ist ein digitales System zur bedarfsgerechten und ressourcenschonenden
            Bewässerung von Stadtbäumen und leistet damit einen Beitrag zu einer nachhaltigen und
            klimaresilienten Stadtentwicklung
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            <Button href="mailto:info@green-ecolution.de" ariaLabel="Kontaktiere uns gern per Mail">
              <img src="/assets/svg/socials/mail.svg" className="w-6 h-6" alt="" loading="lazy" />
              <span>Kontakt</span>
            </Button>
            <Button
              href="https://github.com/green-ecolution"
              ariaLabel="Besuche uns auf GitHub"
              isExternalLink
            >
              <img src="/assets/svg/socials/github.svg" className="w-6 h-6" alt="" loading="lazy" />
              <span>GitHub</span>
            </Button>
          </div>
        </div>

        <div className="mt-10 md:justify-seld-end md:mt-0">
          <nav aria-label="Meta-Navigation">
            <ul className="flex items-center justify-center gap-x-6 sm:justify-start md:justify-end">
              <li>
                <a
                  href="https://hs-flensburg.de/impressum"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="font-bold transition-color ease-in-out duration-300 hover:opacity-75"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href="https://hs-flensburg.de/datenschutzerklaerung"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="font-bold transition-color ease-in-out duration-300 hover:opacity-75"
                >
                  Datenschutz
                </a>
              </li>
            </ul>
          </nav>
          <p className="text-xs text-center mt-3 text-white/60 sm:text-left md:text-right">
            © {new Date().getFullYear()} PROGEEK GmbH & Hochschule Flensburg
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            <span className="text-white/40">
              {import.meta.env.VITE_APP_VERSION} · {import.meta.env.VITE_BUILD_VERSION}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
