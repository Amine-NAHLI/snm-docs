import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Radio, Monitor, Zap, Target, Brain, Palette, LayoutDashboard, FileText, Cpu } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import { useSpotlight } from '../hooks/useSpotlight'

const ICON_META = [
  { icon: Globe, color: '#00ffff' },
  { icon: Radio, color: '#ff00ff' },
  { icon: Monitor, color: '#7c3aed' },
  { icon: Zap, color: '#f59e0b' },
  { icon: Target, color: '#10b981' },
  { icon: Brain, color: '#ff00ff' },
  { icon: Palette, color: '#00ffff' },
  { icon: LayoutDashboard, color: '#7c3aed' },
  { icon: FileText, color: '#f59e0b' },
]

function FeatureCard({ f, meta, i, inView }) {
  const [hovered, setHovered] = useState(false)
  const spotlight = useSpotlight()
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={spotlight.onMouseMove}
      onMouseLeave={(e) => { setHovered(false); spotlight.onMouseLeave(e) }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? meta.color + '45' : meta.color + '18'}`,
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '1rem', padding: '1.5rem',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 8px 40px ${meta.color}12` : '0 2px 12px rgba(0,0,0,0.3)',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{
          flexShrink: 0, width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${meta.color}12`, border: `1px solid ${meta.color}25`,
          transition: 'transform 0.3s',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}>
          <meta.icon size={18} style={{ color: meta.color }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{f.title}</h3>
          <p style={{ color: meta.color, opacity: 0.7, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '0.625rem' }}>{f.sub}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{f.text}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].features

  return (
    <section
      id="features"
      className="section-pad"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(124,58,237,0.25)', background: 'rgba(124,58,237,0.06)',
            color: '#a78bfa', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Cpu size={13} /> {tx.label}
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '36rem', margin: '0 auto' }}>
            {tx.subtitle}
          </p>
        </motion.div>

        <div className="grid-auto-3">
          {tx.items.map((f, i) => (
            <FeatureCard key={i} f={f} meta={ICON_META[i]} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
