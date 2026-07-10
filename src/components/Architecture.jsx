import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Database, Brain, Network, Server } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
}

function ModuleBox({ title, items, color, icon: Icon, index, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={fadeIn}
      custom={index}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? color + '50' : color + '25'}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '0.875rem',
        padding: '1.25rem',
        transition: 'all 0.3s',
        boxShadow: hovered ? `0 0 20px ${color}15` : 'none',
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
        <div style={{
          width: '2rem', height: '2rem', borderRadius: '0.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${color}15`, border: `1px solid ${color}35`,
        }}>
          <Icon size={14} style={{ color }} />
        </div>
        <h3 style={{
          color, fontSize: '0.825rem', fontWeight: 700,
          fontFamily: 'var(--font-orbitron)',
        }}>
          {title}
        </h3>
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${color}12`,
              borderRadius: '0.375rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.7rem',
            }}
          >
            <div style={{
              color, fontFamily: 'var(--font-mono)',
              fontWeight: 600, marginBottom: item.sub ? '0.125rem' : 0,
            }}>
              {item.name}
            </div>
            {item.sub && (
              <div style={{
                color: 'var(--text-muted)', fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
              }}>
                {item.sub}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Architecture({ isEmbed = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].architecture

  const content = (
    <div style={isEmbed ? {} : { maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
      {/* Header */}
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
            border: '1px solid rgba(124,58,237,0.2)', background: 'rgba(124,58,237,0.04)',
            color: '#7c3aed', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Layers size={13} /> ARCHITECTURE
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.7 }}>
            {tx.subtitle}
          </p>
        </motion.div>
      )}

      {isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(124,58,237,0.2)', background: 'rgba(124,58,237,0.04)',
            color: '#7c3aed', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Layers size={13} /> ARCHITECTURE
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{tx.subtitle}</p>
        </motion.div>
      )}

      {/* Architecture Grid - Simple 2x2 Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem',
      }}>
        {/* Data Engineering */}
        <ModuleBox
          title={lang === 'en' ? 'Data Engineering' : 'Ingénierie Données'}
          icon={Database}
          color="#00ffff"
          index={0}
          inView={inView}
          items={[
            { name: 'API NVD NIST v2.0', sub: 'HTTP mTLS' },
            { name: 'build_dataset.py', sub: 'Port / Version / CVSS' },
            { name: 'dataset_model.csv', sub: '~439 Mo' },
          ]}
        />

        {/* Model Training */}
        <ModuleBox
          title={lang === 'en' ? 'Model Training' : 'Entraînement Modèle'}
          icon={Brain}
          color="#7c3aed"
          index={1}
          inView={inView}
          items={[
            { name: 'normalize_data.py', sub: 'RobustScaler' },
            { name: 'code_training.py', sub: '500 arbres' },
            { name: 'scaler.pkl', sub: '' },
            { name: 'quantile_transformer.pkl', sub: '' },
            { name: 'vulnerability_model.pkl', sub: '~5.1 Go' },
          ]}
        />

        {/* SNM Application */}
        <ModuleBox
          title={lang === 'en' ? 'SNM Application' : 'Application SNM'}
          icon={Network}
          color="#ff00ff"
          index={2}
          inView={inView}
          items={[
            { name: 'host_discovery.py', sub: 'Scapy ARP' },
            { name: 'port_scanner.py', sub: 'Sockets TCP/UDP' },
            { name: 'predictor.py', sub: 'Banner grabbing' },
            { name: 'osint_enricher.py', sub: 'CVE' },
            { name: 'reporter.py', sub: 'HTML + Groq' },
          ]}
        />

        {/* Interface & Storage */}
        <ModuleBox
          title={lang === 'en' ? 'Interface & Storage' : 'Interface & Stockage'}
          icon={Server}
          color="#10b981"
          index={3}
          inView={inView}
          items={[
            { name: 'CustomTkinter', sub: 'GUI Interface' },
            { name: 'report.html', sub: 'HTML + Groq' },
            { name: 'history.db', sub: 'SQLite' },
          ]}
        />
      </div>

      {/* Tech Stack Summary - Compact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          padding: '1.25rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '0.75rem',
        }}
      >
        {[
          { label: 'NVD API v2.0', color: '#00ffff' },
          { label: 'RobustScaler', color: '#7c3aed' },
          { label: 'Random Forest', color: '#7c3aed' },
          { label: 'Scapy + Sockets', color: '#ff00ff' },
          { label: 'CustomTkinter', color: '#10b981' },
          { label: 'SQLite', color: '#10b981' },
        ].map((tech, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.875rem',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${tech.color}20`,
              borderRadius: '9999px',
              fontSize: '0.7rem',
            }}
          >
            <div style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: tech.color,
              boxShadow: `0 0 6px ${tech.color}`,
            }} />
            <span style={{ color: tech.color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              {tech.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )

  if (isEmbed) return content

  return (
    <section
      id="architecture"
      className="section-pad"
      style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 65%)',
      }} />
      {content}
    </section>
  )
}
