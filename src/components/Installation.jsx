import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Copy, Check, AlertTriangle, Shield, Download, Terminal } from 'lucide-react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      style={{
        position: 'absolute', top: '0.625rem', right: '0.625rem',
        padding: '0.375rem 0.625rem',
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        borderRadius: '0.375rem',
        border: '1px solid rgba(0,255,255,0.15)',
        background: copied ? 'rgba(16,185,129,0.12)' : 'rgba(0,255,255,0.06)',
        color: copied ? '#10b981' : 'var(--text-secondary)',
        cursor: 'pointer', fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.35)' } }}
      onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.15)' } }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function CodeBlock({ code }) {
  return (
    <div className="code-block" style={{ padding: '1rem', paddingRight: '6rem', marginTop: '0.75rem', position: 'relative' }}>
      <CopyButton text={code} />
      <pre style={{ margin: 0, lineHeight: 1.7, overflowX: 'auto' }}>
        {code.split('\n').map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ userSelect: 'none', color: 'var(--text-muted)', width: '1.25rem', textAlign: 'right', flexShrink: 0, fontSize: '0.8rem' }}>{i + 1}</span>
            <span>
              {line.startsWith('#') ? (
                <span style={{ color: 'var(--text-muted)' }}>{line}</span>
              ) : (
                (() => {
                  const first = line.split(' ')[0]
                  const rest = ' ' + line.split(' ').slice(1).join(' ')
                  const cmdColor = ['git'].includes(first) ? 'var(--cyan)' : ['python', 'pip'].includes(first) ? 'var(--magenta)' : ['cd', 'sudo'].includes(first) ? '#f59e0b' : null
                  return cmdColor ? (
                    <><span style={{ color: cmdColor }}>{first}</span><span style={{ color: '#c9d1d9' }}>{rest}</span></>
                  ) : (
                    <span style={{ color: '#c9d1d9' }}>{line}</span>
                  )
                })()
              )}
            </span>
          </div>
        ))}
      </pre>
    </div>
  )
}

function AlertBox({ type = 'warning', children }) {
  const isInfo = type === 'info'
  const color = isInfo ? 'var(--cyan)' : 'var(--amber)'
  const Icon = isInfo ? Shield : AlertTriangle
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
      borderRadius: '0.75rem', padding: '0.875rem 1rem', marginTop: '0.875rem',
      background: isInfo ? 'rgba(0,255,255,0.04)' : 'rgba(245,158,11,0.05)',
      border: `1px solid ${color}22`,
    }}>
      <Icon size={16} style={{ color, flexShrink: 0, marginTop: '0.1rem' }} />
      <p style={{ fontSize: '0.825rem', lineHeight: 1.65, color: `${color}cc` }}>{children}</p>
    </div>
  )
}

const STEPS = [
  {
    num: '01', title: 'Prerequisites', icon: Shield,
    content: (
      <div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['Python 3.8 or higher', 'Administrator / root privileges', 'Git (to clone the repository)', 'Npcap (Windows only) — required for raw packet capture'].map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
        <AlertBox type="warning"><strong>Windows users:</strong> Install Npcap from npcap.com before running SNM. Without it, ARP-based host discovery will not function.</AlertBox>
        <AlertBox type="info"><strong>Admin rights required:</strong> Raw socket operations for ARP scanning and OS fingerprinting require elevated privileges on all platforms.</AlertBox>
      </div>
    ),
  },
  { num: '02', title: 'Clone the Repository', icon: Download, content: <CodeBlock code={`git clone https://github.com/Amine-NAHLI/smart-network-mapper.git\ncd smart-network-mapper`} /> },
  {
    num: '03', title: 'Install Python Dependencies', icon: Terminal,
    content: (
      <>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Install all required packages from the requirements file:</p>
        <CodeBlock code={`pip install -r requirements.txt`} />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>Includes: scapy, psutil, scikit-learn, joblib, pandas, customtkinter, matplotlib</p>
      </>
    ),
  },
  {
    num: '04', title: 'Download AI Models (~5.1 GB)', icon: Download,
    content: (
      <>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Fetch the Random Forest model and preprocessing artifacts from Hugging Face:</p>
        <CodeBlock code={`python download_models.py`} />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Models at:{' '}
          <a href="https://huggingface.co/aminenahli/smart-network-mapper-models" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)' }}>
            huggingface.co/aminenahli/smart-network-mapper-models
          </a>
        </p>
      </>
    ),
  },
  {
    num: '05', title: 'Launch SNM', icon: Terminal,
    content: (
      <>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Start the Cyberpunk GUI application:</p>
        <CodeBlock code={`python app.py`} />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '0.25rem' }}>Or use the interactive CLI mode:</p>
        <CodeBlock code={`python main.py`} />
      </>
    ),
  },
]

export default function Installation({ isEmbed = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const content = (
    <div ref={ref} style={isEmbed ? {} : { maxWidth: '52rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {!isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Download size={13} /> SETUP GUIDE
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">Installation</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Get SNM running in 5 steps.</p>
        </motion.div>
      )}

      <div style={{ position: 'relative' }}>
        {/* Timeline vertical line */}
        <div style={{
          position: 'absolute', left: '1.75rem', top: '2rem', bottom: '2rem',
          width: '1px', background: 'linear-gradient(to bottom, rgba(0,255,255,0.3), rgba(124,58,237,0.3), rgba(255,0,255,0.1))',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: 'flex', gap: '1.5rem' }}
            >
              {/* Circle */}
              <div style={{ flexShrink: 0, position: 'relative', zIndex: 10 }}>
                <div className="font-orbitron" style={{
                  width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.75rem',
                  background: 'rgba(5,5,8,0.95)',
                  border: '1px solid rgba(0,255,255,0.3)',
                  boxShadow: '0 0 15px rgba(0,255,255,0.1)',
                  color: 'var(--cyan)',
                }}>
                  {step.num}
                </div>
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(0,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                padding: '1.5rem',
                paddingBottom: '2rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <step.icon size={15} style={{ color: 'var(--cyan)' }} />
                  <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{step.title}</h3>
                </div>
                {step.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="installation" className="section-pad grid-bg" style={{ position: 'relative', overflow: 'hidden', background: '#080810' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(0,255,255,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
