export type GroundPoint = readonly [number, number]

export interface TourLeg {
  points: readonly GroundPoint[]
  fill: number
}

// One tour through the field, split at every stop. `fill` is how full the tank
// is while the vehicle drives that leg, so it drops at each stop and is back to
// 1 after the refill station. The gauge beside the model reads from it.
// Every mark sits on a straight run, so a curve through all points stays on the
// legs and the vehicle never cuts a corner.
export const tourLegs: TourLeg[] = [
  {
    points: [
      [10, 62],
      [10, 26],
      [18, 26],
    ],
    fill: 1,
  },
  {
    points: [
      [18, 26],
      [26, 26],
      [26, 12],
      [40, 12],
    ],
    fill: 0.72,
  },
  {
    points: [
      [40, 12],
      [48, 12],
      [48, 30],
      [56, 30],
    ],
    fill: 0.4,
  },
  {
    points: [
      [56, 30],
      [68, 30],
      [68, 14],
      [78, 14],
    ],
    fill: 1,
  },
  {
    points: [
      [78, 14],
      [86, 14],
      [86, 44],
    ],
    fill: 0.74,
  },
  {
    points: [
      [86, 44],
      [86, 58],
      [52, 58],
    ],
    fill: 0.44,
  },
  {
    points: [
      [52, 58],
      [26, 58],
      [26, 62],
      [10, 62],
    ],
    fill: 0.18,
  },
]

export interface TourMark {
  at: GroundPoint
  kind: 'depot' | 'stop' | 'refill'
  label: string
}

export const tourMarks: TourMark[] = [
  { at: [10, 62], kind: 'depot', label: 'Depot' },
  { at: [18, 26], kind: 'stop', label: '1' },
  { at: [40, 12], kind: 'stop', label: '2' },
  { at: [56, 30], kind: 'refill', label: 'Nachfüllstation' },
  { at: [78, 14], kind: 'stop', label: '3' },
  { at: [86, 44], kind: 'stop', label: '4' },
  { at: [52, 58], kind: 'stop', label: '5' },
]

export interface CityBlock {
  x: number
  z: number
  width: number
  depth: number
  height: number
}

// Placed by hand around the route, never closer than three units to it.
export const cityBlocks: CityBlock[] = [
  { x: 34, z: 43, width: 13, depth: 11, height: 3.5 },
  { x: 18, z: 44, width: 9, depth: 13, height: 2.5 },
  { x: 36, z: 20, width: 8, depth: 8, height: 5 },
  { x: 58, z: 21, width: 10, depth: 8, height: 3 },
  { x: 77, z: 27, width: 8, depth: 12, height: 4.5 },
  { x: 63, z: 46, width: 12, depth: 10, height: 3 },
  { x: 0, z: 30, width: 10, depth: 12, height: 3.5 },
  { x: 32, z: 70, width: 13, depth: 9, height: 3 },
  { x: 62, z: 70, width: 11, depth: 8, height: 4.5 },
  { x: 96, z: 32, width: 10, depth: 13, height: 3 },
  { x: 24, z: 4, width: 10, depth: 8, height: 3.5 },
  { x: 56, z: 2, width: 11, depth: 8, height: 2.5 },
]

export const roadHeight = 0.2
export const roadWidth = 5
export const depotSize = 8
export const depotHeight = 6
export const stopPostHeight = 4.4
export const refillPostHeight = 6

export const tourColors = {
  road: '#4C7741',
  depot: '#3D5F35',
  stop: '#658A58',
  refill: '#ACB63B',
  block: '#EAEDE2',
  blockTop: '#F6F7F1',
  blockShaded: '#DFE3D6',
  vehicleBody: '#2C4726',
  vehicleTank: '#F1F3EA',
} as const

function polylineLength(points: readonly GroundPoint[]) {
  let length = 0
  for (let i = 1; i < points.length; i++) {
    length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1])
  }
  return length
}

const legEnd = (() => {
  const lengths = tourLegs.map((leg) => polylineLength(leg.points))
  const total = lengths.reduce((sum, length) => sum + length, 0)
  let running = 0

  return lengths.map((length) => {
    running += length / total
    return running
  })
})()

// How long the level takes to move after the vehicle reaches a stop, as a share
// of the leg that follows it.
const LEVEL_RAMP = 0.07

export function tankLevelAt(progress: number) {
  const clamped = Math.min(Math.max(progress, 0), 1)
  let start = 0

  for (let index = 0; index < tourLegs.length; index++) {
    const end = legEnd[index]

    if (clamped <= end || index === tourLegs.length - 1) {
      const share = end - start
      const within = share > 0 ? (clamped - start) / share : 1
      const target = tourLegs[index].fill

      if (within >= LEVEL_RAMP) return target

      const before = tourLegs[(index + tourLegs.length - 1) % tourLegs.length].fill
      return before + (target - before) * (within / LEVEL_RAMP)
    }

    start = end
  }

  return 1
}

export const staticTourPosition = 0.75

const COS_30 = Math.cos(Math.PI / 6)

// The one isometric direction both renderers use: +x goes right and down,
// +z goes left and down, height goes up. A ground circle becomes an
// axis-aligned ellipse, hence the two factors below.
export function projectIso(x: number, z: number, y = 0): [number, number] {
  return [(x - z) * COS_30, (x + z) * 0.5 - y]
}

export const isoEllipseX = COS_30 * Math.SQRT2
export const isoEllipseY = 0.5 * Math.SQRT2

function markHeight(mark: TourMark) {
  if (mark.kind === 'depot') return depotHeight
  return mark.kind === 'refill' ? refillPostHeight : stopPostHeight
}

function projectedBounds() {
  const points: [number, number][] = []

  for (const block of cityBlocks) {
    for (const x of [block.x - block.width / 2, block.x + block.width / 2]) {
      for (const z of [block.z - block.depth / 2, block.z + block.depth / 2]) {
        points.push(projectIso(x, z, 0), projectIso(x, z, block.height))
      }
    }
  }

  for (const mark of tourMarks) {
    points.push(
      projectIso(mark.at[0], mark.at[1], 0),
      projectIso(mark.at[0], mark.at[1], markHeight(mark)),
    )
  }

  for (const leg of tourLegs) {
    for (const [x, z] of leg.points) points.push(projectIso(x, z, 0))
  }

  const pad = roadWidth
  const xs = points.map(([x]) => x)
  const ys = points.map(([, y]) => y)
  const minX = Math.min(...xs) - pad
  const maxX = Math.max(...xs) + pad
  const minY = Math.min(...ys) - pad
  const maxY = Math.max(...ys) + pad

  return { minX, minY, width: maxX - minX, height: maxY - minY }
}

const bounds = projectedBounds()

export const tourViewBox = [bounds.minX, bounds.minY, bounds.width, bounds.height].join(' ')

export const tourProjectedSize = { width: bounds.width, height: bounds.height }

// Ground shift that moves the projected drawing onto the projection origin, so
// the 3D camera can simply look at [0, 0, 0].
export const tourWorldOffset: GroundPoint = (() => {
  const targetX = -(bounds.minX + bounds.width / 2)
  const targetY = -(bounds.minY + bounds.height / 2)
  const along = targetX / COS_30

  return [(along + 2 * targetY) / 2, (2 * targetY - along) / 2]
})()
