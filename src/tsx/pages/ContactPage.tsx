import { useEffect } from 'react'
import ContactHeroContent from '../components/hero/ContactHeroContent'
import Hero from '../components/sections/Hero'
import Stakeholder from '../components/sections/Stakeholder'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

function ContactPage() {
  useEffect(() => {
    document.title = 'Kontakt | Green Ecolution | Smartes Grünflächenmanagement'
  }, [])

  const heroHeadline = 'Lass uns in Kontakt treten'
  const heroDescription =
    'Du hast Fragen zum Projekt, möchtest deine Kommune anbinden oder zur Entwicklung beitragen? Wir freuen uns über jede Nachricht und melden uns zeitnah bei dir.'

  return (
    <main
      id="main-content"
      className="relative overflow-hidden before:bg-cover before:bg-background-dark-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain"
    >
      <BreadcrumbSchema
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Kontakt', path: '/contact' },
        ]}
      />
      <Hero headline={heroHeadline} description={heroDescription} label="Kontakt">
        <ContactHeroContent />
      </Hero>
      <Stakeholder hasDesktopList />
    </main>
  )
}

export default ContactPage
