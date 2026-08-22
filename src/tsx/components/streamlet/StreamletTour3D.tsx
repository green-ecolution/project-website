import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, type RefObject } from 'react'
import {
  BufferGeometry,
  CatmullRomCurve3,
  DoubleSide,
  Float32BufferAttribute,
  Vector3,
  type Group,
} from 'three'
import {
  cityBlocks,
  depotHeight,
  depotSize,
  refillPostHeight,
  roadHeight,
  roadWidth,
  staticTourPosition,
  stopPostHeight,
  tankLevelAt,
  tourColors,
  tourLegs,
  tourMarks,
  tourProjectedSize,
  tourWorldOffset,
  type GroundPoint,
} from '../../../data/streamletTour'

const TOUR_SECONDS = 20

const [offsetX, offsetZ] = tourWorldOffset

function toWorld([x, z]: GroundPoint, y: number) {
  return new Vector3(x + offsetX, y, z + offsetZ)
}

const tourCurve = new CatmullRomCurve3(
  tourLegs
    .flatMap((leg, index) => (index === 0 ? leg.points : leg.points.slice(1)))
    .map((point) => toWorld(point, roadHeight)),
  false,
  'centripetal',
)

// A flat ribbon along the curve rather than a tube: the route is a road the
// vehicle drives on.
function roadGeometry(curve: CatmullRomCurve3, width: number, segments: number) {
  const half = width / 2
  const position: number[] = []
  const normal: number[] = []
  const index: number[] = []
  const side = new Vector3()

  for (let i = 0; i <= segments; i++) {
    const at = i / segments
    const point = curve.getPointAt(at)
    const tangent = curve.getTangentAt(at)
    side.set(-tangent.z, 0, tangent.x).normalize().multiplyScalar(half)

    position.push(point.x + side.x, point.y, point.z + side.z)
    position.push(point.x - side.x, point.y, point.z - side.z)
    normal.push(0, 1, 0, 0, 1, 0)
  }

  for (let i = 0; i < segments; i++) {
    const corner = i * 2
    index.push(corner, corner + 1, corner + 2, corner + 1, corner + 3, corner + 2)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(position, 3))
  geometry.setAttribute('normal', new Float32BufferAttribute(normal, 3))
  geometry.setIndex(index)

  return geometry
}

const road = roadGeometry(tourCurve, roadWidth, 420)

function headingAt(at: number) {
  const tangent = tourCurve.getTangentAt(at)
  return Math.atan2(tangent.x, tangent.z)
}

interface TourProps {
  isStatic: boolean
  levelRef: RefObject<HTMLDivElement | null>
}

function Vehicle({ isStatic, levelRef }: TourProps) {
  const group = useRef<Group>(null)
  const start = isStatic ? staticTourPosition : 0

  useFrame(({ clock }) => {
    if (isStatic || !group.current) return

    const progress = (clock.getElapsedTime() % TOUR_SECONDS) / TOUR_SECONDS
    const point = tourCurve.getPointAt(progress)

    const tangent = tourCurve.getTangentAt(progress)

    group.current.position.copy(point)
    group.current.rotation.y = Math.atan2(tangent.x, tangent.z)

    if (levelRef.current) {
      levelRef.current.style.transform = `scaleY(${tankLevelAt(progress)})`
    }
  })

  return (
    <group
      ref={group}
      position={tourCurve.getPointAt(start)}
      // the truck is modelled facing its own +z
      rotation={[0, headingAt(start), 0]}
    >
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[3.4, 1, 10.4]} />
        <meshLambertMaterial color={tourColors.vehicleBody} />
      </mesh>

      <mesh position={[0, 2.6, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.85, 1.85, 6.4, 20]} />
        <meshLambertMaterial color={tourColors.vehicleTank} />
      </mesh>

      <mesh position={[0, 2.35, 3.6]}>
        <boxGeometry args={[3.2, 2.8, 2.8]} />
        <meshLambertMaterial color={tourColors.vehicleBody} />
      </mesh>
    </group>
  )
}

function TourModel({ isStatic, levelRef }: TourProps) {
  const size = useThree((state) => state.size)
  const fit = Math.min(size.width / tourProjectedSize.width, size.height / tourProjectedSize.height)

  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight position={[-45, 80, 60]} intensity={1.5} />

      <group scale={fit}>
        {cityBlocks.map((block) => (
          <mesh
            key={`${block.x}-${block.z}`}
            position={[block.x + offsetX, block.height / 2, block.z + offsetZ]}
          >
            <boxGeometry args={[block.width, block.height, block.depth]} />
            <meshLambertMaterial color={tourColors.block} />
          </mesh>
        ))}

        <mesh geometry={road}>
          <meshLambertMaterial color={tourColors.road} side={DoubleSide} />
        </mesh>

        {tourMarks.map((mark) => {
          if (mark.kind === 'depot') {
            return (
              <mesh
                key={mark.label}
                position={[mark.at[0] + offsetX, depotHeight / 2, mark.at[1] + offsetZ]}
              >
                <boxGeometry args={[depotSize, depotHeight, depotSize]} />
                <meshLambertMaterial color={tourColors.depot} />
              </mesh>
            )
          }

          const isRefill = mark.kind === 'refill'
          const height = isRefill ? refillPostHeight : stopPostHeight
          const radius = isRefill ? 0.62 : 0.38
          const color = isRefill ? tourColors.refill : tourColors.stop

          return (
            <group key={mark.label}>
              <mesh position={toWorld(mark.at, height / 2)}>
                <cylinderGeometry args={[radius, radius, height, 16]} />
                <meshLambertMaterial color={color} />
              </mesh>

              <mesh position={toWorld(mark.at, height)}>
                <sphereGeometry args={[radius * 1.9, 16, 12]} />
                <meshLambertMaterial color={color} />
              </mesh>

              {isRefill && (
                <mesh position={toWorld(mark.at, 0.3)} rotation={[-Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[6, 0.45, 8, 48]} />
                  <meshLambertMaterial color={color} />
                </mesh>
              )}
            </group>
          )
        })}

        <Vehicle isStatic={isStatic} levelRef={levelRef} />
      </group>
    </>
  )
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
      <TourModel isStatic={isStatic} levelRef={levelRef} />
    </Canvas>
  )
}

export default StreamletTour3D
