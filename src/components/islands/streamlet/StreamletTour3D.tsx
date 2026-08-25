import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, type RefObject } from 'react'
import {
  BufferGeometry,
  CatmullRomCurve3,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Shape,
  Vector3,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
} from 'three'
import {
  canopyCenterHeight,
  centerLine,
  cityBlocks,
  depotHeight,
  depotPosition,
  depotDepth,
  depotWidth,
  dwellAnchors,
  groundPlate,
  refillMarker,
  roadHeight,
  roadWidth,
  roofUnits,
  staticTourPosition,
  stopMarker,
  stopPlacements,
  tourColors,
  tourFrame,
  tourLegs,
  tourProjectedSize,
  tourWorldOffset,
  trees,
  type GroundPoint,
  type StopPlacement,
  type Tree,
} from '../../../data/streamletTour'

// A camera at [d, d, d] foreshortens by sqrt(2/3) against the 2:1 projection
// projectIso() uses, so the scene has to be scaled back up by that much to fill
// the frame the shared bounds describe.
const ISO_FORESHORTENING = Math.sqrt(2 / 3)

const [offsetX, offsetZ] = tourWorldOffset

function toWorld([x, z]: GroundPoint, y: number) {
  return new Vector3(x + offsetX, y, z + offsetZ)
}

function facing([x, z]: GroundPoint) {
  return Math.atan2(x, z)
}

const tourCurve = new CatmullRomCurve3(
  tourLegs
    .flatMap((leg, index) => (index === 0 ? leg.points : leg.points.slice(1)))
    .map((point) => toWorld(point, roadHeight)),
  false,
  'centripetal',
)

interface RibbonArrays {
  position: number[]
  normal: number[]
  index: number[]
}

function appendRibbon(
  arrays: RibbonArrays,
  curve: CatmullRomCurve3,
  width: number,
  lift: number,
  from: number,
  to: number,
  segments: number,
) {
  const half = width / 2
  const side = new Vector3()
  const base = arrays.position.length / 3

  for (let i = 0; i <= segments; i++) {
    const at = from + ((to - from) * i) / segments
    const point = curve.getPointAt(at)
    const tangent = curve.getTangentAt(at)
    side.set(-tangent.z, 0, tangent.x).normalize().multiplyScalar(half)

    arrays.position.push(point.x + side.x, point.y + lift, point.z + side.z)
    arrays.position.push(point.x - side.x, point.y + lift, point.z - side.z)
    arrays.normal.push(0, 1, 0, 0, 1, 0)
  }

  for (let i = 0; i < segments; i++) {
    const corner = base + i * 2
    arrays.index.push(corner, corner + 1, corner + 2, corner + 1, corner + 3, corner + 2)
  }
}

function ribbonGeometry(arrays: RibbonArrays) {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(arrays.position, 3))
  geometry.setAttribute('normal', new Float32BufferAttribute(arrays.normal, 3))
  geometry.setIndex(arrays.index)
  return geometry
}

// A flat ribbon along the curve rather than a tube: the route is a road the
// vehicle drives on.
const road = (() => {
  const arrays: RibbonArrays = { position: [], normal: [], index: [] }
  appendRibbon(arrays, tourCurve, roadWidth, 0, 0, 1, 420)
  return ribbonGeometry(arrays)
})()

const roadCenterLine = (() => {
  const arrays: RibbonArrays = { position: [], normal: [], index: [] }
  const length = tourCurve.getLength()
  const pattern = centerLine.dash + centerLine.gap
  const dashes = Math.floor(length / pattern)

  for (let i = 0; i < dashes; i++) {
    const from = (i * pattern) / length
    const to = Math.min(1, (i * pattern + centerLine.dash) / length)
    appendRibbon(arrays, tourCurve, centerLine.width, centerLine.lift, from, to, 6)
  }

  return ribbonGeometry(arrays)
})()

const ground = (() => {
  const { minX, minZ, width, depth, radius, thickness } = groundPlate
  const maxX = minX + width
  const maxZ = minZ + depth
  const shape = new Shape()

  shape.moveTo(minX + radius, minZ)
  shape.lineTo(maxX - radius, minZ)
  shape.quadraticCurveTo(maxX, minZ, maxX, minZ + radius)
  shape.lineTo(maxX, maxZ - radius)
  shape.quadraticCurveTo(maxX, maxZ, maxX - radius, maxZ)
  shape.lineTo(minX + radius, maxZ)
  shape.quadraticCurveTo(minX, maxZ, minX, maxZ - radius)
  shape.lineTo(minX, minZ + radius)
  shape.quadraticCurveTo(minX, minZ, minX + radius, minZ)

  return new ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false })
})()

function headingAt(at: number) {
  const tangent = tourCurve.getTangentAt(at)
  return Math.atan2(tangent.x, tangent.z)
}

interface TourProps {
  isStatic: boolean
  levelRef: RefObject<HTMLDivElement | null>
}

function StopPin({ stop }: { stop: StopPlacement }) {
  return (
    <group position={toWorld(stop.at, 0)}>
      <mesh position={[0, stopMarker.plateHeight / 2, 0]}>
        <cylinderGeometry
          args={[stopMarker.plateRadius, stopMarker.plateRadius, stopMarker.plateHeight, 20]}
        />
        <meshLambertMaterial color={tourColors.stop} />
      </mesh>

      <mesh position={[0, stopMarker.postHeight / 2, 0]}>
        <cylinderGeometry
          args={[stopMarker.postRadius, stopMarker.postRadius, stopMarker.postHeight, 12]}
        />
        <meshLambertMaterial color={tourColors.stop} />
      </mesh>

      <mesh position={[0, stopMarker.postHeight + stopMarker.capHeight / 2, 0]}>
        <cylinderGeometry
          args={[stopMarker.capRadius, stopMarker.capRadius, stopMarker.capHeight, 20]}
        />
        <meshLambertMaterial color={tourColors.stop} />
      </mesh>
    </group>
  )
}

function RefillStation({ stop }: { stop: StopPlacement }) {
  return (
    <group position={toWorld(stop.at, 0)}>
      <mesh position={[0, refillMarker.plateHeight / 2, 0]}>
        <cylinderGeometry
          args={[refillMarker.plateRadius, refillMarker.plateRadius, refillMarker.plateHeight, 24]}
        />
        <meshLambertMaterial color={tourColors.refill} />
      </mesh>

      <mesh position={[0, refillMarker.postHeight / 2, 0]}>
        <cylinderGeometry
          args={[refillMarker.postRadius, refillMarker.postRadius, refillMarker.postHeight, 16]}
        />
        <meshLambertMaterial color={tourColors.refill} />
      </mesh>

      <group rotation={[0, facing(stop.towardsRoad), 0]}>
        <mesh
          position={[0, refillMarker.armHeight, refillMarker.armLength / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry
            args={[refillMarker.armRadius, refillMarker.armRadius, refillMarker.armLength, 12]}
          />
          <meshLambertMaterial color={tourColors.refill} />
        </mesh>

        <mesh
          position={[
            0,
            refillMarker.armHeight - refillMarker.nozzleLength / 2,
            refillMarker.armLength,
          ]}
        >
          <cylinderGeometry
            args={[
              refillMarker.armRadius * 0.8,
              refillMarker.armRadius * 0.8,
              refillMarker.nozzleLength,
              12,
            ]}
          />
          <meshLambertMaterial color={tourColors.refill} />
        </mesh>
      </group>
    </group>
  )
}

function TreeModel({ tree }: { tree: Tree }) {
  return (
    <group position={toWorld(tree.at, 0)}>
      <mesh position={[0, tree.trunkHeight / 2, 0]}>
        <cylinderGeometry args={[0.24, 0.32, tree.trunkHeight, 8]} />
        <meshLambertMaterial color={tourColors.treeTrunk} />
      </mesh>

      <mesh position={[0, canopyCenterHeight(tree), 0]}>
        <sphereGeometry args={[tree.canopyRadius, 16, 12]} />
        <meshLambertMaterial
          color={tree.dark ? tourColors.treeCanopyDark : tourColors.treeCanopy}
        />
      </mesh>
    </group>
  )
}

const wheelPositions: readonly (readonly [number, number])[] = [
  [1.55, 3.4],
  [-1.55, 3.4],
  [1.55, -1],
  [-1.55, -1],
  [1.55, -3],
  [-1.55, -3],
]

// the truck is modelled facing its own +z
function Vehicle() {
  return (
    <>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[3.4, 0.9, 10.4]} />
        <meshLambertMaterial color={tourColors.vehicleBody} />
      </mesh>

      {wheelPositions.map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.55, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.55, 0.55, 0.5, 14]} />
          <meshLambertMaterial color={tourColors.vehicleWheel} />
        </mesh>
      ))}

      <mesh position={[0, 2.6, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.85, 1.85, 6.4, 20]} />
        <meshLambertMaterial color={tourColors.vehicleTank} />
      </mesh>

      {[-3.4, -1.2, 1].map((z) => (
        <mesh key={z} position={[0, 2.6, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.92, 1.92, 0.3, 20]} />
          <meshLambertMaterial color={tourColors.vehicleBody} />
        </mesh>
      ))}

      <mesh position={[0, 4.5, -1.2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.5, 10]} />
        <meshLambertMaterial color={tourColors.vehicleBody} />
      </mesh>

      <mesh position={[0, 2.35, 3.6]}>
        <boxGeometry args={[3.2, 2.8, 2.8]} />
        <meshLambertMaterial color={tourColors.vehicleBody} />
      </mesh>

      <mesh position={[0, 2.9, 5.02]}>
        <boxGeometry args={[2.7, 1.2, 0.12]} />
        <meshLambertMaterial color={tourColors.vehicleGlass} />
      </mesh>

      {[1.62, -1.62].map((x) => (
        <mesh key={x} position={[x, 2.9, 3.9]}>
          <boxGeometry args={[0.12, 1.1, 1.6]} />
          <meshLambertMaterial color={tourColors.vehicleGlass} />
        </mesh>
      ))}
    </>
  )
}

const rippleWaves = 2

function TourAnimation({ isStatic, levelRef }: TourProps) {
  const vehicle = useRef<Group>(null)
  const ripple = useRef<Mesh>(null)
  const stream = useRef<Mesh>(null)
  const start = isStatic ? staticTourPosition : 0

  useFrame(({ clock }) => {
    if (isStatic) return

    const frame = tourFrame(clock.getElapsedTime())

    if (vehicle.current) {
      const point = tourCurve.getPointAt(frame.at)
      const tangent = tourCurve.getTangentAt(frame.at)
      vehicle.current.position.copy(point)
      vehicle.current.rotation.y = Math.atan2(tangent.x, tangent.z)
    }

    if (levelRef.current) {
      levelRef.current.style.transform = `scaleY(${frame.level})`
    }

    const anchor = frame.dwellMark ? dwellAnchors.get(frame.dwellMark) : undefined
    const fade = Math.min(1, frame.dwellProgress * 4, (1 - frame.dwellProgress) * 4)

    if (ripple.current) {
      const watering = frame.dwellMark?.kind === 'stop' && anchor !== undefined
      ripple.current.visible = watering

      if (watering && anchor) {
        const wave = (frame.dwellProgress * rippleWaves) % 1
        const spread = 0.7 + wave * 1.1
        ripple.current.position.set(anchor[0] + offsetX, 0.06, anchor[1] + offsetZ)
        ripple.current.scale.set(spread, spread, 1)
        ;(ripple.current.material as MeshBasicMaterial).opacity = 0.55 * (1 - wave) * fade
      }
    }

    if (stream.current) {
      const filling = frame.dwellMark?.kind === 'refill' && anchor !== undefined
      stream.current.visible = filling

      if (filling && anchor) {
        stream.current.position.set(
          anchor[0] + offsetX,
          refillMarker.armHeight - refillMarker.nozzleLength - 0.3,
          anchor[1] + offsetZ,
        )
        ;(stream.current.material as MeshBasicMaterial).opacity = 0.8 * fade
      }
    }
  })

  return (
    <>
      <group
        ref={vehicle}
        position={tourCurve.getPointAt(start)}
        rotation={[0, headingAt(start), 0]}
      >
        <Vehicle />
      </group>

      {!isStatic && (
        <>
          <mesh ref={ripple} visible={false} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.85, 1.12, 32]} />
            <meshBasicMaterial
              color={tourColors.water}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>

          <mesh ref={stream} visible={false}>
            <cylinderGeometry args={[0.16, 0.11, 0.6, 10]} />
            <meshBasicMaterial
              color={tourColors.water}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        </>
      )}
    </>
  )
}

function TourModel({ isStatic, levelRef }: TourProps) {
  const size = useThree((state) => state.size)
  const fit =
    Math.min(size.width / tourProjectedSize.width, size.height / tourProjectedSize.height) /
    ISO_FORESHORTENING

  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight position={[-45, 80, 60]} intensity={1.5} />

      <group scale={fit}>
        <mesh geometry={ground} rotation={[Math.PI / 2, 0, 0]} position={[offsetX, 0, offsetZ]}>
          <meshLambertMaterial color={tourColors.ground} />
        </mesh>

        {cityBlocks.map((block) => (
          <mesh
            key={`${block.x}-${block.z}`}
            position={[block.x + offsetX, block.height / 2, block.z + offsetZ]}
          >
            <boxGeometry args={[block.width, block.height, block.depth]} />
            <meshLambertMaterial color={tourColors.block} />
          </mesh>
        ))}

        {roofUnits.map((unit) => (
          <mesh
            key={`${unit.at[0]}-${unit.at[1]}`}
            position={[unit.at[0] + offsetX, unit.base + unit.height / 2, unit.at[1] + offsetZ]}
          >
            <boxGeometry args={[unit.width, unit.height, unit.depth]} />
            <meshLambertMaterial color={tourColors.unitLit} />
          </mesh>
        ))}

        <mesh geometry={road}>
          <meshLambertMaterial color={tourColors.road} side={DoubleSide} />
        </mesh>

        <mesh geometry={roadCenterLine}>
          <meshLambertMaterial color={tourColors.roadLine} side={DoubleSide} />
        </mesh>

        <mesh position={toWorld(depotPosition, depotHeight / 2)}>
          <boxGeometry args={[depotWidth, depotHeight, depotDepth]} />
          <meshLambertMaterial color={tourColors.depot} />
        </mesh>

        {trees.map((tree) => (
          <TreeModel key={`${tree.at[0]}-${tree.at[1]}`} tree={tree} />
        ))}

        {stopPlacements.map((stop) =>
          stop.kind === 'refill' ? (
            <RefillStation key={stop.label} stop={stop} />
          ) : (
            <StopPin key={stop.label} stop={stop} />
          ),
        )}

        <TourAnimation isStatic={isStatic} levelRef={levelRef} />
      </group>
    </>
  )
}

// The ClientRouter swaps the document rather than unmounting react, so fiber's
// own teardown does not run reliably. Without this a visitor accumulates one
// webgl context per visit to this page until the browser reclaims them.
function ReleaseContextOnNavigate() {
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    const release = () => {
      gl.forceContextLoss()
      gl.dispose()
    }

    document.addEventListener('astro:before-swap', release)
    return () => document.removeEventListener('astro:before-swap', release)
  }, [gl])

  return null
}

function StreamletTour3D({ isStatic, levelRef }: TourProps) {
  return (
    <Canvas
      flat
      orthographic
      dpr={[1, 2]}
      frameloop={isStatic ? 'demand' : 'always'}
      camera={{ position: [1200, 1200, 1200], near: 1, far: 6000, zoom: 1 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      gl={{ antialias: true, alpha: true }}
      className="h-full w-full"
    >
      <ReleaseContextOnNavigate />
      <TourModel isStatic={isStatic} levelRef={levelRef} />
    </Canvas>
  )
}

export default StreamletTour3D
