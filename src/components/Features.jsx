import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Globe, Radio, Monitor, Zap, Target, Brain, 
  Palette, LayoutDashboard, FileText, Cpu, MapPin, 
  PieChart, Shield, Terminal, Search, Award
} from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

// Metadata mapping 11 items to categories and technical icons
const FEATURE_SPECS = [
  { icon: Globe, category: 'network', tag: 'NETWORKING', accent: '#06b6d4' },
  { icon: Radio, category: 'network', tag: 'ARP / TCP', accent: '#06b6d4' },
  { icon: Monitor, category: 'network', tag: 'TCP/IP STACK', accent: '#06b6d4' },
  { icon: Zap, category: 'network', tag: 'CONCURRENCY', accent: '#06b6d4' },
  { icon: MapPin, category: 'intel', tag: 'AIR-GAP RECON', accent: '#818cf8' },
  { icon: Target, category: 'intel', tag: 'BANNER EXTRACTION', accent: '#818cf8' },
  { icon: Brain, category: 'intel', tag: 'CISA KEV / NVD', accent: '#818cf8' },
  { icon: Award, category: 'compliance', tag: 'MITRE ATT&CK', accent: '#10b981' },
  { icon: Search, category: 'intel', tag: 'RDAP / SSL AUDIT', accent: '#818cf8' },
  { icon: PieChart, category: 'reporting', tag: 'CHART.JS / AI', accent: '#f59e0b' },
  { icon: Terminal, category: 'reporting', tag: 'CUSTOMTKINTER', accent: '#f59e0b' },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].features
  const [activeFilter, setActiveFilter] = useState('all')

  const filterTabs = [
    { id: 'all', label: lang === 'en' ? 'All Capabilities' : 'Toutes les Capacités', count: 11 },
    { id: 'network', label: lang === 'en' ? 'Network & Discovery' : 'Scan & Découverte Réseau', count: 4 },
    { id: 'intel', label: lang === 'en' ? 'Threat Intel & Recon' : 'Threat Intel & Recon', count: 4 },
    { id: 'compliance', label: lang === 'en' ? 'Compliance & NIST' : 'Conformité & NIST', count: 1 },
    { id: 'reporting', label: lang === 'en' ? 'UI & Reporting' : 'UI & Rapports', count: 2 },
  ]

  const itemsWithMeta = tx.items.map((item, i) => ({
    ...item,
    ...FEATURE_SPECS[i],
    index: i,
  }))

  const filteredItems = activeFilter === 'all'
    ? itemsWithMeta
    : itemsWithMeta.filter(item => item.category === activeFilter)

  return (
    <section
      id="features"
      className="section-pad"
      style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{
            color: 'var(--cyan)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            {tx.label}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
            color: '#f8fafc',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            {tx.title}
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '38rem',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            {tx.subtitle}
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '2.5rem',
        }}>
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isActive
                    ? '1px solid rgba(6, 182, 212, 0.45)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isActive
                    ? 'rgba(6, 182, 212, 0.12)'
                    : 'rgba(255, 255, 255, 0.02)',
                  color: isActive ? 'var(--cyan)' : 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.currentTarget.style.color = '#f8fafc'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                <span>{tab.label}</span>
                <span style={{
                  fontSize: '0.675rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                }}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((f, idx) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22, delay: idx * 0.03 }}
                  style={{
                    background: 'linear-gradient(180deg, rgba(18, 25, 42, 0.65) 0%, rgba(10, 16, 28, 0.85) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '0.875rem',
                    padding: '1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${f.accent}50`
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = `0 10px 25px -8px rgba(0,0,0,0.5), 0 0 15px ${f.accent}12`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)'
                    e.currentTarget.style.borderTopColor = 'rgba(255, 255, 255, 0.12)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Card Header: Icon & Technical Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: '2.35rem',
                      height: '2.35rem',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${f.accent}12`,
                      border: `1px solid ${f.accent}30`,
                    }}>
                      <Icon size={16} style={{ color: f.accent }} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: f.accent,
                      background: `${f.accent}10`,
                      border: `1px solid ${f.accent}20`,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.375rem',
                      letterSpacing: '0.04em',
                    }}>
                      {f.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontWeight: 700,
                    color: '#f8fafc',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    marginBottom: '0.25rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {f.title}
                  </h3>

                  {/* Subtitle */}
                  <div style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    marginBottom: '0.75rem',
                  }}>
                    {f.sub}
                  </div>

                  {/* Body Text */}
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.84rem',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {f.text}
                  </p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
