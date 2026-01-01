import { useEffect } from 'react'
import Advantages from '../components/sections/Advantages'
import DashboardPreview from '../components/sections/DashboardPreview'
import Hero from '../components/sections/Hero'
import Contact from '../components/sections/Contact'
import ProjectHeroContent from '../components/hero/ProjectHeroContent'
import FurtherLinks from '../components/sections/FurhterLinks'

function ProjectPage() {
  useEffect(() => {
    document.title = 'Projekt | Green Ecolution | Smartes Grünflächenmanagement'
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.getElementById(hash.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  const heroHeadline = 'Alles wissenswerte über das Projekt'
  const heroDescription =
    'Green Ecolution befasst sich mit der Frage, wie die Bewässerung von Bäumen effizienter und nachhaltiger gestaltet werden kann. \
  In Zusammenarbeit mit dem TBZ Flensburg wurden im Rahmen eines Forschungsprojekts verschiedene Standorte mit Sensorik ausgestattet, \
  um den Wasserbedarf von Bäumen präzise zu erfassen. Aufbauend auf diesen Erkenntnissen entwickeln wir das System nun weiter, \
  um datenbasierte Handlungsempfehlungen und eine digitalisierte Einsatzplanung mit dynamischer Routenoptimierung zu ermöglichen – \
  für eine gezielte und ressourcenschonende Bewässerung im urbanen Raum.'

  return (
    <main
      id="main-content"
      className="relative overflow-hidden before:bg-cover before:bg-background-light-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain"
    >
      <Hero headline={heroHeadline} description={heroDescription}>
        <ProjectHeroContent />
      </Hero>
      <DashboardPreview />
      <Advantages />
      <FurtherLinks />
      <Contact />
    </main>
  )
}

export default ProjectPage
