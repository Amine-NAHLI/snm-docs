import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Database, Filter, ChevronRight, Table, Layers, HardDrive, CheckCircle2 } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

export default function CVEDataset() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].dataset

  const PIPELINE_STEPS = tx.pipeline.map((label, i) => ({
    label,
    sub: tx.pipelineSubs[i],
  }))

  const STATS = [
    { value: tx.s1v, label: tx.s1, sub: 'Stratified sampling', color: '#06b6d4' },
    { value: tx.s2v, label: tx.s2, sub: 'API rate limit handled', color: '#818cf8' },
    { value: tx.s3v, label: tx.s3, sub: 'OS, port, version…', color: '#38bdf8' },
    { value: tx.s4v, label: tx.s4, sub: 'Binary vulnerability target', color: '#10b981' },
  ]

  const FEATURE_CARDS = [
    { icon: Database, color: '#06b6d4', title: tx.c1t, desc: tx.c1d, badge: 'ETL PIPELINE' },
    { icon: Filter, color: '#818cf8', title: tx.c2t, desc: tx.c2d, badge: 'PREPROCESSING' },
  ]

  return (
    <section
      id="dataset"
      className="section-pad"
      style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}
    >
      <div style={{ maxWidth: '78rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 0.85rem', borderRadius: '0.375rem',
            border: '1px solid rgba(6, 182, 212, 0.25)', background: 'rgba(6, 182, 212, 0.05)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.725rem',
            marginBottom: '1.25rem', letterSpacing: '0.08em', fontWeight: 600,
          }}>
            <Database size={14} /> {tx.label}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
            color: '#f8fafc',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            <span className="gradient-text">{tx.title}</span>
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

        {/* Data Engineering ETL Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            {tx.pipelineLabel}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.875rem',
          }}>
            {PIPELINE_STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(180deg, rgba(18, 26, 44, 0.65) 0%, rgba(10, 15, 27, 0.85) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '0.75rem',
                  padding: '1.15rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.625rem',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: 'var(--cyan)',
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '0.25rem',
                    }}>
                      ETL 0{i + 1}
                    </span>
                    {i < PIPELINE_STEPS.length - 1 && (
                      <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <p style={{
                    color: '#f8fafc',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    marginBottom: '0.25rem',
                  }}>
                    {step.label}
                  </p>
                </div>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  margin: 0,
                  marginTop: '0.5rem',
                }}>
                  {step.sub}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dataset Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3.5rem',
        }}>
          {STATS.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: 'linear-gradient(180deg, rgba(18, 25, 42, 0.7) 0%, rgba(10, 16, 28, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '0.875rem',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${s.color}50`
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                color: '#ffffff',
                marginBottom: '0.35rem',
                letterSpacing: '-0.02em',
              }}>
                {s.value}
              </div>
              <p style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                {s.label}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', margin: 0 }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Dataset Schema Specification Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: 'linear-gradient(180deg, rgba(16, 24, 40, 0.75) 0%, rgba(9, 14, 24, 0.9) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '0.875rem',
            overflow: 'hidden',
            marginBottom: '3rem',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '1.15rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(255, 255, 255, 0.01)',
          }}>
            <Table size={16} style={{ color: 'var(--cyan)' }} />
            <h3 style={{
              color: '#f8fafc',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.95rem',
              margin: 0,
            }}>
              DATASET SCHEMA & DICTIONARY SPECIFICATION
            </h3>
          </div>

          <div className="table-scroll-x">
            <div className="table-inner">
              <div style={{
                display: 'grid', gridTemplateColumns: '1.2fr 1fr 2fr',
                padding: '0.85rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(255, 255, 255, 0.02)',
              }}>
                {tx.cols.map((h) => (
                  <span key={h} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    color: 'var(--cyan)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {h}
                  </span>
                ))}
              </div>
              {tx.rows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid', gridTemplateColumns: '1.2fr 1fr 2fr',
                    padding: '0.85rem 1.5rem',
                    borderBottom: i < tx.rows.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.025)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
                    {row[0]}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: '#a5b4fc' }}>
                    {row[1]}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {row[2]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {FEATURE_CARDS.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(180deg, rgba(18, 25, 42, 0.65) 0%, rgba(10, 16, 28, 0.85) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '0.875rem',
                  padding: '1.5rem',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${f.color}14`, border: `1px solid ${f.color}30`,
                  }}>
                    <Icon size={18} style={{ color: f.color }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: f.color,
                    background: `${f.color}10`,
                    border: `1px solid ${f.color}25`,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.375rem',
                    letterSpacing: '0.04em',
                  }}>
                    {f.badge}
                  </span>
                </div>

                <h3 style={{
                  fontWeight: 700,
                  color: '#f8fafc',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  marginBottom: '0.5rem',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {f.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
