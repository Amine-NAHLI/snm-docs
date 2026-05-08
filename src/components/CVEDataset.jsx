import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Database, Filter, ChevronRight, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import { useSpotlight } from '../hooks/useSpotlight'

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const PIPELINE_COLORS = ['#00ffff', '#7c3aed', '#ff00ff', '#f59e0b', '#10b981']

function PipelineStep({ step, color, i, inView }) {
  const [hovered, setHovered] = useState(false)
  const spotlight = useSpotlight()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={spotlight.onMouseMove}
      onMouseLeave={(e) => { setHovered(false); spotlight.onMouseLeave(e) }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color + '55' : color + '25'}`,
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '0.875rem', padding: '0.875rem 1.25rem', textAlign: 'center', minWidth: '120px',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.2s',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 8px 24px ${color}18` : 'none',
      }}
    >
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', margin: '0 auto 0.5rem', background: color, boxShadow: `0 0 8px ${color}` }} />
      <p style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.15rem' }}>{step.label}</p>
      <p style={{ color, fontSize: '0.62rem', opacity: 0.75, fontFamily: 'var(--font-mono)' }}>{step.sub}</p>
    </motion.div>
  )
}

function StatCard({ s, color, i, inView }) {
  const [hovered, setHovered] = useState(false)
  const spotlight = useSpotlight()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={spotlight.onMouseMove}
      onMouseLeave={(e) => { setHovered(false); spotlight.onMouseLeave(e) }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color + '45' : color + '18'}`,
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '1rem', padding: '1.5rem', textAlign: 'center', cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 8px 30px ${color}18` : 'none',
      }}
    >
      <div className="font-orbitron" style={{ fontWeight: 900, fontSize: '1.75rem', color, textShadow: `0 0 20px ${color}60`, marginBottom: '0.375rem' }}>
        {s.value}
      </div>
      <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem' }}>{s.label}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{s.sub}</p>
    </motion.div>
  )
}

function FeatureInfoCard({ title, desc, icon: Icon, color, i, inView }) {
  const [hovered, setHovered] = useState(false)
  const spotlight = useSpotlight()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={spotlight.onMouseMove}
      onMouseLeave={(e) => { setHovered(false); spotlight.onMouseLeave(e) }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color + '45' : 'rgba(0,255,255,0.12)'}`,
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '1rem', padding: '1.75rem',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 8px 30px ${color}15` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: '3rem', height: '3rem', borderRadius: '0.875rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${color}12`, border: `1px solid ${color}28`, marginBottom: '1.25rem',
        transition: 'transform 0.3s', transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }}>
        <Icon size={20} style={{ color }} />
      </div>
      <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '0.625rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
    </motion.div>
  )
}

export default function CVEDataset() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [repoHovered, setRepoHovered] = useState(false)
  const { lang } = useLang()
  const tx = t[lang].dataset

  const PIPELINE_STEPS = tx.pipeline.map((label, i) => ({
    label,
    sub: ['NIST source', 'Vulnerability fetch', 'Port & banner match', 'OS & protocol', '20K balanced rows'][i],
  }))

  const STATS = [
    { value: tx.s1v, label: tx.s1, sub: 'Stratified sampling', color: '#00ffff' },
    { value: tx.s2v, label: tx.s2, sub: 'API constraint handled', color: '#ff00ff' },
    { value: tx.s3v, label: tx.s3, sub: 'OS, port, version…', color: '#7c3aed' },
    { value: tx.s4v, label: tx.s4, sub: 'Binary vulnerability', color: '#10b981' },
  ]

  const FEATURE_CARDS = [
    { icon: Database, color: '#00ffff', title: tx.c1t, desc: tx.c1d },
    { icon: Filter, color: '#ff00ff', title: tx.c2t, desc: tx.c2d },
  ]

  return (
    <section
      id="dataset"
      className="section-pad grid-bg"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,255,255,0.05) 0%, transparent 65%)',
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.14em',
          }}>
            <Database size={13} /> {tx.label}
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.7 }}>
            {tx.subtitle}
          </p>
        </motion.div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
            color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.75rem', textTransform: 'uppercase',
          }}>{tx.pipelineLabel}</p>
          <div className="pipeline-flow">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <PipelineStep step={step} color={PIPELINE_COLORS[i]} i={i} inView={inView} />
                {i < PIPELINE_STEPS.length - 1 && (
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid-auto-3" style={{ marginBottom: '4rem' }}>
          {STATS.map((s, i) => <StatCard key={i} s={s} color={s.color} i={i} inView={inView} />)}
        </div>

        {/* Schema table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(0,255,255,0.12)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '1rem', overflow: 'hidden', marginBottom: '3rem',
          }}
        >
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 2fr',
            padding: '0.875rem 1.5rem', borderBottom: '1px solid rgba(0,255,255,0.1)',
            background: 'rgba(0,255,255,0.04)',
          }}>
            {tx.cols.map((h) => (
              <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {tx.rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 2fr',
                padding: '0.875rem 1.5rem',
                borderBottom: i < tx.rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,255,255,0.03)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: 'var(--cyan)' }}>{row[0]}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: '#a78bfa' }}>{row[1]}</span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{row[2]}</span>
            </div>
          ))}
        </motion.div>

        {/* Feature info cards */}
        <div className="grid-auto-2" style={{ marginBottom: '3.5rem' }}>
          {FEATURE_CARDS.map((f, i) => (
            <FeatureInfoCard key={i} title={f.title} desc={f.desc} icon={f.icon} color={f.color} i={i} inView={inView} />
          ))}
        </div>

        {/* GitHub repo card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          onMouseEnter={() => setRepoHovered(true)}
          onMouseLeave={() => setRepoHovered(false)}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${repoHovered ? 'rgba(0,255,255,0.3)' : 'rgba(0,255,255,0.1)'}`,
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '1rem', padding: '2rem',
            transition: 'border-color 0.3s, box-shadow 0.3s',
            boxShadow: repoHovered ? '0 0 40px rgba(0,255,255,0.1)' : 'none',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem',
          }}
        >
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.625rem' }}>
              <div style={{ color: 'var(--text-primary)' }}><GithubIcon size={20} /></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                {tx.repoTitle}
              </span>
              <span style={{
                padding: '0.15rem 0.625rem', borderRadius: '9999px',
                border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.05)',
                color: 'var(--cyan)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
              }}>Public</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>
              {tx.repoDesc}
            </p>
          </div>
          <a
            href="https://github.com/Amine-NAHLI/cve-dataset-generator"
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
              border: '1px solid rgba(0,255,255,0.3)', color: 'var(--cyan)',
              background: 'rgba(0,255,255,0.06)', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 600, flexShrink: 0,
              transition: 'background 0.2s, box-shadow 0.2s',
              fontFamily: 'var(--font-heading)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,255,0.12)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,255,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {tx.repoBtn} <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
