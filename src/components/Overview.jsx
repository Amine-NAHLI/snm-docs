import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Zap, BarChart3, Network } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import { useSpotlight } from '../hooks/useSpotlight'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } }),
}

const CARD_META = [
  { icon: Brain, color: '#ff00ff', glow: 'rgba(255,0,255,0.12)' },
  { icon: Zap, color: '#00ffff', glow: 'rgba(0,255,255,0.12)' },
  { icon: BarChart3, color: '#7c3aed', glow: 'rgba(124,58,237,0.12)' },
]

function FeatureCard({ meta, title, sub, desc, i, inView }) {
  const [hovered, setHovered] = useState(false)
  const spotlight = useSpotlight()
  return (
    <motion.div
      variants={fadeUp}
      custom={i + 1}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={spotlight.onMouseMove}
      onMouseLeave={(e) => { setHovered(false); spotlight.onMouseLeave(e) }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? meta.color + '50' : meta.color + '20'}`,
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '1rem', padding: '2rem',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 0 30px ${meta.color}18` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: '3.5rem', height: '3.5rem', borderRadius: '0.875rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: meta.glow, border: `1px solid ${meta.color}30`,
        marginBottom: '1.5rem', transition: 'transform 0.3s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        <meta.icon size={24} style={{ color: meta.color }} />
      </div>
      <h3 className="font-orbitron" style={{ color: meta.color, fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '0.875rem' }}>{sub}</p>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
    </motion.div>
  )
}

export default function Overview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLang()
  const tx = t[lang].overview

  const CARDS = [
    { title: tx.c1t, sub: tx.c1s, desc: tx.c1d },
    { title: tx.c2t, sub: tx.c2s, desc: tx.c2d },
    { title: tx.c3t, sub: tx.c3s, desc: tx.c3d },
  ]

  const STATS = [
    { value: '200', label: tx.s1, sub: tx.s1s },
    { value: '5.1GB', label: tx.s2, sub: tx.s2s },
    { value: '65535', label: tx.s3, sub: tx.s3s },
    { value: '4+', label: tx.s4, sub: tx.s4s },
  ]

  return (
    <section
      id="overview"
      className="section-pad grid-bg"
      style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,255,255,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
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
            <Network size={13} /> {tx.label}
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.7 }}>
            {tx.subtitle}
          </p>
        </motion.div>

        <div className="grid-auto-3" style={{ marginBottom: '5rem' }}>
          {CARDS.map((c, i) => (
            <FeatureCard key={i} meta={CARD_META[i]} title={c.title} sub={c.sub} desc={c.desc} i={i} inView={inView} />
          ))}
        </div>

        <motion.div
          variants={fadeUp} custom={4} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid-stats"
          style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.03)' }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '2rem 1rem', textAlign: 'center',
              background: 'rgba(5,5,8,0.35)',
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
