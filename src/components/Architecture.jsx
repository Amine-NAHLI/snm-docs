import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Database, Brain, Network, Server, ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } }),
}

function ModuleBox({ title, items, color, tag, icon: Icon, index, inView }) {
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
        background: 'linear-gradient(180deg, rgba(18, 25, 42, 0.7) 0%, rgba(10, 16, 28, 0.88) 100%)',
        border: hovered ? `1px solid ${color}45` : '1px solid rgba(255, 255, 255, 0.08)',
        borderTop: hovered ? `1px solid ${color}60` : '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '0.875rem',
        padding: '1.4rem',
        transition: 'all 0.22s ease',
        boxShadow: hovered ? `0 12px 28px -8px rgba(0,0,0,0.5), 0 0 16px ${color}12` : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Module Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${color}14`, border: `1px solid ${color}30`,
          }}>
            <Icon size={16} style={{ color }} />
          </div>
          <h3 style={{
            color: '#f8fafc', fontSize: '0.925rem', fontWeight: 700,
            fontFamily: 'var(--font-heading)', margin: 0,
          }}>
            {title}
          </h3>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 600,
          color,
          background: `${color}10`,
          border: `1px solid ${color}22`,
          padding: '0.15rem 0.45rem',
          borderRadius: '0.3rem',
          letterSpacing: '0.04em',
        }}>
          {tag}
        </span>
      </div>

      {/* Module Components */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0.45rem',
              padding: '0.55rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
            }}
          >
            <div style={{
              color: '#e2e8f0', fontFamily: 'var(--font-mono)',
              fontWeight: 500, fontSize: '0.75rem',
            }}>
              {item.name}
            </div>
            {item.sub && (
              <div style={{
                color: 'var(--text-muted)', fontSize: '0.675rem',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '0.15rem 0.4rem',
                borderRadius: '0.25rem',
                flexShrink: 0,
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
    <div style={isEmbed ? {} : { maxWidth: '76rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
      {/* Header */}
      {!isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 0.85rem', borderRadius: '0.375rem',
            border: '1px solid rgba(129, 140, 248, 0.25)', background: 'rgba(129, 140, 248, 0.05)',
            color: '#a5b4fc', fontFamily: 'var(--font-mono)', fontSize: '0.725rem',
            marginBottom: '1.25rem', letterSpacing: '0.08em', fontWeight: 600,
          }}>
            <Layers size={14} /> ARCHITECTURE
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
      )}

      {isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.3rem 0.75rem', borderRadius: '0.375rem',
            border: '1px solid rgba(129, 140, 248, 0.25)', background: 'rgba(129, 140, 248, 0.05)',
            color: '#a5b4fc', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1rem', letterSpacing: '0.08em', fontWeight: 600,
          }}>
            <Layers size={13} /> ARCHITECTURE
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            color: '#f8fafc',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>{tx.subtitle}</p>
        </motion.div>
      )}

      {/* 2x2 Architecture Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem',
      }}>
        {/* Data Engineering */}
        <ModuleBox
          title={lang === 'en' ? 'Data Engineering' : 'Ingénierie Données'}
          icon={Database}
          color="#06b6d4"
          tag="ETL NVD"
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
          color="#818cf8"
          tag="ML ENGINE"
          index={1}
          inView={inView}
          items={[
            { name: 'normalize_data.py', sub: 'RobustScaler' },
            { name: 'code_training.py', sub: '500 arbres' },
            { name: 'scaler.pkl', sub: 'Norm' },
            { name: 'quantile_transformer.pkl', sub: 'Uniform' },
            { name: 'vulnerability_model.pkl', sub: '~5.1 Go' },
          ]}
        />

        {/* SNM Application */}
        <ModuleBox
          title={lang === 'en' ? 'SNM Core Engine' : 'Cœur Application SNM'}
          icon={Network}
          color="#38bdf8"
          tag="SCANNING"
          index={2}
          inView={inView}
          items={[
            { name: 'host_discovery.py', sub: 'Scapy ARP' },
            { name: 'port_scanner.py', sub: 'Sockets TCP/UDP' },
            { name: 'predictor.py', sub: 'Banner parsing' },
            { name: 'osint_enricher.py', sub: 'CVE intel' },
            { name: 'reporter.py', sub: 'HTML + Groq' },
          ]}
        />

        {/* Interface & Storage */}
        <ModuleBox
          title={lang === 'en' ? 'Interface & Storage' : 'Interface & Stockage'}
          icon={Server}
          color="#10b981"
          tag="PRESENTATION"
          index={3}
          inView={inView}
          items={[
            { name: 'CustomTkinter GUI', sub: 'Desktop App' },
            { name: 'CLI Terminal', sub: 'Server-ready' },
            { name: 'report.html', sub: 'Vector report' },
            { name: 'history.db', sub: 'SQLite' },
          ]}
        />
      </div>

      {/* Tech Stack Summary - Technical Chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.625rem',
          justifyContent: 'center',
          padding: '1.15rem 1.5rem',
          background: 'linear-gradient(180deg, rgba(16, 24, 40, 0.7) 0%, rgba(9, 14, 24, 0.85) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '0.75rem',
        }}
      >
        {[
          { label: 'NVD API v2.0', color: '#06b6d4' },
          { label: 'RobustScaler', color: '#818cf8' },
          { label: 'Random Forest (500)', color: '#818cf8' },
          { label: 'Scapy + Raw Sockets', color: '#38bdf8' },
          { label: 'CustomTkinter', color: '#10b981' },
          { label: 'SQLite DB', color: '#10b981' },
          { label: 'Groq Llama-3.3-70B', color: '#f59e0b' },
        ].map((tech, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '0.375rem',
              fontSize: '0.725rem',
            }}
          >
            <div style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: tech.color,
            }} />
            <span style={{ color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
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
      {content}
    </section>
  )
}
