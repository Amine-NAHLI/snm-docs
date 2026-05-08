import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Monitor, Terminal, ChevronRight, Layers } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

function StepList({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
        >
          <div className="font-orbitron" style={{
            flexShrink: 0, width: '1.75rem', height: '1.75rem',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', fontWeight: 700, marginTop: '0.125rem',
            background: 'rgba(0,255,255,0.08)', border: '1px solid rgba(0,255,255,0.22)', color: 'var(--cyan)',
          }}>
            {i + 1}
          </div>
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,255,0.08)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '0.75rem', padding: '0.875rem 1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <ChevronRight size={13} style={{ color: 'var(--cyan)', flexShrink: 0 }} />
              <code style={{ color: '#67e8f9', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>{s.cmd}</code>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', paddingLeft: '1.25rem' }}>{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Usage({ isEmbed = false }) {
  const [tab, setTab] = useState('gui')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].usage

  const content = (
    <div ref={ref} style={isEmbed ? {} : { maxWidth: '52rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {!isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(255,0,255,0.2)', background: 'rgba(255,0,255,0.04)',
            color: 'var(--magenta)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Layers size={13} /> {tx.label}
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{tx.subtitle}</p>
        </motion.div>
      )}

      {/* Tab switcher */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: 'flex', gap: '0.25rem', padding: '0.25rem',
          marginBottom: '2rem', borderRadius: '0.875rem',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,255,255,0.1)',
        }}
      >
        {[
          { id: 'gui', label: tx.tabGui, icon: Monitor },
          { id: 'cli', label: tx.tabCli, icon: Terminal },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', padding: '0.75rem', borderRadius: '0.625rem',
              fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
              border: tab === id ? '1px solid rgba(0,255,255,0.25)' : '1px solid transparent',
              background: tab === id ? 'rgba(0,255,255,0.1)' : 'transparent',
              color: tab === id ? 'var(--cyan)' : 'var(--text-muted)',
              transition: 'all 0.2s', fontFamily: 'var(--font-heading)',
            }}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {tab === 'gui' ? (
          <motion.div
            key="gui"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,255,0.12)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '1rem', padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Monitor size={18} style={{ color: 'var(--cyan)' }} />
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{tx.guiTitle}</h3>
                <span style={{
                  marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
                  padding: '0.2rem 0.625rem', borderRadius: '9999px',
                  background: 'rgba(0,255,255,0.08)', color: 'var(--cyan)', border: '1px solid rgba(0,255,255,0.2)',
                }}>{tx.guiRec}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>{tx.guiDesc}</p>
              <StepList steps={tx.guiSteps} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="cli"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,0,255,0.12)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '1rem', padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Terminal size={18} style={{ color: 'var(--magenta)' }} />
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{tx.cliTitle}</h3>
                <span style={{
                  marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
                  padding: '0.2rem 0.625rem', borderRadius: '9999px',
                  background: 'rgba(255,0,255,0.07)', color: 'var(--magenta)', border: '1px solid rgba(255,0,255,0.2)',
                }}>Server-friendly</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>{tx.cliDesc}</p>
              <StepList steps={tx.cliSteps} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="usage" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(255,0,255,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
