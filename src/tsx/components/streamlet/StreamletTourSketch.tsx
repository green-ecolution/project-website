import {
  cityBlocks,
  depotHeight,
  depotSize,
  isoEllipseX,
  isoEllipseY,
  projectIso,
  refillPostHeight,
  roadWidth,
  stopPostHeight,
  tourColors,
  tourLegs,
  tourMarks,
  tourViewBox,
  type GroundPoint,
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

      {tourMarks.map((mark) => {
        if (mark.kind === 'depot') {
          return (
            <IsoBox
              key={mark.label}
              at={mark.at}
              width={depotSize}
              depth={depotSize}
              height={depotHeight}
              top="#4B7440"
              lit={tourColors.depot}
              shaded="#33512C"
            />
          )
        }

        const isRefill = mark.kind === 'refill'
        const color = isRefill ? tourColors.refill : tourColors.stop
        const ground = projectIso(mark.at[0], mark.at[1])
        const top = projectIso(mark.at[0], mark.at[1], isRefill ? refillPostHeight : stopPostHeight)

        return (
          <g key={mark.label}>
            {isRefill && (
              <ellipse
                cx={ground[0]}
                cy={ground[1]}
                rx={6 * isoEllipseX}
                ry={6 * isoEllipseY}
                fill="none"
                stroke={color}
                strokeWidth="0.9"
              />
            )}
            <line
              x1={ground[0]}
              y1={ground[1]}
              x2={top[0]}
              y2={top[1]}
              stroke={color}
              strokeWidth={isRefill ? 1.24 : 0.76}
            />
            <circle cx={top[0]} cy={top[1]} r={isRefill ? 1.18 : 0.72} fill={color} />
          </g>
        )
      })}
    </svg>
  )
}

export default StreamletTourSketch
