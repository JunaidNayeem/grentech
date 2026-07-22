"use client"

import { Canvas } from "@react-three/fiber"

import {
  AMBER,
  LIME,
  ConnectionLines,
  NodeMesh,
  PointerRig,
  SceneLights,
  useAutoRotate,
  type NodeSpec,
} from "@/components/three/scene-primitives"

const NODES: NodeSpec[] = [
  { position: [-0.6, -1.4, 0], scale: 0.55, geometry: "box", color: AMBER, speed: 0.7 },
  { position: [-0.2, -0.5, 0.15], scale: 0.5, geometry: "box", color: LIME, speed: 0.85 },
  { position: [0.2, 0.4, 0.3], scale: 0.46, geometry: "box", color: AMBER, speed: 0.95 },
  { position: [0.6, 1.3, 0.45], scale: 0.4, geometry: "icosahedron", color: LIME, speed: 1.1 },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
]

function Scene() {
  const groupRef = useAutoRotate(0.07)
  return (
    <>
      <SceneLights accent={AMBER} fill={LIME} />
      <group ref={groupRef}>
        {NODES.map((node, i) => (
          <NodeMesh key={i} node={node} />
        ))}
        <ConnectionLines nodes={NODES} connections={CONNECTIONS} color={AMBER} />
      </group>
      <PointerRig />
    </>
  )
}

/** A leaning stack of ideas, bottom to top — thinking beyond the build. */
export function InsightsScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  )
}
