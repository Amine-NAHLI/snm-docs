import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, ChevronRight, ExternalLink, Database, Cpu, ShieldAlert, CheckCircle2, Sliders } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

const THREAT_META = [
  { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', border: 'rgba(239, 68, 68, 0.25)', pct: 100, label: 'CRITICAL' },
  { color: '#f97316', bg: 'rgba(249, 115, 22, 0.08)', border: 'rgba(249, 115, 22, 0.25)', pct: 78, label: 'HIGH' },
  { color: '#eab308', bg: 'rgba(234, 179, 8, 0.08)', border: 'rgba(234, 179, 8, 0.25)', pct: 55, label: 'MEDIUM' },
  { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.08)', border: 'rgba(34, 197, 94, 0.25)', pct: 30, label: 'LOW' },
]

export default function AIEngine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].aiEngine

  return (
    <section
      id="ai-engine"
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
            border: '1px solid rgba(129, 140, 248, 0.25)', background: 'rgba(129, 140, 248, 0.06)',
            color: '#a5b4fc', fontFamily: 'var(--font-mono)', fontSize: '0.725rem',
            marginBottom: '1.25rem', letterSpacing: '0.08em', fontWeight: 600,
          }}>
            <Brain size={14} /> {tx.label}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
            color: '#f8fafc',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            AI <span className="gradient-text">{tx.title}</span>
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

        {/* Machine Learning Inference Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            <Cpu size={14} style={{ color: 'var(--cyan)' }} />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: 0,
            }}>
              {tx.pipelineLabel}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.875rem',
          }}>
            {tx.pipeline.map((label, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(180deg, rgba(18, 26, 44, 0.65) 0%, rgba(10, 15, 27, 0.85) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '0.75rem',
                  padding: '1.15rem 1rem',
                  position: 'relative',
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
                      0{i + 1}
                    </span>
                    {i < tx.pipeline.length - 1 && (
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
                    {label}
                  </p>
                </div>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  margin: 0,
                  marginTop: '0.5rem',
                }}>
                  {tx.pipelineSubs[i]}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dual Grid: Models Artifacts & Threat Levels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {/* Model Artifacts Registry */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'linear-gradient(180deg, rgba(18, 25, 42, 0.7) 0%, rgba(10, 16, 28, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '0.875rem',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.15rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.01)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Database size={16} style={{ color: 'var(--cyan)' }} />
                <h3 style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.925rem', fontFamily: 'var(--font-heading)' }}>
                  {tx.filesLabel}
                </h3>
              </div>
              <a
                href="https://huggingface.co/aminenahli/smart-network-mapper-models"
                target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  fontSize: '0.75rem', color: 'var(--cyan)', textDecoration: 'none',
                  fontFamily: 'var(--font-mono)', fontWeight: 600,
                }}
              >
                Hugging Face <ExternalLink size={12} />
              </a>
            </div>

            <div style={{ padding: '0.75rem 1.25rem' }}>
              {tx.files.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.875rem 0',
                    borderBottom: i < tx.files.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    gap: '1rem',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.825rem',
                      color: '#f8fafc',
                      fontWeight: 600,
                      marginBottom: '0.2rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {m.name}
                    </p>
                    <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0 }}>
                      {m.role}
                    </p>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.725rem',
                    color: '#94a3b8',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '0.375rem',
                    flexShrink: 0,
                  }}>
                    {m.size}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Threat Levels Scale (CVSS v3.1) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              background: 'linear-gradient(180deg, rgba(18, 25, 42, 0.7) 0%, rgba(10, 16, 28, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '0.875rem',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <ShieldAlert size={16} style={{ color: '#f87171' }} />
              <h3 style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.925rem', fontFamily: 'var(--font-heading)' }}>
                {tx.threatLabel}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
              {tx.threats.map((threat, i) => {
                const meta = THREAT_META[i]
                return (
                  <div
                    key={i}
                    style={{
                      borderRadius: '0.625rem',
                      padding: '0.875rem 1rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderLeft: `3px solid ${meta.color}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          color: meta.color,
                        }}>
                          {threat.level}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {threat.score}
                        </span>
                      </div>
                      <div style={{ width: '60px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }}>
                        <div style={{ width: `${meta.pct}%`, height: '100%', background: meta.color, borderRadius: '2px' }} />
                      </div>
                    </div>
                    {threat.desc && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        {threat.desc}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Wisdom Layer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            background: 'linear-gradient(180deg, rgba(16, 24, 40, 0.75) 0%, rgba(9, 14, 24, 0.9) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: '1px solid rgba(129, 140, 248, 0.35)',
            borderRadius: '0.875rem',
            padding: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#818cf8',
              background: 'rgba(129, 140, 248, 0.1)',
              border: '1px solid rgba(129, 140, 248, 0.25)',
              padding: '0.2rem 0.5rem',
              borderRadius: '0.375rem',
              letterSpacing: '0.05em',
            }}>
              HEURISTIC ENGINE
            </span>
            <h3 style={{
              color: '#f8fafc',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.15rem',
              margin: 0,
            }}>
              {tx.wisdomLabel}
            </h3>
          </div>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
            maxWidth: '52rem',
          }}>
            {tx.wisdomDesc}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.875rem',
          }}>
            {tx.wisdomRules.map((rule, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '0.5rem',
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                <span style={{ color: '#e2e8f0', fontSize: '0.825rem', lineHeight: 1.5 }}>
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hyperparameters Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            background: 'linear-gradient(180deg, rgba(16, 24, 40, 0.75) 0%, rgba(9, 14, 24, 0.9) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '0.875rem',
            overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <Sliders size={16} style={{ color: 'var(--cyan)' }} />
            <h3 style={{
              color: '#f8fafc',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1rem',
              margin: 0,
            }}>
              {tx.hyperLabel}
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}>
            {tx.hyperParams.map((param, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                  background: 'rgba(255, 255, 255, 0.01)',
                  transition: 'background 0.2s',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.725rem',
                  color: 'var(--cyan)',
                  marginBottom: '0.25rem',
                  fontWeight: 600,
                }}>
                  {param.name}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.15rem',
                  color: '#ffffff',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}>
                  {param.value}
                </p>
                <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0 }}>
                  {param.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
