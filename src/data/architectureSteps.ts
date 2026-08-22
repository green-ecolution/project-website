import { Radio, Wifi, Server, LayoutDashboard } from 'lucide-react'
import { ComponentType } from 'react'

export type ArchitectureStepId = 'sensor' | 'gateway' | 'backend' | 'dashboard'

interface ArchitectureStep {
  id: ArchitectureStepId
  icon: ComponentType<{ className?: string }>
  color: 'green-light' | 'green-middle' | 'green-dark'
}

export const architectureSteps: ArchitectureStep[] = [
  {
    id: 'sensor',
    icon: Radio,
    color: 'green-dark',
  },
  {
    id: 'gateway',
    icon: Wifi,
    color: 'green-light',
  },
  {
    id: 'backend',
    icon: Server,
    color: 'green-middle',
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    color: 'green-dark',
  },
]
