import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HelpCircle, AlertTriangle } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

export default function FAQ({ isEmbed = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].faq

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
            border: '1px solid rgba(255,165,0,0.2)', background: 'rgba(255,165,0,0.04)',
            color: '#ffa500', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <HelpCircle size={13} /> F.A.Q
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{tx.subtitle}</p>
        </motion.div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tx.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,165,0,0.15)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '1rem', padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <AlertTriangle size={18} style={{ color: '#ffa500', flexShrink: 0, marginTop: '0.125rem' }} />
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
                {item.q}
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65, paddingLeft: '1.875rem' }}>
              {item.a}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="faq" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(255,165,0,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
