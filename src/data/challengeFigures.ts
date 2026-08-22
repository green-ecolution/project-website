export type ChallengeFigureId = 'waterUse' | 'treeCost' | 'bedCost'

interface ChallengeFigure {
  id: ChallengeFigureId
}

export const challengeFigures: ChallengeFigure[] = [
  { id: 'waterUse' },
  { id: 'treeCost' },
  { id: 'bedCost' },
]
