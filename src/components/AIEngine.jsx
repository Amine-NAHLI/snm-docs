import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, ChevronRight, ExternalLink, Database } from 'lucide-react'

const PIPELINE = [
  { label: 'Service Detection', sub: 'Banner + port analysis', color: '#00ffff' },
  { label: 'Quantile Transform', sub: 'Version normalization', color: '#7c3aed' },
  { label: 'Feature Scaling', sub: 'StandardScaler', color: '#ff00ff' },
  { label: 'Random Forest', sub: '5.1GB classifier', color: '#f59e0b' },
  { label: 'Threat Level', sub: 'Severity prediction', color: '#10b981' },
]

const MODELS = [
  { file: 'vulnerability_model.pkl', size: '5.1 GB', role: 'Main RF Classifier', color: '#ff00ff' },
  { file: 'quantile_transformer.pkl', size: '24 KB', role: 'Version normalization', color: '#7c3aed' },
  { file: 'scaler.pkl', size: '895 B', role: 'Feature scaling', color: '#00ffff' },
  { file: 'feature_names.pkl', size: '1.5 KB', role: 'Dataset column names', color: '#f59e0b' },
]

const THREATS = [
  { level: 'Critical', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', score: '9–10', pct: 100 },
  { level: 'High', color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', score: '7–8.9', pct: 78 },
  { level: 'Medium', color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.25)', score: '4–6.9', pct: 55 },
  { level: 'Low', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', score: '0–3.9', pct: 30 },
]

function PipelineStep({ step, i, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? step.color + '50' : step.color + '28'}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '0.875rem',
        padding: '1rem 1.25rem',
        textAlign: 'center',
        minWidth: '130px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 0 20px ${step.color}18` : 'none',
      }}
    >
      <div style={{
        width: '10px', height: '10px', borderRadius: '50%',
        margin: '0 auto 0.5rem',
        background: step.color,
        boxShadow: `0 0 10px ${step.color}`,
      }} />
      <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>{step.label}</p>
      <p style={{ color: step.color, fontSize: '0.65rem', opacity: 0.75, fontFamily: 'var(--font-mono)' }}>{step.sub}</p>
    </motion.div>
  )
}

function ModelRow({ m, i, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.file}</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.role}</p>
      </div>
      <span style={{
        fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
        padding: '0.2rem 0.625rem', borderRadius: '0.375rem', flexShrink: 0,
        background: `${m.color}12`, color: m.color, border: `1px solid ${m.color}22`,
      }}>{m.size}</span>
    </motion.div>
  )
}

export default function AIEngine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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
            <Brain size={13} /> MACHINE LEARNING
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            AI <span className="gradient-text">Engine</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7 }}>
            A 5.1 GB Random Forest model trained on thousands of CVE records predicts vulnerability severity from detected services in real-time.
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
          }}>Inference Pipeline</p>
          <div className="pipeline-flow">
            {PIPELINE.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PipelineStep step={step} i={i} inView={inView} />
                {i < PIPELINE.length - 1 && (
                  <ChevronRight size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
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
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(0,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '1rem', overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <Database size={15} style={{ color: 'var(--cyan)' }} />
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>Model Files</h3>
              <a
                href="https://huggingface.co/aminenahli/smart-network-mapper-models"
                target="_blank" rel="noreferrer"
                style={{
                  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.75rem', color: 'var(--cyan)', textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Hugging Face <ExternalLink size={11} />
              </a>
            </div>
            <div>
              {MODELS.map((m, i) => <ModelRow key={m.file} m={m} i={i} inView={inView} />)}
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
            }}>Threat Level Scale</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {THREATS.map((t) => (
                <div
                  key={t.level}
                  style={{
                    borderRadius: '0.875rem', padding: '1rem 1.25rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: t.bg, border: `1px solid ${t.border}`,
                    transition: 'transform 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <div style={{ width: '4px', height: '2.5rem', borderRadius: '9999px', flexShrink: 0, background: t.color, boxShadow: `0 0 10px ${t.color}` }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: t.color, marginBottom: '0.1rem' }}>{t.level}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CVSS Score: {t.score}</p>
                  </div>
                  {/* Bar */}
                  <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', flexShrink: 0 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${t.pct}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 + THREATS.indexOf(t) * 0.1 }}
                      style={{ height: '100%', background: t.color, borderRadius: '3px', boxShadow: `0 0 6px ${t.color}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
