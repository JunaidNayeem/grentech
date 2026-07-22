"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, Line } from "@react-three/drei"
import * as THREE from "three"

export const BRAND = "#36E39A"
export const LIME = "#B8F55A"
export const TEAL = "#3E8D78"
export const CORAL = "#F26E62"
export const AMBER = "#F6B84A"

export interface NodeSpec {
  position: [number, number, number]
  scale: number
  geometry: "icosahedron" | "torus" | "box" | "sphere" | "octahedron"
  color: string
  speed: number
}

/** A single floating, physically-shaded node — the shared visual unit for every topic scene. */
export function NodeMesh({ node }: { node: NodeSpec }) {
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: node.color,
        metalness: 0.65,
        roughness: 0.25,
        transmission: 0.15,
        clearcoat: 0.6,
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 0.18,
      }),
    [node.color],
  )

  return (
    <Float speed={node.speed} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh position={node.position} scale={node.scale} material={material}>
        {node.geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {node.geometry === "torus" && <torusGeometry args={[0.7, 0.28, 16, 32]} />}
        {node.geometry === "box" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {node.geometry === "sphere" && <sphereGeometry args={[1, 24, 24]} />}
        {node.geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      </mesh>
    </Float>
  )
}

/** Pulsing glow lines connecting node pairs by index into `nodes`. */
export function ConnectionLines({
  nodes,
  connections,
  color = BRAND,
}: {
  nodes: NodeSpec[]
  connections: Array<[number, number]>
  color?: string
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const pulse = (Math.sin(clock.getElapsedTime() * 0.8) + 1) / 2
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line
      const mat = line.material as THREE.LineBasicMaterial
      if (mat) mat.opacity = 0.25 + pulse * 0.35 * ((i % 3) / 2 + 0.3)
    })
  })

  return (
    <group ref={groupRef}>
      {connections.map(([a, b], i) => (
        <Line key={i} points={[nodes[a].position, nodes[b].position]} color={color} lineWidth={1} transparent opacity={0.4} />
      ))}
    </group>
  )
}

/** Gentle camera drift toward the pointer position — desktop parallax, restrained. */
export function PointerRig() {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame(() => {
    camera.position.x += (target.current.x - camera.position.x) * 0.02
    camera.position.y += (-target.current.y - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  useFrame(({ pointer }) => {
    target.current.x = pointer.x * 1.1
    target.current.y = pointer.y * 0.7
  })

  return null
}

/** Standard two-point-light rig shared by every scene, in the brand palette. */
export function SceneLights({ accent = LIME, fill = BRAND }: { accent?: string; fill?: string }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 4]} intensity={40} color={accent} />
      <pointLight position={[-4, -3, 2]} intensity={25} color={fill} />
    </>
  )
}

/** Slow, continuous auto-rotation for a group of nodes. */
export function useAutoRotate(speed = 0.06) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * speed
  })
  return groupRef
}
