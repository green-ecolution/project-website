import {
  cityBlocks,
  depotHeight,
  depotPosition,
  depotDepth,
  depotWidth,
  isoEllipseX,
  isoEllipseY,
  projectIso,
  refillMarker,
  roadWidth,
  stopMarker,
  stopPlacements,
  tourColors,
  tourLegs,
  tourViewBox,
  type GroundPoint,
  type StopPlacement,
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
  top: string
  lit: string
  shaded: string
}

// Only the top, the +x and the +z faces face the camera in this projection.
// Light comes from the +z side, so that face is the lit one.
function IsoBox({ at, width, depth, height, top, lit, shaded }: IsoBoxProps) {
  const [x, z] = at
  const west = x - width / 2
  const east = x + width / 2
  const north = z - depth / 2
  const south = z + depth / 2
  const corner = (cx: number, cz: number, cy: number) => projectIso(cx, cz, cy).join(',')

  return (
    <g>
      <polygon
        points={[
          corner(west, south, 0),
          corner(east, south, 0),
          corner(east, south, height),
          corner(west, south, height),
        ].join(' ')}
        fill={lit}
      />
      <polygon
        points={[
          corner(east, north, 0),
          corner(east, south, 0),
          corner(east, south, height),
          corner(east, north, height),
        ].join(' ')}
        fill={shaded}
      />
      <polygon
        points={[
          corner(west, north, height),
          corner(east, north, height),
          corner(east, south, height),
          corner(west, south, height),
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

const sortedBlocks = [...cityBlocks].sort((a, b) => a.x + a.z - (b.x + b.z))

const roadPath = roundedPath(
  tourLegs
    .flatMap((leg, index) => (index === 0 ? leg.points : leg.points.slice(1)))
    .map(([x, z]) => projectIso(x, z)),
  5,
)

function StreamletTourSketch() {
  return (
    <svg viewBox={tourViewBox} className="w-full" aria-hidden="true">
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

      <path
        d={roadPath}
        fill="none"
        stroke={tourColors.road}
        strokeWidth={roadWidth}
        strokeLinecap="round"
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

      {stopPlacements.map((stop) =>
        stop.kind === 'refill' ? (
          <RefillStation key={stop.label} stop={stop} />
        ) : (
          <StopPin key={stop.label} stop={stop} />
        ),
      )}
    </svg>
  )
}

export default StreamletTourSketch
