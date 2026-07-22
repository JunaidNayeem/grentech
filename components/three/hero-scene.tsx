"use client"

import { Canvas } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"

import {
  BRAND,
  LIME,
  TEAL,
  ConnectionLines,
  NodeMesh,
  PointerRig,
  SceneLights,
  useAutoRotate,
  type NodeSpec,
} from "@/components/three/scene-primitives"

const NODES: NodeSpec[] = [
  { position: [-2.4, 0.8, 0], scale: 0.62, geometry: "icosahedron", color: BRAND, speed: 0.9 },
  { position: [1.6, 1.4, -1], scale: 0.4, geometry: "torus", color: LIME, speed: 1.3 },
  { position: [2.6, -0.6, 0.4], scale: 0.7, geometry: "box", color: TEAL, speed: 0.7 },
  { position: [-1.2, -1.3, 0.6], scale: 0.5, geometry: "box", color: BRAND, speed: 1.1 },
  { position: [0.2, 0.2, 1.2], scale: 0.32, geometry: "icosahedron", color: LIME, speed: 1.5 },
  { position: [-2.8, -0.9, -0.8], scale: 0.36, geometry: "torus", color: TEAL, speed: 1.0 },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 1],
  [3, 5],
]

function Scene() {
  const groupRef = useAutoRotate(0.06)

  return (
    <>
      <SceneLights />
      <group ref={groupRef}>
        {NODES.map((node, i) => (
          <NodeMesh key={i} node={node} />
        ))}
        <ConnectionLines nodes={NODES} connections={CONNECTIONS} />
      </group>
      <Sparkles count={40} scale={[6, 4, 4]} size={2} speed={0.3} color={BRAND} opacity={0.5} />
      <PointerRig />
    </>
  )
}

/**
 * Only ever mounted when WebGL is available and the user has not requested
 * reduced motion — see `WebGLHero`, which decides that and owns the fallback.
 */
export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Scene />
    </Canvas>
  )
}
