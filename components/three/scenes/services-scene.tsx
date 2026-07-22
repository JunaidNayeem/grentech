"use client"

import { Canvas } from "@react-three/fiber"

import {
  BRAND,
  TEAL,
  LIME,
  ConnectionLines,
  NodeMesh,
  PointerRig,
  SceneLights,
  useAutoRotate,
  type NodeSpec,
} from "@/components/three/scene-primitives"

const NODES: NodeSpec[] = [
  { position: [-1.3, 1, 0.2], scale: 0.5, geometry: "box", color: BRAND, speed: 0.8 },
  { position: [1.3, 1, -0.2], scale: 0.5, geometry: "box", color: TEAL, speed: 1.0 },
  { position: [-1.3, -1, -0.2], scale: 0.5, geometry: "box", color: TEAL, speed: 1.1 },
  { position: [1.3, -1, 0.2], scale: 0.5, geometry: "box", color: BRAND, speed: 0.9 },
  { position: [0, 0, 0.9], scale: 0.62, geometry: "icosahedron", color: LIME, speed: 1.2 },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
]

function Scene() {
  const groupRef = useAutoRotate(0.08)
  return (
    <>
      <SceneLights accent={LIME} fill={BRAND} />
      <group ref={groupRef}>
        {NODES.map((node, i) => (
          <NodeMesh key={i} node={node} />
        ))}
        <ConnectionLines nodes={NODES} connections={CONNECTIONS} color={BRAND} />
      </group>
      <PointerRig />
    </>
  )
}

/** Modular blocks connected through a central hub — "from idea to dependable software." */
export function ServicesScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  )
}
