import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Map, Calendar, GitBranch, Shield, FileText, Network } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import { useSpotlight } from '../hooks/useSpotlight'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } }),
}

const ROADMAP_META = [
  { icon: Network, color: '#3b82f6', glow: 'rgba(59,130,246,0.12)', label: 'Q1' },
  { icon: Shield, color: '#ef4444', glow: 'rgba(239,68,68,0.12)', label: 'Q2' },
  { icon: FileText, color: '#10b981', glow: 'rgba(16,185,129,0.12)', label: 'Q3' },
  { icon: GitBranch, color: '#f59e0b', glow: 'rgba(245,158,11,0.12)', label: 'Q4' },
]

function RoadmapCard({ meta, quarter, title, desc, i, inView }) {
  const [hovered, setHovered] = useState(false)
  const spotlight = useSpotlight()
  return (
    <motion.div
      variants={fadeUp} custom={i + 1} initial="hidden" animate={inView ? 'show' : 'hidden'}
      onMouseEnter={() => setHovered(true)} onMouseMove={spotlight.onMouseMove}
      onMouseLeave={(e) => { setHovered(false); spotlight.onMouseLeave(e) }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? meta.color + '50' : meta.color + '20'}`,
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '1rem', padding: '2rem',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 0 30px ${meta.color}18` : 'none',
        cursor: 'default', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div style={{
          width: '3.5rem', height: '3.5rem', borderRadius: '0.875rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: meta.glow, border: `1px solid ${meta.color}30`,
          transition: 'transform 0.3s', transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}>
          <meta.icon size={24} style={{ color: meta.color }} />
        </div>
        <div style={{
          padding: '0.25rem 0.75rem', borderRadius: '9999px',
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
          display: 'flex', alignItems: 'center', gap: '0.375rem'
        }}>
          <Calendar size={12} style={{ color: meta.color }} /> {quarter}
        </div>
      </div>
      <h3 className="font-orbitron" style={{ color: meta.color, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
    </motion.div>
  )
}

export default function Roadmap({ isEmbed = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLang()
  const tx = t[lang].roadmap

  const CARDS = [
    { quarter: tx.q1, title: tx.t1, desc: tx.d1 },
    { quarter: tx.q2, title: tx.t2, desc: tx.d2 },
    { quarter: tx.q3, title: tx.t3, desc: tx.d3 },
    { quarter: tx.q4, title: tx.t4, desc: tx.d4 },
  ]

  const content = (
    <div style={isEmbed ? {} : { maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
      {!isEmbed && (
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.04)',
            color: '#3b82f6', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Map size={13} /> ROADMAP
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.7 }}>
            {tx.subtitle}
          </p>
        </motion.div>
      )}

      {isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.04)',
            color: '#3b82f6', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Map size={13} /> ROADMAP
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{tx.subtitle}</p>
        </motion.div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {CARDS.map((c, i) => (
          <RoadmapCard key={i} meta={ROADMAP_META[i]} quarter={c.quarter} title={c.title} desc={c.desc} i={i} inView={inView} />
        ))}
      </div>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="roadmap" className="section-pad grid-bg" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      {content}
    </section>
  )
}
