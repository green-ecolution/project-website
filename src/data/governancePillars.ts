import { Shield, Lock, Puzzle, Plug, Users, PiggyBank } from 'lucide-react'
import { ComponentType } from 'react'

export type GovernancePillarId =
  'license' | 'sovereignty' | 'modularity' | 'integration' | 'community' | 'costEfficiency'

interface GovernancePillar {
  id: GovernancePillarId
  icon: ComponentType<{ className?: string }>
}

export const governancePillars: GovernancePillar[] = [
  {
    id: 'license',
    icon: Shield,
  },
  {
    id: 'sovereignty',
    icon: Lock,
  },
  {
    id: 'modularity',
    icon: Puzzle,
  },
  {
    id: 'integration',
    icon: Plug,
  },
  {
    id: 'community',
    icon: Users,
  },
  {
    id: 'costEfficiency',
    icon: PiggyBank,
  },
]
