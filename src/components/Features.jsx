import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Globe, Radio, Monitor, Zap, Target, Brain,
  Palette, LayoutDashboard, FileText, Cpu
} from 'lucide-react'

const FEATURES = [
  {
    icon: Globe,
    color: '#00ffff',
    title: 'Auto LAN Detection',
    titleFr: 'Détection LAN automatique',
    desc: 'Automatically detects your active network interface and subnet — zero configuration needed.',
  },
  {
    icon: Radio,
    color: '#ff00ff',
    title: 'Hybrid Host Discovery',
    titleFr: 'Découverte ARP + TCP',
    desc: 'Combines ARP broadcast scanning with TCP connect probes for maximum host coverage on any network.',
  },
  {
    icon: Monitor,
    color: '#7c3aed',
    title: 'OS Fingerprinting',
    titleFr: 'Empreinte du système OS',
    desc: 'Identifies operating systems using TTL analysis and TCP/IP stack behaviour patterns.',
  },
  {
    icon: Zap,
    color: '#f59e0b',
    title: 'Multi-Mode Scanning',
    titleFr: 'Scan rapide / complet / custom',
    desc: 'Choose from Fast (top 1000), Full (all 65535), or Custom port ranges — all backed by 200 threads.',
  },
  {
    icon: Target,
    color: '#10b981',
    title: 'Banner Grabbing',
    titleFr: 'Capture de bannières',
    desc: 'Grabs service banners from HTTP, SSH, FTP, MySQL, Redis, SMTP, and POP3 for version detection.',
  },
  {
    icon: Brain,
    color: '#ff00ff',
    title: 'AI Vulnerability Predictor',
    titleFr: 'Prédiction de vulnérabilités IA',
    desc: 'Feeds detected services into a 5.1GB Random Forest model to predict CVE severity in real-time.',
  },
  {
    icon: Palette,
    color: '#00ffff',
    title: 'Cyberpunk GUI',
    titleFr: 'Interface graphique Cyberpunk',
    desc: 'A premium dark-mode GUI built with CustomTkinter — interactive, animated, and visually stunning.',
  },
  {
    icon: LayoutDashboard,
    color: '#7c3aed',
    title: 'Real-Time Dashboard',
    titleFr: 'Tableau de bord en temps réel',
    desc: 'Live scan progress, port status updates, and threat indicators displayed as they are discovered.',
  },
  {
    icon: FileText,
    color: '#f59e0b',
    title: 'HTML & JSON Reports',
    titleFr: 'Rapports HTML et JSON',
    desc: 'One-click export of fully styled HTML reports and machine-readable JSON for SIEM integration.',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="features" className="section-pad relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-6">
            <Cpu className="w-3.5 h-3.5" />
            CAPABILITIES
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-4">
            Key <span className="gradient-text">Features</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Everything you need for comprehensive network reconnaissance and vulnerability assessment.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              variants={cardVariant}
              custom={i}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="glass rounded-2xl p-6 group cursor-default transition-all duration-300 hover:translate-y-[-4px]"
              style={{ borderColor: `${f.color}18` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${f.color}40`
                e.currentTarget.style.boxShadow = `0 0 30px ${f.color}10`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${f.color}18`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}12`, border: `1px solid ${f.color}25` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-0.5">{f.title}</h3>
                  <p className="text-xs font-mono mb-2" style={{ color: f.color, opacity: 0.7 }}>{f.titleFr}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
