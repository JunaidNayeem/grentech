"use client"

import { Canvas } from "@react-three/fiber"

import { BRAND, TEAL, ConnectionLines, NodeMesh, SceneLights, useAutoRotate, type NodeSpec } from "@/components/three/scene-primitives"

const NODES: NodeSpec[] = [
  { position: [0, 0, 0], scale: 0.95, geometry: "icosahedron", color: BRAND, speed: 0.4 },
  { position: [-1.6, 0.5, 0.3], scale: 0.3, geometry: "sphere", color: TEAL, speed: 0.9 },
  { position: [1.5, -0.4, -0.3], scale: 0.26, geometry: "sphere", color: TEAL, speed: 1.0 },
  { position: [0.2, 1.4, -0.4], scale: 0.24, geometry: "sphere", color: BRAND, speed: 1.1 },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
]

function Scene() {
  const groupRef = useAutoRotate(0.04)
  return (
    <>
      <SceneLights accent={BRAND} fill={TEAL} />
      <group ref={groupRef}>
        {NODES.map((node, i) => (
          <NodeMesh key={i} node={node} />
        ))}
        <ConnectionLines nodes={NODES} connections={CONNECTIONS} color={TEAL} />
      </group>
    </>
  )
}

/** A single calm centrepiece with a few orbiting nodes — deliberately quiet, no pointer parallax. */
export function AboutScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  )
}
