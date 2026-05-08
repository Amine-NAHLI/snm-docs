import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Monitor, Terminal, ChevronRight, Layers } from 'lucide-react'

const GUI_STEPS = [
  { cmd: 'python app.py', desc: 'Launch the Cyberpunk GUI with admin privileges' },
  { cmd: 'Click "Auto Detect"', desc: 'Automatically detects your active network interface and subnet' },
  { cmd: 'Click "Discover Hosts"', desc: 'ARP + TCP hybrid scan finds all live hosts on your subnet' },
  { cmd: 'Select target IP', desc: 'Click on any discovered host in the host list panel' },
  { cmd: 'Click "Launch Scan"', desc: 'Start multi-threaded port scanning with AI vulnerability analysis' },
  { cmd: 'Export Report', desc: 'Generate HTML or JSON report with one click from the results panel' },
]

const CLI_STEPS = [
  { cmd: 'sudo python main.py', desc: 'Start the interactive CLI menu (root required for ARP scan)' },
  { cmd: '[1] Auto-detect network', desc: 'Select option 1 to detect and display your current subnet' },
  { cmd: '[2] Discover hosts', desc: 'Enumerate all live hosts using ARP broadcast + TCP probes' },
  { cmd: '[3] Select & scan target', desc: 'Enter a target IP and choose scan mode (Fast/Full/Custom)' },
  { cmd: '[4] AI vulnerability analysis', desc: 'Automatically runs after scan; displays threat level predictions' },
  { cmd: '[5] Export results', desc: 'Save results as JSON or HTML report to the /reports directory' },
]

function StepList({ steps }) {
  return (
    <div className="space-y-3 mt-6">
      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="flex items-start gap-4 group"
        >
          <div
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-orbitron font-bold mt-0.5"
            style={{ background: 'rgba(0,255,255,0.1)', border: '1px solid rgba(0,255,255,0.25)', color: '#00ffff' }}
          >
            {i + 1}
          </div>
          <div className="flex-1 glass rounded-xl p-3.5 transition-all duration-200 group-hover:border-cyan-400/25">
            <div className="flex items-center gap-2 mb-1">
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <code className="text-cyan-300 text-sm font-mono">{s.cmd}</code>
            </div>
            <p className="text-slate-400 text-sm pl-5">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Usage() {
  const [tab, setTab] = useState('gui')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="usage" className="section-pad relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(255,0,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-magenta-400/20 bg-pink-500/5 text-pink-400 text-xs font-mono mb-6"
            style={{ borderColor: 'rgba(255,0,255,0.2)', color: '#ff00ff' }}>
            <Layers className="w-3.5 h-3.5" />
            HOW TO USE
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-4">
            <span className="gradient-text">Usage Guide</span>
          </h2>
          <p className="text-slate-400">Two ways to run SNM — choose what fits your workflow.</p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex rounded-xl p-1 mb-8 gap-1"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,255,255,0.1)' }}
        >
          {[
            { id: 'gui', label: 'GUI Mode', icon: Monitor },
            { id: 'cli', label: 'CLI Mode', icon: Terminal },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
              style={
                tab === id
                  ? { background: 'rgba(0,255,255,0.12)', color: '#00ffff', border: '1px solid rgba(0,255,255,0.25)' }
                  : { color: '#64748b' }
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === 'gui' ? (
            <motion.div
              key="gui"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-semibold text-white">Cyberpunk GUI Mode</h3>
                  <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                    Recommended
                  </span>
                </div>
                <p className="text-slate-500 text-sm">
                  Full-featured graphical interface with real-time dashboard, animated scan results, and one-click export. Ideal for interactive use and visual analysis.
                </p>
                <StepList steps={GUI_STEPS} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cli"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Terminal className="w-5 h-5" style={{ color: '#ff00ff' }} />
                  <h3 className="font-semibold text-white">CLI / Headless Mode</h3>
                  <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full border" style={{ background: 'rgba(255,0,255,0.08)', color: '#ff00ff', borderColor: 'rgba(255,0,255,0.2)' }}>
                    Server-friendly
                  </span>
                </div>
                <p className="text-slate-500 text-sm">
                  Interactive menu-driven CLI — perfect for remote servers, scripting, and headless environments. All features available without a display.
                </p>
                <StepList steps={CLI_STEPS} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
