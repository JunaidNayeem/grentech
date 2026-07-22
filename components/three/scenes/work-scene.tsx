"use client"

import { Canvas } from "@react-three/fiber"

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
  { position: [-1.6, 0.8, 0], scale: 0.38, geometry: "icosahedron", color: BRAND, speed: 0.6 },
  { position: [0, 0.8, 0], scale: 0.38, geometry: "icosahedron", color: BRAND, speed: 0.7 },
  { position: [1.6, 0.8, 0], scale: 0.38, geometry: "icosahedron", color: LIME, speed: 0.65 },
  { position: [-1.6, -0.8, 0], scale: 0.38, geometry: "icosahedron", color: LIME, speed: 0.75 },
  { position: [0, -0.8, 0], scale: 0.38, geometry: "icosahedron", color: BRAND, speed: 0.68 },
  { position: [1.6, -0.8, 0], scale: 0.38, geometry: "icosahedron", color: BRAND, speed: 0.72 },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [3, 4],
  [4, 5],
  [0, 3],
  [1, 4],
  [2, 5],
]

function Scene() {
  const groupRef = useAutoRotate(0.05)
  return (
    <>
      <SceneLights accent={BRAND} fill={LIME} />
      <group ref={groupRef}>
        {NODES.map((node, i) => (
          <NodeMesh key={i} node={node} />
        ))}
        <ConnectionLines nodes={NODES} connections={CONNECTIONS} color={LIME} />
      </group>
      <PointerRig />
    </>
  )
}

/** A neat, ordered lattice — fragmented work turned into a structured grid. */
export function WorkScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  )
}
