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

const RING_COLORS = [BRAND, LIME, TEAL, BRAND, LIME]

function ringNode(i: number): NodeSpec {
  const angle = (i / 5) * Math.PI * 2
  return {
    position: [Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, Math.sin(angle * 2) * 0.4],
    scale: 0.42,
    geometry: i % 2 === 0 ? "icosahedron" : "octahedron",
    color: RING_COLORS[i],
    speed: 0.8 + i * 0.15,
  }
}

const NODES: NodeSpec[] = [ringNode(0), ringNode(1), ringNode(2), ringNode(3), ringNode(4)]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
]

function Scene() {
  const groupRef = useAutoRotate(0.12)
  return (
    <>
      <SceneLights accent={LIME} fill={TEAL} />
      <group ref={groupRef}>
        {NODES.map((node, i) => (
          <NodeMesh key={i} node={node} />
        ))}
        <ConnectionLines nodes={NODES} connections={CONNECTIONS} color={BRAND} />
      </group>
      <Sparkles count={24} scale={[4, 4, 2]} size={2} speed={0.3} color={LIME} opacity={0.4} />
      <PointerRig />
    </>
  )
}

/** Five nodes in a continuous ring — the five-step discover-to-improve cycle. */
export function HowWeWorkScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  )
}
