import {
  canopyCenterHeight,
  centerLine,
  cityBlocks,
  depotHeight,
  depotPosition,
  depotDepth,
  depotWidth,
  groundPlate,
  isoEllipseX,
  isoEllipseY,
  looseTrees,
  projectIso,
  refillMarker,
  roadWidth,
  roofUnits,
  staticVehiclePose,
  stopMarker,
  stopPlacements,
  stopTrees,
  tourColors,
  tourLegs,
  tourViewBox,
  type GroundPoint,
  type StopPlacement,
  type Tree,
} from '../../../data/streamletTour'

function roundedPath(points: [number, number][], radius: number) {
  let d = `M ${points[0][0]} ${points[0][1]}`

  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1]
    const [cx, cy] = points[i]
    const [nx, ny] = points[i + 1]
    const inLength = Math.hypot(cx - px, cy - py)
    const outLength = Math.hypot(nx - cx, ny - cy)
    const r = Math.min(radius, inLength / 2, outLength / 2)
    d += ` L ${cx - ((cx - px) / inLength) * r} ${cy - ((cy - py) / inLength) * r}`
    d += ` Q ${cx} ${cy} ${cx + ((nx - cx) / outLength) * r} ${cy + ((ny - cy) / outLength) * r}`
  }

  const [lastX, lastY] = points[points.length - 1]
  return `${d} L ${lastX} ${lastY}`
}

interface IsoBoxProps {
  at: GroundPoint
  width: number
  depth: number
  height: number
  base?: number
  top: string
  lit: string
  shaded: string
}

// Only the top, the +x and the +z faces face the camera in this projection.
// Light comes from the +z side, so that face is the lit one.
function IsoBox({ at, width, depth, height, base = 0, top, lit, shaded }: IsoBoxProps) {
  const [x, z] = at
  const west = x - width / 2
  const east = x + width / 2
  const north = z - depth / 2
  const south = z + depth / 2
  const roof = base + height
  const corner = (cx: number, cz: number, cy: number) => projectIso(cx, cz, cy).join(',')

  return (
    <g>
      <polygon
        points={[
          corner(west, south, base),
          corner(east, south, base),
          corner(east, south, roof),
          corner(west, south, roof),
        ].join(' ')}
        fill={lit}
      />
      <polygon
        points={[
          corner(east, north, base),
          corner(east, south, base),
          corner(east, south, roof),
          corner(east, north, roof),
        ].join(' ')}
        fill={shaded}
      />
      <polygon
        points={[
          corner(west, north, roof),
          corner(east, north, roof),
          corner(east, south, roof),
          corner(west, south, roof),
        ].join(' ')}
        fill={top}
      />
    </g>
  )
}

function Plate({ at, radius, color }: { at: GroundPoint; radius: number; color: string }) {
  const [x, y] = projectIso(at[0], at[1])

  return <ellipse cx={x} cy={y} rx={radius * isoEllipseX} ry={radius * isoEllipseY} fill={color} />
}

function Post({
  at,
  height,
  width,
  color,
}: {
  at: GroundPoint
  height: number
  width: number
  color: string
}) {
  const foot = projectIso(at[0], at[1])
  const head = projectIso(at[0], at[1], height)

  return (
    <line x1={foot[0]} y1={foot[1]} x2={head[0]} y2={head[1]} stroke={color} strokeWidth={width} />
  )
}

function StopPin({ stop }: { stop: StopPlacement }) {
  const cap = projectIso(stop.at[0], stop.at[1], stopMarker.postHeight)

  return (
    <g>
      <Plate at={stop.at} radius={stopMarker.plateRadius} color={tourColors.stop} />
      <Post
        at={stop.at}
        height={stopMarker.postHeight}
        width={stopMarker.postRadius * 2}
        color={tourColors.stop}
      />
      <ellipse
        cx={cap[0]}
        cy={cap[1]}
        rx={stopMarker.capRadius * isoEllipseX}
        ry={stopMarker.capRadius * isoEllipseY}
        fill={tourColors.stop}
      />
    </g>
  )
}

function RefillStation({ stop }: { stop: StopPlacement }) {
  const armFoot = projectIso(stop.at[0], stop.at[1], refillMarker.armHeight)
  const armTip = projectIso(
    stop.at[0] + stop.towardsRoad[0] * refillMarker.armLength,
    stop.at[1] + stop.towardsRoad[1] * refillMarker.armLength,
    refillMarker.armHeight,
  )
  const nozzle = projectIso(
    stop.at[0] + stop.towardsRoad[0] * refillMarker.armLength,
    stop.at[1] + stop.towardsRoad[1] * refillMarker.armLength,
    refillMarker.armHeight - refillMarker.nozzleLength,
  )

  return (
    <g>
      <Plate at={stop.at} radius={refillMarker.plateRadius} color={tourColors.refill} />
      <Post
        at={stop.at}
        height={refillMarker.postHeight}
        width={refillMarker.postRadius * 2}
        color={tourColors.refill}
      />
      <line
        x1={armFoot[0]}
        y1={armFoot[1]}
        x2={armTip[0]}
        y2={armTip[1]}
        stroke={tourColors.refill}
        strokeWidth={refillMarker.armRadius * 2}
      />
      <line
        x1={armTip[0]}
        y1={armTip[1]}
        x2={nozzle[0]}
        y2={nozzle[1]}
        stroke={tourColors.refill}
        strokeWidth={refillMarker.armRadius * 1.6}
      />
    </g>
  )
}

function TreeSketch({ tree }: { tree: Tree }) {
  const canopy = projectIso(tree.at[0], tree.at[1], canopyCenterHeight(tree))

  return (
    <g>
      <Post at={tree.at} height={tree.trunkHeight} width={0.56} color={tourColors.treeTrunk} />
      <circle
        cx={canopy[0]}
        cy={canopy[1]}
        r={tree.canopyRadius}
        fill={tree.dark ? tourColors.treeCanopyDark : tourColors.treeCanopy}
      />
    </g>
  )
}

// Pin and tree stand close together, so the pair has to paint back to front.
function StopWithTree({ stop, tree }: { stop: StopPlacement; tree: Tree }) {
  const treeInFront = tree.at[0] + tree.at[1] > stop.at[0] + stop.at[1]

  return treeInFront ? (
    <g>
      <StopPin stop={stop} />
      <TreeSketch tree={tree} />
    </g>
  ) : (
    <g>
      <TreeSketch tree={tree} />
      <StopPin stop={stop} />
    </g>
  )
}

// The vehicle only ever parks on a straight run, so its silhouette can be
// stacked from axis-aligned boxes.
function VehicleSketch() {
  const { at, heading } = staticVehiclePose
  const alongX = Math.abs(heading[0]) > Math.abs(heading[1])
  const oriented = (length: number, width: number) =>
    alongX ? { width: length, depth: width } : { width, depth: length }
  const ahead = (distance: number): GroundPoint => [
    at[0] + heading[0] * distance,
    at[1] + heading[1] * distance,
  ]

  return (
    <g>
      <IsoBox
        at={at}
        {...oriented(10.4, 3.4)}
        height={1.3}
        top="#375A2F"
        lit={tourColors.vehicleBody}
        shaded="#24391F"
      />
      <IsoBox
        at={ahead(3.6)}
        {...oriented(2.8, 3.2)}
        base={1.3}
        height={2.45}
        top="#375A2F"
        lit={tourColors.vehicleBody}
        shaded="#24391F"
      />
      <IsoBox
        at={ahead(-1.2)}
        {...oriented(6.4, 3.3)}
        base={1.3}
        height={3.15}
        top={tourColors.blockTop}
        lit={tourColors.vehicleTank}
        shaded={tourColors.blockShaded}
      />
    </g>
  )
}

function plateOutline(lift: number) {
  const { minX, minZ, width, depth, radius } = groundPlate
  const maxX = minX + width
  const maxZ = minZ + depth
  const p = (x: number, z: number) => projectIso(x, z, lift).join(' ')

  return [
    `M ${p(minX + radius, minZ)}`,
    `L ${p(maxX - radius, minZ)}`,
    `Q ${p(maxX, minZ)} ${p(maxX, minZ + radius)}`,
    `L ${p(maxX, maxZ - radius)}`,
    `Q ${p(maxX, maxZ)} ${p(maxX - radius, maxZ)}`,
    `L ${p(minX + radius, maxZ)}`,
    `Q ${p(minX, maxZ)} ${p(minX, maxZ - radius)}`,
    `L ${p(minX, minZ + radius)}`,
    `Q ${p(minX, minZ)} ${p(minX + radius, minZ)}`,
    'Z',
  ].join(' ')
}

const plateTop = plateOutline(0)
const plateSide = plateOutline(-groundPlate.thickness)

const sortedBlocks = [...cityBlocks].sort((a, b) => a.x + a.z - (b.x + b.z))

const sortedLooseTrees = [...looseTrees].sort((a, b) => a.at[0] + a.at[1] - (b.at[0] + b.at[1]))

const stopsOnly = stopPlacements.filter((stop) => stop.kind === 'stop')

const roadPath = roundedPath(
  tourLegs
    .flatMap((leg, index) => (index === 0 ? leg.points : leg.points.slice(1)))
    .map(([x, z]) => projectIso(x, z)),
  5,
)

function StreamletTourSketch() {
  return (
    <svg viewBox={tourViewBox} className="w-full" aria-hidden="true">
      <path d={plateSide} fill={tourColors.groundSide} />
      <path d={plateTop} fill={tourColors.ground} />

      {sortedBlocks.map((block) => (
        <IsoBox
          key={`${block.x}-${block.z}`}
          at={[block.x, block.z]}
          width={block.width}
          depth={block.depth}
          height={block.height}
          top={tourColors.blockTop}
          lit={tourColors.block}
          shaded={tourColors.blockShaded}
        />
      ))}

      {roofUnits.map((unit) => (
        <IsoBox
          key={`${unit.at[0]}-${unit.at[1]}`}
          at={unit.at}
          width={unit.width}
          depth={unit.depth}
          height={unit.height}
          base={unit.base}
          top={tourColors.unitTop}
          lit={tourColors.unitLit}
          shaded={tourColors.unitShaded}
        />
      ))}

      <path
        d={roadPath}
        fill="none"
        stroke={tourColors.road}
        strokeWidth={roadWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d={roadPath}
        fill="none"
        stroke={tourColors.roadLine}
        strokeWidth={centerLine.width}
        strokeDasharray={`${centerLine.dash} ${centerLine.gap}`}
        strokeLinejoin="round"
      />

      <IsoBox
        at={depotPosition}
        width={depotWidth}
        depth={depotDepth}
        height={depotHeight}
        top="#4B7440"
        lit={tourColors.depot}
        shaded="#33512C"
      />

      {sortedLooseTrees.map((tree) => (
        <TreeSketch key={`${tree.at[0]}-${tree.at[1]}`} tree={tree} />
      ))}

      <VehicleSketch />

      {stopPlacements.map((stop) =>
        stop.kind === 'refill' ? (
          <RefillStation key={stop.label} stop={stop} />
        ) : (
          <StopWithTree key={stop.label} stop={stop} tree={stopTrees[stopsOnly.indexOf(stop)]} />
        ),
      )}
    </svg>
  )
}

export default StreamletTourSketch
