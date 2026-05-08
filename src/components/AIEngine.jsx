import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, ChevronRight, ExternalLink, Database } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import { useSpotlight } from '../hooks/useSpotlight'

const PIPELINE_COLORS = ['#00ffff', '#7c3aed', '#ff00ff', '#f59e0b', '#10b981']
const THREAT_META = [
  { color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', pct: 100 },
  { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', pct: 78 },
  { color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.25)', pct: 55 },
  { color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', pct: 30 },
]
const MODEL_COLORS = ['#ff00ff', '#7c3aed', '#00ffff', '#f59e0b']

function PipelineStep({ label, sub, color, i, inView }) {
  const [hovered, setHovered] = useState(false)
  const spotlight = useSpotlight()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={spotlight.onMouseMove}
      onMouseLeave={(e) => { setHovered(false); spotlight.onMouseLeave(e) }}
      className="pipeline-step"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color + '50' : color + '28'}`,
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '0.875rem', padding: '1rem 1.25rem', textAlign: 'center',
        minWidth: '130px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 0 20px ${color}18` : 'none',
      }}
    >
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', margin: '0 auto 0.5rem', background: color, boxShadow: `0 0 10px ${color}` }} />
      <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>{label}</p>
      <p style={{ color, fontSize: '0.65rem', opacity: 0.75, fontFamily: 'var(--font-mono)' }}>{sub}</p>
    </motion.div>
  )
}

function ModelRow({ m, color, i, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: color, boxShadow: `0 0 6px ${color}` }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</p>
        <p className="model-role" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.role}</p>
      </div>
      <span style={{
        fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
        padding: '0.2rem 0.625rem', borderRadius: '0.375rem', flexShrink: 0,
        background: `${color}12`, color, border: `1px solid ${color}22`,
      }}>{m.size}</span>
    </motion.div>
  )
}

export default function AIEngine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].aiEngine

  return (
    <section id="ai-engine" className="section-pad grid-bg" style={{ position: 'relative', overflow: 'hidden', background: '#080810' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 65%)',
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
            border: '1px solid rgba(124,58,237,0.25)', background: 'rgba(124,58,237,0.06)',
            color: '#a78bfa', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Brain size={13} /> {tx.label}
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            AI <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7 }}>
            {tx.subtitle}
          </p>
        </motion.div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
            color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase',
          }}>{tx.pipelineLabel}</p>
          <div className="pipeline-flow">
            {tx.pipeline.map((label, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PipelineStep label={label} sub={tx.pipelineSubs[i]} color={PIPELINE_COLORS[i]} i={i} inView={inView} />
                {i < tx.pipeline.length - 1 && (
                  <span className="pipeline-arrow">
                    <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom grid */}
        <div className="ai-grid">
          {/* Model files */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,255,0.1)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '1rem', overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <Database size={15} style={{ color: 'var(--cyan)' }} />
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{tx.filesLabel}</h3>
              <a
                href="https://huggingface.co/aminenahli/smart-network-mapper-models"
                target="_blank" rel="noreferrer"
                style={{
                  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.75rem', color: 'var(--cyan)', textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Hugging Face <ExternalLink size={11} />
              </a>
            </div>
            <div>
              {tx.files.map((m, i) => <ModelRow key={i} m={m} color={MODEL_COLORS[i]} i={i} inView={inView} />)}
            </div>
          </motion.div>

          {/* Threat levels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
              color: 'var(--text-secondary)', marginBottom: '1.25rem', textTransform: 'uppercase',
            }}>{tx.threatLabel}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {tx.threats.map((threat, i) => {
                const meta = THREAT_META[i]
                return (
                  <div
                    key={i}
                    style={{
                      borderRadius: '0.875rem', padding: '1rem 1.25rem',
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      background: meta.bg, border: `1px solid ${meta.border}`,
                      transition: 'transform 0.2s', cursor: 'default',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <div style={{ width: '4px', height: '2.5rem', borderRadius: '9999px', flexShrink: 0, background: meta.color, boxShadow: `0 0 10px ${meta.color}` }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: meta.color, marginBottom: '0.1rem' }}>{threat.level}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{threat.score}</p>
                    </div>
                    <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', flexShrink: 0 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${meta.pct}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                        style={{ height: '100%', background: meta.color, borderRadius: '3px', boxShadow: `0 0 6px ${meta.color}` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
