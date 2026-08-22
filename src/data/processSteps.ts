import { Radio, Activity, LayoutDashboard, Route, Droplets } from 'lucide-react'
import { ComponentType } from 'react'

export type ProcessStepId = 'install' | 'data' | 'analysis' | 'planning' | 'execution'

interface ProcessStep {
  id: ProcessStepId
  icon: ComponentType<{ className?: string }>
  color: 'green-light' | 'green-middle' | 'green-dark'
}

export const steps: ProcessStep[] = [
  {
    id: 'install',
    icon: Radio,
    color: 'green-dark',
  },
  {
    id: 'data',
    icon: Activity,
    color: 'green-light',
  },
  {
    id: 'analysis',
    icon: LayoutDashboard,
    color: 'green-middle',
  },
  {
    id: 'planning',
    icon: Route,
    color: 'green-light',
  },
  {
    id: 'execution',
    icon: Droplets,
    color: 'green-dark',
  },
]
