import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Zap, BarChart3, Network } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } }),
}

const CARDS = [
  {
    icon: Brain, color: '#ff00ff', glow: 'rgba(255,0,255,0.12)',
    title: 'AI-Powered', sub: 'Intelligence Artificielle',
    desc: 'Random Forest model with 5.1GB of training data predicts vulnerability severity with high accuracy across thousands of CVEs.',
  },
  {
    icon: Zap, color: '#00ffff', glow: 'rgba(0,255,255,0.12)',
    title: 'Multi-threaded', sub: 'Hautement Parallèle',
    desc: 'Up to 200 concurrent scanning workers deliver blazing-fast port enumeration across all 65535 ports in seconds.',
  },
  {
    icon: BarChart3, color: '#7c3aed', glow: 'rgba(124,58,237,0.12)',
    title: 'Professional Reports', sub: 'Rapports Professionnels',
    desc: 'Export detailed HTML and JSON reports with threat levels, service fingerprints, and actionable remediation suggestions.',
  },
]

const STATS = [
  { value: '200', label: 'Scan Threads', sub: 'Concurrent workers' },
  { value: '5.1GB', label: 'AI Model', sub: 'Random Forest classifier' },
  { value: '65535', label: 'Ports Covered', sub: 'Full port range' },
  { value: '4+', label: 'Export Formats', sub: 'HTML, JSON & more' },
]

function FeatureCard({ c, i, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      custom={i + 1}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? c.color + '50' : c.color + '20'}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '1rem',
        padding: '2rem',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 0 30px ${c.color}18` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: '3.5rem', height: '3.5rem', borderRadius: '0.875rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: c.glow, border: `1px solid ${c.color}30`,
        marginBottom: '1.5rem',
        transition: 'transform 0.3s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        <c.icon size={24} style={{ color: c.color }} />
      </div>
      <h3 className="font-orbitron" style={{ color: c.color, fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
        {c.title}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '0.875rem' }}>{c.sub}</p>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{c.desc}</p>
    </motion.div>
  )
}

export default function Overview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="overview"
      className="section-pad grid-bg"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,255,255,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        {/* Heading */}
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Network size={13} /> WHAT IS SNM
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
            <span className="gradient-text">Overview</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.7 }}>
            Smart Network Mapper is a comprehensive cybersecurity suite combining real-time network scanning,
            OS fingerprinting, and machine-learning vulnerability prediction — available in both a Cyberpunk GUI and CLI.
          </p>
        </motion.div>

        {/* 3 feature cards */}
        <div className="grid-auto-3" style={{ marginBottom: '5rem' }}>
          {CARDS.map((c, i) => <FeatureCard key={c.title} c={c} i={i} inView={inView} />)}
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeUp} custom={4} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid-stats"
          style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.03)' }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '2rem 1rem', textAlign: 'center',
              background: 'rgba(5,5,8,0.85)',
            }}>
              <span className="font-orbitron gradient-text" style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: '0.375rem' }}>
                {s.value}
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{s.label}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{s.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
