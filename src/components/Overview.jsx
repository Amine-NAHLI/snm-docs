import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Zap, BarChart3, Network } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const CARDS = [
  {
    icon: Brain,
    color: '#ff00ff',
    glow: 'rgba(255,0,255,0.2)',
    title: 'AI-Powered',
    titleFr: 'Intelligence Artificielle',
    desc: 'Random Forest model with 5.1GB of training data predicts vulnerability severity with high accuracy across thousands of CVEs.',
  },
  {
    icon: Zap,
    color: '#00ffff',
    glow: 'rgba(0,255,255,0.2)',
    title: 'Multi-threaded',
    titleFr: 'Hautement Parallèle',
    desc: 'Up to 200 concurrent scanning workers deliver blazing-fast port enumeration across all 65535 ports in seconds.',
  },
  {
    icon: BarChart3,
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.2)',
    title: 'Professional Reports',
    titleFr: 'Rapports Professionnels',
    desc: 'Export detailed HTML and JSON reports with threat levels, service fingerprints, and actionable remediation suggestions.',
  },
]

const STATS = [
  { value: '200', label: 'Scan Threads', sub: 'Concurrent workers' },
  { value: '5.1GB', label: 'AI Model', sub: 'Random Forest classifier' },
  { value: '65535', label: 'Ports', sub: 'Full port coverage' },
  { value: '4+', label: 'Export Formats', sub: 'HTML, JSON & more' },
]

function Section({ children, id }) {
  const ref = useRef(null)
  return (
    <section id={id} ref={ref} className="section-pad grid-bg relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,255,255,0.04) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  )
}

export default function Overview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="overview">
      <div ref={ref}>
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-mono mb-6">
            <Network className="w-3.5 h-3.5" />
            WHAT IS SNM
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-6">
            <span className="gradient-text">Overview</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Smart Network Mapper is a comprehensive cybersecurity suite that combines
            real-time network scanning, OS fingerprinting, and a machine-learning vulnerability
            predictor into a single premium tool — available in both a Cyberpunk GUI and CLI.
          </p>
          <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto italic">
            Un outil de diagnostic réseau de nouvelle génération, alimenté par l'IA.
          </p>
        </motion.div>

        {/* 3 highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="glass rounded-2xl p-8 group box-glow-cyan-hover transition-all duration-300 cursor-default"
              style={{ borderColor: `${c.color}22` }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: c.glow, border: `1px solid ${c.color}33` }}
              >
                <c.icon className="w-7 h-7" style={{ color: c.color }} />
              </div>
              <h3 className="font-orbitron font-bold text-lg mb-1" style={{ color: c.color }}>
                {c.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono mb-3">{c.titleFr}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.05)' }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ background: 'rgba(10,10,15,0.8)' }}
            >
              <span
                className="font-orbitron font-black text-3xl sm:text-4xl mb-2 gradient-text"
              >
                {s.value}
              </span>
              <span className="text-white font-semibold text-sm mb-1">{s.label}</span>
              <span className="text-slate-500 text-xs">{s.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
