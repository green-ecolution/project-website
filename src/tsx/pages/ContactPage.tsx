import { useEffect } from 'react'
import ContactHeroContent from '../components/hero/ContactHeroContent'
import Hero from '../components/sections/Hero'
import Stakeholder from '../components/sections/Stakeholder'

function ContactPage() {
  useEffect(() => {
    document.title = 'Kontakt | Green Ecolution | Smartes Grünflächenmanagement'
  }, [])

  const heroHeadline = 'Weitere Informationen'
  const heroDescription =
    'Bei weiteren Rückfragen können Sie uns über unsere E-Mail-Adresse erreichen. Eine Übersicht über die technische Struktur erhalten Sie in unserem öffentlich zugänglichen GitHub-Projekt.'

  return (
    <main className="relative overflow-hidden before:bg-cover before:bg-background-dark-dot before:w-4/5 before:h-screen before:max-h-180 before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-220 xl:before:w-280 xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain">
      <Hero headline={heroHeadline} description={heroDescription}>
        <ContactHeroContent />
      </Hero>
      <Stakeholder hasDesktopList />
    </main>
  )
}

export default ContactPage
