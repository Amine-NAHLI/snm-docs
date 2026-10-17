import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Zap, BarChart3, ShieldCheck, Cpu, Layers } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' } }),
}

const CARD_CONFIG = [
  { 
    icon: Brain, 
    color: '#818cf8', 
    badge: 'HYBRID INTELLIGENCE', 
    tag: 'ML + HEURISTICS',
  },
  { 
    icon: Zap, 
    color: '#06b6d4', 
    badge: 'SOCKET ENGINE', 
    tag: '300 THREADS',
  },
  { 
    icon: BarChart3, 
    color: '#10b981', 
    badge: 'NIST & MITRE', 
    tag: 'COMPLIANCE AUDIT',
  },
]

function TechnicalCard({ config, title, sub, desc, i, inView }) {
  const Icon = config.icon
  return (
    <motion.div
      variants={fadeUp}
      custom={i + 1}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      style={{
        background: 'linear-gradient(180deg, rgba(18, 26, 44, 0.7) 0%, rgba(11, 17, 30, 0.9) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '0.875rem',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${config.color}50`
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = `0 12px 30px -10px rgba(0,0,0,0.5), 0 0 20px ${config.color}15`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
        e.currentTarget.style.borderTopColor = 'rgba(255, 255, 255, 0.15)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top Meta Line */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '0.625rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${config.color}14`,
          border: `1px solid ${config.color}30`,
        }}>
          <Icon size={18} style={{ color: config.color }} />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.675rem',
          fontWeight: 600,
          color: config.color,
          background: `${config.color}12`,
          border: `1px solid ${config.color}25`,
          padding: '0.2rem 0.55rem',
          borderRadius: '0.375rem',
          letterSpacing: '0.05em',
        }}>
          {config.badge}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        color: '#f8fafc',
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: '1.15rem',
        marginBottom: '0.35rem',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>

      {/* Subtitle / Spec */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.725rem',
        marginBottom: '1rem',
      }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: config.color }} />
        <span>{sub}</span>
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        lineHeight: 1.65,
        margin: 0,
      }}>
        {desc}
      </p>
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
    { value: '300', label: tx.s1, sub: tx.s1s, color: '#06b6d4' },
    { value: '5.1 GB', label: tx.s2, sub: tx.s2s, color: '#818cf8' },
    { value: '65 535', label: tx.s3, sub: tx.s3s, color: '#38bdf8' },
    { value: '4+', label: tx.s4, sub: tx.s4s, color: '#10b981' },
  ]

  return (
    <section
      id="overview"
      className="section-pad"
      style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        
        {/* Header */}
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 0.85rem', borderRadius: '0.375rem',
            border: '1px solid rgba(6, 182, 212, 0.25)', background: 'rgba(6, 182, 212, 0.05)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.725rem',
            marginBottom: '1.25rem', letterSpacing: '0.08em', fontWeight: 600,
          }}>
            <ShieldCheck size={14} /> {tx.label}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
            color: '#f8fafc',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            {tx.title}
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '44rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {tx.subtitle}
          </p>
        </motion.div>

        {/* 3 Engineering Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}>
          {CARDS.map((c, i) => (
            <TechnicalCard key={i} config={CARD_CONFIG[i]} title={c.title} sub={c.sub} desc={c.desc} i={i} inView={inView} />
          ))}
        </div>

        {/* Technical Stats Dashboard */}
        <motion.div
          variants={fadeUp} custom={4} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            borderRadius: '0.875rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'linear-gradient(180deg, rgba(16, 24, 39, 0.75) 0%, rgba(10, 15, 26, 0.9) 100%)',
            overflow: 'hidden',
          }}
        >
          {STATS.map((s, idx) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                borderRight: idx < STATS.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.6rem, 3vw, 2.15rem)',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}>
                  {s.value}
                </span>
              </div>
              <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                {s.label}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.725rem', fontFamily: 'var(--font-mono)' }}>
                {s.sub}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
