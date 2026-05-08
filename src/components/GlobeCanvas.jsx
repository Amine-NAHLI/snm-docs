import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const RADIUS = 3
const N = 2000

function Globe() {
  const groupRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const pingTimer = useRef(0)
  const ringsRef = useRef([])
  const { scene } = useThree()

  // Fibonacci sphere point cloud
  const fibPoints = useMemo(() => {
    const pts = new Float32Array(N * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      pts[i * 3] = r * Math.cos(theta) * RADIUS
      pts[i * 3 + 1] = y * RADIUS
      pts[i * 3 + 2] = r * Math.sin(theta) * RADIUS
    }
    return pts
  }, [])

  // Wireframe: latitude + longitude lines
  const wireGeo = useMemo(() => {
    const pts = []
    const LAT = 18, LON = 24, SEG = 64
    for (let i = 0; i <= LAT; i++) {
      const phi = (i / LAT) * Math.PI
      const cy = Math.cos(phi) * RADIUS
      const cr = Math.sin(phi) * RADIUS
      for (let j = 0; j < SEG; j++) {
        const a1 = (j / SEG) * Math.PI * 2
        const a2 = ((j + 1) / SEG) * Math.PI * 2
        pts.push(cr * Math.cos(a1), cy, cr * Math.sin(a1))
        pts.push(cr * Math.cos(a2), cy, cr * Math.sin(a2))
      }
    }
    for (let j = 0; j < LON; j++) {
      const theta = (j / LON) * Math.PI * 2
      for (let i = 0; i < SEG; i++) {
        const phi1 = (i / SEG) * Math.PI
        const phi2 = ((i + 1) / SEG) * Math.PI
        pts.push(Math.sin(phi1) * RADIUS * Math.cos(theta), Math.cos(phi1) * RADIUS, Math.sin(phi1) * RADIUS * Math.sin(theta))
        pts.push(Math.sin(phi2) * RADIUS * Math.cos(theta), Math.cos(phi2) * RADIUS, Math.sin(phi2) * RADIUS * Math.sin(theta))
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return geo
  }, [])

  // 3 satellite positions (orbit in XZ plane at different inclinations)
  const satellites = useMemo(() => [
    { radius: RADIUS + 0.5, speed: 0.6, phase: 0, incline: 0.3 },
    { radius: RADIUS + 0.7, speed: -0.4, phase: 2.1, incline: -0.5 },
    { radius: RADIUS + 0.4, speed: 0.8, phase: 4.2, incline: 0.7 },
  ], [])

  const satMeshes = useRef([])

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Slow Y rotation + mouse parallax tilt
    groupRef.current.rotation.y += 0.0008
    groupRef.current.rotation.x += (mouse.current.y * 0.12 - groupRef.current.rotation.x) * 0.04

    // Satellites orbit
    satellites.forEach((sat, i) => {
      sat.phase += delta * sat.speed
      const mesh = satMeshes.current[i]
      if (mesh) {
        mesh.position.x = sat.radius * Math.cos(sat.phase)
        mesh.position.z = sat.radius * Math.sin(sat.phase)
        mesh.position.y = sat.radius * Math.sin(sat.incline) * Math.sin(sat.phase)
      }
    })

    // Ping rings every 3 s
    pingTimer.current += delta
    if (pingTimer.current > 3) {
      pingTimer.current = 0
      const phi = Math.random() * Math.PI
      const theta = Math.random() * Math.PI * 2
      const geo = new THREE.RingGeometry(0.01, 0.04, 32)
      const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
      const ring = new THREE.Mesh(geo, mat)
      ring.position.set(
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.cos(phi),
        RADIUS * Math.sin(phi) * Math.sin(theta)
      )
      ring.lookAt(0, 0, 0)
      ring.userData = { born: state.clock.elapsedTime }
      groupRef.current.add(ring)
      ringsRef.current.push(ring)
    }

    // Animate + cleanup rings
    ringsRef.current = ringsRef.current.filter((ring) => {
      const age = state.clock.elapsedTime - ring.userData.born
      if (age > 1.5) { groupRef.current.remove(ring); ring.geometry.dispose(); ring.material.dispose(); return false }
      ring.scale.setScalar(1 + age * 3)
      ring.material.opacity = Math.max(0, 0.8 - age * 0.55)
      return true
    })
  })

  return (
    <group ref={groupRef}>
      {/* Dot sphere */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={N} array={fibPoints} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#00ffff" sizeAttenuation transparent opacity={0.55} />
      </points>

      {/* Wireframe grid */}
      <lineSegments geometry={wireGeo}>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.055} />
      </lineSegments>

      {/* Scanning beam (thin plane rotating) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[RADIUS * 2, 0.04]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>

      {/* Satellites */}
      {satellites.map((sat, i) => (
        <mesh key={i} ref={(el) => (satMeshes.current[i] = el)}>
          <sphereGeometry args={[0.045, 6, 6]} />
          <meshBasicMaterial color="#ff00ff" />
        </mesh>
      ))}
    </group>
  )
}

export default function GlobeCanvas() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Globe />
      </Canvas>
    </div>
  )
}
