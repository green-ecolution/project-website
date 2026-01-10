import {
  TreeDeciduous,
  Truck,
  ClipboardList,
  LayoutDashboard,
  Users,
  BarChart3,
} from 'lucide-react'
import { ReactNode } from 'react'

interface Feature {
  label: string
  icon: ReactNode
  description: string
  color: 'green-light' | 'green-dark' | 'green-middle'
  size?: 'default' | 'large'
}

const colorClasses = {
  'green-light': 'bg-green-light-900/15',
  'green-dark': 'bg-green-dark-900/15',
  'green-middle': 'bg-green-middle-900/15',
}

const iconColorClasses = {
  'green-light': 'bg-green-light-900/25 text-green-light-900',
  'green-dark': 'bg-green-dark-900/25 text-green-dark-900',
  'green-middle': 'bg-green-middle-900/25 text-green-middle-900',
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div
      className={`
        h-full rounded-xl p-4 md:rounded-2xl md:p-6 lg:p-8 transition-all duration-300 hover:shadow-lg lg:hover:scale-[1.02]
        ${colorClasses[feature.color]}
      `}
    >
      <figure
        className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 ${iconColorClasses[feature.color]}`}
      >
        <span className="[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6 lg:[&>svg]:w-8 lg:[&>svg]:h-8">
          {feature.icon}
        </span>
      </figure>
      <h3 className="font-lato font-bold text-base md:text-xl mb-1 md:mb-2">{feature.label}</h3>
      <p className="text-grey-600 text-sm md:text-base">
        {feature.description}
      </p>
    </div>
  )
}

function Features() {
  const features: Feature[] = [
    {
      label: 'Echtzeit-Dashboard',
      icon: <LayoutDashboard />,
      description:
        'Alle wichtigen KPIs auf einen Blick: Bodenfeuchtewerte, anstehende Touren, Teamverfügbarkeit und Fahrzeugstatus in einem zentralen Dashboard.',
      color: 'green-dark',
      size: 'large',
    },
    {
      label: 'Intelligente Gruppierung',
      icon: <TreeDeciduous />,
      description:
        'Fasse Bäume zu Bewässerungseinheiten zusammen. Automatische Berechnung des Wasserbedarfs pro Cluster.',
      color: 'green-light',
    },
    {
      label: 'Fleet Management',
      icon: <Truck />,
      description:
        'Verwalte Transporter und Anhänger mit Wasserkapazitäten. Automatische Nachfüllstopps in der Routenplanung.',
      color: 'green-middle',
    },
    {
      label: 'Tour-Planung',
      icon: <ClipboardList />,
      description:
        "Optimierte Bewässerungspläne mit Echtzeit-Status: Von 'geplant' über 'aktiv' bis 'abgeschlossen'.",
      color: 'green-middle',
    },
    {
      label: 'Teamverwaltung',
      icon: <Users />,
      description:
        'Verwalte Fahrer mit Führerscheinklassen und Verfügbarkeit. Optimiere die Einsatzplanung.',
      color: 'green-light',
    },
    {
      label: 'Nachanalyse',
      icon: <BarChart3 />,
      description:
        'Dokumentiere den tatsächlichen Wasserverbrauch pro Cluster und Tour. Analysiere Trends und optimiere zukünftige Planungen datenbasiert.',
      color: 'green-dark',
      size: 'large',
    },
  ]

  return (
    <section
      id="features"
      className="max-w-208 mx-auto my-28 px-4 md:px-6 lg:my-36 lg:max-w-screen-lg xl:my-52 xl:max-w-screen-xl"
    >
      <article className="mb-8 lg:mb-14 text-center">
        <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl">
          Green Ecolution im Überblick
        </h2>
        <p className="text-grey-500 max-w-2xl mx-auto">
          Von der Sensorerfassung über die intelligente Routenplanung bis zur detaillierten
          Auswertung - alle Funktionen für ein effizientes und nachhaltiges Grünflächenmanagement
        </p>
      </article>

      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {features.map((feature, index) => (
          <div
            key={feature.label}
            className={`
              ${feature.size === 'large' ? 'col-span-2' : ''}
              ${index === 0 ? 'lg:row-span-1' : ''}
            `}
          >
            <FeatureCard feature={feature} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
