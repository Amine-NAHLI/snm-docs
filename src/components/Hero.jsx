import { useRef, useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { ChevronDown } from 'lucide-react'

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── Three.js Network Graph ─────────────────────────────────────── */
function NetworkParticles() {
  const meshRef = useRef()
  const linesRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const NODE_COUNT = 80
  const CONNECTION_DIST = 2.2

  const { positions, velocities, linePositions } = useMemo(() => {
    const positions = []
    const velocities = []
    for (let i = 0; i < NODE_COUNT; i++) {
      positions.push((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6)
      velocities.push((Math.random() - 0.5) * 0.005, (Math.random() - 0.5) * 0.005, (Math.random() - 0.5) * 0.003)
    }
    const linePositions = new Float32Array(NODE_COUNT * 4 * 6)
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
      const dx = pos[xi] - mouse.current.x * 0.3
      const dy = pos[yi] - mouse.current.y * 0.3
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 2.5) { vel[xi] += (dx / dist) * 0.0008; vel[yi] += (dy / dist) * 0.0008 }
      pos[xi] += vel[xi]; pos[yi] += vel[yi]; pos[zi] += vel[zi]
      if (Math.abs(pos[xi]) > 8) vel[xi] *= -1
      if (Math.abs(pos[yi]) > 5) vel[yi] *= -1
      if (Math.abs(pos[zi]) > 3) vel[zi] *= -1
    }
    if (meshRef.current) {
      meshRef.current.geometry.attributes.position.array.set(pos)
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
    let lineIdx = 0
    const lp = linePositions
    for (let i = 0; i < NODE_COUNT && lineIdx < lp.length - 6; i++) {
      for (let j = i + 1; j < NODE_COUNT && lineIdx < lp.length - 6; j++) {
        const dx = pos[i*3] - pos[j*3], dy = pos[i*3+1] - pos[j*3+1], dz = pos[i*3+2] - pos[j*3+2]
        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < CONNECTION_DIST) {
          lp[lineIdx++] = pos[i*3]; lp[lineIdx++] = pos[i*3+1]; lp[lineIdx++] = pos[i*3+2]
          lp[lineIdx++] = pos[j*3]; lp[lineIdx++] = pos[j*3+1]; lp[lineIdx++] = pos[j*3+2]
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
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={NODE_COUNT} array={posArr.current} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.09} color="#00ffff" sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={NODE_COUNT * 4 * 2} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.1} />
      </lineSegments>
    </group>
  )
}

/* ─── Typing Animation ─────────────────────────────────────────── */
const PHRASES = [
  'Scanning 192.168.1.0/24...',
  'Detected 12 hosts online',
  'Running AI vulnerability analysis...',
  'Generating security report...',
  'Multi-threaded port scan: 200 workers',
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
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length - 1)), 22)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setPhraseIdx((i) => (i + 1) % PHRASES.length)
    }
    return () => clearTimeout(timer)
  }, [displayed, deleting, phraseIdx])

  return (
    <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
      {displayed}
      <span className="cursor-blink" style={{ borderLeft: '2px solid var(--cyan)', marginLeft: '2px' }}>&nbsp;</span>
    </span>
  )
}

/* ─── Hero ─────────────────────────────────────────────────────── */
const BADGES = ['Python 3.8+', 'AI / ML', 'Cybersecurity', 'Multi-threaded', 'Scapy']

export default function Hero() {
  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Three.js canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <NetworkParticles />
        </Canvas>
      </div>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,255,0.06) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', padding: '0 1.5rem',
        maxWidth: '64rem', margin: '0 auto',
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.25)',
            background: 'rgba(0,255,255,0.05)',
            marginBottom: '2rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            color: 'var(--cyan)',
          }}
        >
          <span className="animate-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }} />
          v1.0 — Open Source Cybersecurity Tool
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-orbitron"
          style={{
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}
        >
          <span className="gradient-text">Smart Network</span>
          <br />
          <span style={{ color: 'var(--text-primary)' }}>Mapper</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            marginBottom: '1.25rem',
            maxWidth: '40rem',
            margin: '0 auto 1.25rem',
            lineHeight: 1.6,
          }}
        >
          Next-Generation Network Diagnostic &amp; AI-Powered Security Suite
        </motion.p>

        {/* Typing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.5rem', marginBottom: '2.5rem', height: '2rem',
          }}
        >
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>$</span>
          <TypingText />
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}
        >
          {BADGES.map((b) => (
            <span
              key={b}
              style={{
                padding: '0.25rem 0.875rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '9999px',
                border: '1px solid rgba(124,58,237,0.3)',
                background: 'rgba(124,58,237,0.08)',
                color: '#a78bfa',
                fontFamily: 'var(--font-mono)',
              }}
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
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
        >
          <a
            href="https://github.com/Amine-NAHLI/smart-network-mapper"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '9999px',
              fontWeight: 700, fontSize: '0.9rem',
              background: 'linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)',
              color: '#050508',
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(0,255,255,0.25)',
              transition: 'box-shadow 0.3s, transform 0.2s',
              fontFamily: 'var(--font-heading)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 50px rgba(0,255,255,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <GithubIcon size={16} /> GitHub →
          </a>
          <button
            onClick={() => document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '9999px',
              fontWeight: 600, fontSize: '0.9rem',
              border: '1px solid rgba(0,255,255,0.35)',
              color: 'var(--cyan)',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              fontFamily: 'var(--font-heading)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,255,0.08)'; e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Get Started ↓
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
