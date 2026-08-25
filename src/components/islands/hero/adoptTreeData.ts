type TreeVariant = 'light' | 'middle' | 'dark'

export type TreeSpeciesId =
  | 'birch'
  | 'spruce'
  | 'oak'
  | 'beech'
  | 'chestnut'
  | 'linden'
  | 'maple'
  | 'ash'
  | 'elm'
  | 'plane'
  | 'fir'
  | 'willow'
  | 'robinia'
  | 'alder'
  | 'poplar'

export type FunFactId =
  'evaporation' | 'oxygen' | 'dust' | 'roots' | 'co2' | 'network' | 'lifespan' | 'noise' | 'water'

interface TreeIdentity {
  name: string
  speciesId: TreeSpeciesId
  emoji: string
}

export interface AdoptionData {
  tree: TreeIdentity
  factId: FunFactId
  certNumber: string
  plantedYear: number
  treeVariant: TreeVariant
}

const treeNames: TreeIdentity[] = [
  { name: 'Bernd', speciesId: 'birch', emoji: '🌿' },
  { name: 'Frieda', speciesId: 'spruce', emoji: '🌲' },
  { name: 'Olaf', speciesId: 'oak', emoji: '🌳' },
  { name: 'Gertrude', speciesId: 'beech', emoji: '🍃' },
  { name: 'Horst', speciesId: 'chestnut', emoji: '🌰' },
  { name: 'Lieselotte', speciesId: 'linden', emoji: '🌱' },
  { name: 'Günther', speciesId: 'maple', emoji: '🍁' },
  { name: 'Bärbel', speciesId: 'ash', emoji: '🌿' },
  { name: 'Helmut', speciesId: 'elm', emoji: '🌳' },
  { name: 'Rosemarie', speciesId: 'plane', emoji: '🍂' },
  { name: 'Siegfried', speciesId: 'fir', emoji: '🌲' },
  { name: 'Hildegard', speciesId: 'willow', emoji: '🌾' },
  { name: 'Klaus-Dieter', speciesId: 'robinia', emoji: '🌳' },
  { name: 'Brunhilde', speciesId: 'alder', emoji: '🌿' },
  { name: 'Detlef', speciesId: 'poplar', emoji: '🍃' },
]

const funFactIds: FunFactId[] = [
  'evaporation',
  'oxygen',
  'dust',
  'roots',
  'co2',
  'network',
  'lifespan',
  'noise',
  'water',
]

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateAdoptionData(treeVariant: TreeVariant): AdoptionData {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const prefix = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)]
  const num = String(Math.floor(Math.random() * 9000) + 1000)

  return {
    tree: pickRandom(treeNames),
    factId: pickRandom(funFactIds),
    certNumber: `GE-${prefix}-${num}`,
    plantedYear: 2010 + Math.floor(Math.random() * 16),
    treeVariant,
  }
}
