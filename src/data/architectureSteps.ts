import { Radio, Wifi, Server, LayoutDashboard } from 'lucide-react'
import { ComponentType } from 'react'

interface ArchitectureStep {
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
  color: 'green-light' | 'green-middle' | 'green-dark'
}

export const architectureSteps: ArchitectureStep[] = [
  {
    label: 'Sensor',
    description: 'Misst Bodenfeuchte am Baum',
    icon: Radio,
    color: 'green-dark',
  },
  {
    label: 'Gateway',
    description: 'LoRaWAN Übertragung',
    icon: Wifi,
    color: 'green-light',
  },
  {
    label: 'Backend',
    description: 'Datenverarbeitung & Analyse',
    icon: Server,
    color: 'green-middle',
  },
  {
    label: 'Dashboard',
    description: 'Visualisierung & Tourenplanung',
    icon: LayoutDashboard,
    color: 'green-dark',
  },
]
