import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Radio, Monitor, Zap, Target, Brain, Palette, LayoutDashboard, FileText, Cpu } from 'lucide-react'

const FEATURES = [
  { icon: Globe, color: '#00ffff', title: 'Auto LAN Detection', sub: 'Détection LAN automatique', desc: 'Automatically detects your active network interface and subnet — zero configuration needed.' },
  { icon: Radio, color: '#ff00ff', title: 'Hybrid Host Discovery', sub: 'Découverte ARP + TCP', desc: 'Combines ARP broadcast scanning with TCP connect probes for maximum host coverage on any network.' },
  { icon: Monitor, color: '#7c3aed', title: 'OS Fingerprinting', sub: 'Empreinte du système OS', desc: 'Identifies operating systems using TTL analysis and TCP/IP stack behaviour patterns.' },
  { icon: Zap, color: '#f59e0b', title: 'Multi-Mode Scanning', sub: 'Scan rapide / complet / custom', desc: 'Choose from Fast (top 1000), Full (all 65535), or Custom port ranges — all backed by 200 threads.' },
  { icon: Target, color: '#10b981', title: 'Banner Grabbing', sub: 'Capture de bannières', desc: 'Grabs service banners from HTTP, SSH, FTP, MySQL, Redis, SMTP, and POP3 for version detection.' },
  { icon: Brain, color: '#ff00ff', title: 'AI Vulnerability Predictor', sub: 'Prédiction de vulnérabilités IA', desc: 'Feeds detected services into a 5.1GB Random Forest model to predict CVE severity in real-time.' },
  { icon: Palette, color: '#00ffff', title: 'Cyberpunk GUI', sub: 'Interface graphique Cyberpunk', desc: 'A premium dark-mode GUI built with CustomTkinter — interactive, animated, and visually stunning.' },
  { icon: LayoutDashboard, color: '#7c3aed', title: 'Real-Time Dashboard', sub: 'Tableau de bord en temps réel', desc: 'Live scan progress, port status updates, and threat indicators displayed as they are discovered.' },
  { icon: FileText, color: '#f59e0b', title: 'HTML & JSON Reports', sub: 'Rapports HTML et JSON', desc: 'One-click export of fully styled HTML reports and machine-readable JSON for SIEM integration.' },
]

function FeatureCard({ f, i, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? f.color + '45' : f.color + '18'}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '1rem',
        padding: '1.5rem',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 8px 40px ${f.color}12` : '0 2px 12px rgba(0,0,0,0.3)',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{
          flexShrink: 0, width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${f.color}12`, border: `1px solid ${f.color}25`,
          transition: 'transform 0.3s',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}>
          <f.icon size={18} style={{ color: f.color }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{f.title}</h3>
          <p style={{ color: f.color, opacity: 0.7, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '0.625rem' }}>{f.sub}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="features"
      className="section-pad"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
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
            <Cpu size={13} /> CAPABILITIES
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            Key <span className="gradient-text">Features</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '36rem', margin: '0 auto' }}>
            Everything you need for comprehensive network reconnaissance and vulnerability assessment.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid-auto-3">
          {FEATURES.map((f, i) => <FeatureCard key={f.title} f={f} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}
