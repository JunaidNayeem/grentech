"use client"

import { Canvas } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"

import {
  BRAND,
  LIME,
  ConnectionLines,
  NodeMesh,
  PointerRig,
  SceneLights,
  useAutoRotate,
  type NodeSpec,
} from "@/components/three/scene-primitives"

const NODES: NodeSpec[] = [
  { position: [0, 0, 0], scale: 0.6, geometry: "icosahedron", color: LIME, speed: 0.5 },
  { position: [-1.6, 0.9, 0.2], scale: 0.3, geometry: "sphere", color: BRAND, speed: 1.0 },
  { position: [1.6, 0.7, -0.2], scale: 0.28, geometry: "sphere", color: BRAND, speed: 1.1 },
  { position: [-1.3, -1.1, -0.3], scale: 0.26, geometry: "sphere", color: BRAND, speed: 0.95 },
  { position: [1.3, -1.0, 0.3], scale: 0.3, geometry: "sphere", color: BRAND, speed: 1.05 },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]

function Scene() {
  const groupRef = useAutoRotate(0.09)
  return (
    <>
      <SceneLights accent={LIME} fill={BRAND} />
      <group ref={groupRef}>
        {NODES.map((node, i) => (
          <NodeMesh key={i} node={node} />
        ))}
        <ConnectionLines nodes={NODES} connections={CONNECTIONS} color={LIME} />
      </group>
      <Sparkles count={30} scale={[5, 4, 3]} size={2} speed={0.35} color={BRAND} opacity={0.5} />
      <PointerRig />
    </>
  )
}

/** Every node reaching toward one central point — a single, direct line of contact. */
export function ContactScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  )
}
