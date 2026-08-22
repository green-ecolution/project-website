import { Droplets, Eye, Route } from 'lucide-react'
import { ComponentType } from 'react'

export type WorkflowStepId = 'measure' | 'understand' | 'act'

interface WorkflowStep {
  id: WorkflowStepId
  number: string
  icon: ComponentType<{ className?: string }>
}

export const workflowSteps: WorkflowStep[] = [
  {
    id: 'measure',
    number: '01',
    icon: Droplets,
  },
  {
    id: 'understand',
    number: '02',
    icon: Eye,
  },
  {
    id: 'act',
    number: '03',
    icon: Route,
  },
]
