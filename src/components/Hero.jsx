import { useRef, useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { ChevronDown } from 'lucide-react'

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── Three.js Network Particles ─────────────────────────────── */
function NetworkParticles() {
  const meshRef = useRef()
  const linesRef = useRef()
  const { size, gl } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  const NODE_COUNT = 80
  const CONNECTION_DIST = 2.2

  const { positions, velocities, linePositions } = useMemo(() => {
    const positions = []
    const velocities = []
    for (let i = 0; i < NODE_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6
      )
      velocities.push(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.003
      )
    }
    const maxLines = NODE_COUNT * 4
    const linePositions = new Float32Array(maxLines * 6)
    return { positions, velocities, linePositions }
  }, [])

  const posArr = useRef(new Float32Array(positions))
  const velArr = useRef(new Float32Array(velocities))

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 12
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 8
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame(() => {
    const pos = posArr.current
    const vel = velArr.current

    for (let i = 0; i < NODE_COUNT; i++) {
      const xi = i * 3, yi = i * 3 + 1, zi = i * 3 + 2

      // Mouse repulsion
      const dx = pos[xi] - mouse.current.x * 0.3
      const dy = pos[yi] - mouse.current.y * 0.3
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 2.5) {
        vel[xi] += dx / dist * 0.0008
        vel[yi] += dy / dist * 0.0008
      }

      pos[xi] += vel[xi]
      pos[yi] += vel[yi]
      pos[zi] += vel[zi]

      // Boundary bounce
      if (Math.abs(pos[xi]) > 8) vel[xi] *= -1
      if (Math.abs(pos[yi]) > 5) vel[yi] *= -1
      if (Math.abs(pos[zi]) > 3) vel[zi] *= -1
    }

    if (meshRef.current) {
      meshRef.current.geometry.attributes.position.array.set(pos)
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Update lines
    let lineIdx = 0
    const lp = linePositions
    for (let i = 0; i < NODE_COUNT && lineIdx < lp.length - 6; i++) {
      for (let j = i + 1; j < NODE_COUNT && lineIdx < lp.length - 6; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < CONNECTION_DIST) {
          lp[lineIdx++] = pos[i * 3]
          lp[lineIdx++] = pos[i * 3 + 1]
          lp[lineIdx++] = pos[i * 3 + 2]
          lp[lineIdx++] = pos[j * 3]
          lp[lineIdx++] = pos[j * 3 + 1]
          lp[lineIdx++] = pos[j * 3 + 2]
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, lineIdx / 3)
      linesRef.current.geometry.attributes.position.array.set(lp)
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Nodes */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={posArr.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00ffff"
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT * 4 * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.12}
        />
      </lineSegments>
    </group>
  )
}

/* ─── Typing effect ───────────────────────────────────────────── */
const PHRASES = [
  'Multi-threaded port scanning at 200 workers',
  'AI vulnerability prediction with Random Forest',
  'Hybrid host discovery (ARP + TCP)',
  'OS fingerprinting via TTL analysis',
  'Banner grabbing across 7 protocols',
]

function TypingText() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let timer

    if (!deleting && displayed.length < phrase.length) {
      timer = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 45)
    } else if (!deleting && displayed.length === phrase.length) {
      timer = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length - 1)), 25)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setPhraseIdx((i) => (i + 1) % PHRASES.length)
    }

    return () => clearTimeout(timer)
  }, [displayed, deleting, phraseIdx])

  return (
    <span className="text-cyan-400 font-mono text-sm sm:text-base">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

/* ─── Hero ────────────────────────────────────────────────────── */
const BADGES = ['Python 3.8+', 'AI/ML', 'Cybersecurity', 'Multi-threaded', 'Scapy']

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Three.js canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <NetworkParticles />
        </Canvas>
      </div>

      {/* Radial glow center */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-xs font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          v1.0 — Open Source Cybersecurity Tool
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl leading-tight mb-6"
        >
          <span className="gradient-text">Smart Network</span>
          <br />
          <span style={{ color: '#e2e8f0' }}>Mapper</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg sm:text-xl mb-4 max-w-2xl mx-auto"
        >
          Next-Generation Network Diagnostic &amp; AI-Powered Security Suite
        </motion.p>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-10 h-7"
        >
          <span className="text-slate-500 font-mono text-sm">$</span>
          <TypingText />
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {BADGES.map((b) => (
            <span
              key={b}
              className="px-3 py-1 text-xs font-medium rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300"
            >
              {b}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://github.com/Amine-NAHLI/smart-network-mapper"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, #00ffff 0%, #7c3aed 100%)',
              color: '#0a0a0f',
              boxShadow: '0 0 30px rgba(0,255,255,0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 50px rgba(0,255,255,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,255,0.3)')}
          >
            <GithubIcon className="w-4 h-4" />
            View on GitHub
          </a>
          <button
            onClick={() => document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
          >
            Get Started
            <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
