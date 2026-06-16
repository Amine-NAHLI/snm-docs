import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, GitPullRequest, DownloadCloud, Terminal } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

export default function Developer({ isEmbed = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].developer

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
            border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.04)',
            color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Code size={13} /> DEVELOPER
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{tx.subtitle}</p>
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
            border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.04)',
            color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Code size={13} /> DEVELOPER
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{tx.subtitle}</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: '2rem' }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.12)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem', padding: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Terminal size={18} style={{ color: '#10b981' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{tx.apiTitle}</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1rem' }}>{tx.apiDesc}</p>
          <pre style={{
            background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto',
            color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.5
          }}>
<span style={{color: '#c678dd'}}>from</span> scanner.port_scanner <span style={{color: '#c678dd'}}>import</span> scan_ports{'\n'}
<span style={{color: '#c678dd'}}>from</span> scanner.host_discovery <span style={{color: '#c678dd'}}>import</span> tcp_ping{'\n\n'}
<span style={{color: '#5c6370'}}># Scan specific ports</span>{'\n'}
results = scan_ports(<span style={{color: '#98c379'}}>"192.168.1.10"</span>, ports=[<span style={{color: '#d19a66'}}>80</span>, <span style={{color: '#d19a66'}}>443</span>]){'\n'}
<span style={{color: '#56b6c2'}}>print</span>(results)
          </pre>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.12)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem', padding: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <GitPullRequest size={18} style={{ color: '#10b981' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{tx.contribTitle}</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[[tx.c1, tx.cd1], [tx.c2, tx.cd2], [tx.c3, tx.cd3]].map(([title, desc], i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                <div className="font-orbitron" style={{
                  flexShrink: 0, width: '1.75rem', height: '1.75rem',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700, background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.22)', color: '#10b981',
                }}>
                  {i + 1}
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  )

  if (isEmbed) return content

  return (
    <section id="developer" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(16,185,129,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
