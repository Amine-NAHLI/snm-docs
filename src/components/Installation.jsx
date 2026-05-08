import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Copy, Check, AlertTriangle, Shield, Download, Terminal } from 'lucide-react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 p-1.5 rounded-md transition-all duration-200 text-slate-500 hover:text-cyan-400 hover:bg-cyan-400/10"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

function CodeBlock({ code, lang = 'bash' }) {
  return (
    <div className="code-block rounded-xl p-4 pr-12 relative mt-3">
      <CopyButton text={code} />
      <pre className="text-sm leading-relaxed overflow-x-auto">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="select-none text-slate-600 w-4 text-right flex-shrink-0">{i + 1}</span>
            <span>
              {line.startsWith('#') ? (
                <span className="text-slate-500">{line}</span>
              ) : line.startsWith('python') || line.startsWith('pip') || line.startsWith('cd') || line.startsWith('git') ? (
                <>
                  <span className="text-cyan-400">{line.split(' ')[0]}</span>
                  <span className="text-slate-300">{' ' + line.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <span className="text-slate-300">{line}</span>
              )}
            </span>
          </div>
        ))}
      </pre>
    </div>
  )
}

function WarningBox({ type = 'warning', children }) {
  const isInfo = type === 'info'
  const color = isInfo ? '#00ffff' : '#f59e0b'
  const Icon = isInfo ? Shield : AlertTriangle
  return (
    <div
      className="flex items-start gap-3 rounded-xl p-4 mt-4"
      style={{ background: `${color}08`, border: `1px solid ${color}25` }}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
      <p className="text-sm leading-relaxed" style={{ color: `${color}cc` }}>{children}</p>
    </div>
  )
}

const STEPS = [
  {
    num: '01',
    title: 'Prerequisites',
    icon: Shield,
    content: (
      <div className="space-y-2">
        <ul className="space-y-2 text-sm text-slate-400 list-none">
          {['Python 3.8 or higher', 'Administrator / root privileges', 'Git (to clone the repository)', 'Npcap (Windows only) — required for raw packet capture'].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <WarningBox type="warning">
          <strong>Windows users:</strong> Install Npcap from npcap.com before running SNM. Without it, ARP-based host discovery will not function.
        </WarningBox>
        <WarningBox type="info">
          <strong>Admin rights required:</strong> Raw socket operations for ARP scanning and OS fingerprinting require elevated privileges on all platforms.
        </WarningBox>
      </div>
    ),
  },
  {
    num: '02',
    title: 'Clone the Repository',
    icon: Download,
    content: (
      <CodeBlock code={`git clone https://github.com/Amine-NAHLI/smart-network-mapper.git\ncd smart-network-mapper`} />
    ),
  },
  {
    num: '03',
    title: 'Install Python Dependencies',
    icon: Terminal,
    content: (
      <>
        <p className="text-sm text-slate-400 mb-1">Install all required packages from the requirements file:</p>
        <CodeBlock code={`pip install -r requirements.txt`} />
        <p className="text-xs text-slate-500 mt-2 font-mono">Includes: scapy, psutil, scikit-learn, joblib, pandas, customtkinter, matplotlib</p>
      </>
    ),
  },
  {
    num: '04',
    title: 'Download AI Models (~5.1 GB)',
    icon: Download,
    content: (
      <>
        <p className="text-sm text-slate-400 mb-1">
          Fetch the Random Forest model and preprocessing artifacts from Hugging Face:
        </p>
        <CodeBlock code={`python download_models.py`} />
        <p className="text-xs text-slate-500 mt-2">
          Models hosted at:{' '}
          <a
            href="https://huggingface.co/aminenahli/smart-network-mapper-models"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline"
          >
            huggingface.co/aminenahli/smart-network-mapper-models
          </a>
        </p>
      </>
    ),
  },
  {
    num: '05',
    title: 'Launch SNM',
    icon: Terminal,
    content: (
      <>
        <p className="text-sm text-slate-400 mb-1">Start the Cyberpunk GUI application:</p>
        <CodeBlock code={`python app.py`} />
        <p className="text-sm text-slate-400 mt-4 mb-1">Or use the interactive CLI mode:</p>
        <CodeBlock code={`python main.py`} />
      </>
    ),
  },
]

export default function Installation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="installation" className="section-pad relative overflow-hidden grid-bg" style={{ background: '#080810' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(0,255,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-mono mb-6">
            <Download className="w-3.5 h-3.5" />
            SETUP GUIDE
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-4">
            <span className="gradient-text">Installation</span>
          </h2>
          <p className="text-slate-400">Get SNM running in 5 steps.</p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-7 top-8 bottom-8 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, rgba(0,255,255,0.3), rgba(124,58,237,0.3), rgba(255,0,255,0.1))' }}
          />

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6"
              >
                {/* Step number circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-orbitron font-bold text-sm"
                    style={{
                      background: 'rgba(10,10,15,0.9)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      boxShadow: '0 0 15px rgba(0,255,255,0.1)',
                      color: '#00ffff',
                    }}
                  >
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 glass rounded-2xl p-6 pb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <step.icon className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-semibold text-white">{step.title}</h3>
                  </div>
                  {step.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
